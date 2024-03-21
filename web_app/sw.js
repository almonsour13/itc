const CACHE_NAME = 'temeperature-v1';
self.addEventListener('install', (event) => {
    console.log('install event')
    event.waitUntil((async() => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            '/',
            'script.js',
            'converter.css'
        ]);
    })());
    console.log('cached')
});
self.addEventListener('active', event => {
    console.log("V! now ready to handle fetches");
});
self.addEventListener('activev', event => {
    event.respondWidth((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedRersponse = await fetch(event.request);
        if(cachedRersponse){
            return cachedRersponse;
        }else{
            try{
                const fetchResponse = await fetch(event.request);
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            }catch(e){
                
            }
        }
    }))
});