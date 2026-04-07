export class InvalidPassword extends Error {
  constructor() {
    super("Invalid password")
    this.name = "InvalidPassword"
  }
}
