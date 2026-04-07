import { InvalidNameLength } from "@Core/User/domain/Errors/InvalidNameLength"
import { StringValueObject } from "@Shared/domain/ValueObjects/StringValueObject"

export class Name extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.checkifItsValid(value)
  }

  private checkifItsValid(value: string): void {
    if (value.length < 3) throw new InvalidNameLength(value)
  }
}
