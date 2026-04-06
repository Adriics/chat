import { InvalidArgumentError } from '../ValueObjects/InvalidArgumentError'

export class NotAuthorized extends InvalidArgumentError {
  code = 'not-authorized'
}
