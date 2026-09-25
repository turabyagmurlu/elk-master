"""Şema paletini koyu zeminden açık (baskı dostu) zemine çevirir. Tekrar çalıştırmak güvenlidir.
Kullanım: python3 tools/palet_acik.py icerik/m*.js"""
import re,sys
GENEL={'#141d26':'#ffffff','#e8eef6':'#1c232d','#8a98ab':'#4b5563','#ffb000':'#b45309','#33b1ff':'#0369a1',
 '#3fb950':'#15803d','#f85149':'#b91c1c','#3a4b5c':'#94a3b8','#a371ff':'#6d28d9','#b87333':'#9a5a1f',
 '#ff9d5c':'#c2410c','#c9a0ff':'#7c3aed','#7fd8ff':'#0284c7','#ff8c1a':'#c2410c','#f2d33b':'#a16207',
 '#5b6f84':'#64748b','#c9b98a':'#8b7d52','#ffb46b':'#c2410c',
 '#241c3a':'#ede9fe','#3a2a1a':'#fdf2e9','#2a1719':'#fef2f2','#2a1a1a':'#fef2f2','#2a1d1d':'#fef2f2',
 '#16261a':'#ecfdf5','#2a2413':'#fefce8'}
KOYU=['#1f2c3a','#2d3b4a','#1c2836','#1d2a36','#2e3f50','#1e2a36','#1a2532','#1c2a36','#1a2430','#182430','#2a3744','#202c3a','#0e151c','#0b0f14']
def cevir(svg):
    def attr(m):
        a,v=m.group(1),m.group(2).lower()
        if v in KOYU: v='#f1f5f9' if a=='fill' else '#cbd5e1'
        else: v=GENEL.get(v,v)
        return '%s="%s"'%(a,v)
    svg=re.sub(r'\b(fill|stroke|stop-color)="(#[0-9a-fA-F]{6})"',attr,svg)
    def sty(m):
        a,v=m.group(1),m.group(2).lower()
        if v in KOYU: v='#f1f5f9' if a=='fill' else '#cbd5e1'
        else: v=GENEL.get(v,v)
        return '%s:%s'%(a,v)
    return re.sub(r'\b(fill|stroke):\s*(#[0-9a-fA-F]{6})',sty,svg)
for f in sys.argv[1:]:
    s=open(f).read(); n=re.sub(r'<svg[\s\S]*?</svg>',lambda m:cevir(m.group(0)),s)
    if n!=s: open(f,'w').write(n); print('çevrildi',f)
