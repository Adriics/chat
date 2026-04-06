import { TokenData } from '@Shared/domain/TokenDecoder/TokenData'

export interface TokenGenerator {
  run(data: TokenData): string
}
