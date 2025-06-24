import { UserDTO } from '#contracts/user_contract'

export interface AuthResponseDTO {
  user: UserDTO
  token: string
}
