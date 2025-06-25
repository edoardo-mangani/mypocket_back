import Wallet from '#models/wallet'
import { WalletDTO } from '#contracts/wallet_contract'

export function walletTransformer(model: Wallet): WalletDTO {
  return {
    id: model.id,
    name: model.name,
    iconUrl: model.iconUrl,
  }
}
