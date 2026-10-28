'use strict';
/* Offline support: everything the app needs is saved on the first online visit.
   The page itself is stored under the site address (./), because Cloudflare Pages
   redirects index.html to / and a redirected page cannot be served offline. */
const CACHE_PREFIX='tabbed-slides-shell-';
const CACHE=CACHE_PREFIX+'v2-0-1';
const SHELL=new URL('./',self.registration.scope).href;
const ASSETS=['manifest.webmanifest','spell/spell-worker.js','spell/dicts/engreek.aff','spell/dicts/engreek.dic','spell/dicts/orthos.aff','spell/dicts/orthos.dic.gz','spell/dicts/tr.aff','spell/dicts/tr.dic','icons/tabbed-slides-192.png','icons/tabbed-slides-512.png','icons/tabbed-slides-180.png','icons/tabbed-slides.svg','icons/tabbed-slides-32.png','icons/tabbed-slides-16.png','icons/tabbed-slides.ico','favicon.ico','third-party-licenses.txt','vendor/pptxgen.bundle.js','fonts/literata-cyrillic-400-italic.woff2','fonts/literata-cyrillic-400-normal.woff2','fonts/literata-cyrillic-700-italic.woff2','fonts/literata-cyrillic-700-normal.woff2','fonts/literata-cyrillic-ext-400-italic.woff2','fonts/literata-cyrillic-ext-400-normal.woff2','fonts/literata-cyrillic-ext-700-italic.woff2','fonts/literata-cyrillic-ext-700-normal.woff2','fonts/literata-greek-400-italic.woff2','fonts/literata-greek-400-normal.woff2','fonts/literata-greek-700-italic.woff2','fonts/literata-greek-700-normal.woff2','fonts/literata-greek-ext-400-italic.woff2','fonts/literata-greek-ext-400-normal.woff2','fonts/literata-greek-ext-700-italic.woff2','fonts/literata-greek-ext-700-normal.woff2','fonts/literata-latin-400-italic.woff2','fonts/literata-latin-400-normal.woff2','fonts/literata-latin-700-italic.woff2','fonts/literata-latin-700-normal.woff2','fonts/literata-latin-ext-400-italic.woff2','fonts/literata-latin-ext-400-normal.woff2','fonts/literata-latin-ext-700-italic.woff2','fonts/literata-latin-ext-700-normal.woff2','fonts/literata-vietnamese-400-italic.woff2','fonts/literata-vietnamese-400-normal.woff2','fonts/literata-vietnamese-700-italic.woff2','fonts/literata-vietnamese-700-normal.woff2'];
async function cleanCopy(response){
  /* Strip the 'redirected' flag so the browser accepts it for page loads */
  if(!response.redirected)return response;
  return new Response(await response.blob(),{status:response.status,statusText:response.statusText,headers:response.headers});
}
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    const page=await fetch(new Request(SHELL,{cache:'reload'}));
    if(!page.ok)throw new Error('Could not save the app page');
    await cache.put(SHELL,await cleanCopy(page));
    await cache.addAll(ASSETS.map(name=>new Request(name,{cache:'reload'})));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(CACHE_PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim()})())});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  const scope=new URL(self.registration.scope);
  const rel=url.pathname.slice(scope.pathname.length);
  const isPage=request.mode==='navigate'||rel===''||rel==='index.html';
  if(!(isPage||ASSETS.includes(rel)||rel.startsWith('fonts/')))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=isPage?await cache.match(SHELL):await cache.match(request,{ignoreSearch:true});
    if(cached)return cached;
    try{
      const response=await fetch(isPage?SHELL:request);
      if(response.ok)cache.put(isPage?SHELL:request,await cleanCopy(response.clone()));
      return response;
    }catch(e){return new Response('Connect to the internet once so the app can be saved for offline use.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}})}
  })());
});
