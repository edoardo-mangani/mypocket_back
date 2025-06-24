import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Utente Admin
    await User.create({
      fullName: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
      isActive: true,
      roleId: 1, // ADMIN
    })

    // 4 Utenti normali
    const users = [
      {
        fullName: 'Giulia Bianchi',
        email: 'giulia.bianchi@example.com',
        password: 'password123',
        isActive: true,
        roleId: 2, // USER
      },
      {
        fullName: 'Luca Verdi',
        email: 'luca.verdi@example.com',
        password: 'password123',
        isActive: true,
        roleId: 2, // USER
      },
      {
        fullName: 'Francesca Neri',
        email: 'francesca.neri@example.com',
        password: 'password123',
        isActive: true,
        roleId: 2, // USER
      },
      {
        fullName: 'Alessandro Ferrari',
        email: 'alessandro.ferrari@example.com',
        password: 'password123',
        isActive: false, // Un utente disattivato per testare
        roleId: 2, // USER
      },
    ]

    await User.createMany(users)
  }
}
