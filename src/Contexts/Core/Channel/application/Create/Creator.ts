import { Id } from "@Core/Channel/domain/ValueObjects/Id"
import { ChannelRepository } from "@Core/Channel/domain/ChannelRepository"
import { ChannelAlreadyExistsById } from "@Core/Channel/domain/Errors/ChannelAlreadyExistsById"
import { Channel } from "@Core/Channel/domain/Channel"
import { Name } from "@Core/Channel/domain/ValueObjects/Name"

export class Creator {
  constructor(private readonly repository: ChannelRepository) {}

  async run(id: Id, name: Name) {
    await this.checkIfChannelExists(id)

    const channel = Channel.create(id, name)

    await this.repository.persist(channel)
  }

  private async checkIfChannelExists(id: Id) {
    const existingChannel = await this.repository.find(id)

    if (existingChannel) throw new ChannelAlreadyExistsById(existingChannel.id)
  }
}
