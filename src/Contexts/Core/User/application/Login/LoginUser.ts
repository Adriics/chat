import { UserRepository } from "@Core/User/domain/UserRepository"
import { Email } from "@Core/User/domain/ValueObjects/Email"
import { Password } from "@Core/User/domain/ValueObjects/Password"
import { Criteria } from "@Shared/domain/Criteria/Criteria"
import { Filter } from "@Shared/domain/Criteria/Filter"
import { Filters } from "@Shared/domain/Criteria/Filters"
import { UserNotFoundByEmail } from "@Core/User/domain/Errors/UserNotFoundByEmail"
import { InvalidPassword } from "@Core/User/domain/Errors/InvalidPassword"

export class LoginUser {
  constructor(private readonly repository: UserRepository) {}

  async run(email: Email, password: Password) {
    const user = await this.findUserByEmail(email)

    if (!user) throw new UserNotFoundByEmail(email)

    const isPasswordValid = await Password.compare(password, user.password)

    if (!isPasswordValid) throw new InvalidPassword()

    return user
  }

  private async findUserByEmail(email: Email) {
    const users = await this.repository.search(
      new Criteria(new Filters([Filter.simple("email", "=", email.valueOf())])),
    )

    return users.pop()
  }
}
