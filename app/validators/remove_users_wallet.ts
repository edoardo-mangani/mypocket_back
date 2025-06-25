import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

// Custom validation rule per assicurarsi che il wallet mantenga almeno un utente
const walletMustHaveUser = vine.createRule(async (field: any) => {
  const { userId, walletId } = field.data as { userId: number; walletId: number }

  if (!userId || !walletId) {
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

  // Se c'è solo un utente associato e stiamo per rimuoverlo, blocca l'operazione
  if (currentUserCount <= 1) {
    field.report(
      "Non è possibile rimuovere l'ultimo utente associato al wallet. Un wallet deve avere almeno un utente collegato.",
      'walletMustHaveUser',
      field
    )
  }
})

export const removeUsersWalletValidator = vine.compile(
  vine
    .object({
      userIds: vine.array(vine.number().positive()).minLength(1),
      walletId: vine.number().positive(),
    })
    .use(walletMustHaveUser())
)
