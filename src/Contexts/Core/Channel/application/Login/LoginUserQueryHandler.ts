import { QueryHandler } from "@Shared/domain/QueryBus/QueryHandler"
import { LoginResponse } from "./LoginResponse"
import { Authenticator } from "./Authenticator"
import { Email } from "@Core/User/domain/ValueObjects/Email"
import { Password } from "@Core/User/domain/ValueObjects/Password"
import { LoginUserQuery } from "./LoginUserQuery"

export class LoginUserQueryHandler implements QueryHandler<
  LoginUserQuery,
  LoginResponse
> {
  constructor(private readonly authenticator: Authenticator) {}

  subscribedTo(): any {
    return LoginUserQuery
  }

  async handle(query: LoginUserQuery): Promise<LoginResponse> {
    return await this.authenticator.run(
      new Email(query.email),
      new Password(query.password),
    )
  }
}
