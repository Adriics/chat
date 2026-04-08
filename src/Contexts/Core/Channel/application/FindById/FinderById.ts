import { Id } from "@Core/User/domain/ValueObjects/Id"
import { ChannelRepository } from "@Core/Channel/domain/ChannelRepository"
import { ChannelNotFound } from "@Core/Channel/domain/Errors/ChannelNotFound"
import { Channel } from "@Core/Channel/domain/Channel"

export class FinderById {
  constructor(private readonly repository: ChannelRepository) {}

  async find(id: Id): Promise<Channel> {
    const channel = await this.repository.find(id)

    if (!channel) throw new ChannelNotFound(id)

    return channel
  }
}
