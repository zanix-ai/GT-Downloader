self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // optional: bisa di-cache kalau mau offline support
});
