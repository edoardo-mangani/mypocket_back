import vine from '@vinejs/vine'

export const removeUsersWalletValidator = vine.compile(
  vine.object({
    userIds: vine.array(vine.number().positive()).minLength(1),
  })
)
