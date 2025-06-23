import Wallet from '#models/wallet'
import { WalletDTO } from '#contracts/wallets_contract'
//import { Auth } from '@adonisjs/auth/services/auth'

export class WalletsService {
  async getAllForUser(): Promise<Wallet[]> {
    //const user = await Auth.getUser()
    const user = { id: 1 }
    return (await Wallet.withoutTrashed()
      .where('user_id', user.id)
      .orderBy('name', 'asc')) as Wallet[]
  }

  async getById(id: number): Promise<Wallet> {
    return await Wallet.query().where('id', id).firstOrFail()
  }

  async create(data: WalletDTO): Promise<Wallet> {
    return await Wallet.create(data)
  }

  async update(id: number, data: WalletDTO): Promise<Wallet> {
    const wallet = await Wallet.findOrFail(id)
    wallet.merge(data)
    await wallet.save()
    return wallet
  }

  async delete(id: number): Promise<void> {
    const wallet = await Wallet.findOrFail(id)
    await wallet.softDelete()
  }
}
