import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

// Custom validation rule per controllare l'unicità della coppia userId + walletId
const uniqueUserWallet = vine.createRule(async (field: any) => {
  const { userId, walletId } = field.data as { userId: number; walletId: number }

  if (!userId || !walletId) {
    return
  }

  const existing = await db
    .from('user_wallets')
    .where('user_id', userId)
    .where('wallet_id', walletId)
    .whereNull('deleted_at') // Considera solo i record non soft-deleted
    .first()

  if (existing) {
    field.report("L'utente è già associato a questo wallet", 'uniqueUserWallet', field)
  }
})

export const userWalletValidator = vine.compile(
  vine
    .object({
      userId: vine.number().positive(),
      walletId: vine.number().positive(),
    })
    .use(uniqueUserWallet())
)
