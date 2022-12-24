if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceworker.js').then(registration => {
      console.log('Service worker registered: ', registration);
    }).catch(error => {
      console.log('Service worker registration failed: ', error);
    });
  });
}


// This code creates a button that the user can click to reset the cache
// const resetButton = document.getElementById('reset-button');
// resetButton.addEventListener('click', () => {
//   caches.delete('my-cache');
// });