import { Query } from "@Shared/domain/QueryBus/Query"

export class FindChannelByIdQuery implements Query {
  constructor(readonly id: string) {}
}
