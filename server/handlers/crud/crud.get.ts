import { eq } from 'drizzle-orm'
import type { PgTable } from 'drizzle-orm/pg-core'
import type { EventHandlerRequest, H3Event } from 'h3'

export function _CrudGetHandler<T extends PgTable>(schema: T, event: H3Event<EventHandlerRequest>) {
  const id = getRouterParam(event, 'id')

  return db.select().from(schema).where(
    eq((schema as any).id, id),
  )
}
