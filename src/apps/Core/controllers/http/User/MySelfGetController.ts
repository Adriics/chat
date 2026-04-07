import { Request, Response } from "express"
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus"
import { TokenDecoder } from "@Shared/domain/TokenDecoder/TokenDecoder"
import { FindUserByIdQuery } from "@Core/User/application/FindById/FindUserByIdQuery"
import { UserResponse } from "@Core/User/application/UserResponse"
import { Controller } from "./@types/Controller"
import { CannotDecode } from "@Shared/domain/TokenDecoder/Errors/CannotDecode"

export class MySelfGetController implements Controller {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly decoder: TokenDecoder,
  ) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const query = new FindUserByIdQuery(data.id)

      const user = (await this.queryBus.ask<UserResponse>(query)).response

      return res.status(200).json(user)
    } catch (e) {
      console.log("MyselfGetController error:", e)
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
