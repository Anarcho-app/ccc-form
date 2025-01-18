import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst } from 'workbox-strategies'

// Precache static resources
precacheAndRoute(self.__WB_MANIFEST)

// Cache dynamic data
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new NetworkFirst({
    cacheName: 'api-cache'
  })
)

// Handle offline submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-census') {
    event.waitUntil(syncData())
  }
})

async function syncData() {
  const db = await openDB('census-mesh', 1)
  const unsynced = await db.getAllFromIndex('sync', 'synced', false)
  // Sync data when back online
}
