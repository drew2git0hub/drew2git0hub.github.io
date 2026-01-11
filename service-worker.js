const CACHE_NAME = 'vtools-cache-v1.2.1'; // 캐시 이름 업데이트
const urlsToCache = [
  '/index.html',
  '/styles/main.css',
  '/scripts/app.js',
  '/icons/VTools.png',
  '/icons/VTools512.png',
];

self.addEventListener('install', event => {
  self.skipWaiting(); // 즉시 활성화
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }).catch(err => {
      console.error('❌ 캐시 실패:', err);
    })
  );
});

self.addEventListener('activate', event => {
  clients.claim(); // 모든 탭에 적용
  event.waitUntil(
    (async () => {
      const clientsList = await clients.matchAll({ type: 'window' });
      for (const client of clientsList) {
        client.postMessage({ type: 'UPDATE_AVAILABLE' });
      }
    })()
  );
});

// 활성화 단계: 이전 캐시 정리
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

// 요청 가로채기: 캐시 우선, 없으면 네트워크
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});