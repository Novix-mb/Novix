(function(W){
const I={emoji:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 14c1 1.6 2.4 2.4 4 2.4s3-.8 4-2.4M9 9.5h.01M15 9.5h.01',star:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',undo:'M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3',redo:'M15 14l5-5-5-5M20 9H10a6 6 0 0 0 0 12h3',pen:'m4 20 1-4L17 4a2.1 2.1 0 0 1 3 3L8 19zM14 7l3 3',hl:'m5 15 8-9 6 6-7 7H6zM3 21h18',er:'m5 13 8-9a2 2 0 0 1 3 0l3 3a2 2 0 0 1 0 3l-7 7H8zM10 20h10',lasso:'M12 4C7 4 3 6 3 9.5S7 15 12 15s9-2 9-5.5S17 4 12 4zM9 15c0 3 1 5 3 5',text:'M5 6V4h14v2M12 4v16M9 20h6',shape:'M4 4h9v9H4zM17 12a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z',img:'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 9h.01',laser:'M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3',note:'M5 4h14v11l-5 5H5zM14 20v-5h5',hand:'M8 11V5a2 2 0 0 1 4 0v5-7a2 2 0 0 1 4 0v8-5a2 2 0 0 1 4 0v8c0 5-3 8-8 8h-1c-2 0-3-1-4-2l-4-5a2 2 0 0 1 3-3z',thumbs:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',plus:'M12 5v14M5 12h14',minus:'M5 12h14',page:'M6 3h9l4 4v14H6zM15 3v4h4M9 13h6M9 17h6',share:'M12 3v12M7 8l5-5 5 5M5 14v6h14v-6',trash:'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',copy:'M8 8h12v12H8zM16 8V4H4v12h4',color:'M12 3c5 5 7 8 7 11a7 7 0 0 1-14 0c0-3 2-6 7-11z',expand:'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',shrink:'M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5',back:'M15 5l-7 7 7 7',dl:'M12 4v11M7 10l5 5 5-5M5 20h14',fill:'M5 5h14v14H5zM5 19L19 5M5 12l7-7M12 19l7-7',s_line:'M5 19L19 5',s_arrow:'M5 19L19 5M10 5h9v9',s_rect:'M4 6h16v12H4z',s_ell:'M3 12a9 6 0 1 0 18 0a9 6 0 1 0-18 0',s_tri:'M12 4l9 16H3z',s_dia:'M12 3l9 9-9 9-9-9z',portrait:'M7 3h10v18H7z',landscape:'M3 7h18v10H3z',upload:'M12 16V4M7 9l5-5 5 5M5 20h14',trash:'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',plus:'M12 5v14M5 12h14',copy:'M9 9h11v11H9zM5 15V4h11',full:'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',fullx:'M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5',move:'M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3',vone:'M7 3h10v18H7zM10 8h4M10 12h4',vall:'M3 4h7v16H3zM14 4h7v16h-7z',pl:'M15 6l-6 6 6 6',pr:'M9 6l6 6-6 6',pu:'M6 15l6-6 6 6',pd:'M6 9l6 6 6-6',padd:'M6 3h8l4 4v4M6 3v18h6M17 14v6M14 17h6',pdel:'M6 3h8l4 4v4M6 3v18h6M14 17h6'};
const ic=k=>'<svg viewBox="0 0 24 24"><path d="'+I[k]+'"/></svg>';
const PAL=['#000000','#6b6b70','#ef4444','#f97316','#eab308','#22c55e','#06b6d4','#3b82f6','#8b5cf6','#ec4899','#ffffff','#7c4a1e'];
const HLP=['#fde047','#86efac','#7dd3fc','#f9a8d4','#fdba74','#c4b5fd'];
const IM={};
const img=s=>{let m=IM[s];if(!m){m=IM[s]=new Image();m.onload=()=>W.dispatchEvent(new Event('gn-img'));m.src=s}return m};
const tcv=document.createElement('canvas').getContext('2d');
function layout(it){tcv.font=(it.b?'700 ':'')+it.s+'px sans-serif';const lh=it.s*1.25,rows=[],mw=it.bg?Math.max(40,(it.mw||240)-20):0;
 for(const ln of String(it.str).split('\n')){const rtl=isRtl(ln);if(!mw){rows.push({t:ln,rtl});continue}
  let cu='';for(const wd of ln.split(' ')){const t=cu?cu+' '+wd:wd;if(cu&&tcv.measureText(t).width>mw){rows.push({t:cu,rtl});cu=wd}else cu=t;
   while(cu.length>1&&tcv.measureText(cu).width>mw){let k=cu.length-1;while(k>1&&tcv.measureText(cu.slice(0,k)).width>mw)k--;rows.push({t:cu.slice(0,k),rtl});cu=cu.slice(k)}}
  rows.push({t:cu,rtl})}
 let w=0;for(const r of rows)w=Math.max(w,tcv.measureText(r.t).width);return{rows,lh,w:mw||w+6,h:rows.length*lh}}
 function lines(it){return String(it.str).split('\n')}
function bb(it){
 if(it.t==='pen'||it.t==='hl'||it.t==='er'){let a=1e9,b=1e9,c=-1e9,d=-1e9;for(const p of it.p){a=Math.min(a,p[0]);b=Math.min(b,p[1]);c=Math.max(c,p[0]);d=Math.max(d,p[1])}const h=it.w/2;return[a-h,b-h,c+h,d+h]}
 if(it.t==='sh'){const h=it.w/2;return[Math.min(it.x1,it.x2)-h,Math.min(it.y1,it.y2)-h,Math.max(it.x1,it.x2)+h,Math.max(it.y1,it.y2)+h]}
 if(it.t==='tx'){const L2=layout(it),q=[it.x,it.y,it.x+L2.w,it.y+L2.h];if(it.bg)return[q[0]-10,q[1]-8,Math.max(q[2]+10,q[0]-10+(it.mw||0)),Math.max(q[3]+8,q[1]-8+(it.mh||0))];return q}
 return[it.x,it.y,it.x+it.w,it.y+it.h]}
function xf(it,f,k){
 const o=Object.assign({},it);
 if(it.p){o.p=it.p.map(q=>{const r=f(q[0],q[1]);return[r[0],r[1],q[2]]});o.w=it.w*k}
 else if(it.t==='sh'){const a=f(it.x1,it.y1),b=f(it.x2,it.y2);o.x1=a[0];o.y1=a[1];o.x2=b[0];o.y2=b[1];o.w=it.w*k;if(it.ts)o.ts=it.ts*k}
 else{const a=f(it.x,it.y);o.x=a[0];o.y=a[1];if(it.t==='tx'){o.s=it.s*k;if(it.mw){o.mw=it.mw*k;o.mh=it.mh*k}if(it.rd)o.rd=it.rd*k}else{o.w=it.w*k;o.h=it.h*k}}
 return o}
function shp(c,it){
 const{x1,y1,x2,y2}=it;c.beginPath();
 if(it.k==='line'||it.k==='arrow'){c.moveTo(x1,y1);c.lineTo(x2,y2);if(it.k==='arrow'){const a=Math.atan2(y2-y1,x2-x1),l=Math.max(12,it.w*4);c.moveTo(x2,y2);c.lineTo(x2-l*Math.cos(a-.5),y2-l*Math.sin(a-.5));c.moveTo(x2,y2);c.lineTo(x2-l*Math.cos(a+.5),y2-l*Math.sin(a+.5))}}
 else if(it.k==='rect')c.rect(Math.min(x1,x2),Math.min(y1,y2),Math.abs(x2-x1),Math.abs(y2-y1));
 else if(it.k==='ell')c.ellipse((x1+x2)/2,(y1+y2)/2,Math.abs(x2-x1)/2,Math.abs(y2-y1)/2,0,0,7);
 else if(it.k==='tri'){c.moveTo((x1+x2)/2,Math.min(y1,y2));c.lineTo(Math.max(x1,x2),Math.max(y1,y2));c.lineTo(Math.min(x1,x2),Math.max(y1,y2));c.closePath()}
 else{const mx=(x1+x2)/2,my=(y1+y2)/2;c.moveTo(mx,Math.min(y1,y2));c.lineTo(Math.max(x1,x2),my);c.lineTo(mx,Math.max(y1,y2));c.lineTo(Math.min(x1,x2),my);c.closePath()}
 if(it.f&&it.k!=='line'&&it.k!=='arrow')c.fill();c.stroke()}
function ink(c,it){drawInkStroke(c,it.p,it.w,{brush:it.k==='brush',pressure:!!it.rp})}
function dr(c,it,s){
 c.save();c.scale(s,s);c.lineCap=c.lineJoin='round';
 if(it.rot&&(it.t==='img'||it.em)){const b0=bb(it),cx0=(b0[0]+b0[2])/2,cy0=(b0[1]+b0[3])/2;c.translate(cx0,cy0);c.rotate(it.rot);c.translate(-cx0,-cy0)}
 if(it.p){
  c.strokeStyle=c.fillStyle=it.c;c.lineWidth=it.w;
  if(it.t==='hl'){c.globalAlpha=.38;c.lineCap='butt'}
  if(it.t==='er'){c.globalCompositeOperation='destination-out';c.strokeStyle=c.fillStyle='#000'}
  const p=it.p;
  if(p.length<2){c.beginPath();c.arc(p[0][0],p[0][1],it.w/2,0,7);c.fill()}
  else if(it.pr&&it.t==='pen'){ink(c,it)}
  else{c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let k=1;k<p.length-1;k++)c.quadraticCurveTo(p[k][0],p[k][1],(p[k][0]+p[k+1][0])/2,(p[k][1]+p[k+1][1])/2);c.lineTo(p[p.length-1][0],p[p.length-1][1]);c.stroke()}
 }else if(it.t==='sh'){c.strokeStyle=c.fillStyle=it.c;c.lineWidth=it.w;shp(c,it);if(it.tx)shTx(c,it)}
 else if(it.t==='tx'){if(it.bg){const b=bb(it);c.fillStyle=it.bg;c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=8;if(it.rd&&c.roundRect){c.beginPath();c.roundRect(b[0],b[1],b[2]-b[0],b[3]-b[1],it.rd);c.fill()}else c.fillRect(b[0],b[1],b[2]-b[0],b[3]-b[1]);c.shadowBlur=0}const L2=layout(it);c.fillStyle=it.c;c.font=(it.b?'700 ':'')+it.s+'px sans-serif';c.textBaseline='top';L2.rows.forEach((r,k)=>{c.direction=r.rtl?'rtl':'ltr';c.textAlign=r.rtl?'right':'left';c.fillText(r.t,r.rtl?it.x+L2.w:it.x,it.y+k*L2.lh)})}
 else if(it.t==='tape'){c.globalAlpha=it.o!=null?it.o:.98;c.fillStyle=it.c;c.fillRect(it.x,it.y,it.w,it.h);c.beginPath();c.rect(it.x,it.y,it.w,it.h);c.clip();c.strokeStyle='rgba(255,255,255,.35)';c.fillStyle='rgba(255,255,255,.45)';c.lineWidth=5;const pt=it.pat||'stripe';
  if(pt==='dots'){for(let a=it.x+8;a<it.x+it.w;a+=16)for(let d=it.y+8;d<it.y+it.h;d+=16){c.beginPath();c.arc(a,d,3,0,7);c.fill()}}
  else if(pt==='check'){c.lineWidth=7;for(let a=it.x;a<it.x+it.w;a+=20){c.beginPath();c.moveTo(a,it.y);c.lineTo(a,it.y+it.h);c.stroke()}for(let d=it.y;d<it.y+it.h;d+=20){c.beginPath();c.moveTo(it.x,d);c.lineTo(it.x+it.w,d);c.stroke()}}
  else if(pt==='stripe'){for(let k=-it.h;k<it.w;k+=16){c.beginPath();c.moveTo(it.x+k,it.y+it.h);c.lineTo(it.x+k+it.h,it.y);c.stroke()}}}
 else if(it.t==='img'){const m=img(it.src);if(m.complete&&m.naturalWidth)c.drawImage(m,it.x,it.y,it.w,it.h)}
 c.restore()}
function segd(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;let t=l?((px-ax)*dx+(py-ay)*dy)/l:0;t=Math.max(0,Math.min(1,t));return Math.hypot(px-ax-t*dx,py-ay-t*dy)}
function hit(it,x,y,r){
 if(it.t==='er')return false;
 if(it.p){const p=it.p;if(p.length<2)return Math.hypot(p[0][0]-x,p[0][1]-y)<r+it.w/2;for(let k=1;k<p.length;k++)if(segd(x,y,p[k-1][0],p[k-1][1],p[k][0],p[k][1])<r+it.w/2)return true;return false}
 const b=bb(it);
 if(it.t==='sh'){const[a,c,d,e]=[Math.min(it.x1,it.x2),Math.min(it.y1,it.y2),Math.max(it.x1,it.x2),Math.max(it.y1,it.y2)];if(it.k==='line'||it.k==='arrow')return segd(x,y,it.x1,it.y1,it.x2,it.y2)<r+it.w;return x>a-r&&x<d+r&&y>c-r&&y<e+r&&(it.f||!(x>a+r&&x<d-r&&y>c+r&&y<e-r))}
 return x>=b[0]&&x<=b[2]&&y>=b[1]&&y<=b[3]}
function inPoly(x,y,P){let o=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])o=!o}return o}

