import { RoleDTO } from '#contracts/role_contract'
import Role from '#models/role'
import { rolesLabels } from '#enums/roles_enum'

export function roleTransformer(model: Role): RoleDTO {
  return {
    id: model.id,
    name: model.name,
    label: rolesLabels[model.name],
  }
}
