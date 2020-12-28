(async function () {

  self.addEventListener('periodicsync', async event => {
    console.log('periodic sync type:', event.type);
  });

  const registration = await navigator.serviceWorker.ready;
  if ('periodicSync' in registration) {
    try {
      await registration.periodicSync.register('content-sync', {
        // An interval of one day.
        minInterval: 5000,
      });
    } catch (error) {
      console.error('error', error);
      // Periodic background sync cannot be used.
    }
  }

})();
