import { AggregateRoot } from "@Shared/domain/AggregateRoot"
import { Nullable } from "@Shared/domain/Nullable"
import { DeletedAt } from "../../../Shared/domain/SharedValueObjects/DeletedAt"
import { Email } from "./ValueObjects/Email"
import { CreatedAt } from "../../../Shared/domain/SharedValueObjects/CreatedAt"
import { Id } from "./ValueObjects/Id"
import { Name } from "../../../Shared/domain/SharedValueObjects/Name"
import { UpdatedAt } from "../../../Shared/domain/SharedValueObjects/UpdatedAt"
import { Password } from "./ValueObjects/Password"
import { AVAILABLE_ROLES, Role } from "./ValueObjects/Role"

export class User extends AggregateRoot {
  constructor(
    readonly id: Id,
    readonly name: Name,
    readonly email: Email,
    readonly password: Password,
    readonly role: Role,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>,
  ) {
    super()
  }

  static create(id: Id, name: Name, email: Email, password: Password): User {
    return new User(
      id,
      name,
      email,
      password,
      new Role(AVAILABLE_ROLES.MEMBER),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null,
    )
  }

  updateRole(role: Role): User {
    return new User(
      this.id,
      this.name,
      this.email,
      this.password,
      role,
      this.createdAt,
      this.updatedAt,
      this.deletedAt,
    )
  }

  updatePassword(password: Password): User {
    return new User(
      this.id,
      this.name,
      this.email,
      password,
      this.role,
      this.createdAt,
      this.updatedAt,
      this.deletedAt,
    )
  }

  update(name: Name): User {
    return new User(
      this.id,
      name,
      this.email,
      this.password,
      this.role,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt,
    )
  }

  delete(): User {
    return new User(
      this.id,
      this.name,
      this.email,
      this.password,
      this.role,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date()),
    )
  }
}
