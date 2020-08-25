
// // var CACHE_NAME = 'pwa-task-manager';
// // var urlsToCache = [
// //   '/',
// //   '/completed'
// // ];

// // // var urlsToCache = [
// // //     'index.html',
// // //     'offline.html'
// // // ]

// // // Install a service worker
// // self.addEventListener('install', event => {
// //   // Perform install steps
// //   event.waitUntil(
// //     caches.open(CACHE_NAME)
// //       .then(function(cache) {
// //         console.log('Opened cache');
// //         return cache.addAll(urlsToCache);
// //       })
// //   );
// // });

// // // Cache and return requests
// // self.addEventListener('fetch', event => {
// //   event.respondWith(
// //     caches.match(event.request)
// //       .then(function(response) {
// //         // Cache hit - return response
// //         if (response) {
// //           return response;
// //         }
// //         return fetch(event.request);
// //       }
// //     )
// //   );
// // });

// // // Update a service worker
// // self.addEventListener('activate', event => {
// //   var cacheWhitelist = ['pwa-task-manager'];
// //   event.waitUntil(
// //     caches.keys().then(cacheNames => {
// //       return Promise.all(
// //         cacheNames.map(cacheName => {
// //           if (cacheWhitelist.indexOf(cacheName) === -1) {
// //             return caches.delete(cacheName);
// //           }
// //         })
// //       );
// //     })
// //   );
// // });

// // // This optional code is used to register a service worker.
// // // register() is not called by default.

// // // This lets the app load faster on subsequent visits in production, and gives
// // // it offline capabilities. However, it also means that developers (and users)
// // // will only see deployed updates on subsequent visits to a page, after all the
// // // existing tabs open on the page have been closed, since previously cached
// // // resources are updated in the background.

// // // To learn more about the benefits of this model and instructions on how to
// // // opt-in, read https://bit.ly/CRA-PWA

const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});



  
