import { corsConfig } from '@/utils/cors-config'
import { EmojiLogger, listenerColorize } from '@/utils/logger-emoj.logger'
import { Logger, RequestMethod } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new EmojiLogger(),
  })

  const logger = new Logger(),
    config = app.get(ConfigService),
    port = config.get<number>('PORT'),
    client = config.get<string>('CLIENT_URL')

  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'auth/google', method: RequestMethod.GET },
      { path: 'auth/google/redirect', method: RequestMethod.GET },
      { path: 'auth/github', method: RequestMethod.GET },
      { path: 'auth/github/redirect', method: RequestMethod.GET },
      { path: 'verify-email', method: RequestMethod.GET },
    ],
  })

  app.use(cookieParser())
  app.use(helmet())
  app.use(compression())

  app.enableCors(corsConfig(client))

  await app.listen(port, () => {
    logger.log(listenerColorize(`🚀 Server running on port ${port}`))
  })
}
bootstrap()
