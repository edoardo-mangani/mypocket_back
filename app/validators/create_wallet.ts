import vine from '@vinejs/vine'

export const createWalletValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    icon_url: vine.string().optional(),
  })
)
