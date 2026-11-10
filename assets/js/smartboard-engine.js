(function(W){
const I={undo:'M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3',redo:'M15 14l5-5-5-5M20 9H10a6 6 0 0 0 0 12h3',pen:'m4 20 1-4L17 4a2.1 2.1 0 0 1 3 3L8 19zM14 7l3 3',hl:'m5 15 8-9 6 6-7 7H6zM3 21h18',er:'m5 13 8-9a2 2 0 0 1 3 0l3 3a2 2 0 0 1 0 3l-7 7H8zM10 20h10',lasso:'M12 4C7 4 3 6 3 9.5S7 15 12 15s9-2 9-5.5S17 4 12 4zM9 15c0 3 1 5 3 5',text:'M5 6V4h14v2M12 4v16M9 20h6',shape:'M4 4h9v9H4zM17 12a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z',img:'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 9h.01',laser:'M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3',note:'M5 4h14v11l-5 5H5zM14 20v-5h5',hand:'M8 11V5a2 2 0 0 1 4 0v5-7a2 2 0 0 1 4 0v8-5a2 2 0 0 1 4 0v8c0 5-3 8-8 8h-1c-2 0-3-1-4-2l-4-5a2 2 0 0 1 3-3z',thumbs:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',plus:'M12 5v14M5 12h14',minus:'M5 12h14',page:'M6 3h9l4 4v14H6zM15 3v4h4M9 13h6M9 17h6',share:'M12 3v12M7 8l5-5 5 5M5 14v6h14v-6',trash:'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',copy:'M8 8h12v12H8zM16 8V4H4v12h4',color:'M12 3c5 5 7 8 7 11a7 7 0 0 1-14 0c0-3 2-6 7-11z',expand:'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',shrink:'M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5',back:'M15 5l-7 7 7 7'};
const ic=k=>'<svg viewBox="0 0 24 24"><path d="'+I[k]+'"/></svg>';
const PAL=['#000000','#6b6b70','#ef4444','#f97316','#eab308','#22c55e','#06b6d4','#3b82f6','#8b5cf6','#ec4899','#ffffff','#7c4a1e'];
const HLP=['#fde047','#86efac','#7dd3fc','#f9a8d4','#fdba74','#c4b5fd'];
const IM={};
const img=s=>{let m=IM[s];if(!m){m=IM[s]=new Image();m.onload=()=>W.dispatchEvent(new Event('gn-img'));m.src=s}return m};
const tcv=document.createElement('canvas').getContext('2d');
function lines(it){return String(it.str).split('\n')}
function bb(it){
 if(it.t==='pen'||it.t==='hl'||it.t==='er'){let a=1e9,b=1e9,c=-1e9,d=-1e9;for(const p of it.p){a=Math.min(a,p[0]);b=Math.min(b,p[1]);c=Math.max(c,p[0]);d=Math.max(d,p[1])}const h=it.w/2;return[a-h,b-h,c+h,d+h]}
 if(it.t==='sh'){const h=it.w/2;return[Math.min(it.x1,it.x2)-h,Math.min(it.y1,it.y2)-h,Math.max(it.x1,it.x2)+h,Math.max(it.y1,it.y2)+h]}
 if(it.t==='tx'){tcv.font=it.s+'px sans-serif';let w=0;for(const l of lines(it))w=Math.max(w,tcv.measureText(l).width);return[it.x,it.y,it.x+w+4,it.y+lines(it).length*it.s*1.25]}
 return[it.x,it.y,it.x+it.w,it.y+it.h]}
function xf(it,f,k){
 const o=Object.assign({},it);
 if(it.p){o.p=it.p.map(q=>{const r=f(q[0],q[1]);return[r[0],r[1],q[2]]});o.w=it.w*k}
 else if(it.t==='sh'){const a=f(it.x1,it.y1),b=f(it.x2,it.y2);o.x1=a[0];o.y1=a[1];o.x2=b[0];o.y2=b[1];o.w=it.w*k}
 else{const a=f(it.x,it.y);o.x=a[0];o.y=a[1];if(it.t==='tx')o.s=it.s*k;else{o.w=it.w*k;o.h=it.h*k}}
 return o}
function shp(c,it){
 const{x1,y1,x2,y2}=it;c.beginPath();
 if(it.k==='line'||it.k==='arrow'){c.moveTo(x1,y1);c.lineTo(x2,y2);if(it.k==='arrow'){const a=Math.atan2(y2-y1,x2-x1),l=Math.max(12,it.w*4);c.moveTo(x2,y2);c.lineTo(x2-l*Math.cos(a-.5),y2-l*Math.sin(a-.5));c.moveTo(x2,y2);c.lineTo(x2-l*Math.cos(a+.5),y2-l*Math.sin(a+.5))}}
 else if(it.k==='rect')c.rect(Math.min(x1,x2),Math.min(y1,y2),Math.abs(x2-x1),Math.abs(y2-y1));
 else if(it.k==='ell')c.ellipse((x1+x2)/2,(y1+y2)/2,Math.abs(x2-x1)/2,Math.abs(y2-y1)/2,0,0,7);
 else if(it.k==='tri'){c.moveTo((x1+x2)/2,Math.min(y1,y2));c.lineTo(Math.max(x1,x2),Math.max(y1,y2));c.lineTo(Math.min(x1,x2),Math.max(y1,y2));c.closePath()}
 else{const mx=(x1+x2)/2,my=(y1+y2)/2;c.moveTo(mx,Math.min(y1,y2));c.lineTo(Math.max(x1,x2),my);c.lineTo(mx,Math.max(y1,y2));c.lineTo(Math.min(x1,x2),my);c.closePath()}
 c.stroke()}

function ink(c,it){const P=it.p,n=P.length,W=it.w,br=it.k==='brush';c.beginPath();
 const Q=P.map((b,i)=>{if(i===0||i===n-1)return b;const a=P[i-1],d=P[i+1];return[(a[0]+2*b[0]+d[0])/4,(a[1]+2*b[1]+d[1])/4,b[2]]});
 let v=0;const L=[],R=[];
 for(let i=0;i<n;i++){const q=Q[i];if(i){v=v*.75+Math.hypot(q[0]-Q[i-1][0],q[1]-Q[i-1][1])*.25}
  const pr=it.rp?q[2]:Math.max(.2,Math.min(1,1-v/(br?16:22)));
  const tp=Math.min(1,(i+1)/7,(n-i)/9),e=tp*tp*(3-2*tp);
  const r=Math.max(.35,W*(br?.25+pr*1.5:.45+pr*.85)/2*(.25+.75*e));
  const a=Q[Math.max(0,i-1)],d=Q[Math.min(n-1,i+1)];let dx=d[0]-a[0],dy=d[1]-a[1];const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;
  L.push([q[0]-dy*r,q[1]+dx*r]);R.push([q[0]+dy*r,q[1]-dx*r])}
 const s=Q[0],z=Q[n-1];c.moveTo(L[0][0],L[0][1]);
 for(let i=1;i<n-1;i++)c.quadraticCurveTo(L[i][0],L[i][1],(L[i][0]+L[i+1][0])/2,(L[i][1]+L[i+1][1])/2);
 c.lineTo(L[n-1][0],L[n-1][1]);c.arc(z[0],z[1],Math.hypot(L[n-1][0]-z[0],L[n-1][1]-z[1]),Math.atan2(L[n-1][1]-z[1],L[n-1][0]-z[0]),Math.atan2(R[n-1][1]-z[1],R[n-1][0]-z[0])+(0),false);
 for(let i=n-1;i>0;i--)c.quadraticCurveTo(R[i][0],R[i][1],(R[i][0]+R[i-1][0])/2,(R[i][1]+R[i-1][1])/2);
 c.lineTo(R[0][0],R[0][1]);c.closePath();c.fill()}
function dr(c,it,s){
 c.save();c.scale(s,s);c.lineCap=c.lineJoin='round';
 if(it.p){
  c.strokeStyle=c.fillStyle=it.c;c.lineWidth=it.w;
  if(it.t==='hl'){c.globalAlpha=.38;c.lineCap='butt'}
  if(it.t==='er'){c.globalCompositeOperation='destination-out';c.strokeStyle=c.fillStyle='#000'}
  const p=it.p;
  if(p.length<2){c.beginPath();c.arc(p[0][0],p[0][1],it.w/2,0,7);c.fill()}
  else if(it.pr&&it.t==='pen'){ink(c,it)}
  else{c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let k=1;k<p.length-1;k++)c.quadraticCurveTo(p[k][0],p[k][1],(p[k][0]+p[k+1][0])/2,(p[k][1]+p[k+1][1])/2);c.lineTo(p[p.length-1][0],p[p.length-1][1]);c.stroke()}
 }else if(it.t==='sh'){c.strokeStyle=it.c;c.lineWidth=it.w;shp(c,it)}
 else if(it.t==='tx'){if(it.bg){const b=bb(it);c.fillStyle=it.bg;c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=8;c.fillRect(b[0]-10,b[1]-8,b[2]-b[0]+20,b[3]-b[1]+16);c.shadowBlur=0}c.fillStyle=it.c;c.font=it.s+'px sans-serif';c.textBaseline='top';lines(it).forEach((l,k)=>c.fillText(l,it.x,it.y+k*it.s*1.25))}
 else if(it.t==='img'){const m=img(it.src);if(m.complete&&m.naturalWidth)c.drawImage(m,it.x,it.y,it.w,it.h)}
 c.restore()}
function segd(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;let t=l?((px-ax)*dx+(py-ay)*dy)/l:0;t=Math.max(0,Math.min(1,t));return Math.hypot(px-ax-t*dx,py-ay-t*dy)}
function hit(it,x,y,r){
 if(it.t==='er')return false;
 if(it.p){const p=it.p;if(p.length<2)return Math.hypot(p[0][0]-x,p[0][1]-y)<r+it.w/2;for(let k=1;k<p.length;k++)if(segd(x,y,p[k-1][0],p[k-1][1],p[k][0],p[k][1])<r+it.w/2)return true;return false}
 const b=bb(it);
 if(it.t==='sh'){const[a,c,d,e]=[Math.min(it.x1,it.x2),Math.min(it.y1,it.y2),Math.max(it.x1,it.x2),Math.max(it.y1,it.y2)];if(it.k==='line'||it.k==='arrow')return segd(x,y,it.x1,it.y1,it.x2,it.y2)<r+it.w;return x>a-r&&x<d+r&&y>c-r&&y<e+r&&!(x>a+r&&x<d-r&&y>c+r&&y<e-r)}
 return x>=b[0]&&x<=b[2]&&y>=b[1]&&y<=b[3]}
function inPoly(x,y,P){let o=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])o=!o}return o}

