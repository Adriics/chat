import { User } from "./User"

export interface UserRepository {
  find(id: Id): Promise<Nullable<User>>
  search(criteria: Criteria): Promise<Array<User>>
  persist(user: User): Promise<void>
}
