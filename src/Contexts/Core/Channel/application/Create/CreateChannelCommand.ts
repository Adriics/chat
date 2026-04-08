import { Command } from "@Shared/domain/CommandBus/Command"

export class CreateChannelCommand implements Command {
  constructor(
    readonly id: string,
    readonly name: string,
  ) {}
}
