import { RoleDTO } from '#contracts/role_contract'
export interface UserDTO {
  id: number
  fullName: string | null
  email: string
  role: RoleDTO
}
