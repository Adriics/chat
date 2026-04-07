import argon2 from "argon2"
import { StringValueObject } from "@Shared/domain/ValueObjects/StringValueObject"
import { InvalidPasswordLength } from "../Errors/InvalidPasswordLength"

export class Password extends StringValueObject {
  static create(password: string): Password {
    if (password.length < 8) {
      throw new InvalidPasswordLength(password)
    }
    return new Password(password)
  }

  static async hash(password: Password): Promise<Password> {
    const hashed = await argon2.hash(password.valueOf())
    return new Password(hashed)
  }

  static async compare(
    password: Password,
    hashedPassword: Password,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword.valueOf(), password.valueOf())
  }
}
