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

    // Associo i wallet agli utenti con timestamp
    const now = new Date()

    // Wallet Personale - solo al primo utente
    await wallets[0].related('users').attach({
      [users[0].id]: { created_at: now, updated_at: now },
    })

    // Wallet Famiglia - a primi 3 utenti
    await wallets[1].related('users').attach({
      [users[0].id]: { created_at: now, updated_at: now },
      [users[1].id]: { created_at: now, updated_at: now },
      [users[2].id]: { created_at: now, updated_at: now },
    })

    // Risparmi Vacanze - a primi 2 utenti
    await wallets[2].related('users').attach({
      [users[0].id]: { created_at: now, updated_at: now },
      [users[1].id]: { created_at: now, updated_at: now },
    })

    // Investimenti - solo al secondo utente
    if (users[1]) {
      await wallets[3].related('users').attach({
        [users[1].id]: { created_at: now, updated_at: now },
      })
    }

    // Spese Casa - a tutti gli utenti attivi
    const allUsersData: Record<number, { created_at: Date; updated_at: Date }> = {}
    users.forEach((user) => {
      allUsersData[user.id] = { created_at: now, updated_at: now }
    })
    await wallets[4].related('users').attach(allUsersData)
  }
}
