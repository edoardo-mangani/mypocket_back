import { RoleDTO } from '#contracts/roles_contract'

export interface UserDTO {
  id: number
  fullName: string | null
  email: string
  role?: RoleDTO
}
