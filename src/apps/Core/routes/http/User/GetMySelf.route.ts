import { Request, Response, Router } from "express"
import DI from "@Apps/Core/dependencyInjection/DI"
import { MySelfGetController } from "@Apps/Core/controllers/http/User/MySelfGetController"

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<MySelfGetController>(
    "Apps.Core.Controllers.MySelfGetController",
  )
  router.get("/v1/me", (req: Request, res: Response) =>
    controller.run(req, res),
  )
}
