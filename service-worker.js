const CACHE_NAME = "monitor-red-v5";


const archivos = [

    "/",

    "/index.html",

    "/style.css",

    "/app.js",

    "/manifest.json",

    "/icons/icon-192.png"

];



self.addEventListener("install", event => {


    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            return cache.addAll(archivos);

        })

    );


});



self.addEventListener("activate", event => {


    event.waitUntil(

        caches.keys()
        .then(keys => {


            return Promise.all(

                keys.map(key => {


                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }


                })

            );


        })

    );


});



self.addEventListener("fetch", event => {


    event.respondWith(

        caches.match(event.request)
        .then(response => {


            return response || fetch(event.request);


        })

    );


});