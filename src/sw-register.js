if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js', {
      scope: '/'
    })
    .then(registration => {
      console.log('Service worker registration completed');
    })
    .catch(err => console.log('service worker registration failed:', err));
}
