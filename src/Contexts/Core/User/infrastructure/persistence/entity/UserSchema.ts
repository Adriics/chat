import { User } from "@Core/User/domain/User"
import { Id } from "@Core/User/domain/ValueObjects/Id"
import { Name } from "@Shared/domain/SharedValueObjects/Name"
import { EntitySchema } from "typeorm"
import { CreatedAt } from "@Shared/domain/SharedValueObjects/CreatedAt"
import { UpdatedAt } from "@Shared/domain/SharedValueObjects/UpdatedAt"
import { DeletedAt } from "@Shared/domain/SharedValueObjects/DeletedAt"
import { Email } from "@Core/User/domain/ValueObjects/Email"
import { Password } from "@Core/User/domain/ValueObjects/Password"
import { Role } from "@Core/User/domain/ValueObjects/Role"
import { ValueObjectTransformer } from "@Shared/domain/ValueObjects/ValueObjectTransformer"

export const UserSchema = new EntitySchema<User>({
  name: "User",
  target: User,
  tableName: "user",
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(Name),
    },
    email: {
      type: String,
      transformer: ValueObjectTransformer(Email),
    },
    password: {
      type: String,
      transformer: ValueObjectTransformer(Password),
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt),
    },
    role: {
      type: String,
      transformer: ValueObjectTransformer(Role),
    },
    updatedAt: {
      type: Date,
      updateDate: true,
      transformer: ValueObjectTransformer(UpdatedAt),
    },
    deletedAt: {
      type: Date,
      nullable: true,
      deleteDate: true,
      transformer: ValueObjectTransformer(DeletedAt),
    },
  },
})
