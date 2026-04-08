import { QueryHandler } from "@Shared/domain/QueryBus/QueryHandler"
import { FindChannelByIdQuery } from "./FindChannelByIdQuery"
import { ChannelResponse } from "../ChannelResponse"
import { FinderById } from "./FinderById"
import { Query } from "@Shared/domain/QueryBus/Query"
import { Id } from "@Core/User/domain/ValueObjects/Id"

export class FindChannelByIdQueryHandler implements QueryHandler<
  FindChannelByIdQuery,
  ChannelResponse
> {
  constructor(private readonly finder: FinderById) {}

  subscribedTo(): Query {
    return FindChannelByIdQuery
  }

  async handle(data: FindChannelByIdQuery): Promise<ChannelResponse> {
    return new ChannelResponse(await this.finder.find(new Id(data.id)))
  }
}
