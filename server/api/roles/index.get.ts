import { useRoleCrud } from '@/server/composables/useRoleCrud'

export default defineEventHandler(async (event) => {
  try {
    await defineEventOptions(event, { auth: false })

    const { getRolesPaginated } = useRoleCrud()

    const sysRoles = await getRolesPaginated(getFilter(event))

    return sysRoles
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
})
