export function notify(message: string, options?: NotifyOptions) {
  const notificationStore = useNotificationStore()

  notificationStore.showNotification(message, options)

  function hide() {
    notificationStore.hideNotification()
  }

  return {
    /**
     * Alias for `hideNotification`
     */
    hide,
    hideNotification: hide,
  }
}