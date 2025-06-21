import TransactionTypology from '#models/transaction_typology'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await TransactionTypology.createMany([
      { name: 'Entrata', order: 1 },
      { name: 'Uscita', order: 2 },
    ])
  }
}
