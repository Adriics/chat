import { DomainError } from "@Shared/domain/Errors/DomainError"

export class InvalidCredentials extends DomainError {
  protected code = "invalid-credentials"
  protected message

  constructor(value: string) {
    super()
    this.message = `The credentials provided for user ${value} are invalid`
  }
}
