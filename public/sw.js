self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/icon1.png',
      badge: '/badge.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
        url: data.url || '/', // Store the URL to open when clicked
      },
    }

    // ref: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.')
  event.notification.close()

  // Get the URL from notification data, or use origin as fallback
  const urlToOpen = event.notification.data.url || self.location.origin
  event.waitUntil(clients.openWindow(urlToOpen))
})
