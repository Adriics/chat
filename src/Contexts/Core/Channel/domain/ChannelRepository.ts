import { Nullable } from "@Shared/domain/Nullable"
import { Channel } from "./Channel"
import { Criteria } from "@Shared/domain/Criteria/Criteria"
import { Id } from "./ValueObjects/Id"

export interface ChannelRepository {
  find(id: Id): Promise<Nullable<Channel>>
  search(criteria: Criteria): Promise<Array<Channel>>
  persist(channel: Channel): Promise<void>
}
