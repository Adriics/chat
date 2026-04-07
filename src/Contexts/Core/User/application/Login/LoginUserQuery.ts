import { Query } from "@Shared/domain/QueryBus/Query"

export class LoginUserQuery implements Query {
  constructor(
    readonly email: string,
    readonly password: string,
  ) {}
}
