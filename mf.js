(()=>{
const C=`.w-claim{color:var(--text-success);font-weight:500}.w-num{color:var(--text-accent);font-weight:500;font-variant-numeric:tabular-nums}.w-cond{color:var(--text-warning);background:var(--bg-warning);padding:1px 6px;border-radius:4px;font-weight:500}.w-neg{color:var(--text-danger);background:var(--bg-danger);padding:1px 6px;border-radius:4px;font-weight:500}.w-mech{color:var(--text-pro);font-weight:500}.mf .eb{font-size:12px;color:var(--text-secondary);margin:0}.mf .res{font-size:40px;font-weight:500;line-height:1.2;font-variant-numeric:tabular-nums;margin:8px 0}.mf .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:12px 0}.mf .card{background:var(--surface-1);border-radius:var(--radius);padding:12px 16px;font-size:14px}.mf .card b{display:block;font-size:20px;font-weight:500}.mf .band{display:flex;height:28px;border-radius:var(--radius);overflow:hidden;margin:12px 0 6px}.mf .key,.mf .note{font-size:13px;color:var(--text-secondary);margin:4px 0}.mf .formula{border-left:2px solid var(--border-accent);padding:10px 14px;background:var(--surface-1);font-size:18px;font-weight:500;margin:12px 0}.mf .caution{border-left:2px solid var(--border-warning);padding:4px 14px;margin:12px 0;font-size:14px}.mf details{border:.5px solid var(--border);border-radius:var(--radius);padding:10px 14px;margin-top:12px;font-size:14px}.mf h2{margin-top:1.2rem}.mf .flow{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:12px 0;font-size:14px}.mf .flow span.n{border:.5px solid var(--border-strong);border-radius:var(--radius);padding:6px 12px;background:var(--surface-1)}.mf .flow i{color:var(--text-secondary)}`;
const F=['--fill-success','--fill-warning','--fill-accent','--fill-pro','--fill-danger'];
const il=t=>{let p;do{p=t;t=t.replace(/\[(claim|num|cond|neg|mech):([^\[\]]+)\]/g,'<span class="w-$1">$2</span>')}while(p!==t);return t.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/`([^`]+)`/g,'<code>$1</code>')};
const strip=t=>t.replace(/<[^>]+>/g,'');
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
document.querySelectorAll('script[type="text/mf"]').forEach(n=>{const d=document.createElement('div');d.className='mf';d.innerHTML=mf(n.textContent);n.replaceWith(d)});
document.querySelectorAll('.mf-ph').forEach(n=>n.remove());
window.mf=mf;
})();
