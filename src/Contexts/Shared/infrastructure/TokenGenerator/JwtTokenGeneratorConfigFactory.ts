export type JwtTokenGeneratorConfig = {
  privateKey: string
  expiresIn: string
}

export class JwtTokenGeneratorConfigFactory {
  static create(): JwtTokenGeneratorConfig {
    return {
      privateKey: process.env.JWT_PUBLIC_KEY!,
      expiresIn: process.env.JWT_EXPIRES_IN ?? '24h'
    }
  }
}
