import { QueryResponse } from "@Shared/domain/QueryBus/QueryResponse"

export type LoginResponseBody = {
  token: string
}

export class LoginResponse implements QueryResponse<LoginResponseBody> {
  response: LoginResponseBody

  constructor(token: string) {
    this.response = { token }
  }
}
