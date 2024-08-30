import { Injectable } from '@nestjs/common'
import type { User } from '@prisma/client'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import type { TSocialProfile } from 'src/auth/social-media/social-media-auth.types'

import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUsers(): Promise<Pick<User, 'name' | 'email' | 'id'>[]> {
    return this.prisma.user.findMany({
      select: {
        name: true,
        email: true,
        id: true,
        password: false,
      },
    })
  }

  public async getById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  public async getByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  public async findOrCreateSocialUser(profile: TSocialProfile): Promise<User> {
    let user = await this.getByEmail(profile.email)
    if (!user) {
      user = await this._createSocialUser(profile)
    }
    return user
  }

  private async _createSocialUser(profile: TSocialProfile): Promise<User> {
    const email = profile.email
    const name =
      'firstName' in profile
        ? `${profile.firstName} ${profile.lastName}`
        : profile.username
    const picture = profile.picture || ''

    return this.prisma.user.create({
      data: {
        email,
        name,
        password: '',
        verificationToken: null,
        avatarPath: picture,
      },
    })
  }

  public async create(dto: AuthDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password),
      },
    })
  }

  public async update(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    })
  }
}
