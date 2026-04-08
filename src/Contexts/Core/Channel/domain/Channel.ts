import { AggregateRoot } from "@Shared/domain/AggregateRoot"
import { CreatedAt } from "../../../Shared/domain/SharedValueObjects/CreatedAt"
import { Id } from "./ValueObjects/Id"
import { Name } from "./ValueObjects/Name"

export class Channel extends AggregateRoot {
  constructor(
    readonly id: Id,
    readonly name: Name,
    readonly createdAt: CreatedAt,
  ) {
    super()
  }

  static create(id: Id, name: Name): Channel {
    return new Channel(id, name, new CreatedAt(new Date()))
  }

  update(name: Name): Channel {
    return new Channel(this.id, name, this.createdAt)
  }

  delete(): Channel {
    return new Channel(this.id, this.name, this.createdAt)
  }
}
