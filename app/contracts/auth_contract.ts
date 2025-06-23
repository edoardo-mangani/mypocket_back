import { UserDTO } from '#contracts/users_contract'

export interface AuthResponseDTO {
  user: UserDTO
  token: string
}
