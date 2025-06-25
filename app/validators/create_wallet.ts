import vine from '@vinejs/vine'

export const createWalletValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    iconUrl: vine.string().trim().optional(),
    userIds: vine.array(vine.number().positive()).minLength(1),
  })
)
