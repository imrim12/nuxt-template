import type { Tables } from '@/server/types/supabase'

type Notification = Tables<'sys_notifications'>

export default defineEventHandler(async (event) => {
  const session = await setAuthOnlyRoute(event)

  const uuid = getUuid(event, 'Missing UUID to get data')

  const notification = await readBody<Notification>(event)

  const { data, error } = await supabaseAdmin.from('sys_notifications')
    .update(notification)
    .match({
      id: uuid,
      user_id: session.user!.id!,
    })
    .select()
    .maybeSingle()

  if (error)
    setResponseStatus(event, 400, error.message)
  else
    setResponseStatus(event, 200)

  return { data }
})