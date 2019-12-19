if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/rnd/pwa/sw.js')
        .then((res)=> console.log('service worker registered', res))
        .catch((err) => console.log('service worker not register' , err));
}
