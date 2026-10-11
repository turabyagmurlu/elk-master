"""Service worker üretir: tüm uygulama dosyalarını listeler, içerik hash'inden sürüm çıkarır.
Her commit öncesi: python3 tools/sw_uret.py"""
import hashlib, os, json
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files=['index.html','foy.html','manifest.json','css/elk.css','js/veri.js','js/elk.js','js/ders.js','js/kalem.js','js/icerik-yukle.js','img/icon-192.png','img/icon-512.png','img/apple-touch-icon.png']
for d in ('icerik','dersler'):
    files+=sorted(d+'/'+f for f in os.listdir(os.path.join(root,d)) if f.endswith('.js') and not f.startswith('_'))
h=hashlib.sha1()
for f in files:
    p=os.path.join(root,f)
    if os.path.exists(p): h.update(open(p,'rb').read())
ver=h.hexdigest()[:10]
sw=f"""/* ELK MASTER service worker — otomatik üretildi (tools/sw_uret.py), elle düzenleme */
const VER='elk-{ver}';
const FILES={json.dumps(['./']+['./'+f for f in files],ensure_ascii=False)};
self.addEventListener('install',e=>{{ e.waitUntil(caches.open(VER).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); }});
self.addEventListener('activate',e=>{{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VER).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); }});
self.addEventListener('fetch',e=>{{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{{ignoreSearch:true}}).then(r=>r||fetch(e.request).then(n=>{{ if(n&&n.ok&&new URL(e.request.url).origin===location.origin){{ const cp=n.clone(); caches.open(VER).then(c=>c.put(e.request,cp)); }} return n; }}).catch(()=>caches.match('./index.html'))));
}});
self.addEventListener('message',e=>{{ if(e.data==='skipWaiting') self.skipWaiting(); }});
"""
open(os.path.join(root,'sw.js'),'w').write(sw)
open(os.path.join(root,'js','surum.js'),'w').write(f"const ELK_SURUM='{ver}';\n")
print('sw.js', ver, len(files),'dosya')
