export default defineEventHandler(async (event) => {
  const { uuid } = await defineEventOptions(event, { auth: true, detail: true })

  const { data: user } = await supabase.from('sys_users').select().eq('id', uuid).maybeSingle()

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not found',
    })
  }

  return user
})