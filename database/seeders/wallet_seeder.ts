import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Wallet from '#models/wallet'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Creo i wallet
    const wallets = await Wallet.createMany([
      {
        name: 'Portafoglio Personale',
        iconUrl: '💳',
      },
      {
        name: 'Wallet Famiglia',
        iconUrl: '👨‍👩‍👧‍👦',
      },
      {
        name: 'Risparmi Vacanze',
        iconUrl: '🏖️',
      },
      {
        name: 'Investimenti',
        iconUrl: '📈',
      },
      {
        name: 'Spese Casa',
        iconUrl: '🏠',
      },
    ])

    // Recupero tutti gli utenti attivi
    const users = await User.withoutTrashed().where('is_active', true)

    // Associo i wallet agli utenti
    // Wallet Personale - solo al primo utente
    await wallets[0].related('users').attach([users[0].id])

    // Wallet Famiglia - a primi 3 utenti
    await wallets[1].related('users').attach([users[0].id, users[1].id, users[2].id])

    // Risparmi Vacanze - a primi 2 utenti
    await wallets[2].related('users').attach([users[0].id, users[1].id])

    // Investimenti - solo al secondo utente
    if (users[1]) {
      await wallets[3].related('users').attach([users[1].id])
    }

    // Spese Casa - a tutti gli utenti attivi
    await wallets[4].related('users').attach(users.map((user) => user.id))
  }
}
