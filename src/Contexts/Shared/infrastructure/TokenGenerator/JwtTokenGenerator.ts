import { sign, SignOptions } from 'jsonwebtoken'
import { TokenData } from '@Shared/domain/TokenDecoder/TokenData'
import { JwtTokenGeneratorConfig } from './JwtTokenGeneratorConfigFactory'
import { TokenGenerator } from '@Shared/domain/TokenGenerator'

export class JwtTokenGenerator implements TokenGenerator {
  constructor(private readonly config: JwtTokenGeneratorConfig) {}

  run(data: TokenData): string {
    const options: SignOptions = {
      algorithm: 'HS512',
      expiresIn: '24h'
    }
    return sign(data, this.config.privateKey, options)
  }
}
