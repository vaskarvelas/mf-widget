(()=>{
const C=`.w-claim{color:var(--text-success);font-weight:500}.w-num{color:var(--text-accent);font-weight:500;font-variant-numeric:tabular-nums}.w-cond{color:var(--text-warning);background:var(--bg-warning);padding:1px 6px;border-radius:4px;font-weight:500}.w-neg{color:var(--text-danger);background:var(--bg-danger);padding:1px 6px;border-radius:4px;font-weight:500}.w-mech{color:var(--text-pro);font-weight:500}.mf .eb{font-size:12px;color:var(--text-secondary);margin:0}.mf .res{font-size:40px;font-weight:500;line-height:1.2;font-variant-numeric:tabular-nums;margin:8px 0}.mf .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:12px 0}.mf .card{background:var(--surface-1);border-radius:var(--radius);padding:12px 16px;font-size:14px}.mf .card b{display:block;font-size:20px;font-weight:500}.mf .band{display:flex;height:28px;border-radius:var(--radius);overflow:hidden;margin:12px 0 6px}.mf .key,.mf .note{font-size:13px;color:var(--text-secondary);margin:4px 0}.mf .formula{border-left:2px solid var(--border-accent);padding:10px 14px;background:var(--surface-1);font-size:18px;font-weight:500;margin:12px 0}.mf .caution{border-left:2px solid var(--border-warning);padding:4px 14px;margin:12px 0;font-size:14px}.mf details{border:.5px solid var(--border);border-radius:var(--radius);padding:10px 14px;margin-top:12px;font-size:14px}.mf h2{margin-top:1.2rem}.mf .flow{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:12px 0;font-size:14px}.mf .flow span.n{border:.5px solid var(--border-strong);border-radius:var(--radius);padding:6px 12px;background:var(--surface-1)}.mf .flow i{color:var(--text-secondary)}.mf{--gk:var(--text-primary);--gs:var(--text-secondary)}.mf .bad{--gs:var(--text-danger)}.mf .good{--gs:var(--text-success)}.mf .neu{--gs:var(--text-secondary)}.mf,.mf .bad,.mf .good,.mf .neu{--gf:color-mix(in srgb,var(--gs) 24%,transparent)}.mf .cmp{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin:16px 0}.mf .col{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}.mf .col>b{font-size:16px;font-weight:500}.mf .scene{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin:16px 0}.mf .fig{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:14px;color:var(--text-secondary);max-width:170px;text-align:center}.mf .fig svg{width:120px;height:96px;overflow:visible;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.mf .ar{color:var(--text-secondary);font-size:18px}.mf .out{padding:8px 16px;border-radius:var(--radius);font-weight:500;color:var(--gs);background:var(--gf);border:.5px solid var(--gs)}.mf.sk .fig span,.mf.sk .col>b{font-family:Mynerve,var(--font-sans);font-size:19px}`;
const F=['--fill-success','--fill-warning','--fill-accent','--fill-pro','--fill-danger'];
const il=t=>{let p;t=t.replace(/\[icon:([a-z0-9-]+)\]/g,'<i class="ph-duotone ph-$1" aria-hidden="true"></i>');do{p=t;t=t.replace(/\[(claim|num|cond|neg|mech):([^\[\]]+)\]/g,'<span class="w-$1">$2</span>')}while(p!==t);return t.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/`([^`]+)`/g,'<code>$1</code>')};
const strip=t=>t.replace(/<[^>]+>/g,'');
// glyphs: 120x96 drawings as [role, path]; role picks ink (o l k), tone (t s) or tone fill (f q)
const P=(x,y,r)=>`M${x-r} ${y}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0`;
const G={
cup:a=>{const f=a=='overflow'||a=='full'?100:Math.min(100,+a||0),y=86-.72*f,w=v=>10*(v-14)/72,r=[];if(f)r.push(['q',`M${30+w(y)} ${y}H${90-w(y)}L80 86H40Z`]);r.push(['o','M30 14L40 86H80L90 14']);if(a=='overflow')r.push(['s',P(20,26,3)+P(14,44,2.5)+P(19,62,2)+P(100,26,3)+P(106,44,2.5)+P(101,62,2)]);return r},
'text-wall':()=>[['o','M14 10h92v76h-92z'],['l',[22,30,38,46,54,62,70,78].map((y,i)=>`M22 ${y}H${[98,86,98,78,94,98,72,90][i]}`).join('')]],
picture:()=>[['o','M18 14h84v66h-84z'],['s',P(42,34,8)],['f','M26 72L52 44L66 58L76 48L94 72Z']],
funnel:()=>[['s',P(40,8,3)+P(60,5,3)+P(80,8,3)],['f','M18 18H102L70 52V82L50 90V52Z']],
scale:a=>{const d=a=='left'?10:a=='right'?-10:0,l=[26,28+d],r=[94,28-d],pan=([x,y])=>`M${x} ${y}L${x-14} ${y+20}M${x} ${y}L${x+14} ${y+20}`,bowl=([x,y])=>`M${x-16} ${y+20}a16 8 0 0 0 32 0Z`;return[['o',`M60 22V86M42 86H78M${l[0]} ${l[1]}L${r[0]} ${r[1]}`+pan(l)+pan(r)],['f',bowl(l)+bowl(r)],['s',P(60,22,4)]]},
gate:a=>[['o','M24 18V88M96 18V88'],['f',a=='open'?'M24 44L80 8L84 14L28 50Z':'M24 42h72v8h-72z']],
stack:a=>{const n=Math.min(5,+a||3);return Array.from({length:n},(_,k)=>[k==n-1?'f':'o',`M20 ${74-k*14}h80v12h-80z`])},
head:()=>[['o','M44 88V72C30 66 24 54 26 40C28 22 42 10 60 10C80 10 94 24 94 42C94 50 98 56 100 60L94 62V72C94 78 88 80 80 78V88'],['f',P(58,40,12)]],
bulb:()=>[['t','M60 4V10M30 16L35 21M90 16L85 21M20 42H26M94 42H100'],['f','M48 64C40 58 36 50 36 42A24 24 0 1 1 84 42C84 50 80 58 72 64Z'],['o','M48 64h24v10h-24zM52 78h16v6h-16z']],
doc:()=>[['o','M30 8H74L90 24V88H30ZM74 8V24H90'],['l','M40 40H80M40 52H80M40 64H66']],
db:()=>[['f','M30 22a30 9 0 1 0 60 0a30 9 0 1 0 -60 0'],['o','M30 22V74a30 9 0 0 0 60 0V22M30 48a30 9 0 0 0 60 0']],
user:()=>[['f',P(60,30,14)],['o','M32 88C32 66 44 54 60 54C76 54 88 66 88 88Z']],
clock:()=>[['o',P(60,48,34)],['k','M60 48V26M60 48L76 56']],
lock:()=>[['o','M44 46V32a16 16 0 0 1 32 0V46'],['f','M34 46h52v38h-52z'],['s',P(60,62,4)]],
warn:()=>[['f','M60 10L104 84H16Z'],['k','M60 34V56M60 68V69']],
check:()=>[['f',P(60,48,32)],['k','M46 48L56 58L76 38']],
cross:()=>[['f',P(60,48,32)],['k','M48 36L72 60M72 36L48 60']]};
const R={o:'fill:none;stroke:var(--gk)',l:'fill:none;stroke:var(--gk);stroke-width:3;opacity:.4',k:'fill:none;stroke:var(--gk);stroke-width:4',t:'fill:none;stroke:var(--gs)',s:'fill:var(--gs);stroke:none',f:'fill:var(--gf);stroke:var(--gs)',q:'fill:var(--gf);stroke:none'};
const svg=(n,a)=>`<svg viewBox="0 0 120 96" aria-hidden="true" data-g="${n}:${a||''}">`+G[n](a).map(([r,d])=>`<path d="${d}" style="${R[r]}"/>`).join('')+'</svg>';
// sketch: same paths through rough.js; seed from glyph name so the drawing never changes
const RJ='https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.esm.js';
const seed=s=>[...s].reduce((h,c)=>h*31+c.charCodeAt(0)|0,7)>>>0;
const rsvg=(rough,n,a)=>{const g=rough.generator();return G[n](a).map(([r,d],j)=>{const ink='olk'.includes(r),sw=r=='l'?3:r=='k'?4:2,fl='fqs'.includes(r);
  return g.toPaths(g.path(d,{seed:seed(n+a)%1e6+j+1,roughness:r=='l'?.6:1.1,stroke:'sq'.includes(r)?'none':'K',strokeWidth:sw,fill:fl?'F':undefined,fillStyle:r=='s'?'solid':'hachure',hachureGap:5,fillWeight:1.2,hachureAngle:-41})).map(p=>{const c=v=>!v||v=='none'?'none':v=='K'&&ink?'var(--gk)':'var(--gs)';return `<path d="${p.d}" style="fill:${c(p.fill)};stroke:${c(p.stroke)};stroke-width:${p.strokeWidth}${r=='l'?';opacity:.4':''}"/>`}).join('')}).join('')};
// steps: "glyph[:arg] caption -> ... -> outcome"; leading + or ! sets good/bad tone; a first word that is not a glyph makes an outcome pill
const steps=(s,dir)=>s.split(/\s*->\s*/).map(x=>{x=x.trim();let tn='';if(/^[+!]/.test(x)){tn=x[0]=='+'?' good':' bad';x=x.slice(1).trim()}const g=/^([a-z-]+)(?::(\S+))?(?:\s+(.*))?$/.exec(x);
  return g&&G[g[1]]?`<div class="fig${tn}">${svg(g[1],g[2])}<span>${il(g[3]||'')}</span></div>`:`<div class="out${tn}">${il(x)}</div>`}).join(`<i class="ti ti-arrow-${dir=='v'?'down':'right'} ar" aria-hidden="true"></i>`);
const css=h=>{if(!document.querySelector(`link[href="${h}"]`)){const l=document.createElement('link');l.rel='stylesheet';l.href=h;document.head.appendChild(l)}};
function mf(src){
  const L=src.replace(/^\n+/,'').split('\n'),o=[];let i=0,h1='';
  const ind=()=>{const b=[];while(i<L.length&&(/^\s+\S/.test(L[i])||!L[i].trim())){if(L[i].trim())b.push(L[i].trim());i++}return b};
  while(i<L.length){
    const raw=L[i],s=raw.trim();i++;if(!s)continue;
    const m=/^(\w+):\s?(.*)$/.exec(s),k=m&&m[1],v=m?il(m[2]):'';
    if(s[0]=='<')o.push(s);
    else if(s.startsWith('## '))o.push('<h2>'+il(s.slice(3))+'</h2>');
    else if(k=='eyebrow')o.push('<p class="eb">'+v+'</p>');
    else if(k=='h1'){h1=h1||v;o.push('<h1>'+v+'</h1>')}
    else if(k=='lead'||k=='question')o.push('<p>'+v+'</p>');
    else if(k=='result')o.push('<div class="res">'+v+'</div>');
    else if(k=='formula')o.push('<div class="formula">'+v+'</div>');
    else if(k=='flow')o.push('<div class="flow">'+m[2].split(/\s*->\s*/).map(x=>'<span class="n">'+il(x)+'</span>').join('<i class="ti ti-arrow-right" aria-hidden="true"></i>')+'</div>');
    else if(k=='style'){}
    else if(k=='scene')o.push('<div class="scene">'+steps(m[2],'h')+'</div>');
    else if(k=='compare')o.push('<div class="cmp">'+ind().filter(l=>l.startsWith('- ')).map(l=>{const[h,...r]=l.slice(2).split('|'),t=/^(bad|good|neu)\s+/.exec(h);return `<div class="col ${t?t[1]:'neu'}"><b>${il((t?h.slice(t[0].length):h).trim())}</b>${steps(r.join('|'),'v')}</div>`}).join('')+'</div>');
    else if(k=='note')o.push('<p class="note">'+v+'</p>');
    else if(k=='caution')o.push('<div class="caution">'+[v,...ind().map(il)].filter(Boolean).join('<br>')+'</div>');
    else if(k=='details'||k=='footer')o.push('<details><summary>'+v+'</summary>'+ind().map(il).join('<br>')+'</details>');
    else if(k=='band'){const seg=m[2].split('|').map(x=>x.trim().match(/^([\d.]+)%?\s*(.*)$/));
      o.push('<div class="band">'+seg.map((g,j)=>`<div style="width:${g[1]}%;background:var(${F[j%5]})"></div>`).join('')+'</div><p class="key">'+seg.map((g,j)=>(j?'right ':'left ')+il(g[2])).join(' · ')+'</p>')}
    else if(k=='cards'){const c=[];for(const l of ind()){if(/^- /.test(l)){const[t,...r]=l.slice(2).split('|');c.push(['<b>'+il(t.trim())+'</b>',r.join('|').trim()?il(r.join('|').trim()):''])}else if(c.length)c[c.length-1].push(il(l))}
      o.push('<div class="cards">'+c.map(x=>'<div class="card">'+x[0]+x.slice(1).filter(Boolean).join('<br>')+'</div>').join('')+'</div>')}
    else if(s.startsWith('- ')){const li=[s.slice(2)];while(i<L.length&&L[i].trim().startsWith('- '))li.push(L[i++].trim().slice(2));o.push('<ul>'+li.map(x=>'<li>'+il(x)+'</li>').join('')+'</ul>')}
    else o.push('<p>'+il(s)+'</p>');
  }
  return '<h2 class="sr-only">'+strip(h1||'Meaning-first card')+'</h2>'+o.join('');
}
if(!document.getElementById('mf-css')){const st=document.createElement('style');st.id='mf-css';st.textContent=C;document.head.appendChild(st)}
document.querySelectorAll('script[type="text/mf"]').forEach(n=>{const src=n.textContent,d=document.createElement('div');d.className='mf';d.innerHTML=mf(src);n.replaceWith(d);
  if(d.querySelector('.ph-duotone'))css('https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/duotone/style.css');
  if(/^\s*style:\s*sketch\s*$/m.test(src)&&d.querySelector('svg[data-g]')){d.classList.add('sk');css('https://fonts.googleapis.com/css2?family=Mynerve&display=swap');
    import(RJ).then(({default:rough})=>d.querySelectorAll('svg[data-g]').forEach(s=>{const[n,a]=s.dataset.g.split(':');s.innerHTML=rsvg(rough,n,a)}))}});
document.querySelectorAll('.mf-ph').forEach(n=>n.remove());
window.mf=mf;
})();
