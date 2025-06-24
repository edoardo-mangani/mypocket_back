import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
    fullName: vine.string().optional(),
    roleId: vine.number().optional(),
  })
)
