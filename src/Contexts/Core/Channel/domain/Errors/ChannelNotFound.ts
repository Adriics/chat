import { DomainError } from "@Shared/domain/Errors/DomainError"
import { Id } from "../ValueObjects/Id"

export class ChannelNotFound extends DomainError {
  protected code = "channel-not-found"
  protected message

  constructor(id: Id) {
    super()
    this.message = `A channel with id ${id} wasn't found`
  }
}
