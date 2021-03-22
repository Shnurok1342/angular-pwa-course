const VERSION = 'v4';

log('Installing Service Worker');

self.addEventListener('install', event => event.waitUntil(installServiceWorker()));

self.addEventListener('activate', () => {
  log('version is activated');
});

async function installServiceWorker() {
  log("Service Worker installation started ");
  const request = new Request('offline.html');
  const response = await fetch(request);
  log("response received after loading offline.html", response);
  if (response.status !== 200) {
    throw new Error('Could not load offline page!');
  }
  const cache = await caches.open('app-cache');
  cache.put(request, response);
  log("Cached offline.html");
}

function log(message, ...data) {
  if (data.length > 0) {
    console.log(VERSION, message, data);
  } else {
    console.log(message);
  }
}
