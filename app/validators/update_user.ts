import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().optional(),
    password: vine.string().minLength(8).optional(),
    fullName: vine.string().trim().minLength(2).optional(),
    roleId: vine.number().positive().optional(),
  })
)
