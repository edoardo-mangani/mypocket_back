import { RolesEnum } from '#enums/roles_enum'

export interface RoleDTO {
  id: number
  name: RolesEnum
  label: string
}
