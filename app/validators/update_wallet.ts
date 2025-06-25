import vine from '@vinejs/vine'

export const updateWalletValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    icon_url: vine.string().optional(),
  })
)
