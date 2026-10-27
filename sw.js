'use strict';
const CACHE_PREFIX='tabbed-slides-shell-';
const CACHE=CACHE_PREFIX+'v1-9-alpha';
const ASSETS=['index.html','manifest.webmanifest','spell/spell-worker.js','spell/dicts/engreek.aff','spell/dicts/engreek.dic','spell/dicts/orthos.aff','spell/dicts/orthos.dic.gz','spell/dicts/tr.aff','spell/dicts/tr.dic','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','icons/favicon.svg','icons/favicon-32.png','icons/favicon-16.png','favicon.ico','third-party-licenses.txt','vendor/pptxgen.bundle.js','fonts/literata-cyrillic-400-italic.woff2','fonts/literata-cyrillic-400-normal.woff2','fonts/literata-cyrillic-700-italic.woff2','fonts/literata-cyrillic-700-normal.woff2','fonts/literata-cyrillic-ext-400-italic.woff2','fonts/literata-cyrillic-ext-400-normal.woff2','fonts/literata-cyrillic-ext-700-italic.woff2','fonts/literata-cyrillic-ext-700-normal.woff2','fonts/literata-greek-400-italic.woff2','fonts/literata-greek-400-normal.woff2','fonts/literata-greek-700-italic.woff2','fonts/literata-greek-700-normal.woff2','fonts/literata-greek-ext-400-italic.woff2','fonts/literata-greek-ext-400-normal.woff2','fonts/literata-greek-ext-700-italic.woff2','fonts/literata-greek-ext-700-normal.woff2','fonts/literata-latin-400-italic.woff2','fonts/literata-latin-400-normal.woff2','fonts/literata-latin-700-italic.woff2','fonts/literata-latin-700-normal.woff2','fonts/literata-latin-ext-400-italic.woff2','fonts/literata-latin-ext-400-normal.woff2','fonts/literata-latin-ext-700-italic.woff2','fonts/literata-latin-ext-700-normal.woff2','fonts/literata-vietnamese-400-italic.woff2','fonts/literata-vietnamese-400-normal.woff2','fonts/literata-vietnamese-700-italic.woff2','fonts/literata-vietnamese-700-normal.woff2'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(name=>new Request(name,{cache:'reload'})))))});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(CACHE_PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim()})())});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  const scope=new URL(self.registration.scope);
  const rel=url.pathname.slice(scope.pathname.length);
  if(!(rel===''||ASSETS.includes(rel)||rel.startsWith('fonts/')))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(request);
    if(cached)return cached;
    try{const response=await fetch(request);if(response.ok)cache.put(request,response.clone());return response}
    catch(e){return new Response('Connect to the internet once so the app can be saved for offline use.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}})}
  })());
});
