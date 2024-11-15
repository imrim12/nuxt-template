import { useNotificationCrud } from '@base/server/composables/useNotificationCrud'

export default defineEventHandler(async (event) => {
  try {
    const { userId, notificationId } = await defineEventOptions(event, { auth: true, params: ['userId', 'notificationId'] })

    const queryRestrict = { user_id: userId }
    const { updateNotificationById } = useNotificationCrud(queryRestrict)

    const body = await readBody(event)

    if (body && body.read_at) {
      body.read_at = new Date(body.read_at)
    }

    const data = await updateNotificationById(notificationId, body)

    setResponseStatus(event, 200)

    return data
  }
  catch (error: any) {
    throw parseError(error)
  }
})
