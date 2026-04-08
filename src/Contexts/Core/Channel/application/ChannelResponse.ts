import { Channel } from "../domain/Channel"
import { QueryResponse } from "@Shared/domain/QueryBus/QueryResponse"

export type ChannelResponseBody = {
  readonly id: string
  readonly name: string
  readonly createdAt: Date
}

export class ChannelResponse implements QueryResponse<ChannelResponseBody> {
  response: ChannelResponseBody

  constructor(channel: Channel) {
    this.response = {
      id: channel.id.valueOf(),
      name: channel.name.valueOf(),
      createdAt: channel.createdAt.valueOf(),
    }
  }
}
