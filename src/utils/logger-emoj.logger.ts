import { LoggerService } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { bgBlue, bgYellow, black, blue, bold, gray, red } from 'chalk'

export class EmojiLogger implements LoggerService {
  log(message: string) {
    this.writeToFile(gray('📢 ' + message))
  }

  error(message: string, trace: string) {
    this.writeToFile(red('❌ ' + message))
    this.writeToFile('🔍 Stack Trace: ' + trace)
  }

  warn(message: string) {
    this.writeToFile(bgYellow(black('⚠️ ' + message)))
  }

  debug(message: string) {
    this.writeToFile(blue('🐞 ' + message))
  }

  private writeToFile(message: string) {
    console.log(message)
  }
}
export function listenerColorize(text: string): string {
  return bgBlue(black(bold(text)))
}
