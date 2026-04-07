import { DomainError } from "@Shared/domain/Errors/DomainError"
import { Email } from "../ValueObjects/Email"

export class UserNotFoundByEmail extends DomainError {
  protected code = "user-not-found"
  protected message

  constructor(email: Email) {
    super()
    this.message = `A user with email ${email} wasn't found`
  }
}
