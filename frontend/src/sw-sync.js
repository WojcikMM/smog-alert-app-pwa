class AirIndexSyncWorker {

  init() {
    this.listenPeriodicSync();
    this.registerServiceWorker();
  }

  listenPeriodicSync() {
    self.addEventListener('periodicsync', async event => {
      console.log('periodic sync type:', event.type);
    });
  }

  registerServiceWorker() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations()
        .then(() => navigator.serviceWorker.ready)
        .then(registration => {
          if (registration.periodicSync) {
            registration.periodicSync.register('content-sync', {
              minInterval: 5000
            });
          } else {
            console.log('Periodic sync not available');
          }
        })
    }
  }
}

self.addEventListener('activate', () => {
  const sw = new AirIndexSyncWorker();
  sw.init();
});


