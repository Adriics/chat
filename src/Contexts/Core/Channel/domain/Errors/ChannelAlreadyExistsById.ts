import { DomainError } from "@Shared/domain/Errors/DomainError"
import { Id } from "../ValueObjects/Id"

export class ChannelAlreadyExistsById extends DomainError {
  protected code = "channel-already-exists"
  protected message

  constructor(id: Id) {
    super()
    this.message = `A channel with id ${id} already exists`
  }
}
