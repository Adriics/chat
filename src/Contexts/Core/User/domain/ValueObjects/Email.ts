import { StringValueObject } from "@Shared/domain/ValueObjects/StringValueObject"

export class Email extends StringValueObject {
  constructor(readonly value: string) {
    super(value)
  }

  valueOf(): string {
    return this.value
  }

  static create(value: string): Email {
    if (!this.isValidEmail(value)) {
      throw new Error(`Invalid email: ${value}`)
    }
    return new Email(value)
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
