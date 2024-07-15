import { defu } from 'defu'
import type { UseFetchOptions } from 'nuxt/app'

export const useLazyApi: typeof useLazyFetch = <T>(url: MaybeRefOrGetter<string>, options: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBaseUrl,
    key: toValue(url),
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useLazyFetch(url, params)
}
