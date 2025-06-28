import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    iconUrl: vine.string().trim().optional(),
    walletId: vine.number().positive(),
  })
)