function drawInkStroke(c,P,W,o){
 o=o||{};
 const n=P.length,br=!!o.brush,rp=!!o.pressure;
 if(n<2)return;
 c.beginPath();
 const Q=P.map((b,i)=>{if(i===0||i===n-1)return b;const a=P[i-1],d=P[i+1];return[(a[0]+2*b[0]+d[0])/4,(a[1]+2*b[1]+d[1])/4,b[2]]});
 let v=0;
 const L=[],R=[];
 for(let i=0;i<n;i++){
  const q=Q[i];
  if(i){v=v*.75+Math.hypot(q[0]-Q[i-1][0],q[1]-Q[i-1][1])*.25}
  const pr=rp?q[2]:Math.max(.2,Math.min(1,1-v/(br?16:22)));
  const tp=Math.min(1,(i+1)/7,(n-i)/9),e=tp*tp*(3-2*tp);
  const r=Math.max(.35,W*(br?.25+pr*1.5:.45+pr*.85)/2*(.25+.75*e));
  const a=Q[Math.max(0,i-1)],d=Q[Math.min(n-1,i+1)];
  let dx=d[0]-a[0],dy=d[1]-a[1];
  const l=Math.hypot(dx,dy)||1;
  dx/=l;dy/=l;
  L.push([q[0]-dy*r,q[1]+dx*r]);
  R.push([q[0]+dy*r,q[1]-dx*r]);
 }
 const z=Q[n-1];
 c.moveTo(L[0][0],L[0][1]);
 for(let i=1;i<n-1;i++)c.quadraticCurveTo(L[i][0],L[i][1],(L[i][0]+L[i+1][0])/2,(L[i][1]+L[i+1][1])/2);
 c.lineTo(L[n-1][0],L[n-1][1]);
 c.arc(z[0],z[1],Math.hypot(L[n-1][0]-z[0],L[n-1][1]-z[1]),Math.atan2(L[n-1][1]-z[1],L[n-1][0]-z[0]),Math.atan2(R[n-1][1]-z[1],R[n-1][0]-z[0]),false);
 for(let i=n-1;i>0;i--)c.quadraticCurveTo(R[i][0],R[i][1],(R[i][0]+R[i-1][0])/2,(R[i][1]+R[i-1][1])/2);
 c.lineTo(R[0][0],R[0][1]);
 c.closePath();
 c.fill();
}
if(typeof module!=='undefined'&&module.exports)module.exports={drawInkStroke};
const isRtl=s=>{const m=/[A-Za-z\u00C0-\u024F\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/.exec(s);return!!m&&/[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/.test(m[0])};
const NBC=['#fde68a','#fbcfe8','#bbf7d0','#bfdbfe','#fed7aa','#ddd6fe','#ffffff'];
const STK={face:['😀','😃','😄','😁','😆','😅','😂','🙂','😉','😊','😍','🥰','😎','🤓','🤔','😴','😢','😭','😡','🥳','🤯','😇','🙌','👍','👎','👏','💪','🙏','✌️','👀','❤️','💔'],
 study:['⭐','🌟','✅','❗','❓','💡','📌','📚','📖','✏️','📝','🖍️','📎','🔔','⏰','🎯','🧠','🏆','🎓','🔬','🧪','🧮','📐','📏','🗓️','💯','🔥','📊','📈','🧾','🔖','📢'],
 sym:['✔️','✖️','➕','➖','➗','⭕','‼️','⚠️','⛔','♻️','➡️','⬅️','⬆️','⬇️','↩️','🔁','📍','🚩','🏁','💲','〰️','➰','🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🔺','🔻','♥️','♦️','♣️','♠️'],
 nat:['🌞','🌙','✨','⚡','💧','🌈','☁️','❄️','🌸','🌳','🍀','🌍','🪐','🦋','🐱','🐶','🍎','☕','🎵','🚀','🎈','🎁','🎉','🧸']};
const LABELS=[['IMPORTANT','#ef4444','#fff'],['مهم','#ef4444','#fff'],['EXAM','#f97316','#fff'],['امتحان','#f97316','#fff'],['TO DO','#3b82f6','#fff'],['للمراجعة','#8b5cf6','#fff'],['DONE','#22c55e','#fff'],['تم ✓','#22c55e','#fff'],['NOTE','#eab308','#1c1c1e'],['ملاحظة','#eab308','#1c1c1e'],['IDEA','#06b6d4','#fff'],['فكرة 💡','#06b6d4','#fff'],['DEFINITION','#0f766e','#fff'],['تعريف','#0f766e','#fff'],['QUESTION','#ec4899','#fff'],['سؤال','#ec4899','#fff']];
const WASHI=[['#f9a8d4','stripe'],['#fcd34d','dots'],['#86efac','check'],['#93c5fd','stripe'],['#c4b5fd','dots'],['#fdba74','check'],['#fda4af','plain'],['#67e8f9','stripe']];

const SZ={A3:[1200,1697],A4:[900,1273],A5:[744,1052],Letter:[900,1165],'16:9':[720,1280],'1:1':[1000,1000]};
const lum=h=>{const m=/^#?([0-9a-f]{6})$/i.exec(h);if(!m)return 0;const n=parseInt(m[1],16);return(.299*(n>>16)+.587*((n>>8)&255)+.114*(n&255))/255};
function shTx(c,it){const b=[Math.min(it.x1,it.x2),Math.min(it.y1,it.y2),Math.max(it.x1,it.x2),Math.max(it.y1,it.y2)],bw=b[2]-b[0],bh=b[3]-b[1],fs=it.ts||24,mw=Math.max(20,bw*(it.k==='rect'?.86:.62)),rows=[];
 c.font=fs+'px sans-serif';c.textBaseline='middle';c.textAlign='center';c.fillStyle=it.f?(lum(it.c)>.6?'#111':'#fff'):(it.tc||'#000');
 for(const ln of String(it.tx).split('\n')){let q='';for(const wd of ln.split(' ')){const t=q?q+' '+wd:wd;if(q&&c.measureText(t).width>mw){rows.push(q);q=wd}else q=t}rows.push(q)}
 const cy=(b[1]+b[3])/2+(it.k==='tri'?bh*.16:0),h=rows.length*fs*1.25;rows.forEach((l,k)=>c.fillText(l,(b[0]+b[2])/2,cy-h/2+fs*1.25*(k+.5)))}
const toBytes=c=>new Promise(r=>c.toBlob(b=>b.arrayBuffer().then(a=>r(new Uint8Array(a))),'image/jpeg',.92));
function mkPdf(pg){const enc=new TextEncoder(),ch=[],off=[];let len=0;const put=d=>{const u8=typeof d==='string'?enc.encode(d):d;ch.push(u8);len+=u8.length},obj=(n,fn)=>{off[n]=len;put(n+' 0 obj\n');fn();put('\nendobj\n')},n=pg.length,f2=v=>v.toFixed(2);
 put('%PDF-1.4\n');obj(1,()=>put('<</Type/Catalog/Pages 2 0 R>>'));
 obj(2,()=>put('<</Type/Pages/Count '+n+'/Kids['+pg.map((_,i)=>(3+i*3)+' 0 R').join(' ')+']>>'));
 pg.forEach((p,i)=>{const a=3+i*3,cs='q '+f2(p.pw)+' 0 0 '+f2(p.ph)+' 0 0 cm /I'+i+' Do Q';
  obj(a,()=>put('<</Type/Page/Parent 2 0 R/MediaBox[0 0 '+f2(p.pw)+' '+f2(p.ph)+']/Resources<</XObject<</I'+i+' '+(a+2)+' 0 R>>>>/Contents '+(a+1)+' 0 R>>'));
  obj(a+1,()=>put('<</Length '+cs.length+'>>\nstream\n'+cs+'\nendstream'));
  obj(a+2,()=>{put('<</Type/XObject/Subtype/Image/Width '+p.w+'/Height '+p.h+'/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length '+p.d.length+'>>\nstream\n');put(p.d);put('\nendstream')})});
 const xr=len,tot=3+n*3;put('xref\n0 '+tot+'\n0000000000 65535 f \n');for(let k=1;k<tot;k++)put(String(off[k]).padStart(10,'0')+' 00000 n \n');
 put('trailer\n<</Size '+tot+'/Root 1 0 R>>\nstartxref\n'+xr+'\n%%EOF');return new Blob(ch,{type:'application/pdf'})}
async function saveFile(n,b){try{const c=W.claude&&W.claude.use?await W.claude.use('downloads'):null;if(c){await c.save({filename:n,data:b});return}}catch(er){if(er&&er.code==='declined')return}
 const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;document.body.appendChild(a);a.click();setTimeout(()=>{a.remove();URL.revokeObjectURL(a.href)},4000)}
W.GN=function(root,o){
 const T=(e,a)=>o.lang==='ar'?a:e;
 const st={view:(o.fixed&&(()=>{try{return localStorage.getItem('gn:pdfview')}catch(e){return null}})()==='one')?'one':'all',tool:'pen',z:1,pen:{c:'#111827',w:4,k:'fountain'},hl:{c:'#fde047',w:14},er:{m:'stroke',w:18},sh:{k:'line',c:'#000000',w:3,f:0},tx:{c:'#000000',s:24},nt:{bg:'#fde68a',c:'#1c1c1e',s:22},ls:{c:'#ef4444',w:6}};
 let P=o.pages,items=o.items,cur=0,u=[],r=[],sel=null,penSeen=0,mounted={},svT=0,rrT=0,sc,pgs,pop,pill,side,els=[],io,laser=[],lasT=0,lasEnd=0,lasHov=null,curTa=null,delArm=0,erHov=null;
 root.classList.add('gn');root.dataset.tool='pen';root.dataset.view=st.view;if(o.fixed)root.dataset.fixed='1';
 const save=()=>{clearTimeout(svT);svT=setTimeout(()=>o.save&&o.save(items,P),500)};
 const tools=[['pen',T('Pen','قلم')],['hl',T('Highlighter','هايلايتر')],['er',T('Eraser','ممحاة')],['shape',T('Shapes','أشكال')],['text',T('Text','نص')],['note',T('Sticky note','ملاحظة')],['emoji',T('Emoji & stickers','إيموجي وملصقات')],['img',T('Image','صورة')],['lasso',T('Lasso','تحديد')],['laser',T('Laser','ليزر')],['hand',T('Hand','يد')]];
 root.innerHTML='<div class="gn-top"><button data-a="back" title="'+T('Back','رجوع')+'">'+ic(o.board?'expand':'back')+'</button><div class="gn-ttl"></div><button data-a="side" title="'+T('Pages','الصفحات')+'">'+ic('thumbs')+'</button>'+(o.fixed?'<button data-a="view" title="'+T('Page view','طريقة العرض')+'">'+ic(st.view==="one"?'vone':'vall')+'</button>':'')+'<i class="gn-sep"></i><button data-a="undo" title="'+T('Undo','تراجع')+'">'+ic('undo')+'</button><button data-a="redo" title="'+T('Redo','إعادة')+'">'+ic('redo')+'</button><i class="gn-sep"></i><div class="gn-tools">'+tools.map(t=>'<button data-t="'+t[0]+'" title="'+t[1]+'">'+ic(t[0]==='shape'?'shape':t[0])+'<span class="gn-dot"></span>'+'</button>'+(t[0]==='er'?'<button data-a="clr" class="gn-clr" title="'+T('Clear page','مسح الصفحة')+'">'+ic('trash')+'</button>':'')).join('')+'</div><i class="gn-sep"></i><button data-a="padd" title="'+T('Add page','إضافة ورقة')+'">'+ic('padd')+'</button><button data-a="pdup" title="'+T('Duplicate page','تكرار الورقة')+'">'+ic('copy')+'</button><button data-a="pdel" class="gn-clr" title="'+T('Delete page','حذف الورقة')+'">'+ic('pdel')+'</button><div class="gn-sp"></div><button data-a="zo">'+ic('minus')+'</button><button data-a="zr" title="'+T('Fit page to screen','ملاءمة الورقة للشاشة')+'" style="min-width:52px">100%</button><button data-a="zi">'+ic('plus')+'</button><i class="gn-sep"></i>'+(o.board?'<button data-a="page" title="'+T('Page','الصفحة')+'">'+ic('page')+'</button>':'')+'<button data-a="exp" title="'+T('Download PDF','تحميل PDF')+'">'+ic('dl')+'</button>'+(o.fixed?'':'<button data-a="fs" title="'+T('Fullscreen','ملء الشاشة')+'">'+ic('full')+'</button>')+'</div><div class="gn-body"><div class="gn-side"></div><div class="gn-sc"><div class="gn-pgs"></div></div><div class="gn-pop"></div><div class="gn-pill"><button data-a="pv" title="'+T('Previous page','الصفحة السابقة')+'">'+ic(st.view==='one'?'pl':'pu')+'</button><span>'+T('Page','صفحة')+'</span><input type="number" min="1" value="1"><span class="tot"></span><button data-a="nx" title="'+T('Next page','الصفحة التالية')+'">'+ic(st.view==='one'?'pr':'pd')+'</button></div><div class="gn-load">'+T('Loading…','جارٍ التحميل…')+'</div><input type="file" accept="image/*" hidden></div>';
 const $=s=>root.querySelector(s);
 sc=$('.gn-sc');pgs=$('.gn-pgs');pop=$('.gn-pop');pill=$('.gn-pill input');side=$('.gn-side');const vm=document.createElement('div');vm.className='gn-vm';vm.innerHTML='<button data-v="one">'+T('Single page','صفحة واحدة')+'</button><button data-v="all">'+T('All pages','كل الصفحات')+'</button>';root.appendChild(vm);vm.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;setView(b.dataset.v);vm.classList.remove('show')});root.addEventListener('pointerdown',e=>{if(vm.classList.contains('show')&&!e.target.closest('.gn-vm,[data-a=view]'))vm.classList.remove('show')},true);root.querySelector('.gn-pill').addEventListener('click',e=>{const b=e.target.closest('button[data-a]');if(b)act[b.dataset.a]()});const tp=document.createElement('div'),ts=document.createElement('div');tp.className='gn-tip';ts.className='gn-toast';root.appendChild(tp);root.appendChild(ts);let tt=0;
 function toast(m){ts.textContent=m;ts.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>ts.classList.remove('show'),2200)}
 if(W.matchMedia&&W.matchMedia('(hover:hover)').matches){
  root.addEventListener('mouseover',e=>{const b=e.target.closest('button[title],button[data-tip]');if(!b)return;if(b.title){b.setAttribute('aria-label',b.title);b.dataset.tip=b.title;b.removeAttribute('title')}const r=b.getBoundingClientRect(),rr=root.getBoundingClientRect();tp.textContent=b.dataset.tip;tp.style.left=Math.max(40,Math.min(rr.width-40,r.left-rr.left+r.width/2))+'px';tp.style.top=(r.bottom-rr.top+8)+'px';tp.classList.add('show')});
  root.addEventListener('mouseout',e=>{if(e.target.closest('button[data-tip]'))tp.classList.remove('show')});
  root.addEventListener('pointerdown',()=>tp.classList.remove('show'),true)}
 const fi=$('input[type=file]'),pf=document.createElement('input');pf.type='file';pf.accept='image/*';pf.hidden=true;root.appendChild(pf);
 pf.onchange=()=>{const f=pf.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{const m=new Image();m.onload=()=>{const k=Math.min(1,1700/Math.max(m.width,m.height)),c=document.createElement('canvas');c.width=Math.round(m.width*k);c.height=Math.round(m.height*k);c.getContext('2d').drawImage(m,0,0,c.width,c.height);const bg=c.toDataURL('image/jpeg',.85),w=m.width>m.height?1273:900;P.splice(cur+1,0,{w,h:Math.round(w*m.height/m.width),paper:'custom',bg});items.splice(cur+1,0,[]);u=[];r=[];sel=null;build();hb();save();setTimeout(()=>goto(cur+1),60);pop.classList.remove('show');toast(T('Custom paper added','تمت إضافة الورقة المخصصة'))};m.src=rd.result};rd.readAsDataURL(f)};
 $('.gn-ttl').textContent=o.title||'';
 const col=t=>t==='pen'?st.pen.c:t==='hl'?st.hl.c:t==='shape'?st.sh.c:t==='text'?st.tx.c:t==='note'?st.nt.bg:t==='laser'?st.ls.c:'#ffffff';
 function dots(){root.querySelectorAll('.gn-tools button').forEach(b=>{const d=b.querySelector('.gn-dot');if(d)d.style.setProperty('--cc',col(b.dataset.t));b.classList.toggle('on',b.dataset.t===st.tool||(b.dataset.t==='emoji'&&pop.classList.contains('show')&&pop.dataset.t==='emoji'))});root.dataset.tool=st.tool;if(st.tool!=='er'&&erHov){const q=erHov.i;erHov=null;live(q)}if(st.tool!=='laser'&&lasHov){const i=lasHov.i;lasHov=null;live(i)}}
 function hb(){$('[data-a=undo]').disabled=!u.length;$('[data-a=redo]').disabled=!r.length}
 function chg(i,fn){u.push({i,a:items[i].slice()});if(u.length>80)u.shift();r.length=0;const n=fn(items[i]);if(n)items[i]=n;redraw(i);save();hb()}
 function undo(){const e=u.pop();if(!e)return;r.push({i:e.i,a:items[e.i].slice()});items[e.i]=e.a;sel=null;redraw(e.i);save();hb()}
 function redo(){const e=r.pop();if(!e)return;u.push({i:e.i,a:items[e.i].slice()});items[e.i]=e.a;sel=null;redraw(e.i);save();hb()}

 function build(){
  io&&io.disconnect();pgs.innerHTML='';mounted={};els=[];
  P.forEach((p,i)=>{const d=document.createElement('div');d.className='gn-pg';d.dataset.i=i;d.innerHTML='<canvas class="gbs"></canvas><canvas class="ik"></canvas><canvas class="lv"></canvas>';pgs.appendChild(d);els.push(d);bind(d.querySelector('.lv'),i)});
  io=new IntersectionObserver(es=>es.forEach(e=>{const i=+e.target.dataset.i;e.isIntersecting?mount(i):unmount(i)}),{root:sc,rootMargin:'1400px 0px'});
  els.forEach(d=>io.observe(d));els.forEach((d,k)=>d.classList.toggle('solo',k===cur));size();$('.tot').textContent='/ '+P.length;thumbs()}
 function size(){P.forEach((p,i)=>{els[i].style.width=p.w*st.z+'px';els[i].style.height=p.h*st.z+'px'});$('[data-a=zr]').textContent=Math.round(st.z*100)+'%'}
 const dpr=()=>Math.min(W.devicePixelRatio||1,2);
 function mount(i){const d=els[i];if(!d)return;const bs=d.querySelector('.gbs'),ik=d.querySelector('.ik'),lv=d.querySelector('.lv');let w=Math.round(P[i].w*st.z*dpr()),h=Math.round(P[i].h*st.z*dpr());if(o.maxPx&&w*h>o.maxPx){const k=Math.sqrt(o.maxPx/(w*h));w=Math.round(w*k);h=Math.round(h*k)}
  const key=w+'x'+h;if(mounted[i]===key)return;mounted[i]=key;[bs,ik,lv].forEach(c=>{c.width=w;c.height=h});
  const p=o.base&&o.base(i,bs,w,P[i]);redraw(i);if(p&&p.catch)p.catch(()=>{})}
 function unmount(i){if(!mounted[i])return;delete mounted[i];els[i].querySelectorAll('canvas').forEach(c=>{c.width=1;c.height=1})}
 function redraw(i){const d=els[i];if(!d||!mounted[i])return;const c=d.querySelector('.ik'),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);const s=c.width/P[i].w;for(const it of items[i])dr(x,it,s);live(i);if(thT[i]===undefined)thT[i]=setTimeout(()=>{delete thT[i];th1(i)},250)}
 W.addEventListener('gn-img',()=>{for(const i in mounted)redraw(+i)});

 let L=null,ls=null;
 function rgb3(c){const m=/^#?([0-9a-f]{6})$/i.exec(c),n=m?parseInt(m[1],16):15684676;return[n>>16,(n>>8)&255,n&255]}
 function mixw(c,k){const q=rgb3(c);return'rgb('+q.map(v=>Math.round(v+(255-v)*k)).join(',')+')'}
 function lsr(x,s,pts,vis){const z=st.z,c=st.ls.c,sw=st.ls.w||6,W=sw*2.2/z,n=Date.now(),dr0=L&&L.k==='l',N=pts.length,q=rgb3(c);let a0=vis,cut=0;
  if(!dr0&&N>0&&vis>=1){const f=Math.max(0,Math.min(1,(n-lasEnd-1050)/600));cut=Math.floor(f*N);a0=vis*(1-f*f)}
  x.save();x.scale(s,s);x.lineCap=x.lineJoin='round';x.globalAlpha=a0;
  const S=[];for(let k=cut;k<N;k++){const p=pts[k],id=p.s||0;if(!S.length||S[S.length-1].id!==id)S.push({id,a:[]});S[S.length-1].a.push([p.x,p.y,.5])}
  for(const g of S){if(g.a.length<2){const d=g.a[0],R=W*.62;x.shadowColor=c;x.shadowBlur=16*s/z;x.fillStyle=c;x.beginPath();x.arc(d[0],d[1],R,0,7);x.fill();x.shadowBlur=0;x.fillStyle=mixw(c,.62);x.beginPath();x.arc(d[0],d[1],R*.45,0,7);x.fill();continue}x.shadowColor=c;x.shadowBlur=16*s/z;x.fillStyle=c;drawInkStroke(x,g.a,W,{});x.shadowBlur=0;x.fillStyle=mixw(c,.62);drawInkStroke(x,g.a,W*.45,{})}
  const hf=(dr0||vis<1)?1:Math.max(0,1-(n-lasEnd)/260);
  if(hf>0&&vis>0&&N){const h=pts[N-1],R=(sw*2.6+10)/z*(1+.1*Math.sin(n/110)),g=x.createRadialGradient(h.x,h.y,0,h.x,h.y,R);
   g.addColorStop(0,'rgba('+q+',.9)');g.addColorStop(.4,'rgba('+q+',.4)');g.addColorStop(1,'rgba('+q+',0)');x.globalAlpha=vis*hf;x.fillStyle=g;x.beginPath();x.arc(h.x,h.y,R,0,7);x.fill();
   x.fillStyle=mixw(c,.8);x.beginPath();x.arc(h.x,h.y,sw*.45/z+1.5/z,0,7);x.fill();x.strokeStyle=c;x.lineWidth=1.4/z;x.stroke()}
  x.restore()}
 function live(i){const d=els[i];if(!d||!mounted[i])return;const c=d.querySelector('.lv'),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);const s=c.width/P[i].w;
  if(L&&L.i===i&&L.it&&L.it.t!=='er')dr(x,L.it,s);
  if(ls&&ls.i===i&&ls.p){x.save();x.scale(s,s);x.strokeStyle='#3b82f6';x.lineWidth=1.6/st.z;x.setLineDash([6/st.z,5/st.z]);x.beginPath();ls.p.forEach((q,k)=>k?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.stroke();x.restore()}
  if(sel&&sel.i===i){const b=selBox(),ag=selAng(),ccx=(b[0]+b[2])/2,ccy=(b[1]+b[3])/2;x.save();x.scale(s,s);x.translate(ccx,ccy);x.rotate(ag);x.translate(-ccx,-ccy);x.strokeStyle='#3b82f6';x.lineWidth=1.5/st.z;x.setLineDash([6/st.z,4/st.z]);x.strokeRect(b[0],b[1],b[2]-b[0],b[3]-b[1]);x.setLineDash([]);x.fillStyle='#fff';x.beginPath();x.arc(b[2],b[3],8/st.z,0,7);x.fill();x.stroke();
   if(sel.ids.some(q=>q.t==='img'||q.em)){const rx=b[2]-28/st.z,ry=b[3],r=10/st.z;x.setLineDash([]);x.fillStyle='#3b82f6';x.beginPath();x.arc(rx,ry,r,0,7);x.fill();x.strokeStyle='#fff';x.lineWidth=1.7/st.z;x.beginPath();x.arc(rx,ry,r*.48,-2.6,1.6);x.stroke();const ex=rx,ey=ry+r*.48;x.fillStyle='#fff';x.beginPath();x.moveTo(ex-r*.38,ey);x.lineTo(ex+r*.1,ey-r*.3);x.lineTo(ex+r*.1,ey+r*.3);x.closePath();x.fill()}
   x.restore()}
  if(laser.length&&laser[0].i===i)lsr(x,s,laser,1);else if(!laser.length&&lasHov&&lasHov.i===i)lsr(x,s,[lasHov],.6);ering(x,s,i)
  selbar(i)}
 function selAng(){const a=sel&&(sel.tmp||sel.ids);return a&&a.length===1&&(a[0].t==='img'||a[0].em)?(a[0].rot||0):0}
 function unrot(x,y){const a=selAng();if(!a||!sel)return[x,y];const b=selBox(),cx=(b[0]+b[2])/2,cy=(b[1]+b[3])/2,c=Math.cos(-a),sn=Math.sin(-a),dx=x-cx,dy=y-cy;return[cx+dx*c-dy*sn,cy+dx*sn+dy*c]}
 function selBox(){let b=[1e9,1e9,-1e9,-1e9];for(const it of sel.ids){const q=bb(it);b=[Math.min(b[0],q[0]),Math.min(b[1],q[1]),Math.max(b[2],q[2]),Math.max(b[3],q[3])]}const m=4;return[b[0]-m,b[1]-m,b[2]+m,b[3]+m]}
 function recolor(i,ids,c){const n=ids.map(x=>x.t==='img'?x:x.bg?Object.assign({},x,{bg:mixw(c,.62)}):Object.assign({},x,{c}));chg(i,A=>A.map(x=>ids.includes(x)?n[ids.indexOf(x)]:x));sel={i,ids:n,free:sel&&sel.free};live(i)}
 function palette(e,i,ids){const p=document.createElement('div');p.className='gn-cpal';p.innerHTML=PAL.map(c=>'<b data-c="'+c+'" style="background:'+c+'"></b>').join('')+'<input type="color" value="#3b82f6" title="'+T('Custom color','لون مخصص')+'">';p.onclick=ev=>{const b=ev.target.closest('b');if(b)recolor(i,ids,b.dataset.c)};const ci=p.querySelector('input');ci.onchange=()=>recolor(i,ids,ci.value);e.appendChild(p)}
 function selbar(i){root.dataset.sf=sel&&sel.free?'1':'0';els.forEach(d=>{const b=d.querySelector('.gn-sel');if(b)b.remove()});if(!sel||sel.i!==i||(sel.drag&&!(L&&L.k==='r'&&L.i===i)))return;const b=selBox(),emo=sel.ids.every(x=>x.em),one=sel.ids.length===1&&sel.ids[0].t==='sh'&&sel.ids[0].k!=='line'&&sel.ids[0].k!=='arrow',e=document.createElement('div');e.className='gn-sel show';const ag=selAng(),hh=(b[3]-b[1])/2+46/st.z,ccx=(b[0]+b[2])/2,ccy=(b[1]+b[3])/2;if(ag){e.style.left=(ccx+Math.sin(ag)*hh)*st.z+'px';e.style.top=(ccy-Math.cos(ag)*hh)*st.z+'px';e.style.transform='translate(-50%,-50%) rotate('+ag+'rad)'}else{e.style.left=Math.max(4,b[0]*st.z)+'px';e.style.top=Math.max(4,b[1]*st.z-46)+'px'}e.innerHTML='<button data-s="del" title="'+T('Delete','حذف')+'">'+ic('trash')+'</button><button data-s="dup" title="'+T('Duplicate','نسخ')+'">'+ic('copy')+'</button><button data-s="zout" title="'+T('Shrink','تصغير')+'">'+ic('minus')+'</button><button data-s="zin" title="'+T('Enlarge','تكبير')+'">'+ic('plus')+'</button>'+(emo?'':'<button data-s="col" title="'+T('Recolor','لون')+'">'+ic('color')+'</button>')+(one?'<button data-s="fill" title="'+T('Fill','تعبئة')+'">'+ic('fill')+'</button><button data-s="txt" title="'+T('Text inside','نص داخل الشكل')+'">'+ic('text')+'</button>':'');e.onpointerdown=ev=>ev.stopPropagation();e.onclick=ev=>{const a=ev.target.closest('button');if(!a)return;const ids=sel.ids,k=a.dataset.s;if(k==='del'){chg(i,A=>A.filter(x=>!ids.includes(x)));sel=null}
   else if(k==='dup'){const n=ids.map(x=>xf(x,(X,Y)=>[X+24,Y+24],1));chg(i,A=>{A.push(...n)});sel={i,ids:n,free:sel&&sel.free}}
   else if(k==='fill'){const n=ids.map(x=>x.t==='sh'&&x.k!=='line'&&x.k!=='arrow'?Object.assign({},x,{f:x.f?0:1}):x);chg(i,A=>A.map(x=>ids.includes(x)?n[ids.indexOf(x)]:x));sel={i,ids:n,free:sel&&sel.free}}else if(k==='txt'){shEdit(i,ids[0]);return}else if(k==='zin'||k==='zout'){const kf=k==='zin'?1.25:.8,b0=selBox(),cx0=(b0[0]+b0[2])/2,cy0=(b0[1]+b0[3])/2,n=ids.map(x=>xf(x,(X,Y)=>[cx0+(X-cx0)*kf,cy0+(Y-cy0)*kf],kf));chg(i,A=>A.map(x=>ids.includes(x)?n[ids.indexOf(x)]:x));sel={i,ids:n,free:sel&&sel.free}}else if(k==='col'){const old=e.querySelector('.gn-cpal');if(old){old.remove();return}palette(e,i,ids);return}live(i)};els[i].appendChild(e)}

 function pt(e,lv,i){const r0=lv.getBoundingClientRect();return[(e.clientX-r0.left)/r0.width*P[i].w,(e.clientY-r0.top)/r0.height*P[i].h]}
 function bind(lv,i){
  lv.addEventListener('pointerdown',e=>{
   if(st.tool==='hand'&&e.pointerType!=='pen'&&e.button===0&&ptrs.size<2){panStart(e);return}
    if(e.pointerType==='pen')penSeen=Date.now();else if(e.pointerType==='touch'&&Date.now()-penSeen<1500)return;
   if(ptrs.size>1&&e.pointerType==='touch'){return}
   if(e.button>0)return;const[x,y]=pt(e,lv,i),[ux,uy]=unrot(x,y),t=st.tool;cur=i;e.preventDefault();if(curTa&&(t==='text'||t==='note')){(curTa.fin||curTa.blur.bind(curTa))();return}
   if(sel&&sel.free&&t!=='lasso'){if(sel.i===i){const b=selBox();if(sel.ids.some(q=>q.t==='img'||q.em)&&Math.hypot(ux-(b[2]-28/st.z),uy-b[3])<14/st.z){lv.setPointerCapture(e.pointerId);L={i,k:'r',x,y,b};sel.drag=1;return}if(Math.hypot(ux-b[2],uy-b[3])<22/st.z){lv.setPointerCapture(e.pointerId);L={i,k:'z',x:ux,y:uy,b};sel.drag=1;return}if(ux>b[0]&&ux<b[2]&&uy>b[1]&&uy<b[3]){lv.setPointerCapture(e.pointerId);L={i,k:'m',x,y};sel.drag=1;live(i);return}sel=null;live(i)}else{const o0=sel.i;sel=null;live(o0)}}
   if(t==='pen'||t==='hl'){const s=st[t];lv.setPointerCapture(e.pointerId);L={i,k:'d',it:{t,c:s.c,w:s.w,k:s.k,p:[[x,y,e.pressure||.5]],pr:t==='pen'&&s.k!=='ball',rp:e.pointerType==='pen'}};live(i)}
   else if(t==='er'){lv.setPointerCapture(e.pointerId);L={i,k:'e',ch:0,it:st.er.m==='pixel'?{t:'er',c:'#000',w:st.er.w,p:[[x,y,.5]]}:null,lx:x,ly:y};erHov=null;if(L.it)ikEr(i,L.it.w,[x,y],[x,y]);else{u.push({i,a:items[i].slice()});r.length=0;erase(i,x,y)}live(i)}
   else if(t==='shape'){lv.setPointerCapture(e.pointerId);const s=st.sh;L={i,k:'s',it:{t:'sh',k:s.k,c:s.c,w:s.w,x1:x,y1:y,x2:x,y2:y,f:s.f&&s.k!=='line'&&s.k!=='arrow'?1:0}}}
   else if(t==='laser'){lv.setPointerCapture(e.pointerId);const ap=laser.length&&laser[0].i===i&&Date.now()-lasEnd<=1050,sn=ap?laser[laser.length-1].s+1:0;L={i,k:'l',s:sn};lasHov=null;if(!ap)laser=[];laser.push({i,x,y,s:sn});lasTick()}
   else if(t==='text'||t==='note'){const go=()=>{const f=[...items[i]].reverse().find(it=>it.t==='tx'&&hit(it,x,y,0));if(f){chg(i,A=>A.filter(z=>z!==f));openTa(i,f.x,f.y,f.s,f.c,f.str,f.bg,f.mw,f.mh)}else openTa(i,x,y,t==='note'?st.nt.s:st.tx.s,t==='note'?st.nt.c:st.tx.c,'')};if(e.pointerType==='touch')setTimeout(()=>{if(!twoF)go()},120);else go()}
   else if(t==='lasso'){lv.setPointerCapture(e.pointerId);
    if(sel&&sel.i===i){const b=selBox();if(sel.ids.some(q=>q.t==='img'||q.em)&&Math.hypot(ux-(b[2]-28/st.z),uy-b[3])<14/st.z){L={i,k:'r',x,y,b};sel.drag=1;return}if(Math.hypot(ux-b[2],uy-b[3])<22/st.z){L={i,k:'z',x:ux,y:uy,b};sel.drag=1;return}if(ux>b[0]&&ux<b[2]&&uy>b[1]&&uy<b[3]){L={i,k:'m',x,y};sel.drag=1;live(i);return}}
    sel=null;ls={i,p:[[x,y]]};L={i,k:'o'};live(i)}
  });
  lv.addEventListener('pointermove',e=>{if(st.tool==='laser'&&!L&&!laser.length&&e.pointerType==='mouse'){const[hx,hy]=pt(e,lv,i);lasHov={i,x:hx,y:hy};live(i)}if(st.tool==='er'&&!L&&e.pointerType==='mouse'){const[hx,hy]=pt(e,lv,i);erHov={i,x:hx,y:hy};live(i)}if(!L||L.i!==i||ptrs.size>1)return;thLive(i);const[x,y]=pt(e,lv,i);
   if(L.k==='d'){const p=L.it.p;for(const ev of(e.getCoalescedEvents?e.getCoalescedEvents():[e])){const[X,Y]=pt(ev,lv,i),q=p[p.length-1];if(Math.hypot(X-q[0],Y-q[1])>.5/st.z)p.push([X,Y,ev.pressure||.5])}live(i)}
   else if(L.k==='e'){if(L.it){const q=L.it.p[L.it.p.length-1];L.it.p.push([x,y,.5]);ikEr(i,L.it.w,q,[x,y])}else erase(i,x,y);L.lx=x;L.ly=y;live(i)}
   else if(L.k==='s'){L.it.x2=x;L.it.y2=y;live(i)}
   else if(L.k==='l'){laser.push({i,x,y,s:L.s})}
   else if(L.k==='o'){ls.p.push([x,y]);live(i)}
   else if(L.k==='m'){const dx=x-L.x,dy=y-L.y;L.dx=dx;L.dy=dy;sel.tmp=sel.ids.map(it=>xf(it,(X,Y)=>[X+dx,Y+dy],1));prevSel(i)}
   else if(L.k==='z'){const b=L.b,[ux,uy]=unrot(x,y),k=Math.max(.1,((ux-b[0])+(uy-b[1]))/((L.x-b[0])+(L.y-b[1])));L.k2=k;sel.tmp=sel.ids.map(it=>xf(it,(X,Y)=>[b[0]+(X-b[0])*k,b[1]+(Y-b[1])*k],k));prevSel(i)}
   else if(L.k==='r'){const b=L.b,cx=(b[0]+b[2])/2,cy=(b[1]+b[3])/2;let da=Math.atan2(y-cy,x-cx)-Math.atan2(L.y-cy,L.x-cx);sel.tmp=sel.ids.map(it=>{if(it.t!=='img'&&!it.em)return it;let r=(it.rot||0)+da;const sn=Math.PI/4,n=Math.round(r/sn)*sn;if(Math.abs(r-n)<.06)r=n;return Object.assign({},it,{rot:r})});prevSel(i);live(i)}});
  const end=e=>{if(!L||L.i!==i)return;const l=L;L=null;
   if(l.k==='d'||l.k==='s'){if(l.k==='s'&&Math.hypot(l.it.x2-l.it.x1,l.it.y2-l.it.y1)<4)return live(i);chg(i,A=>{A.push(l.it)})}
   else if(l.k==='e'){if(l.it)chg(i,A=>{A.push(l.it)});else{if(l.ch)save();else u.pop();redraw(i);hb()}}
   else if(l.k==='l'){lasEnd=Date.now()}
   else if(l.k==='o'){const P0=ls.p;ls=null;const ids=items[i].filter(it=>{if(it.t==='er')return false;const b=bb(it);return inPoly((b[0]+b[2])/2,(b[1]+b[3])/2,P0)});sel=ids.length&&P0.length>3?{i,ids}:null}
   else if(l.k==='m'||l.k==='z'||l.k==='r'){const tmp=sel.tmp,ids=sel.ids;delete sel.drag;if(tmp){chg(i,A=>A.map(it=>ids.includes(it)?tmp[ids.indexOf(it)]:it));sel={i,ids:tmp,free:sel.free}}delete sel.tmp}
   live(i)};
  lv.addEventListener('pointerleave',()=>{if(lasHov){lasHov=null;live(i)}if(erHov){erHov=null;live(i)}});lv.addEventListener('pointerup',end);lv.addEventListener('pointercancel',end)}
 function prevSel(i){const lvc=els[i].querySelector('.lv'),x=lvc.getContext('2d'),s=lvc.width/P[i].w;x.clearRect(0,0,lvc.width,lvc.height);const ik=els[i].querySelector('.ik'),ix=ik.getContext('2d');ix.clearRect(0,0,ik.width,ik.height);const ids=sel.ids;for(const it of items[i])if(!ids.includes(it))dr(ix,it,s);for(const it of sel.tmp)dr(ix,it,s)}
 function ikEr(i,w,a,b){const d=els[i];if(!d||!mounted[i])return;const c=d.querySelector('.ik');dr(c.getContext('2d'),{t:'er',c:'#000',w,p:(a[0]===b[0]&&a[1]===b[1])?[a]:[a,b]},c.width/P[i].w)}
 function ering(x,s,i){let p=null;if(L&&L.k==='e'&&L.i===i)p=[L.lx,L.ly];else if(erHov&&erHov.i===i&&!L)p=[erHov.x,erHov.y];if(!p)return;const r=st.er.m==='pixel'?st.er.w/2:10/st.z;x.save();x.scale(s,s);x.beginPath();x.arc(p[0],p[1],r,0,7);x.lineWidth=3.2/st.z;x.strokeStyle='rgba(255,255,255,.95)';x.stroke();x.lineWidth=1.4/st.z;x.strokeStyle='#1f2937';x.stroke();x.restore()}
 function erase(i,x,y){const rr=10/st.z;const n=items[i].filter(it=>!hit(it,x,y,rr));if(n.length!==items[i].length){items[i]=n;L.ch=1;redraw(i)}}
 function lasTick(){clearInterval(lasT);lasT=setInterval(()=>{const n=Date.now();if(!(L&&L.k==='l')&&n-lasEnd>1700){clearInterval(lasT);const i=laser.length?laser[0].i:cur;laser=[];live(i);return}if(laser.length)live(laser[0].i)},30)}
 function shEdit(i,it){const d=els[i],ta=document.createElement('textarea'),b=bb(it),bw=b[2]-b[0]-it.w,cx0=(b[0]+b[2])/2*st.z,cy0=(b[1]+b[3])/2*st.z,w=Math.max(120,bw*st.z*.8),fs=(it.ts||st.tx.s)*st.z;
 ta.className='gn-ta';ta.value=it.tx||'';ta.style.cssText='left:'+(cx0-w/2)+'px;width:'+w+'px;font-size:'+fs+'px;text-align:center;background:transparent;color:'+(it.f?(lum(it.c)>.6?'#111':'#fff'):st.tx.c);
 u.push({i,a:items[i].slice()});if(u.length>80)u.shift();r.length=0;hb();
 const hid=Object.assign({},it,{tx:''});items[i]=items[i].map(x=>x===it?hid:x);sel=null;redraw(i);
 const fit=()=>{ta.style.height='auto';ta.style.height=ta.scrollHeight+'px';ta.style.top=(cy0-ta.scrollHeight/2)+'px'};ta.oninput=fit;let done=0;
 const fin=()=>{if(done)return;done=1;if(curTa===ta)curTa=null;const v=ta.value.replace(/\s+$/,''),n=Object.assign({},it);if(v){n.tx=v;n.ts=it.ts||st.tx.s;n.tc=st.tx.c}else{delete n.tx;delete n.ts}ta.remove();items[i]=items[i].map(x=>x===hid?n:x);sel={i,ids:[n],free:st.tool!=='lasso'?1:void 0};redraw(i);save();hb()};
 ta.onblur=fin;ta.onkeydown=e=>{if(e.key==='Escape')ta.blur()};d.appendChild(ta);curTa=ta;setTimeout(()=>{ta.focus();fit()},30)}
 function openTa(i,x,y,s,c,v,bg0,mw0,mh0){const d=els[i],ta=document.createElement('textarea'),tb=document.createElement('div'),fresh=!v,nt=st.tool==='note'||!!bg0;let nb=bg0||st.nt.bg;ta.className='gn-ta';ta.value=v;ta.style.cssText=(nt?'box-sizing:border-box;left:'+(x-10)*st.z+'px;top:'+(y-8)*st.z+'px;padding:'+8*st.z+'px '+10*st.z+'px;background:'+nb+';box-shadow:0 6px 18px rgba(0,0,0,.22);border-radius:4px;width:'+(mw0||240)*st.z+'px;min-height:'+Math.max(84,mh0||0)*st.z+'px;':'left:'+x*st.z+'px;top:'+y*st.z+'px;')+'font-size:'+s*st.z+'px;color:'+c+';border:0;outline:1.5px dashed var(--ac);unicode-bidi:plaintext;text-align:start'+(nt?'':';white-space:pre');ta.dir='auto';const fit=()=>{ta.style.height='auto';ta.style.height=ta.scrollHeight+'px';if(!nt)ta.style.width=Math.max(60,layout({str:ta.value||' ',s,x:0,y:0}).w*st.z)+'px'};ta.oninput=fit;let done=0;const fin=()=>{if(done)return;done=1;if(curTa===ta)curTa=null;const mw1=ta.offsetWidth,mh1=ta.offsetHeight,val=ta.value.replace(/\s+$/,'');ta.remove();tb.remove();document.removeEventListener('pointerdown',out,true);if(val)chg(i,A=>{A.push(Object.assign({t:'tx',x,y,s,c,str:val},nt?{bg:nb,mw:Math.round(mw1/st.z),mh:Math.round(mh1/st.z)}:{}))});else redraw(i)};const apply=()=>{ta.style.fontSize=s*st.z+'px';ta.style.color=c;if(nt)ta.style.background=nb;fit();tb.querySelector('.gn-tz').textContent=Math.round(s)};
 const O0=nt?st.nt:st.tx,TXC=nt?['#1c1c1e','#ef4444','#2563eb','#16a34a','#ffffff']:['#000000','#ef4444','#f59e0b','#22c55e','#3b82f6','#8b5cf6'];
 tb.className='gn-tt';tb.style.left=Math.max(2,(nt?x-10:x)*st.z)+'px';tb.style.top=Math.max(2,(nt?y-8:y)*st.z-50)+'px';
 tb.innerHTML='<span class="gn-mvh" title="'+T('Move','تحريك')+'">'+ic('move')+'</span><button data-z="-1" title="'+T('Smaller','تصغير النص')+'">A<small>−</small></button><span class="gn-tz">'+Math.round(s)+'</span><button data-z="1" title="'+T('Larger','تكبير النص')+'">A<small>+</small></button><i class="gn-tsep"></i>'+TXC.map(k=>'<b data-k="'+k+'" title="'+T('Text color','لون النص')+'" style="background:'+k+'"></b>').join('')+'<input type="color" title="'+T('Text color','لون النص')+'" value="'+(/^#[0-9a-f]{6}$/i.test(c)?c:'#000000')+'">'+(nt?'<i class="gn-tsep"></i>'+NBC.map(k=>'<b data-nb="'+k+'" class="gn-nb" title="'+T('Note color','لون الورقة')+'" style="background:'+k+'"></b>').join(''):'');
 tb.onmousedown=e=>{if(e.target.tagName!=='INPUT')e.preventDefault()};
 tb.onclick=e=>{const b=e.target.closest('button'),k=e.target.closest('b');if(b){s=Math.max(10,Math.min(140,s+(+b.dataset.z)*4));if(fresh)O0.s=Math.max(12,Math.min(96,s));apply()}else if(k&&k.dataset.nb){nb=k.dataset.nb;if(fresh)st.nt.bg=nb;apply()}else if(k){c=k.dataset.k;if(fresh)O0.c=c;apply();const ci=tb.querySelector('input');if(ci)ci.value=c}if(e.target.tagName!=='INPUT')ta.focus()};
 const ci0=tb.querySelector('input');if(ci0)ci0.oninput=()=>{c=ci0.value;if(fresh)O0.c=c;apply()};
 const mvh=tb.querySelector('.gn-mvh');let mvs=null;const place=()=>{const px=(nt?x-10:x)*st.z,py=(nt?y-8:y)*st.z;ta.style.left=px+'px';ta.style.top=py+'px';tb.style.left=Math.max(2,px)+'px';tb.style.top=Math.max(2,py-50)+'px'};
 mvh.onpointerdown=e=>{e.preventDefault();mvh.setPointerCapture(e.pointerId);mvs={px:e.clientX,py:e.clientY,x0:x,y0:y}};
 mvh.onpointermove=e=>{if(!mvs)return;x=mvs.x0+(e.clientX-mvs.px)/st.z;y=mvs.y0+(e.clientY-mvs.py)/st.z;place()};
 mvh.onpointerup=mvh.onpointercancel=()=>{mvs=null;ta.focus()};
 const out=ev=>{const t=ev.target;if(tb.contains(t)||t===ta)return;if(t.classList&&t.classList.contains('lv')&&(st.tool==='text'||st.tool==='note'))return;fin()};
 document.addEventListener('pointerdown',out,true);ta.fin=fin;
 ta.onblur=e=>{if(e.relatedTarget&&tb.contains(e.relatedTarget))return;fin()};ta.onkeydown=e=>{if(e.key==='Escape')ta.blur()};d.appendChild(tb);d.appendChild(ta);curTa=ta;fit();setTimeout(()=>{ta.focus();fit()},30)}

 const ptrs=new Map();let pd=0,lm=null,twoF=0;
 let dtap=null;
 function pickAt(cx,cy){for(let i=0;i<P.length;i++){const d=els[i];if(!d)continue;const r0=d.getBoundingClientRect();if(cx<r0.left||cx>r0.right||cy<r0.top||cy>r0.bottom)continue;const x=(cx-r0.left)/r0.width*P[i].w,y=(cy-r0.top)/r0.height*P[i].h,tol=8/st.z;for(let k=items[i].length-1;k>=0;k--){const it=items[i][k];if(it.t!=='er'&&hit(it,x,y,tol)){sel={i,ids:[it],free:1};cur=i;live(i);return}}}}
 sc.addEventListener('pointerdown',e=>{if(st.tool!=='hand'||e.button>0||e.target.closest('.gn-sel,.gn-tt,textarea'))return;if(e.pointerType!=='pen'&&(e.pointerType!=='touch'||ptrs.size===0))panStart(e);const n=Date.now();if(dtap&&n-dtap.t<380&&Math.hypot(e.clientX-dtap.x,e.clientY-dtap.y)<26){dtap=null;pickAt(e.clientX,e.clientY)}else dtap={t:n,x:e.clientX,y:e.clientY}},true);
 sc.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')return;ptrs.set(e.pointerId,[e.clientX,e.clientY]);if(ptrs.size===1)twoF=0;if(ptrs.size===2){twoF=1;pan=null;if(fl)flipEnd(fl.dx||0);const li=L?L.i:cur;if(L&&L.k==='e'&&!L.it){const q=u.pop();if(q&&L.ch){items[q.i]=q.a;redraw(q.i)}hb()}L=null;ls=null;if(sel){delete sel.drag;delete sel.tmp}redraw(li);pd=dist();lm=null;live(cur)}},true);
 sc.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,[e.clientX,e.clientY]);if(ptrs.size===2&&pd){const d=dist(),a=[...ptrs.values()],mx=(a[0][0]+a[1][0])/2,my=(a[0][1]+a[1][1])/2;if(lm){sc.scrollLeft-=mx-lm[0];sc.scrollTop-=my-lm[1]}lm=[mx,my];setZ(st.z*d/pd,1);pd=d}},true);
 const pu=e=>{ptrs.delete(e.pointerId);if(ptrs.size<2){pd=0;lm=null}};sc.addEventListener('pointerup',pu,true);sc.addEventListener('pointercancel',pu,true);
 const dist=()=>{const a=[...ptrs.values()];return Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1])||1};
 sc.addEventListener('wheel',e=>{if(e.ctrlKey){e.preventDefault();setZ(st.z*(e.deltaY<0?1.08:.92))}},{passive:false});
 function setZ(z,soft){z=Math.max(.1,Math.min(5,z));const cy=(sc.scrollTop+sc.clientHeight/2)/sc.scrollHeight,cx=(sc.scrollLeft+sc.clientWidth/2)/sc.scrollWidth;st.z=z;size();sc.scrollTop=cy*sc.scrollHeight-sc.clientHeight/2;sc.scrollLeft=cx*sc.scrollWidth-sc.clientWidth/2;clearTimeout(rrT);rrT=setTimeout(()=>{for(const i in mounted)mount(+i);for(const i in mounted)redraw(+i)},soft?160:60)}
 function fit(){const w=sc.clientWidth-(W.innerWidth<700?16:48);st.z=Math.max(.3,Math.min(3,w/Math.max(...P.map(p=>p.w))));size()}

 const thT={},thB={};let thv=0,thl=0;function thLive(i){if(thl||!root.classList.contains('side'))return;thl=setTimeout(()=>{thl=0;th1(i)},60)}
 function thumbs(){for(const k in thB)delete thB[k];side.innerHTML='';P.forEach((p,i)=>{const a=document.createElement('a');a.className='gn-th';a.dataset.i=i;const c=document.createElement('canvas');c.width=150;c.height=Math.round(150*p.h/p.w);a.appendChild(c);a.appendChild(document.createTextNode(i+1));a.onclick=()=>goto(i);side.appendChild(a)});if(root.classList.contains('side'))thAll()}
 async function thAll(){const t=++thv;for(let i=0;i<P.length&&t===thv;i++)await th1(i,1)}
 async function th1(i,full){const a=side.children[i];if(!a||!P[i]||!root.classList.contains('side'))return;const c=a.firstChild,x=c.getContext('2d');let bs=thB[i];if(!bs||bs.width!==c.width||bs.height!==c.height){bs=document.createElement('canvas');bs.width=c.width;bs.height=c.height;const bx=bs.getContext('2d');bx.fillStyle='#fff';bx.fillRect(0,0,bs.width,bs.height);try{if(o.base)await o.base(i,bs,bs.width,P[i],1)}catch(er){}thB[i]=bs}if(!P[i])return;const s=c.width/P[i].w,t2=document.createElement('canvas');t2.width=c.width;t2.height=c.height;const ix=t2.getContext('2d');for(const it of items[i])dr(ix,it,s);if(L&&L.i===i&&L.it)dr(ix,L.it,s);x.clearRect(0,0,c.width,c.height);x.drawImage(bs,0,0);x.drawImage(t2,0,0)}
 function goto(i,instant){if(!els[i])return;if(st.view==='one'){slideEnd();if(i===cur)return;if(instant){finishSwitch(i);return}const d=i>cur?1:-1,VW=sc.clientWidth+GAP;els[i].classList.add('solo');slide(els[cur],0,-d*VW,els[i],d*VW,0,380,()=>finishSwitch(i));return}sc.scrollTo({top:els[i].offsetTop-14,behavior:'smooth'})}
 function finishSwitch(t){cur=t;els.forEach((d,k)=>{d.style.transform='';d.style.transition='';d.classList.toggle('solo',k===t)});pill.value=t+1;side.querySelectorAll('.gn-th').forEach((a,k)=>a.classList.toggle('cur',k===t))}
 function setView(v){slideEnd();st.view=v;root.dataset.view=v;{const a=$('[data-a=pv]'),c=$('[data-a=nx]');if(a)a.innerHTML=ic(v==='one'?'pl':'pu');if(c)c.innerHTML=ic(v==='one'?'pr':'pd')}if(o.fixed)try{localStorage.setItem('gn:pdfview',v)}catch(e){}const b=$('[data-a=view]');if(b)b.innerHTML=ic(v==='one'?'vone':'vall');if(v==='one'){els.forEach((d,k)=>d.classList.toggle('solo',k===cur));fitPage()}else{els.forEach(d=>d.classList.remove('solo'));fit();if(els[cur])sc.scrollTop=els[cur].offsetTop-14}}
 let pan=null,fl=null,pendingEnd=null;
 const GAP=28,EASE='cubic-bezier(.2,.7,.2,1)';
 const zoomOver=()=>!!els[cur]&&els[cur].offsetWidth>sc.clientWidth-8;
 function slideEnd(){if(pendingEnd){const f=pendingEnd;pendingEnd=null;f()}}
 function slide(oe,of,ot,ne,nf,nt,ms,onDone){slideEnd();oe.style.transition='none';ne.style.transition='none';
  const A=oe.animate([{transform:`translateX(${of}px)`},{transform:`translateX(${ot}px)`}],{duration:ms,easing:EASE}),
        B=ne.animate([{transform:`translateX(${nf}px)`},{transform:`translateX(${nt}px)`}],{duration:ms,easing:EASE});
  let done=false;const fin=()=>{if(done)return;done=true;oe.style.transform=`translateX(${ot}px)`;ne.style.transform=`translateX(${nt}px)`;A.cancel();B.cancel();if(pendingEnd===fin)pendingEnd=null;onDone&&onDone()};
  B.onfinish=fin;pendingEnd=fin}
 function flipMove(dx){if(!fl){if(Math.abs(dx)<2)return;slideEnd();const d=dx<0?1:-1,t=cur+d;fl={d,t,pg:els[cur],ne:els[t]||null};if(fl.ne){fl.ne.classList.add('solo');fl.ne.style.transition='none'}}
  const pg=fl.pg,VW=sc.clientWidth+GAP;pg.style.transition='none';
  if(fl.ne){pg.style.transform=`translateX(${dx}px)`;fl.ne.style.transform=`translateX(${dx+fl.d*VW}px)`}else pg.style.transform=`translateX(${dx*.3}px)`;
  fl.dx=dx}
 function flipEnd(dx){const f=fl;fl=null;if(!f)return;const VW=sc.clientWidth+GAP,pg=f.pg;
  if(!f.ne){pg.style.transition='transform .25s ease';pg.style.transform='';setTimeout(()=>{pg.style.transition=''},260);return}
  if(Math.abs(dx)>VW*.2)slide(pg,dx,-f.d*VW,f.ne,dx+f.d*VW,0,320,()=>finishSwitch(f.t));
  else slide(pg,dx,0,f.ne,dx+f.d*VW,f.d*VW,260,()=>finishSwitch(cur))}
 function panStart(e){slideEnd();stopInertia();pan={id:e.pointerId,x:e.clientX,y:e.clientY,sl:sc.scrollLeft,st:sc.scrollTop,dx:0,dy:0,m:null,h:[{t:performance.now(),x:e.clientX,y:e.clientY}]};sc.classList.add('panning')}
 let inertiaId=0;
 function stopInertia(){if(inertiaId){cancelAnimationFrame(inertiaId);inertiaId=0}}
 function startInertia(p){const now=performance.now(),h=p.h.filter(q=>now-q.t<120);if(h.length<2)return;const a=h[0],b=h[h.length-1],dt=Math.max(1,b.t-a.t);
  let vx=-(b.x-a.x)/dt*1.6,vy=-(b.y-a.y)/dt*1.6;if(Math.hypot(vx,vy)<.15)return;
  let last=now;
  const step=t=>{const k=Math.min(40,t-last);last=t;const x0=sc.scrollLeft,y0=sc.scrollTop;sc.scrollLeft+=vx*k;sc.scrollTop+=vy*k;
   const f=Math.pow(.965,k/16.7);vx*=f;vy*=f;
   const moved=Math.abs(sc.scrollLeft-x0)+Math.abs(sc.scrollTop-y0);
   if(Math.hypot(vx,vy)<.02||moved<.1){inertiaId=0;return}
   inertiaId=requestAnimationFrame(step)};
  inertiaId=requestAnimationFrame(step)}
 sc.addEventListener('pointerdown',stopInertia,true);
 sc.addEventListener('wheel',stopInertia,{passive:true});
 W.addEventListener('pointermove',e=>{if(!pan||e.pointerId!==pan.id)return;pan.dx=e.clientX-pan.x;pan.dy=e.clientY-pan.y;pan.h.push({t:performance.now(),x:e.clientX,y:e.clientY});if(pan.h.length>12)pan.h.shift();
  if(!pan.m){if(Math.hypot(pan.dx,pan.dy)<8)return;pan.m=(st.view==='one'&&!zoomOver()&&Math.abs(pan.dx)>Math.abs(pan.dy))?'flip':'pan'}
  if(pan.m==='flip')flipMove(pan.dx);else{sc.scrollLeft=pan.sl-pan.dx;sc.scrollTop=pan.st-pan.dy}
  e.preventDefault()},{passive:false});
 function panEnd(e){if(!pan||(e&&e.pointerId!==pan.id))return;const p=pan;pan=null;sc.classList.remove('panning');if(p.m==='flip')flipEnd(p.dx);else if(p.m==='pan'&&p.h.length>1)startInertia(p)}
 W.addEventListener('pointerup',panEnd);W.addEventListener('pointercancel',panEnd);
 sc.addEventListener('scroll',()=>{if(st.view==='one')return;const m=sc.scrollTop+sc.clientHeight*.4;let c=0;for(let i=0;i<els.length;i++)if(els[i].offsetTop<=m)c=i;if(c!==cur||pill.dataset.c===undefined){cur=c;pill.value=c+1;pill.dataset.c=c;side.querySelectorAll('.gn-th').forEach((a,k)=>a.classList.toggle('cur',k===c))}},{passive:true});
 pill.onchange=()=>{const n=Math.max(1,Math.min(P.length,+pill.value||1));goto(n-1)};

 function sw(list,key,tool){return '<div class="gn-sw">'+list.map(c=>'<i data-c="'+c+'" class="'+(st[key].c===c?'on':'')+'" style="background:'+c+'"></i>').join('')+'<input type="color" data-cc value="'+(/^#[0-9a-f]{6}$/i.test(st[key].c)?st[key].c:'#000000')+'"></div>'}
 function rng(l,k,key,mn,mx){return '<h4>'+l+'</h4><input type="range" min="'+mn+'" max="'+mx+'" value="'+st[key][k]+'" style="--p:'+((st[key][k]-mn)/(mx-mn)*100)+'%" data-r="'+key+'.'+k+'">'}
 function fitPage(){const p=P[cur]||P[0],aw=sc.clientWidth-(W.innerWidth<700?16:40),ah=sc.clientHeight-40,z=Math.max(.1,Math.min(5,Math.min(aw/p.w,ah/p.h)));setZ(z);const e=els[cur];if(e){sc.scrollTop=Math.max(0,e.offsetTop-Math.max(14,(sc.clientHeight-e.offsetHeight)/2));sc.scrollLeft=Math.max(0,(sc.scrollWidth-sc.clientWidth)/2)}}
 function toggleFs(){const d=document,no=()=>toast(T('Fullscreen is not available here','ملء الشاشة غير متاح هنا'));try{if(d.fullscreenElement){d.exitFullscreen()}else{const q=d.documentElement.requestFullscreen&&d.documentElement.requestFullscreen();if(q&&q.catch)q.catch(no);else if(!q)no()}}catch(er){no()}}
 function pageAct(k){if(curTa)curTa.blur();const p=P[cur];
  if(k==='add'||k==='dup'){P.splice(cur+1,0,k==='dup'?JSON.parse(JSON.stringify(p)):{w:p.w,h:p.h,paper:p.paper==='custom'?'blank':p.paper,bd:p.bd?Object.assign({},p.bd):void 0,bgc:p.bgc});items.splice(cur+1,0,k==='dup'?items[cur].slice():[])}
  else if(k==='del'){if(P.length<2){toast(T('The last page can not be deleted','لا يمكن حذف الصفحة الأخيرة'));return}if(!delArm){delArm=1;setTimeout(()=>delArm=0,3000);toast(T('Press again to delete this page','اضغط مرة أخرى لتأكيد حذف الصفحة'));return}delArm=0;P.splice(cur,1);items.splice(cur,1)}else return;
  u=[];r=[];sel=null;build();hb();save();setTimeout(()=>goto(Math.min(cur+(k==='del'?0:1),P.length-1)),50);pop.classList.remove('show');toast(k==='add'?T('Page added','تمت إضافة ورقة'):k==='dup'?T('Page duplicated','تم تكرار الورقة'):T('Page deleted','تم حذف الورقة'))}
 function repaint(){for(const k in thB)delete thB[k];const ks=Object.keys(mounted);ks.forEach(k=>delete mounted[k]);ks.forEach(k=>mount(+k));if(root.classList.contains('side'))thAll()}

 /* ---------- emoji & stickers ---------- */
 let stab='stk';
 const favL=()=>{try{return JSON.parse(localStorage.getItem('gn:fav')||'null')||[]}catch(e){return[]}};
 function favTog(k){let l=favL();const on=l.includes(k);l=on?l.filter(x=>x!==k):[k,...l];try{localStorage.setItem('gn:fav',JSON.stringify(l));toast(on?T('Removed from favorites','أُزيل من المفضلة'):T('Added to favorites','أُضيف إلى المفضلة'))}catch(er){toast(T('Not enough storage space to save','لا توجد مساحة تخزين كافية للحفظ'))}}
 const HEART='<svg viewBox="0 0 24 24"><path d="M12 20.3s-7.5-4.6-7.5-10.1A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.6c0 5.5-7.5 10.1-7.5 10.1z"/></svg>';
 const skCls=k=>({p:'',a:'',n:'sq',c:'sq w'})[k[0]]||'';
 function favBtn(k){const on=favL().includes(k);return '<button class="gn-hv'+(on?' on':'')+'" data-fv="'+k+'" title="'+(on?T('Remove from favorites','إزالة من المفضلة'):T('Add to favorites','إضافة إلى المفضلة'))+'">'+HEART+'</button>'}
 function skCell(k,c){const on=favL().includes(k);return '<div class="gn-sk"><button data-sk="'+k+'"><img data-ski="'+k+'" class="'+c+'" alt=""></button><button class="gn-hv'+(on?' on':'')+'" data-fv="'+k+'" title="'+(on?T('Remove from favorites','إزالة من المفضلة'):T('Add to favorites','إضافة إلى المفضلة'))+'">'+HEART+'</button></div>'}
 function skMid(){const r=sc.getBoundingClientRect(),cy=r.top+r.height/2;let b=cur;for(let i=0;i<els.length;i++){const q=els[i].getBoundingClientRect();if(q.top<=cy&&q.bottom>=cy){b=i;break}}
  const q=els[b].getBoundingClientRect(),p=P[b];return{i:b,x:Math.max(0,Math.min(p.w,(r.left+r.width/2-q.left)/q.width*p.w)),y:Math.max(0,Math.min(p.h,(cy-q.top)/q.height*p.h))}}
 const skAt=(m,w,h)=>{const mx=P[m.i].w-w,my=P[m.i].h-h;let x=Math.round(Math.max(0,Math.min(mx,m.x-w/2))),y=Math.round(Math.max(0,Math.min(my,m.y-h/2)));
  for(let n=0;n<12&&items[m.i].some(q=>q.t!=='er'&&!q.p&&q.t!=='sh'&&Math.abs(bb(q)[0]-x)<14&&Math.abs(bb(q)[1]-y)<14);n++){x=Math.min(Math.max(0,mx),x+28);y=Math.min(Math.max(0,my),y+28)}
  return[x,y]};
 function skAdd(i,its){if(curTa)curTa.blur();chg(i,A=>{A.push(...its)});sel={i,ids:its,free:1};live(i)}
 function skHtml(){const tabs=[['stk',T('Stickers','ستيكرات')],['face',T('Faces','وجوه')],['study',T('Study','دراسة')],['sym',T('Symbols','رموز')],['nat',T('Nature','طبيعة')],['lab',T('Labels','وسوم')],['wash',T('Washi','شرائط')],['fav',T('Favorites','المفضلة')]];
  let h='<div class="gn-stabs">'+tabs.map(t=>'<button data-st="'+t[0]+'" class="'+(t[0]===stab?'on':'')+'">'+t[1]+'</button>').join('')+'</div>';
  if(stab==='stk'){const G=W.GN_STICKERS||{},cl=(n,a,c)=>(a||[]).map((u,k)=>u?skCell(n+k,c):'').join('');
   h+='<div class="gn-stks">'+cl('p',G.photo,'')+cl('a',G.art,'')+cl('c',G.calli,'sq w')+'</div>';
   if((G.notes||[]).length)h+='<div class="gn-sec">'+T('Motivation notes','ملاحظات تحفيزية')+'</div><div class="gn-stks">'+cl('n',G.notes,'sq')+'</div>'}
  else if(STK[stab])h+='<div class="gn-emo">'+STK[stab].map(e=>'<button data-e="'+e+'">'+e+'</button>').join('')+'</div>';
  else if(stab==='lab')h+='<div class="gn-lab">'+LABELS.map((l,k)=>'<div class="gn-sk"><button data-lb="'+k+'" style="background:'+l[1]+';color:'+l[2]+'">'+l[0]+'</button>'+favBtn('l'+k)+'</div>').join('')+'</div>';
  else if(stab==='wash')h+='<div class="gn-wash">'+WASHI.map((w,k)=>'<button data-wa="'+k+'" class="w-'+w[1]+'" style="--c:'+w[0]+'"></button>').join('')+'</div>';
  else if(stab==='fav'){const K=favL(),F=K.filter(k=>k[0]!=='l'&&skSrc(k)),LB=K.filter(k=>k[0]==='l'&&LABELS[+k.slice(1)]);
   h+=(F.length?'<div class="gn-stks">'+F.map(k=>skCell(k,skCls(k))).join('')+'</div>':'')
   +(LB.length?'<div class="gn-lab gn-fl">'+LB.map(k=>{const l=LABELS[+k.slice(1)];return '<div class="gn-sk"><button data-lb="'+k.slice(1)+'" style="background:'+l[1]+';color:'+l[2]+'">'+l[0]+'</button>'+favBtn(k)+'</div>'}).join('')+'</div>':'')
   +(F.length||LB.length?'':'<p class="gn-em">'+T('Tap the heart on any sticker or label to save it here.','اضغط على القلب بجانب أي ستيكر أو وسم لحفظه هنا.')+'</p>')}
  return h}
 const skSrc=k=>{const G=W.GN_STICKERS||{};return({p:G.photo,a:G.art,n:G.notes,c:G.calli}[k[0]]||[])[+k.slice(1)]};
 function skAfter(){pop.querySelectorAll('img[data-ski]').forEach(i=>{i.src=skSrc(i.dataset.ski)||''})}
 W.addEventListener('gn-img',()=>{if(pop&&pop.classList.contains('show')&&pop.dataset.t==='emoji')skAfter()});
 function skClick(d){if(d.st){stab=d.st;return}
  if(d.sk!==undefined){const G=W.GN_STICKERS||{},u=skSrc(d.sk);if(!u)return;const m=skMid(),c=d.sk[0]==='c',z=c?230:d.sk[0]==='n'?170:150,h=c?Math.round(z*((G.cr||[])[+d.sk.slice(1)]||.6)):z,p=skAt(m,z,h);skAdd(m.i,[{t:'img',src:u,x:p[0],y:p[1],w:z,h:h,em:1}]);return}
  const m=skMid();let its=null;
  if(d.e){const s0=60,w=Math.ceil(layout({str:d.e,s:s0}).w),p=skAt(m,w,s0*1.25);its=[{t:'tx',x:p[0],y:p[1],s:s0,c:'#000000',em:1,str:d.e}]}
  else if(d.lb!==undefined){const l=LABELS[+d.lb],fs=30;tcv.font='700 '+fs+'px sans-serif';const mw=Math.ceil(tcv.measureText(l[0]).width)+24,mh=Math.round(fs*1.25)+16,p=skAt(m,mw,mh);its=[{t:'tx',x:p[0]+10,y:p[1]+8,s:fs,c:l[2],b:1,bg:l[1],rd:10,mw,mh,str:l[0]}]}
  else if(d.wa!==undefined){const w=WASHI[+d.wa],p=skAt(m,300,36);its=[{t:'tape',dec:1,pat:w[1],x:p[0],y:p[1],w:300,h:36,c:w[0],o:.88}]}
  if(its)skAdd(m.i,its)}

 /* ---------- page border ---------- */
 const BD0={k:'none',c:'#374151',w:3,g:30};let bdT=0;
 const BDK=[['none',T('None','بدون')],['line',T('Single line','خط واحد')],['double',T('Double line','خطان')],['triple',T('Triple line','ثلاثة خطوط')],['thickthin',T('Thick & thin','سميك ورفيع')],['dashed',T('Dashed','متقطع')],['dots',T('Dots','نقط')],['dashdot',T('Dash & dot','خط ونقطة')],['rounded',T('Rounded','زوايا دائرية')],['corners',T('Corners only','زوايا فقط')],['scallop',T('Scallop','حواف مقوّسة')]];
 const BDC=['#111827','#6b7280','#ef4444','#f97316','#eab308','#22c55e','#06b6d4','#3b82f6','#8b5cf6','#ec4899','#7c4a1e'];
 const bdOf=()=>Object.assign({},BD0,(P[cur]||P[0]).bd||{});
 function borderHtml(){const b=bdOf(),rg=(l,k,v,mn,mx)=>'<h4>'+l+'</h4><input type="range" min="'+mn+'" max="'+mx+'" value="'+v+'" style="--p:'+((v-mn)/(mx-mn)*100)+'%" data-bdr="'+k+'">';
  return '<div class="gn-sec">'+T('Page border','حدود الصفحة')+'</div><div class="gn-bds">'+BDK.map(a=>'<button data-bk="'+a[0]+'" class="'+(b.k===a[0]?'on':'')+'"><canvas data-bp="'+a[0]+'" width="88" height="116"></canvas><span>'+a[1]+'</span></button>').join('')+'</div>'
  +'<h4>'+T('Border color','لون الإطار')+'</h4><div class="gn-sw">'+BDC.map(c=>'<i data-bc="'+c+'" class="'+(c.toLowerCase()===b.c.toLowerCase()?'on':'')+'" style="background:'+c+'"></i>').join('')+'<input type="color" data-bcc value="'+(/^#[0-9a-f]{6}$/i.test(b.c)?b.c:'#374151')+'"></div>'
  +rg(T('Thickness','السُّمك'),'w',b.w,1,16)+rg(T('Distance from edge','البعد عن حافة الورقة'),'g',b.g,0,120)}
 function bdThumbs(){const b=bdOf();pop.querySelectorAll('canvas[data-bp]').forEach(c=>{const x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);drawBorder(x,c.width,c.height,{k:c.dataset.bp,c:b.c,w:Math.min(6,Math.max(1.6,b.w*.8)),g:10},1)});
  pop.querySelectorAll('[data-bk]').forEach(q=>q.classList.toggle('on',q.dataset.bk===b.k));pop.querySelectorAll('[data-bc]').forEach(q=>q.classList.toggle('on',q.dataset.bc.toLowerCase()===b.c.toLowerCase()))}
 function setBd(key,val){P.forEach(p=>{p.bd=Object.assign({},BD0,p.bd||{});p.bd[key]=val;if(key!=='k'&&p.bd.k==='none')p.bd.k='line'});clearTimeout(bdT);bdT=setTimeout(()=>{repaint();save()},40);bdThumbs()}

 /* ---------- page background color ---------- */
 const BGC=['#ffffff','#fff8e1','#fef3c7','#ecfccb','#dcfce7','#e0f2fe','#ede9fe','#fce7f3','#f1f5f9','#d6d3d1','#1f2937','#0f172a'];
 const bgOf=()=>(P[cur]||P[0]).bgc||'#ffffff';
 function bgHtml(){const c=bgOf().toLowerCase();return '<div class="gn-sec">'+T('Background color','لون الخلفية')+'</div><div class="gn-sw">'+BGC.map(k=>'<i data-bgc="'+k+'" class="'+(k===c?'on':'')+'" style="background:'+k+'"></i>').join('')+'<input type="color" data-bgcc value="'+(/^#[0-9a-f]{6}$/i.test(c)?c:'#ffffff')+'"></div>'}
 let bgT=0;
 function setBg(c){P.forEach(p=>{p.bgc=c});clearTimeout(bgT);bgT=setTimeout(()=>{repaint();save()},40);pop.querySelectorAll('[data-bgc]').forEach(q=>q.classList.toggle('on',q.dataset.bgc.toLowerCase()===c.toLowerCase()))}
 function popFor(t,btn){
  let h='';
  if(t==='pen')h='<div class="gn-opt">'+[['ball',T('Ballpoint','جاف')],['fountain',T('Fountain','حبر')],['brush',T('Brush','فرشاة')]].map(a=>'<button data-pt="'+a[0]+'" class="'+(st.pen.k===a[0]?'on':'')+'">'+a[1]+'</button>').join('')+'</div>'+'<div class="gn-prev"><b style="background:'+st.pen.c+';height:'+st.pen.w+'px"></b></div>'+sw(PAL,'pen')+rng(T('Thickness','السمك'),'w','pen',1,24);
  else if(t==='hl')h='<div class="gn-prev"><b style="background:'+st.hl.c+';opacity:.5;height:'+Math.min(st.hl.w,30)+'px"></b></div>'+sw(HLP,'hl')+rng(T('Thickness','السمك'),'w','hl',6,48);
  else if(t==='er')h='<div class="gn-opt"><button data-em="stroke" class="'+(st.er.m==='stroke'?'on':'')+'">'+T('Stroke eraser','مسح الخط كامل')+'</button><button data-em="pixel" class="'+(st.er.m==='pixel'?'on':'')+'">'+T('Pixel eraser','مسح بالبكسل')+'</button></div>'+(st.er.m==='pixel'?rng(T('Size','الحجم'),'w','er',6,60):'');
  else if(t==='shape')h='<div class="gn-opt">'+[['line',T('Line','خط')],['arrow',T('Arrow','سهم')],['rect',T('Rectangle','مستطيل')],['ell',T('Ellipse','دائرة')],['tri',T('Triangle','مثلث')],['dia',T('Diamond','معين')]].map(a=>'<button data-sk="'+a[0]+'" class="'+(st.sh.k===a[0]?'on':'')+'">'+ic('s_'+a[0])+a[1]+'</button>').join('')+'</div>'+'<div class="gn-opt"><button data-sf="1" class="'+(st.sh.f?'on':'')+'">'+ic('fill')+T('Filled','تعبئة كاملة')+'</button></div>'+sw(PAL,'sh')+rng(T('Thickness','السمك'),'w','sh',1,20);
  else if(t==='text')h='<div class="gn-step"><button data-tz="-1" title="'+T('Smaller','تصغير النص')+'">A<small>−</small></button><span>'+Math.round(st.tx.s)+'</span><button data-tz="1" title="'+T('Larger','تكبير النص')+'">A<small>+</small></button></div>'+sw(PAL,'tx')+rng(T('Font size','حجم الخط'),'s','tx',12,96)+'<h4 style="margin-top:10px">'+T('Tap on the page to type','اضغط على الصفحة واكتب')+'</h4>';
  else if(t==='note')h='<div class="gn-step"><button data-nz="-1" title="'+T('Smaller','تصغير النص')+'">A<small>−</small></button><span>'+Math.round(st.nt.s)+'</span><button data-nz="1" title="'+T('Larger','تكبير النص')+'">A<small>+</small></button></div><div class="gn-sec">'+T('Note color','لون الورقة')+'</div><div class="gn-ncs">'+NBC.map(k=>'<button data-nb="'+k+'" class="'+(st.nt.bg===k?'on':'')+'" style="background:'+k+'"></button>').join('')+'</div><div class="gn-sec">'+T('Text color','لون النص')+'</div>'+sw(['#1c1c1e','#ef4444','#2563eb','#16a34a','#ffffff','#7c3aed'],'nt')+rng(T('Font size','حجم الخط'),'s','nt',12,96);
  else if(t==='laser')h=sw(['#ef4444','#22c55e','#3b82f6','#eab308','#ec4899'],'ls')+rng(T('Size','الحجم'),'w','ls',3,14);
  else if(t==='emoji')h=skHtml();
  else if(t==='page'){const p=P[cur],pp=p.paper||'blank',s0=Math.min(p.w,p.h),l0=Math.max(p.w,p.h),
  K=(d,k,on,l,x)=>'<button data-'+d+'="'+k+'" class="'+(x||'')+(on?' on':'')+'">'+l+'</button>',
  DIM={A3:'297×420',A4:'210×297',A5:'148×210',Letter:'216×279','16:9':'16 : 9','1:1':'1 : 1'};
  h='<div class="gn-sec">'+T('Paper','الورقة')+'</div><div class="gn-cards">'+[['blank',T('Blank','فاضية')],['lined',T('Lined','سطور')],['grid',T('Grid','مربعات')],['dots',T('Dots','نقط')]].map(a=>K('pp',a[0],pp===a[0],'<i class="gn-mini m-'+a[0]+'"></i><span>'+a[1]+'</span>')).join('')+'</div>'
  +bgHtml()
  +'<div class="gn-sec">'+T('Size','المقاس')+'</div><div class="gn-chips">'+K('ps','Board',Math.abs(p.w/p.h-(sc.clientWidth-(W.innerWidth<700?16:40))/(sc.clientHeight-40))<.03,'<b>'+T('Whiteboard','سبورة')+'</b><small>'+T('Fits your screen','تلائم الشاشة')+'</small>','gn-wide')+Object.keys(SZ).map(k=>K('ps',k,Math.abs(SZ[k][0]-s0)<2&&Math.abs(SZ[k][1]-l0)<2,'<b>'+k+'</b><small>'+DIM[k]+'</small>')).join('')+'</div>'
  +'<div class="gn-sec">'+T('Orientation','الاتجاه')+'</div><div class="gn-seg">'+K('po','p',p.h>=p.w,ic('portrait')+T('Portrait','عمودي'))+K('po','l',p.w>p.h,ic('landscape')+T('Landscape','أفقي'))+'</div>'
  +borderHtml()
  +'<div class="gn-sec">'+T('Custom paper','ورقة مخصصة')+'</div>'+K('pa','up',0,ic('upload')+'<span>'+T('Upload an image as paper','ارفع صورة لتكون ورقة')+'</span>','gn-up')
  }
  if(!h){pop.classList.remove('show');return}
  pop.innerHTML=h;pop.dataset.t=t;const b=btn.getBoundingClientRect(),rb=pop.parentElement.getBoundingClientRect(),w=Math.min(t==='emoji'?312:t==='page'?304:268,rb.width-12);pop.style.left=Math.max(6,Math.min(rb.width-w-6,b.left-rb.left+b.width/2-w/2))+'px';pop.style.top=(b.bottom-rb.top)+'px';pop.classList.add('show');if(t==='emoji')skAfter();if(t==='page')bdThumbs();dots()}
 pop.addEventListener('input',e=>{const t=e.target;if(t.dataset.bdr){setBd(t.dataset.bdr,+t.value);t.style.setProperty('--p',(t.value-t.min)/(t.max-t.min)*100+'%');return}if(t.dataset.bcc!==undefined){setBd('c',t.value);return}if(t.dataset.bgcc!==undefined){setBg(t.value);return}if(t.dataset.r){const[a,k]=t.dataset.r.split('.');st[a][k]=+t.value;t.style.setProperty('--p',(t.value-t.min)/(t.max-t.min)*100+'%');const pv=pop.querySelector('.gn-prev b');if(pv){if(a==='pen')pv.style.height=st.pen.w+'px';else if(a==='hl')pv.style.height=Math.min(st.hl.w,30)+'px'}dots()}else if(t.dataset.cc!==undefined){setC(t.value)}});
 function setC(c){const t=pop.dataset.t,k=t==='shape'?'sh':t==='laser'?'ls':t==='note'?'nt':t==='text'?'tx':t;if(st[k])st[k].c=c;pop.querySelectorAll('.gn-sw i').forEach(i=>i.classList.toggle('on',i.dataset.c===c));dots()}
 pop.addEventListener('click',e=>{const t=e.target.closest('[data-c],[data-em],[data-sk],[data-pp],[data-pa],[data-pt],[data-sf],[data-ps],[data-po],[data-tz],[data-nz],[data-nb],[data-mg],[data-st],[data-e],[data-lb],[data-wa],[data-bk],[data-bc],[data-bgc],[data-sk],[data-fv]');if(!t)return;const d=t.dataset,tool=pop.dataset.t;
  if(tool==='emoji'){if(d.fv!==undefined)favTog(d.fv);else{skClick(d);if(d.sk!==undefined){pop.classList.remove('show');return}}}else if(d.bk)setBd('k',d.bk);else if(d.bc)setBd('c',d.bc);else if(d.bgc)setBg(d.bgc);else if(d.c)setC(d.c);else if(d.em)st.er.m=d.em;else if(d.sk)st.sh.k=d.sk;else if(d.pt)st.pen.k=d.pt;else if(d.nz)st.nt.s=Math.max(12,Math.min(96,st.nt.s+(+d.nz)*4));else if(d.nb)st.nt.bg=d.nb;else if(d.tz)st.tx.s=Math.max(12,Math.min(96,st.tx.s+(+d.tz)*4));else if(d.sf)st.sh.f=st.sh.f?0:1;
  else if(d.ps||d.po){const ld=d.po?d.po==='l':P[cur].w>P[cur].h;P.forEach(p=>{if(p.paper==='custom'&&p.bg)return;if(d.ps==='Board'){const aw=sc.clientWidth-(W.innerWidth<700?16:40),ah=sc.clientHeight-40;p.w=1600;p.h=Math.max(400,Math.round(1600*ah/aw))}else if(d.ps){const z=SZ[d.ps];p.w=ld?z[1]:z[0];p.h=ld?z[0]:z[1]}else if((d.po==='l')!==(p.w>p.h)){const q=p.w;p.w=p.h;p.h=q}});const c0=cur,e0=els[c0],fr=e0?(sc.scrollTop-e0.offsetTop)/Math.max(1,e0.offsetHeight):0;u=[];r=[];sel=null;build();sc.scrollTop=els[c0].offsetTop+fr*els[c0].offsetHeight;cur=c0;hb();save();if(d.ps==='Board')fitPage();toast(T('Applied to all pages','تم التطبيق على كل الصفحات'))}
  else if(d.pp){P.forEach(q=>q.paper=d.pp);repaint();save();toast(T('Applied to all pages','تم التطبيق على كل الصفحات'))}
  else if(d.pa){if(d.pa==='up'){pf.value='';pf.click()}return}
  const sp=pop.scrollTop;popFor(tool,root.querySelector('button[data-t='+tool+']')||root.querySelector('[data-a=page]'));pop.scrollTop=sp;dots()});
 root.addEventListener('pointerdown',e=>{if(pop.classList.contains('show')&&!e.target.closest('.gn-pop')&&!e.target.closest('.gn-top'))pop.classList.remove('show')});

 new MutationObserver(()=>dots()).observe(pop,{attributes:true,attributeFilter:['class']});
 const act={view:()=>{slideEnd();setView(st.view==='one'?'all':'one')},pv:()=>{slideEnd();goto(Math.max(0,cur-1))},nx:()=>{slideEnd();goto(Math.min(P.length-1,cur+1))},back:()=>o.onBack&&o.onBack(),side:()=>{root.classList.toggle('side');if(root.classList.contains('side'))thAll();setTimeout(()=>fit(),30)},undo,redo,zi:()=>setZ(st.z*1.2),zo:()=>setZ(st.z/1.2),zr:()=>fitPage(),fs:()=>o.onFs?o.onFs():toggleFs(),padd:()=>pageAct('add'),pdup:()=>pageAct('dup'),pdel:()=>pageAct('del'),
  page:b=>{if(pop.classList.contains('show')&&pop.dataset.t==='page')pop.classList.remove('show');else popFor('page',b)},exp,clr:()=>{if(curTa)curTa.blur();if(!items[cur].length){toast(T('Page is already empty','الصفحة فارغة بالفعل'));return}sel=null;chg(cur,()=>[]);toast(T('Page cleared','تم مسح الصفحة'))}};
 async function exp(){const bt=$('[data-a=exp]'),ld=$('.gn-load');bt.disabled=true;ld.classList.add('show');const out=[];
  try{for(let i=0;i<P.length;i++){const c=document.createElement('canvas'),W2=Math.min(1600,Math.round(P[i].w*1.8));c.width=W2;c.height=Math.round(W2*P[i].h/P[i].w);const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);try{if(o.base)await o.base(i,c,W2,P[i],2)}catch(er){}const t=document.createElement('canvas');t.width=c.width;t.height=c.height;const tx=t.getContext('2d');for(const it of items[i])dr(tx,it,c.width/P[i].w);x.drawImage(t,0,0);out.push({w:c.width,h:c.height,pw:P[i].pw||P[i].w*.75,ph:P[i].ph||P[i].h*.75,d:await toBytes(c)})}
  await saveFile((o.exportName||'board')+'-'+new Date().toISOString().slice(0,10)+'.pdf',mkPdf(out));toast(T('PDF ready','تم تجهيز الملف'))}finally{bt.disabled=false;ld.classList.remove('show')}}
 root.querySelector('.gn-top').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.a){act[b.dataset.a](b);return}
  const t=b.dataset.t;if(t==='img'){fi.value='';fi.click();return}
  if(t==='emoji'){if(pop.classList.contains('show')&&pop.dataset.t==='emoji')pop.classList.remove('show');else popFor('emoji',b);return}
  if(st.tool===t&&t!=='hand'&&t!=='lasso'){if(pop.classList.contains('show')&&pop.dataset.t===t)pop.classList.remove('show');else popFor(t,b)}else{pop.classList.remove('show');st.tool=t;if(t!=='lasso'&&sel){const i=sel.i;sel=null;live(i)}dots()}});
 fi.onchange=()=>{const f=fi.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{const m=new Image();m.onload=()=>{const k=Math.min(1,1400/Math.max(m.width,m.height)),c=document.createElement('canvas');c.width=m.width*k;c.height=m.height*k;c.getContext('2d').drawImage(m,0,0,c.width,c.height);const src=c.toDataURL(f.type==='image/png'?'image/png':'image/jpeg',.85),w=Math.min(P[cur].w*.2,m.width,240),h=w*m.height/m.width,it={t:'img',src,x:(P[cur].w-w)/2,y:(P[cur].h-h)/2,w,h};chg(cur,A=>{A.push(it)});sel={i:cur,ids:[it],free:1};live(cur)};m.src=rd.result};rd.readAsDataURL(f)};
 root.addEventListener('keydown',e=>{if(e.target.tagName==='TEXTAREA'||e.target.tagName==='INPUT')return;const k=e.key.toLowerCase();if((e.ctrlKey||e.metaKey)&&k==='z'){e.preventDefault();e.shiftKey?redo():undo()}else if((e.ctrlKey||e.metaKey)&&k==='y')redo();else if((k==='delete'||k==='backspace')&&sel){chg(sel.i,A=>A.filter(x=>!sel.ids.includes(x)));const i=sel.i;sel=null;live(i)}});
 root.tabIndex=0;
 build();fit();dots();hb();size();
 return{setTheme:t=>{root.dataset.th=t},fit:()=>{if(st.view==='one')fitPage();else{fit();setZ(st.z)}},load:v=>$('.gn-load').classList.toggle('show',!!v),setTitle:t=>$('.gn-ttl').textContent=t,rebuild:(p,it)=>{P=p;items=it;u=[];r=[];sel=null;build();fit();hb()},setIcon:k=>{$('[data-a=back]').innerHTML=ic(k)},setFs:on=>{const b=$('[data-a=fs]');if(b)b.innerHTML=ic(on?'fullx':'full')},getPage:()=>cur,goPage:n=>goto(n,true),flush:()=>{clearTimeout(svT);o.save&&o.save(items,P)},destroy:()=>{clearTimeout(svT);io&&io.disconnect();mounted={};root.innerHTML='';root.classList.remove('gn')}}
}

