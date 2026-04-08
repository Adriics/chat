import { UserRepository } from "@Core/User/domain/UserRepository"
import { Email } from "@Core/User/domain/ValueObjects/Email"
import { Password } from "@Core/User/domain/ValueObjects/Password"
import { Criteria } from "@Shared/domain/Criteria/Criteria"
import { Filter } from "@Shared/domain/Criteria/Filter"
import { Filters } from "@Shared/domain/Criteria/Filters"
import { TokenGenerator } from "@Shared/domain/TokenGenerator"
import { LoginResponse } from "./LoginResponse"
import { InvalidCredentials } from "@Core/User/domain/Errors/InvalidCredentials"

export class Authenticator {
  constructor(
    private readonly repository: UserRepository,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  async run(email: Email, password: Password): Promise<LoginResponse> {
    const user = (
      await this.repository.search(
        new Criteria(
          new Filters([Filter.simple("email", "=", email.valueOf())]),
        ),
      )
    ).pop()

    if (!user) throw new InvalidCredentials(email.valueOf())

    const isValid = await Password.compare(password, user.password)

    if (!isValid) throw new InvalidCredentials(email.valueOf())

    const token = this.tokenGenerator.run({ id: user.id.valueOf() })
    console.log("token generado:", token)
    return new LoginResponse(token)
  }
}
