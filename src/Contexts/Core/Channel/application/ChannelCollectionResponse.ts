import { Channel } from "../domain/Channel"
import { QueryResponse } from "@Shared/domain/QueryBus/QueryResponse"
import { ChannelResponse, ChannelResponseBody } from "./ChannelResponse"

export class ChannelCollectionResponse implements QueryResponse<
  Array<ChannelResponseBody>
> {
  response: Array<ChannelResponseBody>

  constructor(channel: Array<Channel>) {
    this.response = channel.map((x) => new ChannelResponse(x).response)
  }
}
