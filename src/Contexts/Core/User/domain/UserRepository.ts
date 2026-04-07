import { Nullable } from "@Shared/domain/Nullable"
import { User } from "./User"
import { Criteria } from "@Shared/domain/Criteria/Criteria"
import { Id } from "./ValueObjects/Id"

export interface UserRepository {
  find(id: Id): Promise<Nullable<User>>
  search(criteria: Criteria): Promise<Array<User>>
  persist(user: User): Promise<void>
}