W.GN=function(root,o){
 const T=(e,a)=>o.lang==='ar'?a:e;
 const st={tool:'pen',z:1,pen:{c:'#111827',w:4,k:'fountain'},hl:{c:'#fde047',w:14},er:{m:'stroke',w:18},sh:{k:'line',c:'#000000',w:3},tx:{c:'#000000',s:24},ls:{c:'#ef4444'}};
 let P=o.pages,items=o.items,cur=0,u=[],r=[],sel=null,penSeen=0,mounted={},svT=0,rrT=0,sc,pgs,pop,pill,side,els=[],io,laser=[],lasT=0;
 root.classList.add('gn');root.dataset.tool='pen';
 const save=()=>{clearTimeout(svT);svT=setTimeout(()=>o.save&&o.save(items,P),500)};
 const tools=[['pen',T('Pen','قلم')],['er',T('Eraser','ممحاة')],['hl',T('Highlighter','هايلايتر')],['shape',T('Shapes','أشكال')],['text',T('Text','نص')],['note',T('Sticky note','ملاحظة')],['img',T('Image','صورة')],['lasso',T('Lasso','تحديد')],['laser',T('Laser','ليزر')],['hand',T('Hand','يد')]];
 root.innerHTML='<div class="gn-top"><button data-a="back" title="'+T('Back','رجوع')+'">'+ic(o.board?'expand':'back')+'</button><div class="gn-ttl"></div><button data-a="side" title="'+T('Pages','الصفحات')+'">'+ic('thumbs')+'</button><i class="gn-sep"></i><button data-a="undo" title="'+T('Undo','تراجع')+'">'+ic('undo')+'</button><button data-a="redo" title="'+T('Redo','إعادة')+'">'+ic('redo')+'</button><i class="gn-sep"></i><div class="gn-tools">'+tools.map(t=>'<button data-t="'+t[0]+'" title="'+t[1]+'">'+ic(t[0]==='shape'?'shape':t[0])+(t[0]==='pen'||t[0]==='hl'||t[0]==='shape'||t[0]==='text'?'<span class="gn-dot"></span>':'')+'</button>').join('')+'</div><div class="gn-sp"></div><button data-a="zo">'+ic('minus')+'</button><button data-a="zr" style="min-width:52px">100%</button><button data-a="zi">'+ic('plus')+'</button><i class="gn-sep"></i>'+(o.board?'<button data-a="page" title="'+T('Page','الصفحة')+'">'+ic('page')+'</button>':'')+'<button data-a="exp" title="'+T('Export / Print','تصدير / طباعة')+'">'+ic('share')+'</button></div><div class="gn-body"><div class="gn-side"></div><div class="gn-sc"><div class="gn-pgs"></div></div><div class="gn-pop"></div><div class="gn-pill"><span>'+T('Page','صفحة')+'</span><input type="number" min="1" value="1"><span class="tot"></span></div><div class="gn-load">'+T('Loading…','جارٍ التحميل…')+'</div><input type="file" accept="image/*" hidden></div>';
 const $=s=>root.querySelector(s);
 sc=$('.gn-sc');pgs=$('.gn-pgs');pop=$('.gn-pop');pill=$('.gn-pill input');side=$('.gn-side');const fi=$('input[type=file]');
 $('.gn-ttl').textContent=o.title||'';
 const col=t=>t==='pen'?st.pen.c:t==='hl'?st.hl.c:t==='shape'?st.sh.c:t==='text'?st.tx.c:'';
 function dots(){root.querySelectorAll('.gn-tools button').forEach(b=>{const d=b.querySelector('.gn-dot');if(d)d.style.setProperty('--cc',col(b.dataset.t));b.classList.toggle('on',b.dataset.t===st.tool)});root.dataset.tool=st.tool}
 function hb(){$('[data-a=undo]').disabled=!u.length;$('[data-a=redo]').disabled=!r.length}
 function chg(i,fn){u.push({i,a:items[i].slice()});if(u.length>80)u.shift();r.length=0;const n=fn(items[i]);if(n)items[i]=n;redraw(i);save();hb()}
 function undo(){const e=u.pop();if(!e)return;r.push({i:e.i,a:items[e.i].slice()});items[e.i]=e.a;sel=null;redraw(e.i);save();hb()}
 function redo(){const e=r.pop();if(!e)return;u.push({i:e.i,a:items[e.i].slice()});items[e.i]=e.a;sel=null;redraw(e.i);save();hb()}

 function build(){
  io&&io.disconnect();pgs.innerHTML='';mounted={};els=[];
  P.forEach((p,i)=>{const d=document.createElement('div');d.className='gn-pg';d.dataset.i=i;d.innerHTML='<canvas class="gbs"></canvas><canvas class="ik"></canvas><canvas class="lv"></canvas>';pgs.appendChild(d);els.push(d);bind(d.querySelector('.lv'),i)});
  io=new IntersectionObserver(es=>es.forEach(e=>{const i=+e.target.dataset.i;e.isIntersecting?mount(i):unmount(i)}),{root:sc,rootMargin:'1400px 0px'});
  els.forEach(d=>io.observe(d));size();$('.tot').textContent='/ '+P.length;thumbs()}
 function size(){P.forEach((p,i)=>{els[i].style.width=p.w*st.z+'px';els[i].style.height=p.h*st.z+'px'});$('[data-a=zr]').textContent=Math.round(st.z*100)+'%'}
 const dpr=()=>Math.min(W.devicePixelRatio||1,2);
 function mount(i){const d=els[i];if(!d)return;const bs=d.querySelector('.gbs'),ik=d.querySelector('.ik'),lv=d.querySelector('.lv');const w=Math.round(P[i].w*st.z*dpr()),h=Math.round(P[i].h*st.z*dpr());
  const key=w+'x'+h;if(mounted[i]===key)return;mounted[i]=key;[bs,ik,lv].forEach(c=>{c.width=w;c.height=h});
  const p=o.base&&o.base(i,bs,w,P[i]);redraw(i);if(p&&p.catch)p.catch(()=>{})}
 function unmount(i){if(!mounted[i])return;delete mounted[i];els[i].querySelectorAll('canvas').forEach(c=>{c.width=1;c.height=1})}
 function redraw(i){const d=els[i];if(!d||!mounted[i])return;const c=d.querySelector('.ik'),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);const s=c.width/P[i].w;for(const it of items[i])dr(x,it,s);live(i);if(thT[i]===undefined)thT[i]=setTimeout(()=>{delete thT[i];th1(i)},700)}
 W.addEventListener('gn-img',()=>{for(const i in mounted)redraw(+i)});

 let L=null,ls=null;
 function live(i){const d=els[i];if(!d||!mounted[i])return;const c=d.querySelector('.lv'),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);const s=c.width/P[i].w;
  if(L&&L.i===i&&L.it)dr(x,L.it,s);
  if(ls&&ls.i===i&&ls.p){x.save();x.scale(s,s);x.strokeStyle='#3b82f6';x.lineWidth=1.6/st.z;x.setLineDash([6/st.z,5/st.z]);x.beginPath();ls.p.forEach((q,k)=>k?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.stroke();x.restore()}
  if(sel&&sel.i===i){const b=selBox();x.save();x.scale(s,s);x.strokeStyle='#3b82f6';x.lineWidth=1.5/st.z;x.setLineDash([6/st.z,4/st.z]);x.strokeRect(b[0],b[1],b[2]-b[0],b[3]-b[1]);x.setLineDash([]);x.fillStyle='#fff';x.beginPath();x.arc(b[2],b[3],8/st.z,0,7);x.fill();x.stroke();x.restore()}
  if(laser.length&&laser[0].i===i){x.save();x.scale(s,s);x.lineCap=x.lineJoin='round';const n=Date.now();for(let k=1;k<laser.length;k++){const a=1-(n-laser[k].t)/900;if(a<=0)continue;x.globalAlpha=a;x.strokeStyle=st.ls.c;x.lineWidth=7/st.z*a+2;x.beginPath();x.moveTo(laser[k-1].x,laser[k-1].y);x.lineTo(laser[k].x,laser[k].y);x.stroke()}x.restore()}
  selbar(i)}
 function selBox(){let b=[1e9,1e9,-1e9,-1e9];for(const it of sel.ids){const q=bb(it);b=[Math.min(b[0],q[0]),Math.min(b[1],q[1]),Math.max(b[2],q[2]),Math.max(b[3],q[3])]}const m=4;return[b[0]-m,b[1]-m,b[2]+m,b[3]+m]}
 function selbar(i){els.forEach(d=>{const b=d.querySelector('.gn-sel');if(b)b.remove()});if(!sel||sel.i!==i||sel.drag)return;const b=selBox(),e=document.createElement('div');e.className='gn-sel show';e.style.left=Math.max(4,b[0]*st.z)+'px';e.style.top=Math.max(4,b[1]*st.z-46)+'px';e.innerHTML='<button data-s="del" title="'+T('Delete','حذف')+'">'+ic('trash')+'</button><button data-s="dup" title="'+T('Duplicate','نسخ')+'">'+ic('copy')+'</button><button data-s="col" title="'+T('Recolor','لون')+'">'+ic('color')+'</button>';e.onpointerdown=ev=>ev.stopPropagation();e.onclick=ev=>{const a=ev.target.closest('button');if(!a)return;const ids=sel.ids,k=a.dataset.s;if(k==='del'){chg(i,A=>A.filter(x=>!ids.includes(x)));sel=null}
   else if(k==='dup'){const n=ids.map(x=>xf(x,(X,Y)=>[X+24,Y+24],1));chg(i,A=>{A.push(...n)});sel={i,ids:n}}
   else{const c=st.pen.c,n=ids.map(x=>x.t==='img'?x:Object.assign({},x,{c}));chg(i,A=>A.map(x=>ids.includes(x)?n[ids.indexOf(x)]:x));sel={i,ids:n}}live(i)};els[i].appendChild(e)}

 function pt(e,lv,i){const r0=lv.getBoundingClientRect();return[(e.clientX-r0.left)/r0.width*P[i].w,(e.clientY-r0.top)/r0.height*P[i].h]}
 function bind(lv,i){
  lv.addEventListener('pointerdown',e=>{
   if(e.pointerType==='pen')penSeen=Date.now();else if(e.pointerType==='touch'&&Date.now()-penSeen<1500)return;
   if(ptrs.size>1&&e.pointerType==='touch'){return}
   if(e.button>0)return;const[x,y]=pt(e,lv,i),t=st.tool;cur=i;e.preventDefault();
   if(t==='pen'||t==='hl'){const s=st[t];lv.setPointerCapture(e.pointerId);L={i,k:'d',it:{t,c:s.c,w:s.w,k:s.k,p:[[x,y,e.pressure||.5]],pr:t==='pen'&&s.k!=='ball',rp:e.pointerType==='pen'}};live(i)}
   else if(t==='er'){lv.setPointerCapture(e.pointerId);L={i,k:'e',ch:0,it:st.er.m==='pixel'?{t:'er',c:'#000',w:st.er.w,p:[[x,y,.5]]}:null};if(!L.it){u.push({i,a:items[i].slice()});r.length=0;erase(i,x,y)}}
   else if(t==='shape'){lv.setPointerCapture(e.pointerId);const s=st.sh;L={i,k:'s',it:{t:'sh',k:s.k,c:s.c,w:s.w,x1:x,y1:y,x2:x,y2:y}}}
   else if(t==='laser'){lv.setPointerCapture(e.pointerId);L={i,k:'l'};laser=[{i,x,y,t:Date.now()}];lasTick()}
   else if(t==='text'||t==='note'){const f=[...items[i]].reverse().find(it=>it.t==='tx'&&hit(it,x,y,0));if(f){chg(i,A=>A.filter(z=>z!==f));openTa(i,f.x,f.y,f.s,f.c,f.str)}else openTa(i,x,y,st.tx.s,st.tx.c,'')}
   else if(t==='lasso'){lv.setPointerCapture(e.pointerId);
    if(sel&&sel.i===i){const b=selBox();if(Math.hypot(x-b[2],y-b[3])<22/st.z){L={i,k:'z',x,y,b};sel.drag=1;return}if(x>b[0]&&x<b[2]&&y>b[1]&&y<b[3]){L={i,k:'m',x,y};sel.drag=1;live(i);return}}
    sel=null;ls={i,p:[[x,y]]};L={i,k:'o'};live(i)}
  });
  lv.addEventListener('pointermove',e=>{if(!L||L.i!==i||ptrs.size>1)return;const[x,y]=pt(e,lv,i);
   if(L.k==='d'){const p=L.it.p;for(const ev of(e.getCoalescedEvents?e.getCoalescedEvents():[e])){const[X,Y]=pt(ev,lv,i),q=p[p.length-1];if(Math.hypot(X-q[0],Y-q[1])>.5/st.z)p.push([X,Y,ev.pressure||.5])}live(i)}
   else if(L.k==='e'){if(L.it){L.it.p.push([x,y,.5]);live(i)}else erase(i,x,y)}
   else if(L.k==='s'){L.it.x2=x;L.it.y2=y;live(i)}
   else if(L.k==='l'){laser.push({i,x,y,t:Date.now()})}
   else if(L.k==='o'){ls.p.push([x,y]);live(i)}
   else if(L.k==='m'){const dx=x-L.x,dy=y-L.y;L.dx=dx;L.dy=dy;sel.tmp=sel.ids.map(it=>xf(it,(X,Y)=>[X+dx,Y+dy],1));prevSel(i)}
   else if(L.k==='z'){const b=L.b,k=Math.max(.1,((x-b[0])+(y-b[1]))/((L.x-b[0])+(L.y-b[1])));L.k2=k;sel.tmp=sel.ids.map(it=>xf(it,(X,Y)=>[b[0]+(X-b[0])*k,b[1]+(Y-b[1])*k],k));prevSel(i)}});
  const end=e=>{if(!L||L.i!==i)return;const l=L;L=null;
   if(l.k==='d'||l.k==='s'){if(l.k==='s'&&Math.hypot(l.it.x2-l.it.x1,l.it.y2-l.it.y1)<4)return live(i);chg(i,A=>{A.push(l.it)})}
   else if(l.k==='e'){if(l.it)chg(i,A=>{A.push(l.it)});else{if(l.ch)save();else u.pop();redraw(i);hb()}}
   else if(l.k==='o'){const P0=ls.p;ls=null;const ids=items[i].filter(it=>{if(it.t==='er')return false;const b=bb(it);return inPoly((b[0]+b[2])/2,(b[1]+b[3])/2,P0)});sel=ids.length&&P0.length>3?{i,ids}:null}
   else if(l.k==='m'||l.k==='z'){const tmp=sel.tmp,ids=sel.ids;delete sel.drag;if(tmp){chg(i,A=>A.map(it=>ids.includes(it)?tmp[ids.indexOf(it)]:it));sel={i,ids:tmp}}delete sel.tmp}
   live(i)};
  lv.addEventListener('pointerup',end);lv.addEventListener('pointercancel',end)}
 function prevSel(i){const lvc=els[i].querySelector('.lv'),x=lvc.getContext('2d'),s=lvc.width/P[i].w;x.clearRect(0,0,lvc.width,lvc.height);const ik=els[i].querySelector('.ik'),ix=ik.getContext('2d');ix.clearRect(0,0,ik.width,ik.height);const ids=sel.ids;for(const it of items[i])if(!ids.includes(it))dr(ix,it,s);for(const it of sel.tmp)dr(ix,it,s)}
 function erase(i,x,y){const rr=st.er.w/2;const n=items[i].filter(it=>!hit(it,x,y,rr));if(n.length!==items[i].length){items[i]=n;L.ch=1;redraw(i)}}
 function lasTick(){clearInterval(lasT);lasT=setInterval(()=>{const n=Date.now();laser=laser.filter(q=>n-q.t<900);if(!laser.length){clearInterval(lasT);const i=cur;laser=[];live(i);return}live(laser[0].i)},30)}
 function openTa(i,x,y,s,c,v){const d=els[i],ta=document.createElement('textarea');ta.className='gn-ta';ta.value=v;ta.style.cssText='left:'+x*st.z+'px;top:'+y*st.z+'px;font-size:'+s*st.z+'px;color:'+c;const fit=()=>{ta.style.height='auto';ta.style.height=ta.scrollHeight+'px';ta.style.width=Math.max(80,ta.scrollWidth+8)+'px'};ta.oninput=fit;let done=0;const fin=()=>{if(done)return;done=1;const val=ta.value.replace(/\s+$/,'');ta.remove();if(val)chg(i,A=>{A.push({t:'tx',x,y,s,c:st.tool==='note'?'#1c1c1e':c,str:val,bg:st.tool==='note'?'#fde68a':void 0})});else redraw(i)};ta.onblur=fin;ta.onkeydown=e=>{if(e.key==='Escape')ta.blur()};d.appendChild(ta);setTimeout(()=>{ta.focus();fit()},30)}

 const ptrs=new Map();let pd=0,lm=null;
 sc.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')return;ptrs.set(e.pointerId,[e.clientX,e.clientY]);if(ptrs.size===2){L=null;ls=null;pd=dist();lm=null;live(cur)}},true);
 sc.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,[e.clientX,e.clientY]);if(ptrs.size===2&&pd){const d=dist(),a=[...ptrs.values()],mx=(a[0][0]+a[1][0])/2,my=(a[0][1]+a[1][1])/2;if(lm){sc.scrollLeft-=mx-lm[0];sc.scrollTop-=my-lm[1]}lm=[mx,my];setZ(st.z*d/pd,1);pd=d}},true);
 const pu=e=>{ptrs.delete(e.pointerId);if(ptrs.size<2){pd=0;lm=null}};sc.addEventListener('pointerup',pu,true);sc.addEventListener('pointercancel',pu,true);
 const dist=()=>{const a=[...ptrs.values()];return Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1])||1};
 sc.addEventListener('wheel',e=>{if(e.ctrlKey){e.preventDefault();setZ(st.z*(e.deltaY<0?1.08:.92))}},{passive:false});
 function setZ(z,soft){z=Math.max(.3,Math.min(5,z));const cy=(sc.scrollTop+sc.clientHeight/2)/sc.scrollHeight,cx=(sc.scrollLeft+sc.clientWidth/2)/sc.scrollWidth;st.z=z;size();sc.scrollTop=cy*sc.scrollHeight-sc.clientHeight/2;sc.scrollLeft=cx*sc.scrollWidth-sc.clientWidth/2;clearTimeout(rrT);rrT=setTimeout(()=>{for(const i in mounted)mount(+i);for(const i in mounted)redraw(+i)},soft?160:60)}
 function fit(){const w=sc.clientWidth-(W.innerWidth<700?16:48);st.z=Math.max(.3,Math.min(3,w/P[0].w));size()}

 const thT={};let thv=0;
 function thumbs(){side.innerHTML='';P.forEach((p,i)=>{const a=document.createElement('a');a.className='gn-th';a.dataset.i=i;const c=document.createElement('canvas');c.width=110;c.height=Math.round(110*p.h/p.w);a.appendChild(c);a.appendChild(document.createTextNode(i+1));a.onclick=()=>goto(i);side.appendChild(a)});if(root.classList.contains('side'))thAll()}
 async function thAll(){const t=++thv;for(let i=0;i<P.length&&t===thv;i++)await th1(i,1)}
 async function th1(i,full){const a=side.children[i];if(!a||!root.classList.contains('side'))return;const c=a.firstChild,x=c.getContext('2d');if(full||!c.dataset.b){x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);try{if(o.base)await o.base(i,c,c.width,P[i],1)}catch(er){}c.dataset.b=1}
  const s=c.width/P[i].w,t=document.createElement('canvas');t.width=c.width;t.height=c.height;const tx=t.getContext('2d');for(const it of items[i])dr(tx,it,s);x.drawImage(t,0,0)}
 function goto(i){els[i]&&sc.scrollTo({top:els[i].offsetTop-14,behavior:'smooth'})}
 sc.addEventListener('scroll',()=>{const m=sc.scrollTop+sc.clientHeight*.4;let c=0;for(let i=0;i<els.length;i++)if(els[i].offsetTop<=m)c=i;if(c!==cur||pill.dataset.c===undefined){cur=c;pill.value=c+1;pill.dataset.c=c;side.querySelectorAll('.gn-th').forEach((a,k)=>a.classList.toggle('cur',k===c))}},{passive:true});
 pill.onchange=()=>{const n=Math.max(1,Math.min(P.length,+pill.value||1));goto(n-1)};

 function sw(list,key,tool){return '<div class="gn-sw">'+list.map(c=>'<i data-c="'+c+'" class="'+(st[key].c===c?'on':'')+'" style="background:'+c+'"></i>').join('')+'<input type="color" data-cc value="'+(/^#[0-9a-f]{6}$/i.test(st[key].c)?st[key].c:'#000000')+'"></div>'}
 function rng(l,k,key,mn,mx){return '<h4>'+l+'</h4><input type="range" min="'+mn+'" max="'+mx+'" value="'+st[key][k]+'" data-r="'+key+'.'+k+'">'}
 function popFor(t,btn){
  let h='';
  if(t==='pen')h='<div class="gn-opt">'+[['ball',T('Ballpoint','جاف')],['fountain',T('Fountain','حبر')],['brush',T('Brush','فرشاة')]].map(a=>'<button data-pt="'+a[0]+'" class="'+(st.pen.k===a[0]?'on':'')+'">'+a[1]+'</button>').join('')+'</div>'+'<div class="gn-prev"><b style="background:'+st.pen.c+';height:'+st.pen.w+'px"></b></div>'+sw(PAL,'pen')+rng(T('Thickness','السمك'),'w','pen',1,24);
  else if(t==='hl')h='<div class="gn-prev"><b style="background:'+st.hl.c+';opacity:.5;height:'+Math.min(st.hl.w,30)+'px"></b></div>'+sw(HLP,'hl')+rng(T('Thickness','السمك'),'w','hl',6,48);
  else if(t==='er')h='<div class="gn-opt"><button data-em="stroke" class="'+(st.er.m==='stroke'?'on':'')+'">'+T('Stroke eraser','مسح الخط كامل')+'</button><button data-em="pixel" class="'+(st.er.m==='pixel'?'on':'')+'">'+T('Pixel eraser','مسح بالبكسل')+'</button></div>'+rng(T('Size','الحجم'),'w','er',6,60);
  else if(t==='shape')h='<div class="gn-opt">'+[['line',T('Line','خط')],['arrow',T('Arrow','سهم')],['rect',T('Rectangle','مستطيل')],['ell',T('Ellipse','دائرة')],['tri',T('Triangle','مثلث')],['dia',T('Diamond','معين')]].map(a=>'<button data-sk="'+a[0]+'" class="'+(st.sh.k===a[0]?'on':'')+'">'+a[1]+'</button>').join('')+'</div>'+sw(PAL,'sh')+rng(T('Thickness','السمك'),'w','sh',1,20);
  else if(t==='text')h=sw(PAL,'tx')+rng(T('Font size','حجم الخط'),'s','tx',12,96)+'<h4 style="margin-top:10px">'+T('Tap on the page to type','اضغط على الصفحة واكتب')+'</h4>';
  else if(t==='laser')h=sw(['#ef4444','#22c55e','#3b82f6','#eab308','#ec4899'],'ls');
  else if(t==='page'){const pp=P[cur].paper||'blank';h='<h4>'+T('Paper','الورقة')+'</h4><div class="gn-opt">'+[['blank',T('Blank','فاضية')],['lined',T('Lined','سطور')],['grid',T('Grid','مربعات')],['dots',T('Dots','نقط')]].map(a=>'<button data-pp="'+a[0]+'" class="'+(pp===a[0]?'on':'')+'">'+a[1]+'</button>').join('')+'</div><div class="gn-opt"><button data-pa="add">+ '+T('Add page','صفحة جديدة')+'</button><button data-pa="dup">'+T('Duplicate','تكرار')+'</button><button data-pa="del">'+T('Delete page','حذف الصفحة')+'</button><button data-pa="clr">'+T('Clear page','مسح الصفحة')+'</button></div>'}
  if(!h){pop.classList.remove('show');return}
  pop.innerHTML=h;pop.dataset.t=t;const b=btn.getBoundingClientRect(),rb=root.getBoundingClientRect(),w=268;pop.style.left=Math.max(6,Math.min(rb.width-w-6,b.left-rb.left+b.width/2-w/2))+'px';pop.classList.add('show')}
 pop.addEventListener('input',e=>{const t=e.target;if(t.dataset.r){const[a,k]=t.dataset.r.split('.');st[a][k]=+t.value;popFor(pop.dataset.t,root.querySelector('[data-t='+pop.dataset.t+']'));dots()}else if(t.dataset.cc!==undefined){setC(t.value)}});
 function setC(c){const t=pop.dataset.t,k=t==='shape'?'sh':t;if(st[k])st[k].c=c;pop.querySelectorAll('.gn-sw i').forEach(i=>i.classList.toggle('on',i.dataset.c===c));dots()}
 pop.addEventListener('click',e=>{const t=e.target.closest('[data-c],[data-em],[data-sk],[data-pp],[data-pa],[data-pt]');if(!t)return;const d=t.dataset,tool=pop.dataset.t;
  if(d.c)setC(d.c);else if(d.em)st.er.m=d.em;else if(d.sk)st.sh.k=d.sk;else if(d.pt)st.pen.k=d.pt;
  else if(d.pp){P[cur].paper=d.pp;mounted={};mount(cur);save()}
  else if(d.pa){const p=P[cur];if(d.pa==='add'||d.pa==='dup'){P.splice(cur+1,0,{w:p.w,h:p.h,paper:p.paper});items.splice(cur+1,0,d.pa==='dup'?items[cur].slice():[])}else if(d.pa==='del'){if(P.length<2)return;if(!confirm(T('Delete this page?','تحذف الصفحة دي؟')))return;P.splice(cur,1);items.splice(cur,1)}else{chg(cur,()=>[]);return}
   u=[];r=[];sel=null;build();hb();save();setTimeout(()=>goto(Math.min(cur+(d.pa==='del'?0:1),P.length-1)),50);pop.classList.remove('show');return}
  popFor(tool,root.querySelector('[data-t='+tool+']')||root.querySelector('[data-a=page]'));dots()});
 root.addEventListener('pointerdown',e=>{if(pop.classList.contains('show')&&!e.target.closest('.gn-pop')&&!e.target.closest('.gn-top'))pop.classList.remove('show')});

 const act={back:()=>o.onBack&&o.onBack(),side:()=>{root.classList.toggle('side');if(root.classList.contains('side'))thAll();setTimeout(()=>fit(),30)},undo,redo,zi:()=>setZ(st.z*1.2),zo:()=>setZ(st.z/1.2),zr:()=>{fit();setZ(st.z)},
  page:b=>popFor('page',b),exp};
 async function exp(){const w=open('','_blank');if(!w){alert(T('Allow pop-ups to export','اسمح بالنوافذ المنبثقة للتصدير'));return}w.document.write('<title>'+(o.title||'Export')+'</title><body style="margin:0">'+T('Preparing…','جارٍ التجهيز…'));const out=[];for(let i=0;i<P.length;i++){const c=document.createElement('canvas'),W2=1400;c.width=W2;c.height=Math.round(W2*P[i].h/P[i].w);const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);try{if(o.base)await o.base(i,c,W2,P[i],1)}catch(er){}const t=document.createElement('canvas');t.width=c.width;t.height=c.height;const tx=t.getContext('2d');for(const it of items[i])dr(tx,it,c.width/P[i].w);x.drawImage(t,0,0);out.push(c.toDataURL('image/jpeg',.9))}
  w.document.body.innerHTML=out.map(s=>'<img src="'+s+'" style="width:100%;display:block;page-break-after:always">').join('');w.document.head.insertAdjacentHTML('beforeend','<style>@page{margin:0}</style>');setTimeout(()=>w.print(),500)}
 root.querySelector('.gn-top').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.a){act[b.dataset.a](b);return}
  const t=b.dataset.t;if(t==='img'){fi.value='';fi.click();return}
  if(st.tool===t&&t!=='hand'&&t!=='lasso'){if(pop.classList.contains('show')&&pop.dataset.t===t)pop.classList.remove('show');else popFor(t,b)}else{pop.classList.remove('show');st.tool=t;if(t!=='lasso'&&sel){const i=sel.i;sel=null;live(i)}dots()}});
 fi.onchange=()=>{const f=fi.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{const m=new Image();m.onload=()=>{const k=Math.min(1,1400/Math.max(m.width,m.height)),c=document.createElement('canvas');c.width=m.width*k;c.height=m.height*k;c.getContext('2d').drawImage(m,0,0,c.width,c.height);const src=c.toDataURL(f.type==='image/png'?'image/png':'image/jpeg',.85),w=Math.min(P[cur].w*.5,m.width),h=w*m.height/m.width,it={t:'img',src,x:(P[cur].w-w)/2,y:(P[cur].h-h)/2,w,h};chg(cur,A=>{A.push(it)});st.tool='lasso';sel={i:cur,ids:[it]};dots();live(cur)};m.src=rd.result};rd.readAsDataURL(f)};
 root.addEventListener('keydown',e=>{if(e.target.tagName==='TEXTAREA'||e.target.tagName==='INPUT')return;const k=e.key.toLowerCase();if((e.ctrlKey||e.metaKey)&&k==='z'){e.preventDefault();e.shiftKey?redo():undo()}else if((e.ctrlKey||e.metaKey)&&k==='y')redo();else if((k==='delete'||k==='backspace')&&sel){chg(sel.i,A=>A.filter(x=>!sel.ids.includes(x)));const i=sel.i;sel=null;live(i)}});
 root.tabIndex=0;
 build();fit();dots();hb();size();
 return{setTheme:t=>{root.dataset.th=t},fit:()=>{fit();setZ(st.z)},load:v=>$('.gn-load').classList.toggle('show',!!v),setTitle:t=>$('.gn-ttl').textContent=t,rebuild:(p,it)=>{P=p;items=it;u=[];r=[];sel=null;build();fit();hb()},setIcon:k=>{$('[data-a=back]').innerHTML=ic(k)}}
}
})(window);
