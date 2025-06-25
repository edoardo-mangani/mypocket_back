import vine from '@vinejs/vine'

export const usersWalletValidator = vine.compile(
  vine.object({
    userIds: vine.array(vine.number().positive()).minLength(1),
  })
)
