import { Channel } from "@Core/Channel/domain/Channel"
import { ChannelRepository } from "@Core/Channel/domain/ChannelRepository"
import { TypeOrmRepository } from "@Shared/infrastructure/persistence/typeorm/TypeOrmRepository"
import { EntitySchema, Equal } from "typeorm"
import { ChannelSchema } from "./entity/ChannelSchema"
import { Id } from "@Core/Channel/domain/ValueObjects/Id"
import { Nullable } from "@Shared/domain/Nullable"
import { Criteria } from "@Shared/domain/Criteria/Criteria"

export class TypeOrmChannelRepository
  extends TypeOrmRepository<Channel>
  implements ChannelRepository
{
  protected get entitySchema(): EntitySchema {
    return ChannelSchema
  }

  async find(id: Id): Promise<Nullable<Channel>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search(criteria: Criteria): Promise<Channel[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist(Channel: Channel): Promise<void> {
    await (await this.repository()).save(Channel)
  }
}
