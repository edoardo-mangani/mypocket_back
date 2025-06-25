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

// Custom validation rule per assicurarsi che il wallet mantenga almeno un utente
const checkWalletKeepsUsers = vine.createRule(async (value, options, field) => {
  const userIds = value as number[]

  // Ottieni il walletId dal contesto della richiesta
  const walletId = field.meta.walletId as number

  if (!walletId || !Array.isArray(userIds)) {
    return
  }

  // Conta quanti utenti sono attualmente associati a questo wallet (escludendo soft delete)
  const userCount = await db
    .from('user_wallets')
    .where('wallet_id', walletId)
    .whereNull('deleted_at')
    .count('* as total')
    .first()

  const currentUserCount = (userCount?.total as number) || 0

  // Se stiamo per rimuovere tutti o quasi tutti gli utenti, blocca l'operazione
  if (currentUserCount - userIds.length < 1) {
    field.report(
      'Non è possibile rimuovere tutti gli utenti associati al wallet. Un wallet deve avere almeno un utente collegato.',
      'walletMustHaveUsers',
      field
    )
  }
})

export const removeUsersWalletValidator = vine.compile(
  vine.object({
    userIds: vine
      .array(vine.number().positive())
      .minLength(1)
      .use(checkUsersExist())
      .use(checkWalletKeepsUsers()),
  })
)
