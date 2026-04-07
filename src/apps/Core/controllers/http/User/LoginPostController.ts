import { Request, Response } from "express"
import { UserAlreadyExistsByEmail } from "@Core/User/domain/Errors/UserAlreadyExistsByEmail"
import { UserAlreadyExistsById } from "@Core/User/domain/Errors/UserAlreadyExistsById"
import { Controller } from "./@types/Controller"
import { LoginUserQuery } from "@Core/User/application/Login/LoginUserQuery"
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus"
import { LoginResponse } from "@Core/User/application/Login/LoginResponse"

export class LoginPostController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const query = new LoginUserQuery(req.body.email, req.body.password)

      const result = await this.queryBus.ask<LoginResponse>(query)
      console.log("result:", result)
      console.log("result.response:", result.response)

      return res.status(200).json(result.response)
    } catch (e) {
      console.log("Error en LoginPostController", e)
      if (e instanceof UserAlreadyExistsById)
        return res.status(400).send(e.getMessage())
      if (e instanceof UserAlreadyExistsByEmail)
        return res.status(400).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
