import { RoleDTO } from '#contracts/role_contract'
import { WalletDTO } from '#contracts/wallet_contract'

export interface UserDTO {
  id: number
  fullName: string | null
  email: string
  role: RoleDTO
  wallets: WalletDTO[]
}
