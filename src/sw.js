const VERSION = 'v2';
function log(messages) {
  console.log(VERSION, messages);
}

log('Installing Service Worker');

self.addEventListener('install', () => {
  log('Version is installed');

});

self.addEventListener('activate', () => {
  log('Version is activated');
});
