import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { SocialMediaAuthController } from 'src/auth/social-media/social-media-auth.controller'
import { SocialMediaAuthService } from 'src/auth/social-media/social-media-auth.service'
import { GithubStrategy } from 'src/auth/strategies/github.strategy'
import { GoogleStrategy } from 'src/auth/strategies/google.strategy'
import { getJwtConfig } from 'src/config/jwt.config'
import { EmailModule } from 'src/email/email.module'
import { PrismaService } from 'src/prisma.service'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RefreshTokenService } from './refresh-token.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    UserModule,
    EmailModule,
  ],
  controllers: [AuthController, SocialMediaAuthController],
  providers: [
    JwtStrategy,
    PrismaService,
    AuthService,
    RefreshTokenService,
    GoogleStrategy,
    GithubStrategy,
    SocialMediaAuthService,
  ],
})
export class AuthModule {}
