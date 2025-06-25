import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

// Custom validation rule per verificare che tutti gli utenti esistano
const checkUsersExist = vine.createRule(async (value, options, field) => {
  const userIds = value as number[]

  if (!Array.isArray(userIds)) {
    return
  }

  // Verifica che tutti gli userIds esistano nel database
  const existingUsersResult = await db
    .from('users')
    .whereIn('id', userIds)
    .whereNull('deleted_at')
    .select('id')

  const existingUsers = existingUsersResult.map((row) => row.id)

  const missingUserIds = userIds.filter((id) => !existingUsers.includes(id))

  if (missingUserIds.length > 0) {
    field.report(
      `Gli utenti con ID ${missingUserIds.join(', ')} non esistono`,
      'usersNotFound',
      field
    )
  }
})

// Custom validation rule per controllare che gli utenti non siano già associati al wallet
const checkUsersNotAlreadyAssociated = vine.createRule(async (value, options, field) => {
  const userIds = value as number[]

  // Ottieni il walletId dal contesto della richiesta
  const walletId = field.meta.walletId as number

  if (!walletId || !Array.isArray(userIds)) {
    return
  }

  // Controlla per ogni userId se è già associato al wallet
  for (const userId of userIds) {
    const existing = await db
      .from('user_wallets')
      .where('user_id', userId)
      .where('wallet_id', walletId)
      .whereNull('deleted_at')
      .first()

    if (existing) {
      field.report(
        `L'utente con ID ${userId} è già associato a questo wallet`,
        'userAlreadyAssociated',
        field
      )
      return // Ferma al primo errore
    }
  }
})

export const usersWalletValidator = vine.compile(
  vine.object({
    userIds: vine
      .array(vine.number().positive())
      .minLength(1)
      .use(checkUsersExist())
      .use(checkUsersNotAlreadyAssociated()),
  })
)
