import { UserDTO } from '#contracts/user_contract'
import User from '#models/user'
import { roleTransformer } from '#transformers/role_transformer'
import { walletTransformer } from '#transformers/wallet_transformer'

export function userTransformer(model: User): UserDTO {
  return {
    id: model.id,
    fullName: model.fullName,
    email: model.email,
    role: roleTransformer(model.role),
    wallets: model.wallets.map(walletTransformer),
  }
}
