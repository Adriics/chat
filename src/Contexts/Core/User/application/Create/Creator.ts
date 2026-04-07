import { UserAlreadyExistsById } from "@Core/User/domain/Errors/UserAlreadyExistsById"
import { UserAlreadyExistsByEmail } from "@Core/User/domain/Errors/UserAlreadyExistsByEmail"
import { User } from "@Core/User/domain/User"
import { UserRepository } from "@Core/User/domain/UserRepository"
import { Email } from "@Core/User/domain/ValueObjects/Email"
import { Id } from "@Core/User/domain/ValueObjects/Id"
import { Name } from "@Shared/domain/SharedValueObjects/Name"
import { Password } from "@Core/User/domain/ValueObjects/Password"
import { Criteria } from "@Shared/domain/Criteria/Criteria"
import { Filter } from "@Shared/domain/Criteria/Filter"
import { Filters } from "@Shared/domain/Criteria/Filters"

export class Creator {
  constructor(private readonly repository: UserRepository) {}

  async run(id: Id, name: Name, email: Email, password: Password) {
    await this.checkIfUserExists(id, email)

    const hashedPassword = await Password.hash(password)
    const user = User.create(id, name, email, hashedPassword)

    await this.repository.persist(user)
  }

  private async checkIfUserExists(id: Id, email: Email) {
    const existingUserById = await this.repository.find(id)

    if (existingUserById) throw new UserAlreadyExistsById(existingUserById.id)

    const existingUserByEmail = (
      await this.repository.search(
        new Criteria(
          new Filters([Filter.simple("email", "=", email.valueOf())]),
        ),
      )
    ).pop()

    if (existingUserByEmail)
      throw new UserAlreadyExistsByEmail(existingUserByEmail.email)
  }
}
