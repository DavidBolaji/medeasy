/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
self.addEventListener('push', function (event) {
  console.log('Received push event:', event);
  const {
    title,
    body,
    url
  } = JSON.parse(event.data.text()); // Extract URL

  if (event.data) {
    const options = {
      body,
      icon: '/icon.png',
      vibrate: [100, 50, 100],
      data: {
        url,
        // Include the URL in notification data
        dateOfArrival: Date.now(),
        primaryKey: '2'
      }
    };
    event.waitUntil(self.registration.showNotification(title, options));
  }
});
self.addEventListener('notificationclick', async e => {
  e.notification.close();
  const urlToOpen = e.notification.data.url || '/';
  e.waitUntil(clients.matchAll({
    type: 'window'
  }).then(clientList => {
    for (const client of clientList) {
      if (client.url === urlToOpen && 'focus' in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(urlToOpen);
  }));
});
/******/ })()
;