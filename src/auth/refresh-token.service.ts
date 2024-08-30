import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Response } from 'express'
import { isDev } from 'src/utils/is-dev.util'

@Injectable()
export class RefreshTokenService {
  constructor(private readonly configService: ConfigService) {}
  readonly EXPIRE_DAY_REFRESH_TOKEN = 1
  readonly REFRESH_TOKEN_NAME = 'refreshToken'

  private readonly DOMAIN = this.configService.get<string>('DOMAIN')

  public addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expires = new Date(),
      secure = true,
      domain = this.DOMAIN,
      httpOnly = true,
      sameSite = isDev(this.configService) ? 'none' : 'lax'

    expires.setDate(expires.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly,
      domain,
      expires,
      secure,
      sameSite,
    })
  }

  public removeRefreshTokenFromResponse(res: Response) {
    const secure = true,
      domain = this.DOMAIN,
      httpOnly = true,
      sameSite = isDev(this.configService) ? 'none' : 'lax',
      expires = new Date(0)

    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly,
      domain,
      expires,
      secure,
      sameSite,
    })
  }
}
