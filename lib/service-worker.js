self.addEventListener('push', event => {
  const payload = event.data ? event.data.text() : 'nope'

  event.waitUntil(
    self.registration.showNotification('Notification', {
      body: payload,
    })
  )
})
