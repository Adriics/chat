import { Request, Response } from "express"
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { CreateUserCommand } from "@Core/User/application/Create/CreateUserCommand"
import { UserAlreadyExistsByEmail } from "@Core/User/domain/Errors/UserAlreadyExistsByEmail"
import { UserAlreadyExistsById } from "@Core/User/domain/Errors/UserAlreadyExistsById"
import { Controller } from "./@types/Controller"

export class RegisterPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const id = String(req.body.id)
      const name = String(req.body.name)
      const email = String(req.body.email)
      const password = String(req.body.password)

      const command = new CreateUserCommand(id, name, email, password)

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      console.log("Error en RegisterPostController", e)
      if (e instanceof UserAlreadyExistsById)
        return res.status(400).send(e.getMessage())
      if (e instanceof UserAlreadyExistsByEmail)
        return res.status(400).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