function drawBorder(x,W,H,b,s){
 if(!b||!b.k||b.k==='none')return;
 const k=b.k,lw=Math.max(.6,(b.w||3)*s),g=(b.g==null?30:b.g)*s,L=g+lw/2,T=L,R=W-g-lw/2,B=H-g-lw/2;
 if(R-L<lw*6||B-T<lw*6)return;
 x.save();x.strokeStyle=x.fillStyle=b.c||'#374151';x.lineWidth=lw;x.lineJoin='miter';x.lineCap='butt';x.setLineDash([]);
 const rc=(l,t,r,bt,rad)=>{x.beginPath();if(rad&&x.roundRect)x.roundRect(l,t,r-l,bt-t,rad);else x.rect(l,t,r-l,bt-t);x.stroke()};
 if(k==='line')rc(L,T,R,B);
 else if(k==='double'){const d=lw*2.4;rc(L,T,R,B);rc(L+d,T+d,R-d,B-d)}
 else if(k==='triple'){const d=lw*2.2;rc(L,T,R,B);rc(L+d,T+d,R-d,B-d);rc(L+2*d,T+2*d,R-2*d,B-2*d)}
 else if(k==='thickthin'){const a=g+lw*1.1,d=lw*3.1;x.lineWidth=lw*2.2;rc(a,a,W-a,H-a);x.lineWidth=Math.max(.6,lw*.6);rc(a+d,a+d,W-a-d,H-a-d)}
 else if(k==='dashed'){x.setLineDash([lw*4,lw*2.4]);rc(L,T,R,B)}
 else if(k==='dots'){x.lineCap='round';x.setLineDash([0,lw*2.3]);rc(L,T,R,B)}
 else if(k==='dashdot'){x.lineCap='round';x.setLineDash([lw*4,lw*2.2,0,lw*2.2]);rc(L,T,R,B)}
 else if(k==='rounded')rc(L,T,R,B,Math.min(R-L,B-T)*.06+lw*2);
 else if(k==='corners'){const n=Math.min(R-L,B-T)*.14;x.lineWidth=lw*1.3;x.beginPath();x.moveTo(L,T+n);x.lineTo(L,T);x.lineTo(L+n,T);x.moveTo(R-n,T);x.lineTo(R,T);x.lineTo(R,T+n);x.moveTo(R,B-n);x.lineTo(R,B);x.lineTo(R-n,B);x.moveTo(L+n,B);x.lineTo(L,B);x.lineTo(L,B-n);x.stroke()}
 else if(k==='scallop'){const d=Math.max(lw*4,12*s),nx=Math.max(1,Math.round((R-L)/d)),ny=Math.max(1,Math.round((B-T)/d)),dx=(R-L)/nx,dy=(B-T)/ny,PI=Math.PI;x.lineJoin='round';x.beginPath();
  for(let i=0;i<nx;i++){x.moveTo(L+dx*i,T);x.arc(L+dx*(i+.5),T,dx/2,PI,0,true);x.moveTo(L+dx*i,B);x.arc(L+dx*(i+.5),B,dx/2,PI,0,false)}
  for(let j=0;j<ny;j++){x.moveTo(L,T+dy*j);x.arc(L,T+dy*(j+.5),dy/2,-PI/2,PI/2,false);x.moveTo(R,T+dy*j);x.arc(R,T+dy*(j+.5),dy/2,-PI/2,PI/2,true)}
  x.stroke()}
 x.restore()}
W.GN.drawBorder=drawBorder;
})(window);
