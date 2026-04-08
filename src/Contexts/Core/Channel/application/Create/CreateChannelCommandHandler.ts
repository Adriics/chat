import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler"
import { CreateChannelCommand } from "./CreateChannelCommand"
import { Command } from "@Shared/domain/CommandBus/Command"
import { Creator } from "./Creator"
import { Id } from "@Core/User/domain/ValueObjects/Id"
import { Name } from "@Core/Channel/domain/ValueObjects/Name"

export class CreateChannelCommandHandler implements CommandHandler<CreateChannelCommand> {
  constructor(private readonly creator: Creator) {}

  subscribedTo(): Command {
    return CreateChannelCommand
  }

  async handle(command: CreateChannelCommand): Promise<void> {
    await this.creator.run(new Id(command.id), new Name(command.name))
  }
}
