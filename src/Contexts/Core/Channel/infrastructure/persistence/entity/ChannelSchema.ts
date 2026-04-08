import { Id } from "@Core/User/domain/ValueObjects/Id"
import { Name } from "@Shared/domain/SharedValueObjects/Name"
import { EntitySchema } from "typeorm"
import { CreatedAt } from "@Shared/domain/SharedValueObjects/CreatedAt"
import { ValueObjectTransformer } from "@Shared/domain/ValueObjects/ValueObjectTransformer"
import { Channel } from "@Core/Channel/domain/Channel"

export const ChannelSchema = new EntitySchema<Channel>({
  name: "Channel",
  target: Channel,
  tableName: "channels",
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
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt),
    },
  },
})
