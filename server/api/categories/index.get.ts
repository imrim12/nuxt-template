export default defineEventHandler(async (event) => {
  const session = await setAuthOnlyRoute(event)

  const { keyword = '', keywordLower = '', sortBy, sortAsc = true, limit = 10, page = 1 } = getFilter(event)

  const { data, error } = await supabaseAdmin.from('categories')
    .select('*', { count: 'exact', head: true })
    .match({
      user_id: session.user!.id!,
    })
    .or(`name.ilike.${keyword || ''},name.ilike.${keywordLower || ''}`)
    .order(sortBy, { ascending: sortAsc })
    .range(page - 1, (page - 1) + limit)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return data
})
