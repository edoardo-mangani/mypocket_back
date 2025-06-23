import { UserDTO } from '#contracts/users_contract'
import User from '#models/user'
import { roleTransformer } from '#transformers/roles_transformer'

export function userTransformer(model: User): UserDTO {
  return {
    id: model.id,
    fullName: model.fullName,
    email: model.email,
    role: model.role ? roleTransformer(model.role) : undefined,
  }
}
