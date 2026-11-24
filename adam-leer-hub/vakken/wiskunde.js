(()=>{
const {ri,pick,shuffle,gcd,lcm,red,M,sn,pn,dec,eur,big,fr,frS,frMixed,frAns,tail,V,algShow,num,mc,frq,coq,alq,txt}=HUB.u;
/* ---------- drawings ---------- */
const S=(vb,inner,cls='')=>`<svg viewBox="${vb}" class="${cls}" role="img" aria-label="tekening bij de vraag">${inner}</svg>`;
const st='stroke="var(--ink)" stroke-width="2.5" fill="none" stroke-linejoin="round" stroke-linecap="round"';
const hid='stroke="var(--ink)" stroke-width="2" fill="none" stroke-dasharray="6 5"';
const face='fill="color-mix(in srgb,var(--vk) 22%,transparent)"';
const face2='fill="color-mix(in srgb,var(--vk) 38%,transparent)"';
const P2=a=>a.map(p=>p.join(',')).join(' ');
function boxSvg(w,h,dx,dy,lab){
  const x=40,y=150-h;const A=[x,y],B=[x+w,y],C=[x+w,150],D=[x,150],A2=[x+dx,y-dy],B2=[x+w+dx,y-dy],C2=[x+w+dx,150-dy],D2=[x+dx,150-dy];
  let t=`<polygon points="${P2([A,B,B2,A2])}" ${face}/><polygon points="${P2([B,C,C2,B2])}" ${face2}/><polygon points="${P2([A,B,C,D])}" ${face}/>`;
  t+=`<polyline points="${P2([D2,A2])}" ${hid}/><polyline points="${P2([D2,C2])}" ${hid}/><polyline points="${P2([D2,D])}" ${hid}/>`;
  t+=`<polygon points="${P2([A,B,C,D])}" ${st}/><polyline points="${P2([A,A2,B2,B])}" ${st}/><polyline points="${P2([B2,C2,C])}" ${st}/>`;
  if(lab)t+=`<text x="${x+w/2}" y="170" text-anchor="middle" font-size="15">${lab[0]}</text><text x="${x+w+dx/2+12}" y="${150-dy/2+12}" font-size="15">${lab[1]}</text><text x="${x-8}" y="${150-h/2+5}" text-anchor="end" font-size="15">${lab[2]}</text>`;
  return S('0 0 240 178',t);
}
const solids={
  kubus:()=>boxSvg(90,90,45,38),
  balk:()=>boxSvg(130,62,42,34),
  'driezijdig prisma':()=>{const a=[40,150],b=[135,150],c=[87,72],o=[52,36];const A=[a[0]+o[0],a[1]-o[1]],B=[b[0]+o[0],b[1]-o[1]],C=[c[0]+o[0],c[1]-o[1]];
    return S('0 0 240 170',`<polygon points="${P2([c,b,B,C])}" ${face2}/><polygon points="${P2([a,b,c])}" ${face}/><polyline points="${P2([a,A])}" ${hid}/><polyline points="${P2([A,B])}" ${hid}/><polyline points="${P2([A,C])}" ${hid}/><polygon points="${P2([a,b,c])}" ${st}/><polyline points="${P2([c,C,B,b])}" ${st}/>`)},
  piramide:()=>{const A=[35,145],B=[145,145],C=[195,110],D=[85,110],T=[115,22];
    return S('0 0 240 165',`<polygon points="${P2([T,A,B])}" ${face}/><polygon points="${P2([T,B,C])}" ${face2}/><polyline points="${P2([A,D,C])}" ${hid}/><polyline points="${P2([T,D])}" ${hid}/><polyline points="${P2([T,A,B,C,T])}" ${st}/><line x1="${T[0]}" y1="${T[1]}" x2="${B[0]}" y2="${B[1]}" ${st}/>`)},
  cilinder:()=>S('0 0 240 175',`<rect x="60" y="38" width="120" height="100" ${face}/><ellipse cx="120" cy="38" rx="60" ry="17" ${face2} ${st}/><path d="M60 138 A60 17 0 0 0 180 138" ${st}/><path d="M60 138 A60 17 0 0 1 180 138" ${hid}/><line x1="60" y1="38" x2="60" y2="138" ${st}/><line x1="180" y1="38" x2="180" y2="138" ${st}/>`),
  kegel:()=>S('0 0 240 175',`<polygon points="120,20 60,140 180,140" ${face}/><path d="M60 140 A60 17 0 0 0 180 140" ${st}/><path d="M60 140 A60 17 0 0 1 180 140" ${hid}/><polyline points="60,140 120,20 180,140" ${st}/>`),
  bol:()=>S('0 0 240 175',`<circle cx="120" cy="88" r="68" ${face} ${st}/><path d="M52 88 A68 18 0 0 0 188 88" ${st}/><path d="M52 88 A68 18 0 0 1 188 88" ${hid}/>`)
};
function gridSvg(pts,lo=-5,hi=5){
  const u=24,pad=26,n=hi-lo,W=n*u+pad*2;const X=x=>pad+(x-lo)*u,Y=y=>pad+(hi-y)*u;let t='';
  for(let i=lo;i<=hi;i++){t+=`<line x1="${X(i)}" y1="${Y(lo)}" x2="${X(i)}" y2="${Y(hi)}" stroke="var(--line)" stroke-width="1"/><line x1="${X(lo)}" y1="${Y(i)}" x2="${X(hi)}" y2="${Y(i)}" stroke="var(--line)" stroke-width="1"/>`;
    if(i&&i%1===0){t+=`<text x="${X(i)}" y="${Y(0)+16}" font-size="11" text-anchor="middle">${sn(i)}</text><text x="${X(0)-6}" y="${Y(i)+4}" font-size="11" text-anchor="end">${sn(i)}</text>`}}
  t+=`<line x1="${X(lo)}" y1="${Y(0)}" x2="${X(hi)+8}" y2="${Y(0)}" ${st}/><line x1="${X(0)}" y1="${Y(lo)}" x2="${X(0)}" y2="${Y(hi)-8}" ${st}/><text x="${X(hi)+10}" y="${Y(0)-6}" font-size="15" font-style="italic">x</text><text x="${X(0)+8}" y="${Y(hi)-6}" font-size="15" font-style="italic">y</text><text x="${X(0)-6}" y="${Y(0)+16}" font-size="11" text-anchor="end">0</text>`;
  pts.forEach(([x,y,l])=>{t+=`<circle cx="${X(x)}" cy="${Y(y)}" r="6" fill="var(--bad)"/><text x="${X(x)+8}" y="${Y(y)-8}" font-size="17" font-weight="700" style="paint-order:stroke;stroke:var(--card);stroke-width:4px">${l}</text>`});
  return S(`0 0 ${W+14} ${W}`,t);
}
function lineGraph(xs,ys,xl,yl,ymax){
  const W=360,H=230,L=44,R=14,T=14,B=44;const X=i=>L+i*(W-L-R)/(xs.length-1),Y=v=>T+(ymax-v)*(H-T-B)/ymax;let t='';
  for(let v=0;v<=ymax;v+=2){t+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/>`;t+=`<text x="${L-6}" y="${Y(v)+4}" font-size="12" text-anchor="end">${v}</text>`}
  xs.forEach((x,i)=>{t+=`<line x1="${X(i)}" x2="${X(i)}" y1="${T}" y2="${H-B}" stroke="var(--line)"/><text x="${X(i)}" y="${H-B+18}" font-size="12" text-anchor="middle">${x}</text>`});
  t+=`<polyline points="${ys.map((v,i)=>X(i)+','+Y(v)).join(' ')}" fill="none" stroke="var(--vk)" stroke-width="3.5" stroke-linejoin="round"/>`+ys.map((v,i)=>`<circle cx="${X(i)}" cy="${Y(v)}" r="4" fill="var(--vk)"/>`).join('');
  t+=`<line x1="${L}" y1="${H-B}" x2="${W-R}" y2="${H-B}" ${st}/><line x1="${L}" y1="${T}" x2="${L}" y2="${H-B}" ${st}/><text x="${(L+W-R)/2}" y="${H-6}" font-size="13" text-anchor="middle">${xl}</text><text x="12" y="${T+4}" font-size="13" transform="rotate(-90 12 ${T+4})" text-anchor="end">${yl}</text>`;
  return S(`0 0 ${W} ${H}`,t,'wide');
}
const shapes={stijgt:[[0,0],[1,1]],daalt:[[0,1],[1,0]],trap:[[0,0],[.4,.55],[.6,.55],[1,1]],berg:[[0,0],[.5,1],[1,0]],vol:[[0,0],[.55,.9],[1,.9]],wachten:[[0,0],[.45,0],[1,.9]]};
function threeGraphs(keys){
  let t='';keys.forEach((k,i)=>{const ox=10+i*120,W=100,H=90,oy=14;const pts=shapes[k].map(([x,y])=>(ox+x*W)+','+(oy+H-y*H)).join(' ');
    t+=`<line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy+H}" ${st}/><line x1="${ox}" y1="${oy+H}" x2="${ox+W}" y2="${oy+H}" ${st}/><polyline points="${pts}" fill="none" stroke="var(--vk)" stroke-width="4" stroke-linejoin="round"/><text x="${ox+W/2}" y="${oy+H+24}" font-size="17" font-weight="700" text-anchor="middle">${'ABC'[i]}</text>`});
  return S('0 0 370 140',t,'wide');
}
function angleSvg(deg,lab){
  const cx=40,cy=150,L=150,r=40,a=deg*Math.PI/180;const ex=cx+L*Math.cos(a),ey=cy-L*Math.sin(a);
  const vb=deg>90?`${cx-L*Math.abs(Math.cos(a))-20} 0 ${L+L*Math.abs(Math.cos(a))+60} 175`:'0 0 230 175';
  const big=0;const ax=cx+r*Math.cos(a),ay=cy-r*Math.sin(a);
  let t=`<path d="M${cx+r} ${cy} A${r} ${r} 0 ${big} 0 ${ax} ${ay}" fill="none" stroke="var(--sun)" stroke-width="5"/><line x1="${cx}" y1="${cy}" x2="${cx+L}" y2="${cy}" ${st}/><line x1="${cx}" y1="${cy}" x2="${ex}" y2="${ey}" ${st}/><circle cx="${cx}" cy="${cy}" r="4" fill="var(--ink)"/>`;
  if(deg===90)t=`<rect x="${cx}" y="${cy-22}" width="22" height="22" fill="none" stroke="var(--sun)" stroke-width="4"/><line x1="${cx}" y1="${cy}" x2="${cx+L}" y2="${cy}" ${st}/><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-L}" ${st}/>`;
  if(lab)t+=`<text x="${cx-6}" y="${cy+20}" font-size="16" font-weight="700" text-anchor="middle">${lab[1]}</text><text x="${cx+L}" y="${cy+20}" font-size="16" font-weight="700">${lab[2]}</text><text x="${ex+6}" y="${ey-6}" font-size="16" font-weight="700">${lab[0]}</text>`;
  return S(vb,t);
}
function crossSvg(alpha,given,ask){
  const cx=150,cy=95,L=130,a=alpha*Math.PI/180;const dx=Math.cos(a)*L,dy=Math.sin(a)*L;
  const mid=[alpha/2,(alpha+180)/2,180+alpha/2,270+alpha/2];
  let t=`<line x1="${cx-L}" y1="${cy}" x2="${cx+L}" y2="${cy}" ${st}/><line x1="${cx-dx}" y1="${cy+dy}" x2="${cx+dx}" y2="${cy-dy}" ${st}/>`;
  const lab=(i,s,c)=>{const sz=i%2?180-alpha:alpha;const m=mid[i]*Math.PI/180,rr=sz<45?70:46;t+=`<text x="${cx+rr*Math.cos(m)}" y="${cy-rr*Math.sin(m)+6}" font-size="18" font-weight="700" text-anchor="middle" fill="${c}" style="fill:${c}">${s}</text>`};
  lab(given,(given%2?180-alpha:alpha)+'°','var(--ink)');lab(ask,'?','var(--bad)');
  return S('0 0 300 190',t);
}
function triSvg(A,B,labs,show){
  const r=Math.PI/180,C=180-A-B,L=200;const ac=L*Math.sin(B*r)/Math.sin(C*r);const pA=[0,0],pB=[L,0],pC=[ac*Math.cos(A*r),-ac*Math.sin(A*r)];
  const xs=[0,L,pC[0]],ys=[0,pC[1]];const minx=Math.min(...xs)-30,maxx=Math.max(...xs)+30,miny=Math.min(...ys)-34,maxy=34;
  const cen=[(pA[0]+pB[0]+pC[0])/3,(pA[1]+pB[1]+pC[1])/3];let t=`<polygon points="${P2([pA,pB,pC])}" ${face} ${st}/>`;
  [[pA,'A',show[0]],[pB,'B',show[1]],[pC,'C',show[2]]].forEach(([p,n,v])=>{const dx=cen[0]-p[0],dy=cen[1]-p[1],d=Math.hypot(dx,dy);
    t+=`<text x="${p[0]-dx/d*16}" y="${p[1]-dy/d*16+6}" font-size="17" font-weight="700" text-anchor="middle">${n}</text>`;
    if(v)t+=`<text x="${p[0]+dx/d*34}" y="${p[1]+dy/d*34+5}" font-size="15" text-anchor="middle" fill="${v==='?'?'var(--bad)':'var(--ink)'}" style="fill:${v==='?'?'var(--bad)':'var(--ink)'}" font-weight="700">${v}</text>`});
  return S(`${minx} ${miny} ${maxx-minx} ${maxy-miny}`,t);
}
function lineTypeSvg(kind){
  const A=[100,100],B=[220,60];const ext=(p,q,s)=>[p[0]+(p[0]-q[0])*s,p[1]+(p[1]-q[1])*s];
  let a=A,b=B;if(kind!=='lijnstuk')b=ext(B,A,2);if(kind==='lijn')a=ext(A,B,2);
  return S('0 0 320 160',`<rect x="1" y="1" width="318" height="158" rx="10" fill="none" stroke="var(--line)"/><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" ${st}/><circle cx="${A[0]}" cy="${A[1]}" r="5" fill="var(--ink)"/><circle cx="${B[0]}" cy="${B[1]}" r="5" fill="var(--ink)"/><text x="${A[0]-6}" y="${A[1]+24}" font-size="17" font-weight="700">A</text><text x="${B[0]-4}" y="${B[1]+26}" font-size="17" font-weight="700">B</text>`);
}
function circleSvg(kind){
  let t=`<circle cx="120" cy="85" r="70" ${face} ${st}/><circle cx="120" cy="85" r="4" fill="var(--ink)"/><text x="126" y="80" font-size="15">M</text>`;
  if(kind==='straal')t+=`<line x1="120" y1="85" x2="${120+70*Math.cos(.5)}" y2="${85+70*Math.sin(.5)}" stroke="var(--bad)" stroke-width="4"/>`;
  if(kind==='middellijn')t+=`<line x1="${120-70*Math.cos(.4)}" y1="${85-70*Math.sin(.4)}" x2="${120+70*Math.cos(.4)}" y2="${85+70*Math.sin(.4)}" stroke="var(--bad)" stroke-width="4"/>`;
  if(kind==='omtrek')t=`<circle cx="120" cy="85" r="70" ${face} stroke="var(--bad)" stroke-width="5" fill="none"/><circle cx="120" cy="85" r="4" fill="var(--ink)"/>`;
  return S('0 0 240 170',t);
}
function polySvg(n){const pts=[];for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/n;pts.push([110+70*Math.cos(a),85+70*Math.sin(a)])}return S('0 0 220 170',`<polygon points="${P2(pts)}" ${face} ${st}/>`)}

/* ---------- content ---------- */
const W={};
const def=(id,t,can,learn,gen,hint)=>{W[id]={id,t,can,learn,gen,hint}};
const names={3:'driezijdig',4:'vierzijdig',5:'vijfzijdig',6:'zeszijdig',8:'achtzijdig'};
const hoek={3:'driehoek',4:'vierhoek',5:'vijfhoek',6:'zeshoek',7:'zevenhoek',8:'achthoek'};

def('1.1','Ruimtefiguren en uitslagen',['ruimtefiguren herkennen','een uitslag herkennen'],
`<p>Een <b>ruimtefiguur</b> is een vorm die je kunt vastpakken: hij heeft lengte, breedte én hoogte. De belangrijkste: <b>kubus, balk, prisma, piramide, cilinder, kegel en bol</b>.</p>
<p>Een <b>uitslag</b> is de ruimtefiguur opengeknipt en plat neergelegd. Vouw je de uitslag weer dicht, dan heb je de ruimtefiguur terug.</p>
<div class="ex"><b>Voorbeeld</b>Een uitslag met 2 cirkels en 1 rechthoek vouw je tot een <b>cilinder</b> (denk aan een blik: deksel, bodem en de wikkel eromheen).</div>
<div class="warn">Stippellijnen in een tekening zijn de ribben die je níet kunt zien, omdat ze achter de figuur zitten.</div>`,
()=>{if(ri(0,1)){const k=pick(Object.keys(solids));return mc('Welke ruimtefiguur zie je?',k,shuffle(Object.keys(solids).filter(x=>x!==k)).slice(0,3),`Dit is een <b>${k}</b>. ${({kubus:'Alle zes vlakken zijn even grote vierkanten.',balk:'Zes rechthoekige vlakken, tegenover elkaar steeds twee dezelfde.','driezijdig prisma':'Voor en achter een driehoek, ertussen rechthoeken.',piramide:'Een grondvlak met driehoeken die samenkomen in één top.',cilinder:'Twee cirkels met een gebogen wand ertussen.',kegel:'Een cirkel als grondvlak en één punt bovenaan.',bol:'Helemaal rond, zoals een bal.'})[k]}`,{svg:solids[k]()})}
 const u=pick([['6 even grote vierkanten','kubus'],['2 cirkels en 1 rechthoek','cilinder'],['1 cirkel en 1 stuk van een cirkel (een taartpunt-vorm)','kegel'],['1 vierkant en 4 driehoeken','piramide'],['2 driehoeken en 3 rechthoeken','driezijdig prisma'],['6 rechthoeken, steeds 2 dezelfde','balk']]);
 return mc(`Een uitslag bestaat uit <b>${u[0]}</b>. Welke ruimtefiguur vouw je hiervan?`,u[1],['kubus','balk','cilinder','kegel','piramide','driezijdig prisma'].filter(x=>x!==u[1]).sort(()=>Math.random()-.5).slice(0,3),`Uit ${u[0]} vouw je een <b>${u[1]}</b>.`)},
'Bedenk hoe het ding eruitziet als je het dichtvouwt. Welke vlakken heeft het?');

def('1.2','Vierkant en kubus',['een vierkant en een kubus herkennen en tekenen','zijvlakken, ribben en hoekpunten tellen'],
`<p>Een <b>vierkant</b> heeft 4 even lange zijden en 4 rechte hoeken. Een <b>kubus</b> is een ruimtefiguur met 6 vierkanten als zijvlakken.</p>
<ul><li><b>Zijvlak</b>: een plat vlak aan de buitenkant. Kubus: 6.</li><li><b>Ribbe</b>: een lijn waar twee vlakken samenkomen. Kubus: 12.</li><li><b>Hoekpunt</b>: een punt waar ribben samenkomen. Kubus: 8.</li></ul>
<div class="ex"><b>Voorbeeld</b>Een kubus heeft ribben van 5 cm. Alle ribben samen: 12 × 5 = <b>60 cm</b>.</div>
<div class="warn">Tel de verborgen ribben (stippellijnen) ook mee!</div>`,
()=>{const t=ri(0,2);if(t===0){const [w,v]=pick([['zijvlakken',6],['ribben',12],['hoekpunten',8]]);return num(`Hoeveel <b>${w}</b> heeft een kubus?`,v,`Een kubus heeft 6 zijvlakken, 12 ribben en 8 hoekpunten. Dus: <b>${v}</b>.`,{svg:solids.kubus()})}
 if(t===1){const r=ri(2,9);return num(`Een kubus heeft ribben van ${r} cm. Hoeveel cm zijn <b>alle ribben samen</b>?`,12*r,`Een kubus heeft 12 ribben. 12 × ${r} = <b>${12*r} cm</b>.`,{svg:solids.kubus()})}
 const z=ri(3,15);return num(`Een vierkant heeft zijden van ${z} cm. Hoe groot is de <b>omtrek</b> (de lengte rondom)?`,4*z,`Een vierkant heeft 4 even lange zijden: 4 × ${z} = <b>${4*z} cm</b>.`)},
'Een kubus: 6 vlakken, 12 ribben, 8 hoekpunten.');

def('1.3','Rechthoek en balk',['een rechthoek, balk en uitslag van een balk herkennen en tekenen'],
`<p>Een <b>rechthoek</b> heeft 4 rechte hoeken; de overstaande zijden zijn even lang. Een <b>balk</b> is een ruimtefiguur met 6 rechthoekige zijvlakken. Tegenover elkaar zitten steeds twee dezelfde.</p>
<p>Een balk heeft net als een kubus <b>6 zijvlakken, 12 ribben en 8 hoekpunten</b>. Van elke afmeting (lengte, breedte, hoogte) zijn er 4 ribben.</p>
<div class="ex"><b>Voorbeeld</b>Balk van 5 bij 3 bij 2 cm. Alle ribben samen: 4 × 5 + 4 × 3 + 4 × 2 = 20 + 12 + 8 = <b>40 cm</b>.</div>
<div class="warn">Een kubus is ook een balk, maar een heel speciale: alle ribben zijn even lang.</div>`,
()=>{const t=ri(0,2);if(t===0){const l=ri(4,15),b=ri(2,l-1);return num(`Een rechthoek is ${l} cm lang en ${b} cm breed. Hoe groot is de <b>omtrek</b>?`,2*(l+b),`Rondom: ${l} + ${b} + ${l} + ${b} = <b>${2*(l+b)} cm</b>.`)}
 if(t===1){const a=ri(4,9),b=ri(2,6),c=ri(2,5);return num(`Een balk is ${a} cm lang, ${b} cm breed en ${c} cm hoog. Hoeveel cm zijn <b>alle ribben samen</b>?`,4*(a+b+c),`Van elke maat zijn er 4 ribben: 4 × ${a} + 4 × ${b} + 4 × ${c} = ${4*a} + ${4*b} + ${4*c} = <b>${4*(a+b+c)} cm</b>.`,{svg:boxSvg(130,62,42,34,[a+' cm',b+' cm',c+' cm'])})}
 const s=pick([['Een kubus is een speciale balk.',['Een balk is altijd een kubus.','Een balk heeft 8 zijvlakken.','Een rechthoek heeft 3 rechte hoeken.']],['Een balk heeft 12 ribben.',['Een balk heeft 6 ribben.','Een balk heeft 4 hoekpunten.','Een balk heeft 8 zijvlakken.']],['De uitslag van een balk bestaat uit 6 rechthoeken.',['De uitslag van een balk bestaat uit 4 rechthoeken.','De uitslag van een balk bestaat uit 6 driehoeken.','De uitslag van een balk bestaat uit 8 rechthoeken.']]]);
 return mc('Welke uitspraak klopt?',s[0],s[1],`Goed is: <b>${s[0]}</b>`)},
'Van elke maat (lengte, breedte, hoogte) heeft een balk 4 ribben.');

def('1.4','Cirkels',['cirkels herkennen en tekenen met een passer','middelpunt, straal en middellijn kennen'],
`<p>Een <b>cirkel</b> teken je met een <b>passer</b>. Alle punten op de cirkel liggen even ver van het <b>middelpunt</b> M.</p>
<ul><li><b>Straal</b>: van het middelpunt naar de cirkel.</li><li><b>Middellijn</b>: van rand tot rand, dwars door het middelpunt. Die is <b>2 keer zo lang</b> als de straal.</li></ul>
<div class="ex"><b>Voorbeeld</b>Straal 4 cm → middellijn 2 × 4 = <b>8 cm</b>. Middellijn 10 cm → straal 10 : 2 = <b>5 cm</b>.</div>
<div class="warn">Zet je passer op de <b>straal</b>, niet op de middellijn. Wil je een cirkel van 6 cm breed? Dan zet je de passer op 3 cm.</div>`,
()=>{const t=ri(0,2);if(t===0){const r=ri(2,12);return num(`Een cirkel heeft een straal van ${r} cm. Hoe lang is de <b>middellijn</b>?`,2*r,`De middellijn is 2 × de straal: 2 × ${r} = <b>${2*r} cm</b>.`)}
 if(t===1){const d=2*ri(2,10);return num(`Je wilt een cirkel tekenen met een middellijn van ${d} cm. Op hoeveel cm zet je je <b>passer</b>?`,d/2,`De passer zet je op de straal: ${d} : 2 = <b>${d/2} cm</b>.`)}
 const k=pick(['straal','middellijn','omtrek']);return mc('Hoe heet het <b>rode</b> deel in de tekening?',k,['straal','middellijn','omtrek','middelpunt'],`Het rode deel is de <b>${k}</b>.`,{svg:circleSvg(k)})},
'Middellijn = 2 × straal.');

def('1.5','Driehoeken en prisma’s',['een driehoek tekenen als je drie zijden weet','prisma’s herkennen en vlakken, ribben en hoekpunten tellen'],
`<p>Een driehoek met drie gegeven zijden teken je met een <b>passer</b>: teken eerst de langste zijde, zet dan vanuit beide eindpunten een cirkelboog met de andere zijden. Waar de bogen elkaar snijden, ligt het derde hoekpunt.</p>
<p>Een <b>prisma</b> heeft een gelijk boven- en grondvlak (bijvoorbeeld twee driehoeken) met rechthoeken ertussen. Is het grondvlak een <i>n</i>-hoek, dan:</p>
<ul><li>vlakken: <b>n + 2</b> (n rechthoeken + 2 grondvlakken)</li><li>ribben: <b>3 × n</b> (n onder, n boven, n staand)</li><li>hoekpunten: <b>2 × n</b></li></ul>
<div class="ex"><b>Voorbeeld</b>Zeszijdig prisma: 6 + 2 = <b>8 vlakken</b>, 3 × 6 = <b>18 ribben</b>, 2 × 6 = <b>12 hoekpunten</b>.</div>`,
()=>{const n=pick([3,4,5,6,8]);const [w,v,u]=pick([['vlakken (grondvlak en bovenvlak meegeteld)',n+2,`${n} rechthoeken + 2 grondvlakken = ${n+2}`],['ribben',3*n,`${n} onder + ${n} boven + ${n} staand = ${3*n}`],['hoekpunten',2*n,`${n} onder + ${n} boven = ${2*n}`]]);
 return num(`Een prisma heeft een ${hoek[n]} als grondvlak (een ${names[n]} prisma). Hoeveel <b>${w}</b> heeft het?`,v,`${u}. Antwoord: <b>${v}</b>.`,{svg:n===3?solids['driezijdig prisma']():(n===4?solids.balk():null)})},
'Prisma met een n-hoek: n + 2 vlakken, 3n ribben, 2n hoekpunten.');

def('1.6','Diagonalen en piramides',['diagonalen tekenen in een veelhoek','piramides herkennen en tellen'],
`<p>Een <b>diagonaal</b> is een lijnstuk tussen twee hoekpunten die <b>niet</b> naast elkaar liggen. Een vierhoek heeft er 2, een vijfhoek 5, een zeshoek 9.</p>
<p>Handige regel: aantal diagonalen = <b>n × (n − 3) : 2</b>. Vanuit elk hoekpunt kun je naar n − 3 andere hoekpunten (niet naar jezelf en niet naar je twee buren), en zo tel je elke diagonaal twee keer.</p>
<p>Een <b>piramide</b> heeft een grondvlak en driehoeken die samenkomen in de <b>top</b>. Met een <i>n</i>-hoek als grondvlak:</p>
<ul><li>vlakken: <b>n + 1</b></li><li>ribben: <b>2 × n</b></li><li>hoekpunten: <b>n + 1</b> (de top telt mee)</li></ul>
<div class="ex"><b>Voorbeeld</b>Vierzijdige piramide: 5 vlakken, 8 ribben, 5 hoekpunten.</div>`,
()=>{if(ri(0,1)){const n=ri(4,8);return num(`Hoeveel <b>diagonalen</b> heeft een ${hoek[n]}?`,n*(n-3)/2,`Vanuit elk hoekpunt ${n-3===1?'gaat 1 diagonaal':'gaan '+(n-3)+' diagonalen'}. ${n} × ${n-3} : 2 = <b>${n*(n-3)/2}</b>.`,{svg:polySvg(n)})}
 const n=pick([3,4,5,6,8]);const [w,v,u]=pick([['vlakken (grondvlak meegeteld)',n+1,`${n} driehoeken + 1 grondvlak = ${n+1}`],['ribben',2*n,`${n} in het grondvlak + ${n} naar de top = ${2*n}`],['hoekpunten',n+1,`${n} in het grondvlak + 1 top = ${n+1}`]]);
 return num(`Een piramide heeft een ${hoek[n]} als grondvlak. Hoeveel <b>${w}</b> heeft hij?`,v,`${u}. Antwoord: <b>${v}</b>.`,{svg:n===4?solids.piramide():null})},
'Piramide met een n-hoek: n + 1 vlakken, 2n ribben, n + 1 hoekpunten.');

/* H2 */
def('2.1','Rekenvolgorde',['optellen, aftrekken, vermenigvuldigen en delen in één som','de juiste volgorde gebruiken'],
`<p>Staan er verschillende bewerkingen in één som, dan reken je in deze volgorde:</p>
<ol><li><b>Haakjes</b> eerst</li><li><b>Machten</b> (zoals 3²)</li><li><b>Keer en delen</b>, van links naar rechts</li><li><b>Plus en min</b>, van links naar rechts</li></ol>
<div class="ex"><b>Voorbeeld</b>5 + 3 × 4 = 5 + 12 = <b>17</b> (niet 8 × 4!)<br>(5 + 3) × 4 = 8 × 4 = <b>32</b></div>
<div class="warn">Keer en delen zijn even sterk: dan gewoon van links naar rechts. 24 : 4 × 2 = 6 × 2 = 12.</div>`,
()=>{const t=ri(0,5);let q,a,u;
 if(t===0){const x=ri(2,20),y=ri(2,9),z=ri(2,9);q=`${x} + ${y} × ${z}`;a=x+y*z;u=`Eerst keer: ${y} × ${z} = ${y*z}. Dan ${x} + ${y*z} = <b>${a}</b>.`}
 if(t===1){const x=ri(2,9),y=ri(2,9),z=ri(2,9);q=`(${x} + ${y}) × ${z}`;a=(x+y)*z;u=`Eerst haakjes: ${x} + ${y} = ${x+y}. Dan ${x+y} × ${z} = <b>${a}</b>.`}
 if(t===2){const x=ri(3,9),y=ri(3,9),z=ri(2,5),w=ri(2,5);q=`${x} × ${y} − ${z} × ${w}`;a=x*y-z*w;u=`Eerst keer: ${x*y} en ${z*w}. Dan ${x*y} − ${z*w} = <b>${a}</b>.`}
 if(t===3){const x=ri(10,30),y=ri(2,9),z=ri(2,15);q=`${x} − ${y} + ${z}`;a=x-y+z;u=`Plus en min: van links naar rechts. ${x} − ${y} = ${x-y}, dan + ${z} = <b>${a}</b>.`}
 if(t===4){const f=ri(2,6),k=ri(2,8),g=ri(2,5);q=`${f*k} : ${f} × ${g}`;a=k*g;u=`Delen en keer: van links naar rechts. ${f*k} : ${f} = ${k}, dan × ${g} = <b>${a}</b>.`}
 if(t===5){const x=ri(2,15),y=ri(2,6),c=ri(6,12),d=ri(1,5);q=`${x} + ${y} × (${c} − ${d})`;a=x+y*(c-d);u=`Haakjes: ${c} − ${d} = ${c-d}. Keer: ${y} × ${c-d} = ${y*(c-d)}. Plus: ${x} + ${y*(c-d)} = <b>${a}</b>.`}
 return num(`Bereken: <b>${q.replace(/-/g,M)}</b>`,a,u)},
'Haakjes → machten → keer/delen → plus/min.');

def('2.2','Breuken',['breuken vereenvoudigen','helen uit en in een breuk halen','breuken optellen, aftrekken en vermenigvuldigen'],
`<p><b>Vereenvoudigen</b>: deel teller en noemer door hetzelfde getal. ${fr(12,18)} = ${fr(2,3)} (alles gedeeld door 6).</p>
<p><b>Helen eruit</b>: ${fr(17,5)} → 17 : 5 = 3 rest 2, dus 3 ${fr(2,5)}. <b>Helen erin</b>: 2 ${fr(3,4)} = ${fr('2 × 4 + 3',4)} = ${fr(11,4)}.</p>
<p><b>Optellen/aftrekken</b>: maak eerst de noemers gelijk (gelijknamig).</p>
<div class="ex"><b>Voorbeeld</b>${fr(1,4)} + ${fr(2,3)} = ${fr(3,12)} + ${fr(8,12)} = <b>${fr(11,12)}</b></div>
<p><b>Vermenigvuldigen</b>: teller × teller en noemer × noemer. ${fr(2,3)} × ${fr(3,5)} = ${fr(6,15)} = ${fr(2,5)}.</p>
<div class="warn">Bij optellen tel je de noemers níet op! ${fr(1,2)} + ${fr(1,3)} is geen ${fr(2,5)}.</div>
<p class="tip">Antwoorden typ je zo: <b>3/4</b>, of met helen: <b>2 1/3</b>. Altijd zo eenvoudig mogelijk.</p>`,
()=>{const t=ri(0,5);
 if(t===0){const d0=pick([2,3,4,5,7]),n0=ri(1,d0-1),k=ri(2,6);if(gcd(n0,d0)!==1)return W['2.2'].gen();return frq(`Vereenvoudig: <b>${fr(n0*k,d0*k)}</b>`,n0,d0,`Teller en noemer kun je allebei door ${k} delen: ${fr(n0*k,d0*k)} = <b>${fr(n0,d0)}</b>.`)}
 if(t===1){const d=pick([3,4,5,6,7,8]),w=ri(1,5),r=ri(1,d-1);if(gcd(r,d)!==1)return W['2.2'].gen();const n=w*d+r;const q=frq(`Haal de helen eruit: <b>${fr(n,d)}</b>`,n,d,`${n} : ${d} = ${w} rest ${r}. Dus <b>${w} ${fr(r,d)}</b>.`);q.show=`${w} ${fr(r,d)}`;q.form='mixed';return q}
 if(t===2){const d=pick([3,4,5,6,8]),w=ri(1,4),r=ri(1,d-1);if(gcd(r,d)!==1)return W['2.2'].gen();const q=frq(`Schrijf als één breuk (helen erin): <b>${w} ${fr(r,d)}</b>`,w*d+r,d,`${w} × ${d} + ${r} = ${w*d+r}. Dus <b>${fr(w*d+r,d)}</b>.`);q.show=fr(w*d+r,d);q.form='improper';return q}
 const ds=[2,3,4,5,6,8,10];let b=pick(ds),d=pick(ds);if(b===d)d=b===2?3:2;const a=ri(1,b-1),c=ri(1,d-1);const L=lcm(b,d);
 if(t===3){const [n,m]=red(a*(L/b)+c*(L/d),L);return frq(`Bereken: <b>${fr(a,b)} + ${fr(c,d)}</b>`,n,m,`Gelijknamig maken met noemer ${L}: ${fr(a*L/b,L)} + ${fr(c*L/d,L)} = ${fr(a*L/b+c*L/d,L)}${tail(a*L/b+c*L/d,L)}.`)}
 if(t===4){let x=a*(L/b),y=c*(L/d);let A=[a,b],C=[c,d];if(x<y){[x,y]=[y,x];[A,C]=[C,A]}if(x===y)return W['2.2'].gen();const [n,m]=red(x-y,L);return frq(`Bereken: <b>${fr(A[0],A[1])} ${M} ${fr(C[0],C[1])}</b>`,n,m,`Gelijknamig maken met noemer ${L}: ${fr(x,L)} ${M} ${fr(y,L)} = ${fr(x-y,L)}${tail(x-y,L)}.`)}
 if(ri(0,1)){const k=ri(2,5);return frq(`Bereken: <b>${k} × ${fr(a,b)}</b>`,k*a,b,`${k} × ${fr(a,b)} = ${fr(k*a,b)}${tail(k*a,b)}.`)}
 return frq(`Bereken: <b>${fr(a,b)} × ${fr(c,d)}</b>`,a*c,b*d,`Teller × teller, noemer × noemer: ${fr(a*c,b*d)}${tail(a*c,b*d)}.`)},
'Bij optellen en aftrekken eerst de noemers gelijk maken.');

def('2.3','Negatieve getallen',['positieve en negatieve getallen op volgorde zetten','optellen en aftrekken met negatieve getallen'],
`<p>Denk aan een <b>getallenlijn</b> of een thermometer: hoe verder naar links (of lager), hoe kleiner. −8 is kleiner dan −2.</p>
<ul><li><b>Plus een getal</b>: naar rechts. −5 + 8 = 3.</li><li><b>Min een getal</b>: naar links. 3 − 9 = −6.</li><li><b>Min een negatief getal</b> = plus! 4 − (−6) = 4 + 6 = 10.</li><li><b>Plus een negatief getal</b> = min. 7 + (−10) = 7 − 10 = −3.</li></ul>
<div class="warn">Twee mintekens naast elkaar worden een plus: − (−) = +.</div>`,
()=>{const t=ri(0,3);
 if(t===0){const s=new Set();while(s.size<4)s.add(ri(-12,12));const a=[...s];const small=ri(0,1);const v=small?Math.min(...a):Math.max(...a);return mc(`Welk getal is het <b>${small?'kleinst':'grootst'}</b>?`,sn(v),a.filter(x=>x!==v).map(sn),`Op de getallenlijn ligt ${sn(v)} het verst naar ${small?'links':'rechts'}. Antwoord: <b>${sn(v)}</b>.`)}
 if(t===1){const a=ri(-12,12),b=ri(-12,-1);const op=ri(0,1);const r=op?a-b:a+b;return num(`Bereken: <b>${sn(a)} ${op?M:'+'} ${pn(b)}</b>`,r,op?`Min een negatief getal wordt plus: ${sn(a)} + ${-b} = <b>${sn(r)}</b>.`:`Plus een negatief getal wordt min: ${sn(a)} ${M} ${-b} = <b>${sn(r)}</b>.`)}
 if(t===2){const a=ri(-15,10),b=ri(2,15);const op=ri(0,1);const r=op?a-b:a+b;return num(`Bereken: <b>${sn(a)} ${op?M:'+'} ${b}</b>`,r,`Start bij ${sn(a)} en ga ${b} stappen naar ${op?'links':'rechts'}. Antwoord: <b>${sn(r)}</b>.`)}
 const s=ri(-9,4),c=ri(3,12);const w=ri(0,1);const r=w?s+c:s-c;return num(`Het is ${sn(s)} °C. Het wordt ${c} graden ${w?'warmer':'kouder'}. Hoe warm is het dan?`,r,`${sn(s)} ${w?'+':M} ${c} = <b>${sn(r)} °C</b>.`,{unit:'°C'})},
'Teken een getallenlijn. Min een negatief getal = plus.');

def('2.4','Keer en delen met negatieve getallen',['vermenigvuldigen en delen met negatieve getallen','ook in combinatie met de rekenvolgorde'],
`<p>Kijk eerst naar de <b>tekens</b>, reken dan gewoon:</p>
<ul><li>plus × plus = <b>plus</b>, min × min = <b>plus</b></li><li>plus × min = <b>min</b>, min × plus = <b>min</b></li></ul><p>Bij delen werkt het precies zo.</p>
<div class="ex"><b>Voorbeeld</b>−3 × −4 = 12 &nbsp;·&nbsp; −24 : 6 = −4 &nbsp;·&nbsp; −2 × 3 + (−5) = −6 − 5 = −11</div>
<div class="warn">Even veel mintekens → plus. Oneven veel → min. −2 × −3 × −1 = −6.</div>`,
()=>{const t=ri(0,2);
 if(t===0){let a=ri(-9,9)||-3,b=ri(-9,9)||-4;if(a>0&&b>0)a=-a;return num(`Bereken: <b>${sn(a)} × ${pn(b)}</b>`,a*b,`Tekens: ${a<0?'min':'plus'} × ${b<0?'min':'plus'} = ${a*b<0?'min':'plus'}. ${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a*b)}. Antwoord: <b>${sn(a*b)}</b>.`)}
 if(t===1){let r=ri(-9,9)||5,b=ri(-8,8)||-2;if(r>0&&b>0)b=-b;const a=r*b;return num(`Bereken: <b>${sn(a)} : ${pn(b)}</b>`,r,`Tekens: ${a<0?'min':'plus'} : ${b<0?'min':'plus'} = ${r<0?'min':'plus'}. ${Math.abs(a)} : ${Math.abs(b)} = ${Math.abs(r)}. Antwoord: <b>${sn(r)}</b>.`)}
 const a=ri(-6,6)||-2,b=ri(-6,6)||3,c=ri(-10,10)||-5;const r=a*b+c;return num(`Bereken: <b>${sn(a)} × ${pn(b)} + ${pn(c)}</b>`,r,`Eerst keer: ${sn(a)} × ${pn(b)} = ${sn(a*b)}. Dan ${sn(a*b)} + ${pn(c)} = <b>${sn(r)}</b>.`)},
'Min × min = plus. Min × plus = min.');

def('2.5','Deelstreep en negatieve breuken',['berekeningen met een deelstreep','rekenen met negatieve breuken'],
`<p>Een <b>deelstreep</b> werkt als haakjes: reken eerst alles <b>boven</b> uit, dan alles <b>onder</b>, en deel daarna.</p>
<div class="ex"><b>Voorbeeld</b>${fr('8 + 4','5 − 8')} = ${fr(12,M+'3')} = <b>${M}4</b></div>
<p><b>Negatieve breuken</b>: het minteken mag voor de breuk, boven of onder staan. ${M}${fr(3,4)} = ${fr(M+'3',4)} = ${fr(3,M+'4')}. Verder reken je zoals altijd.</p>
<div class="ex"><b>Voorbeeld</b>${M}${fr(3,4)} + ${fr(1,2)} = ${M}${fr(3,4)} + ${fr(2,4)} = <b>${M}${fr(1,4)}</b></div>`,
()=>{if(ri(0,1)){const r=pick([-6,-5,-4,-3,-2,2,3,4,5,6]),e=pick([-5,-4,-3,-2,2,3,4,5]);const top=r*e;const a=ri(-10,10);const b=top-a;const c=ri(-6,6);const d=c-e;
  return num(`Bereken: <span class="big">${fr(`${sn(a)} + ${pn(b)}`,`${sn(c)} ${M} ${pn(d)}`)}</span>`,r,`Boven: ${sn(a)} + ${pn(b)} = ${sn(top)}. Onder: ${sn(c)} ${M} ${pn(d)} = ${sn(e)}. Delen: ${sn(top)} : ${pn(e)} = <b>${sn(r)}</b>.`)}
 const b=pick([2,3,4,5,6,8]),d=pick([2,3,4,6]);const a=ri(1,b-1),c=ri(1,d-1);const L=lcm(b,d);const n=-a*(L/b)+c*(L/d);if(n===0)return W['2.5'].gen();const [x,y]=red(n,L);
 return frq(`Bereken: <b>${M}${fr(a,b)} + ${fr(c,d)}</b>`,x,y,`Gelijknamig: ${M}${fr(a*L/b,L)} + ${fr(c*L/d,L)} = ${frS(n,L)}${y!==L?' = '+frS(x,y):''}.`)},
'Bij een deelstreep: eerst boven, dan onder, dan delen.');

/* H3 */
def('3.1','Het assenstelsel',['een assenstelsel tekenen','punten tekenen en aflezen'],
`<p>Een <b>assenstelsel</b> heeft een horizontale <b>x-as</b> en een verticale <b>y-as</b>. Ze snijden in de <b>oorsprong</b> (0, 0).</p>
<p>Bij een punt noem je eerst de <b>x</b> (hoeveel opzij) en dan de <b>y</b> (hoeveel omhoog of omlaag): A(3, −2) betekent 3 naar rechts en 2 naar beneden.</p>
<div class="ex"><b>Ezelsbruggetje</b>Eerst over de gang (x), dan de trap op of af (y).</div>
<div class="warn">Links van de y-as is x negatief, onder de x-as is y negatief.</div>
<p class="tip">Typ coördinaten zo: <b>(3, -2)</b>.</p>`,
()=>{const pt=()=>[ri(-5,5),ri(-5,5)];if(ri(0,1)){const [x,y]=pt();return coq('Wat zijn de <b>coördinaten</b> van punt A?',x,y,`Vanuit de oorsprong: ${Math.abs(x)} naar ${x<0?'links':'rechts'} en ${Math.abs(y)} naar ${y<0?'beneden':'boven'}. Dus <b>A(${sn(x)}, ${sn(y)})</b>.`,{svg:gridSvg([[x,y,'A']])})}
 const ps=[];const key=new Set();while(ps.length<4){const p=pt();const k=p.join();if(!key.has(k)){key.add(k);ps.push(p)}}const L='PQRS';const i=ri(0,3);
 return mc(`Welk punt heeft de coördinaten <b>(${sn(ps[i][0])}, ${sn(ps[i][1])})</b>?`,L[i],[...L].filter(x=>x!==L[i]),`Eerst ${sn(ps[i][0])} opzij, dan ${sn(ps[i][1])} omhoog of omlaag: dat is punt <b>${L[i]}</b>.`,{svg:gridSvg(ps.map((p,j)=>[...p,L[j]]))})},
'Eerst x (opzij), dan y (omhoog/omlaag).');

def('3.2','Grafieken aflezen',['grafieken aflezen','een grafiek tekenen bij een tabel','globale grafieken begrijpen'],
`<p>Bij een grafiek lees je eerst wat er op de assen staat (en in welke eenheid). Zoek op de horizontale as je waarde, ga recht omhoog naar de grafiek en dan recht opzij naar de verticale as.</p>
<p>Een <b>globale grafiek</b> heeft geen getallen; hij laat alleen zien hoe iets verandert:</p>
<ul><li>lijn gaat <b>omhoog</b>: het wordt meer</li><li>lijn is <b>horizontaal</b>: het blijft gelijk</li><li>lijn gaat <b>omlaag</b>: het wordt minder</li></ul>
<div class="ex"><b>Voorbeeld</b>Je fietst naar school en wacht bij het stoplicht. Afstand van huis: stijgen, even horizontaal, weer stijgen.</div>`,
()=>{const t=ri(0,2);
 if(t<2){const xs=[6,8,10,12,14,16,18,20];let v=2*ri(2,4);const ys=xs.map((_,i)=>{if(i)v=Math.max(2,Math.min(18,v+pick([-2,2,2,4,0,-4,2])));return v});
  if(t===0){const i=ri(0,7);return num(`De grafiek laat de temperatuur op een dag zien. Hoe warm was het <b>om ${xs[i]} uur</b>?`,ys[i],`Ga bij ${xs[i]} uur recht omhoog naar de lijn en dan opzij: <b>${ys[i]} °C</b>.`,{svg:lineGraph(xs,ys,'tijd (uur)','temperatuur (°C)',20),unit:'°C'})}
  const mx=Math.max(...ys);if(ys.filter(y=>y===mx).length>1)return W['3.2'].gen();const i=ys.indexOf(mx);return num('Om hoe laat was het <b>het warmst</b>? (typ alleen het uur)',xs[i],`Het hoogste punt van de grafiek ligt bij <b>${xs[i]} uur</b> (${mx} °C).`,{svg:lineGraph(xs,ys,'tijd (uur)','temperatuur (°C)',20),unit:'uur'})}
 const st=pick([['Je fietst naar school, wacht even bij het stoplicht en fietst dan verder. De grafiek laat je afstand van huis zien.','trap'],['Een kaars brandt op. De grafiek laat de lengte van de kaars zien.','daalt'],['Je gooit een bal recht omhoog en hij valt weer neer. De grafiek laat de hoogte van de bal zien.','berg'],['Een bad loopt vol, daarna draai je de kraan dicht. De grafiek laat zien hoeveel water er in het bad zit.','vol'],['Je staat eerst stil bij de bushalte en dan rijdt de bus weg. De grafiek laat de afstand zien die je hebt afgelegd.','wachten']]);
 const others=shuffle(Object.keys(shapes).filter(k=>k!==st[1])).slice(0,2);const keys=shuffle([st[1],...others]);const L='ABC'[keys.indexOf(st[1])];
 return mc(`${st[0]} <b>Welke grafiek past erbij?</b>`,L,['A','B','C'],`Grafiek <b>${L}</b>: ${({trap:'eerst stijgen, dan horizontaal (stilstaan), dan weer stijgen',daalt:'de lijn gaat steeds omlaag',berg:'eerst omhoog, dan weer omlaag',vol:'eerst omhoog, dan horizontaal: er komt niets meer bij',wachten:'eerst horizontaal (stilstaan), dan stijgen'})[st[1]]}.`,{svg:threeGraphs(keys)})},
'Horizontaal = gelijk blijven. Omhoog = meer. Omlaag = minder.');

def('3.3','Woordformules',['rekenen met woordformules'],
`<p>Een <b>woordformule</b> vertelt in woorden hoe je iets uitrekent. Vul het getal in op de plek van het woord en reken uit (denk aan de rekenvolgorde!).</p>
<div class="ex"><b>Voorbeeld</b>kosten in euro = 3 × aantal uur + 5<br>Voor 4 uur: 3 × 4 + 5 = 12 + 5 = <b>€ 17</b></div>
<div class="warn">Soms moet je terugrekenen: kosten zijn € 26. Dan 26 − 5 = 21 en 21 : 3 = 7 uur. Je doet alles in omgekeerde volgorde.</div>`,
()=>{const c=pick([['huurprijs in euro = 3 × aantal uur + 5','aantal uur',3,5,'uur',' euro'],['aantal stoelen = 6 × aantal tafels + 2','aantal tafels',6,2,'tafels',' stoelen'],['prijs in euro = 2 × aantal ritjes + 4','aantal ritjes',2,4,'ritjes',' euro'],['lengte in cm = 4 × aantal blokjes + 10','aantal blokjes',4,10,'blokjes',' cm']]);
 const x=ri(2,12);const y=c[2]*x+c[3];
 if(ri(0,2)<2)return num(`Gebruik de formule: <b>${c[0]}</b>. Bereken de uitkomst voor <b>${x} ${c[4]}</b>.`,y,`${c[2]} × ${x} + ${c[3]} = ${c[2]*x} + ${c[3]} = <b>${y}</b>${c[5]}.`);
 return num(`Gebruik de formule: <b>${c[0]}</b>. De uitkomst is <b>${y}</b>. Hoeveel ${c[4]} waren het?`,x,`Terugrekenen: ${y} ${M} ${c[3]} = ${y-c[3]}, en ${y-c[3]} : ${c[2]} = <b>${x}</b> ${c[4]}.`)},
'Vul het getal in en reken uit. Keer gaat voor plus!');

def('3.4','Formules met letters',['rekenen met formules waarin letters staan'],
`<p>In plaats van woorden gebruik je in een formule <b>letters</b>. Tussen een getal en een letter staat een onzichtbaar keerteken: 3<i class="v">x</i> betekent 3 × <i class="v">x</i>.</p>
<div class="ex"><b>Voorbeeld</b><i class="v">y</i> = 3<i class="v">x</i> − 5 met <i class="v">x</i> = −2:<br><i class="v">y</i> = 3 × (−2) − 5 = −6 − 5 = <b>−11</b></div>
<div class="warn">Zet een negatief getal tussen haakjes als je het invult. Dan maak je minder fouten.</div>`,
()=>{if(ri(0,1)){const a=pick([-4,-3,-2,2,3,4,5]),b=ri(-9,9)||4,x=ri(-6,6);const y=a*x+b;return num(`Gegeven: <b>${V('y')} = ${sn(a)}${V('x')} ${b<0?M:'+'} ${Math.abs(b)}</b>. Bereken ${V('y')} als ${V('x')} = ${sn(x)}.`,y,`${V('y')} = ${sn(a)} × ${pn(x)} ${b<0?M:'+'} ${Math.abs(b)} = ${sn(a*x)} ${b<0?M:'+'} ${Math.abs(b)} = <b>${sn(y)}</b>.`)}
 const p=ri(1,9),q=ri(-5,6),c=ri(2,5),d=ri(2,4);const r=c*p-d*q;return num(`Gegeven: <b>${V('k')} = ${c}${V('p')} ${M} ${d}${V('q')}</b>. Bereken ${V('k')} als ${V('p')} = ${p} en ${V('q')} = ${sn(q)}.`,r,`${V('k')} = ${c} × ${p} ${M} ${d} × ${pn(q)} = ${c*p} ${M} ${pn(d*q)} = <b>${sn(r)}</b>.`)},
'Getal vóór een letter betekent keer. Negatief getal invullen? Haakjes eromheen.');

def('3.5','Grafiek bij een formule',['een tabel maken bij een formule','de grafiek tekenen in een assenstelsel'],
`<p>Zo teken je de grafiek bij een formule:</p><ol><li>Maak een <b>tabel</b>: kies een paar waarden voor <i class="v">x</i> en reken <i class="v">y</i> uit.</li><li>Zet de punten (<i class="v">x</i>, <i class="v">y</i>) in het assenstelsel.</li><li>Verbind de punten.</li></ol>
<div class="ex"><b>Voorbeeld</b><i class="v">y</i> = 2<i class="v">x</i> + 1 → <i class="v">x</i> = 0 geeft 1, <i class="v">x</i> = 1 geeft 3, <i class="v">x</i> = 2 geeft 5. Punten (0, 1), (1, 3), (2, 5): een rechte lijn.</div>
<p>Een punt ligt <b>op</b> de grafiek als het klopt wanneer je het invult.</p>`,
()=>{const a=pick([-3,-2,-1,1,2,3]),b=ri(-4,4);const f=x=>a*x+b;const fs=`${V('y')} = ${a===1?'':a===-1?M:sn(a)}${V('x')}${b?` ${b<0?M:'+'} ${Math.abs(b)}`:''}`;
 if(ri(0,1)){const x=ri(-3,3);const right=`(${sn(x)}, ${sn(f(x))})`;const w=[`(${sn(x)}, ${sn(f(x)+1)})`,`(${sn(f(x))}, ${sn(x)})`,`(${sn(x+1)}, ${sn(f(x)-1)})`,`(${sn(x)}, ${sn(-f(x))})`].filter(s=>s!==right);
  return mc(`Welk punt ligt op de grafiek van <b>${fs}</b>?`,right,w,`Vul ${V('x')} = ${sn(x)} in: ${V('y')} = ${sn(a)} × ${pn(x)} ${b<0?M:'+'} ${Math.abs(b)} = ${sn(f(x))}. Dus <b>${right}</b>.`)}
 const tab=`<table style="border-collapse:collapse;margin:10px 0;font-size:19px"><tr><td style="border:2px solid var(--line);padding:4px 12px"><i class="v">x</i></td>${[0,1,2,3].map(x=>`<td style="border:2px solid var(--line);padding:4px 12px">${x}</td>`).join('')}</tr><tr><td style="border:2px solid var(--line);padding:4px 12px"><i class="v">y</i></td>${[0,1,2,3].map(x=>`<td style="border:2px solid var(--line);padding:4px 12px">${sn(f(x))}</td>`).join('')}</tr></table>`;
 const mk=(A,B)=>`${V('y')} = ${A===1?'':A===-1?M:sn(A)}${V('x')}${B?` ${B<0?M:'+'} ${Math.abs(B)}`:''}`;
 return mc(`Welke formule hoort bij deze tabel?${tab}`,fs,[mk(a,b+1),mk(-a,b),mk(a+(a>0?1:-1),b),mk(b||2,a)].filter(s=>s!==fs),`Bij ${V('x')} = 0 is ${V('y')} = ${sn(b)}, en elke stap verder komt er ${sn(a)} bij. Dat is <b>${fs}</b>.`)},
'Vul de x van het punt in en kijk of de y klopt.');

/* H4 */
def('4.1','Kommagetallen',['kommagetallen op volgorde zetten','de komma verschuiven bij × en : 10, 100, 1000','afronden'],
`<p><b>Vergelijken</b>: zet de getallen onder elkaar met de komma's recht. Vul aan met nullen: 0,5 = 0,500 en 0,45 = 0,450. Dan zie je dat 0,5 groter is.</p>
<p><b>Komma schuiven</b>: × 10 → komma 1 plek naar rechts, × 100 → 2 plekken, × 1000 → 3. Bij delen schuift hij naar links.</p>
<div class="ex"><b>Voorbeeld</b>3,45 × 100 = <b>345</b> &nbsp;·&nbsp; 7,2 : 100 = <b>0,072</b></div>
<p><b>Afronden</b>: kijk naar het cijfer ná de plek waarop je afrondt. 5 of meer → omhoog; minder dan 5 → laten staan. 3,467 op 1 decimaal = 3,5.</p>`,
()=>{const t=ri(0,2);
 if(t===0){const b=ri(1,9)*100;const c=[b,b+ri(1,9)*10,b+ri(1,9),b-100+ri(1,9)*10,ri(1,9)*10,b+ri(1,9)*10+ri(1,9)].filter(x=>x>0);const u=[...new Set(c)].slice(0,4).map(x=>x/1000);if(u.length<4)return W['4.1'].gen();const g=ri(0,1);const v=g?Math.max(...u):Math.min(...u);
  return mc(`Welk getal is het <b>${g?'grootst':'kleinst'}</b>?`,dec(v),u.filter(x=>x!==v).map(dec),`Maak ze even lang met nullen: ${u.map(x=>x.toFixed(3).replace('.',',')).join(' · ')}. Het ${g?'grootst':'kleinst'} is <b>${dec(v)}</b>.`)}
 if(t===1){const n=ri(101,9999),x=n/100;const f=pick([10,100,1000]);const times=ri(0,1);const r=times?x*f:x/f;const z=String(f).length-1;return num(`Bereken: <b>${dec(x)} ${times?'×':':'} ${big(f)}</b>`,r,`${times?'Keer':'Gedeeld door'} ${big(f)}: komma ${z} plek${z>1?'ken':''} naar ${times?'rechts':'links'}. Antwoord: <b>${dec(r)}</b>.`)}
 const n=ri(1001,99999);const x=n/1000;const p=pick([0,1,2]);const div=[1000,100,10][p];let q=Math.floor(n/div);if(n%div*2>=div)q++;const r=q*div/1000;
 return num(`Rond <b>${dec(x)}</b> af op <b>${['een heel getal','1 decimaal','2 decimalen'][p]}</b>.`,r,`Kijk naar het cijfer erna: ${String(n%div).padStart(3-p,'0')[0]}. ${(n%div)*2>=div?'5 of meer, dus omhoog':'Minder dan 5, dus laten staan'}. Antwoord: <b>${r.toFixed(p).replace('.',',')}</b>.`,{show:r.toFixed(p).replace('.',',')})},
'Maak kommagetallen even lang met nullen achteraan.');

def('4.2','Rekenmachine en schatten',['berekeningen maken met de rekenmachine','de uitkomst van een berekening schatten'],
`<p><b>Schatten</b> doe je om te controleren of je rekenmachine-antwoord kan kloppen. Rond de getallen af op mooie, ronde getallen en reken dan uit je hoofd.</p>
<div class="ex"><b>Voorbeeld</b>48 × 21 ≈ 50 × 20 = <b>1000</b>. Geeft je rekenmachine 1008? Dat kan kloppen. Geeft hij 10 080? Dan heb je een fout gemaakt.</div>
<div class="warn">Een rekenmachine kent ook de rekenvolgorde, maar typ haakjes altijd mee als ze er staan.</div>`,
()=>{const a=ri(18,98),b=ri(11,59);const ra=Math.round(a/10)*10,rb=Math.round(b/10)*10;const e=ra*rb;
 return mc(`Wat is de beste <b>schatting</b> van <b>${a} × ${b}</b>?`,big(e),[big(e*10),big(e/10),big(ra+rb),big(e+ra*10*2+1000)],`Rond af: ${a} ≈ ${ra} en ${b} ≈ ${rb}. ${ra} × ${rb} = <b>${big(e)}</b>. (Precies is het ${big(a*b)}.)`)},
'Rond af op tientallen en reken dan uit je hoofd.');

def('4.3','Afronden en grote getallen',['afronden in de praktijk','rekenen met grote getallen (duizend, miljoen, miljard)'],
`<p>Een <b>miljoen</b> is 1.000.000 (6 nullen), een <b>miljard</b> 1.000.000.000 (9 nullen).</p>
<div class="ex"><b>Voorbeeld</b>3,2 miljoen = 3,2 × 1.000.000 = <b>3.200.000</b></div>
<p><b>Afronden op duizendtallen</b>: kijk naar het honderdtal. 48.672 → het cijfer na de duizendtallen is 6, dus omhoog: <b>49.000</b>.</p>
<div class="warn">In de praktijk rond je soms altijd omhoog: heb je 52 leerlingen en passen er 25 in een bus, dan heb je 3 bussen nodig, geen 2.</div>`,
()=>{const t=ri(0,2);
 if(t===0){const a=ri(11,99)/10;return num(`Schrijf <b>${dec(a)} miljoen</b> als gewoon getal.`,Math.round(a*1e6),`${dec(a)} × 1.000.000 = <b>${big(Math.round(a*1e6))}</b>.`,{show:big(Math.round(a*1e6))})}
 if(t===1){const n=ri(10000,999999);const [w,f]=pick([['honderdtallen',100],['duizendtallen',1000]]);const r=Math.round(n/f)*f;return num(`Rond <b>${big(n)}</b> af op <b>${w}</b>.`,r,`Kijk naar het cijfer rechts van de ${w}. Antwoord: <b>${big(r)}</b>.`,{show:big(r)})}
 const k=ri(41,130),c=pick([20,25,30,40]);const r=Math.ceil(k/c);return num(`Er gaan ${k} leerlingen op schoolreis. In één bus passen ${c} leerlingen. Hoeveel bussen zijn er nodig?`,r,`${k} : ${c} = ${dec(Math.round(k/c*100)/100)}. Iedereen moet mee, dus naar boven afronden: <b>${r} bussen</b>.`)},
'Een miljoen heeft 6 nullen.');

def('4.4','Procenten',['rekenen met procenten','uitrekenen hoeveel procent iets is'],
`<p><b>Procent</b> betekent "van de honderd". 1% is een honderdste deel. Handige procenten:</p>
<ul><li>50% = de helft, 25% = een kwart, 10% = delen door 10</li><li>1% = delen door 100</li></ul>
<div class="ex"><b>Voorbeeld</b>30% van 80: 10% = 8, dus 30% = 3 × 8 = <b>24</b>.<br>12 van de 48 is ${fr(12,48)} = ${fr(1,4)} = <b>25%</b>.</div>
<div class="ex"><b>Korting</b>Een trui kost € 40 met 20% korting. 20% van 40 = 8. Je betaalt 40 − 8 = <b>€ 32</b>.</div>`,
()=>{const t=ri(0,2);
 if(t===0){const p=pick([10,20,25,50,5,30,75,15]);const x=pick([20,40,60,80,120,200,240,300]);const r=p*x/100;return num(`Bereken <b>${p}% van ${x}</b>.`,r,`1% van ${x} is ${dec(x/100)}. ${p}% is ${p} × ${dec(x/100)} = <b>${dec(r)}</b>.`)}
 if(t===1){const [part,whole,p]=pick([[12,48,25],[15,60,25],[9,30,30],[18,24,75],[7,20,35],[30,40,75],[6,50,12],[45,90,50],[16,80,20]]);return num(`In een klas van ${whole} leerlingen hebben er ${part} een huisdier. <b>Hoeveel procent</b> is dat?`,p,`${part} : ${whole} = ${dec(part/whole)}. × 100 = <b>${p}%</b>.`,{unit:'%'})}
 const x=pick([20,30,40,50,60,80,90,120]),p=pick([10,20,25,30,50]);const r=x*(100-p)/100;return num(`Een paar sneakers kost ${eur(x)}. Je krijgt <b>${p}% korting</b>. Hoeveel betaal je?`,r,`${p}% van ${x} = ${dec(x*p/100)}. ${x} ${M} ${dec(x*p/100)} = <b>${eur(r)}</b>.`,{show:eur(r)})},
'10% is delen door 10. Daarmee kun je veel uitrekenen.');

def('4.5','Verhoudingen',['rekenen met verhoudingen en verhoudingstabellen','recht en omgekeerd evenredig herkennen'],
`<p>In een <b>verhoudingstabel</b> doe je boven en onder steeds hetzelfde (keer of delen).</p>
<div class="ex"><b>Voorbeeld</b>3 pakken melk kosten € 3,60. Eerst 1 pak: 3,60 : 3 = 1,20. Dan 5 pakken: 5 × 1,20 = <b>€ 6,00</b>.</div>
<p><b>Recht evenredig</b>: twee keer zoveel pakken → twee keer zo duur.<br><b>Omgekeerd evenredig</b>: meer mensen → minder tijd. 4 schilders doen 6 dagen over een klus. Dat is 4 × 6 = 24 "schilderdagen". Met 3 schilders: 24 : 3 = <b>8 dagen</b>.</p>
<div class="warn">Vraag jezelf af: wordt het ene meer als het andere meer wordt? Of juist minder?</div>`,
()=>{if(ri(0,1)){const it=pick([['pakken melk','pakken'],['schriften','schriften'],['bekers ijs','bekers'],['kaartjes','kaartjes']]);const per=ri(6,30)*10;const a=ri(2,5);let b=ri(2,9);if(b===a)b++;
  return num(`${a} ${it[0]} kosten ${eur(a*per/100)}. Hoeveel kosten <b>${b} ${it[1]}</b>?`,b*per/100,`Eerst 1: ${eur(a*per/100)} : ${a} = ${eur(per/100)}. Dan ${b} × ${eur(per/100)} = <b>${eur(b*per/100)}</b>.`,{show:eur(b*per/100)})}
 const tot=pick([24,36,48,60,72]);const ds=[2,3,4,6,8,12].filter(d=>tot%d===0);const a=pick(ds);let c=pick(ds);if(c===a)c=ds.find(d=>d!==a);
 return num(`Met ${a} schilders duurt een klus ${tot/a} dagen. Hoeveel dagen duurt het <b>met ${c} schilders</b>? (Iedereen werkt even snel.)`,tot/c,`Omgekeerd evenredig: ${a} × ${tot/a} = ${tot} schilderdagen. ${tot} : ${c} = <b>${tot/c} dagen</b>.`,{unit:'dagen'})},
'Reken eerst uit wat 1 kost (of hoeveel werk het totaal is).');

/* H5 */
def('5.1','Lijnen',['lijn, halve lijn en lijnstuk herkennen en tekenen','loodrechte en evenwijdige lijnen tekenen'],
`<ul><li>Een <b>lijn</b> gaat aan beide kanten oneindig door.</li><li>Een <b>halve lijn</b> heeft één beginpunt en gaat aan de andere kant oneindig door.</li><li>Een <b>lijnstuk</b> heeft twee eindpunten. Alleen een lijnstuk heeft een lengte.</li></ul>
<p><b>Loodrecht</b>: twee lijnen maken een rechte hoek (90°). Je schrijft <b>AB ⊥ CD</b>.<br><b>Evenwijdig</b>: twee lijnen lopen naast elkaar en snijden nooit. Je schrijft <b>AB // CD</b>.</p>
<div class="warn">Loodrecht tekenen: leg de middellijn van de geodriehoek (de lijn die bij 0 recht omhoog loopt) precies op de lijn. Langs de lange zijde teken je dan de loodlijn. Evenwijdig tekenen: gebruik de evenwijdige lijntjes op je geodriehoek.</div>`,
()=>{if(ri(0,2)<2){const k=pick(['lijn','halve lijn','lijnstuk']);return mc(`Wat zie je in de tekening? (Kijk goed of de lijn bij A en B stopt.)`,k+' AB',['lijn AB','halve lijn AB','lijnstuk AB'],({lijn:'De lijn gaat aan beide kanten door tot buiten het kader: een <b>lijn</b>.','halve lijn':'De lijn begint bij A en gaat voorbij B verder: een <b>halve lijn</b>.',lijnstuk:'De lijn stopt bij A én bij B: een <b>lijnstuk</b>.'})[k],{svg:lineTypeSvg(k)})}
 const p=ri(0,1);return mc(p?'Lijn AB staat <b>loodrecht</b> op lijn CD. Hoe schrijf je dat?':'Lijn AB en lijn CD zijn <b>evenwijdig</b>. Hoe schrijf je dat?',p?'AB ⊥ CD':'AB // CD',['AB ⊥ CD','AB // CD','AB = CD','∠ABCD'],p?'Loodrecht schrijf je met het teken ⊥: <b>AB ⊥ CD</b>.':'Evenwijdig schrijf je met //: <b>AB // CD</b>.')},
'Lijnstuk: twee eindpunten. Halve lijn: één. Lijn: geen.');

def('5.2','Soorten hoeken',['hoeken uitdrukken in graden','scherpe, rechte, stompe en gestrekte hoeken herkennen'],
`<ul><li><b>Scherpe hoek</b>: kleiner dan 90°</li><li><b>Rechte hoek</b>: precies 90° (je tekent een vierkantje in de hoek)</li><li><b>Stompe hoek</b>: tussen 90° en 180°</li><li><b>Gestrekte hoek</b>: precies 180°, een rechte lijn</li></ul>
<div class="ex"><b>Ezelsbruggetje</b>Een scherpe hoek is spits als een punt van een potlood; een stompe hoek is bot, wijd open.</div>`,
()=>{const k=pick(['scherpe hoek','rechte hoek','stompe hoek','gestrekte hoek']);const d={'scherpe hoek':5*ri(3,17),'rechte hoek':90,'stompe hoek':5*ri(19,34),'gestrekte hoek':180}[k];
 return mc(`Een hoek is <b>${d}°</b>. Wat voor hoek is dat?`,k,['scherpe hoek','rechte hoek','stompe hoek','gestrekte hoek'],`${d}° is ${({'scherpe hoek':'kleiner dan 90°','rechte hoek':'precies 90°','stompe hoek':'tussen 90° en 180°','gestrekte hoek':'precies 180°'})[k]}: een <b>${k}</b>.`,{svg:d<180?angleSvg(d):null})},
'Vergelijk met 90° (een hoek van een schrift) en 180° (een rechte lijn).');

def('5.3','Hoeken meten',['hoeken meten met de geodriehoek','hoeken goed benoemen'],
`<p>Zo meet je een hoek met de <b>geodriehoek</b>:</p><ol><li>Leg het <b>nulpunt</b> (midden van de lange zijde) precies op het hoekpunt.</li><li>Leg de lange zijde (de 0-lijn) langs één been.</li><li>Lees af waar het andere been de schaal kruist.</li></ol>
<div class="warn">Er staan twee schalen op je geodriehoek. Kijk eerst: is de hoek scherp of stomp? Lees je 40° af bij een stompe hoek, dan is het 140°.</div>
<p><b>Hoeken benoemen</b>: ∠ABC is de hoek met hoekpunt <b>B</b>, de middelste letter.</p>`,
()=>{if(ri(0,2)<2){const d=5*ri(4,33);const w=[180-d,d+30,d-30,d+50].filter(x=>x>0&&x<180&&Math.abs(x-d)>=20).map(x=>x+'°');if(w.length<3)return W['5.3'].gen();
  return mc('Hoe groot is deze hoek ongeveer?',d+'°',w,`De hoek is <b>${d}°</b>. ${d>90?'Hij is stomp, dus groter dan 90°.':'Hij is scherp, dus kleiner dan 90°.'} ${w.includes((180-d)+'°')?`${180-d}° krijg je als je de verkeerde schaal afleest.`:''}`,{svg:angleSvg(d)})}
 const L=pick([['P','Q','R'],['A','B','C'],['K','L','M'],['D','E','F']]);return mc(`Wat is het <b>hoekpunt</b> van ∠${L.join('')}?`,'punt '+L[1],L.map(x=>'punt '+x).concat(['geen van deze']),`Het hoekpunt is altijd de middelste letter: <b>${L[1]}</b>.`,{svg:angleSvg(50,[L[0],L[1],L[2]])})},
'Scherp of stomp? Kijk dat eerst, dan kies je de goede schaal.');

def('5.4','Hoeken tekenen',['een hoek tekenen met de geodriehoek','driehoeken tekenen met gegeven hoeken'],
`<p>Zo teken je bijvoorbeeld ∠A = 50°:</p><ol><li>Teken een been vanuit punt A.</li><li>Leg het nulpunt van de geodriehoek op A en de 0-lijn langs het been.</li><li>Zet een stipje bij 50° (goede schaal!).</li><li>Haal de geodriehoek weg en trek een lijn van A door het stipje.</li></ol>
<div class="ex"><b>Driehoek tekenen</b>AB = 6 cm, ∠A = 50° en ∠B = 60°. Teken AB, zet bij A een hoek van 50° en bij B een hoek van 60°. Waar de benen elkaar snijden, ligt C.</div>`,
()=>{const f=pick([['Je tekent ∠A = 40°. Waar leg je het nulpunt van de geodriehoek?','precies op hoekpunt A',['aan het eind van het been','ergens midden op het been','op het puntje van de geodriehoek']],['Je tekent een hoek van 120°. Je stipje staat bij 60°. Wat ging er mis?','je las de verkeerde schaal af',['je legde het nulpunt verkeerd','60° is gewoon goed','je moet een passer gebruiken']],['Wat leg je langs het eerste been als je een hoek tekent?','de 0-lijn (lange zijde) van de geodriehoek',['de korte zijde van de geodriehoek','de passer','de ruitjes van je schrift']],['Je tekent driehoek ABC met ∠A = 50° en ∠B = 60°. Wat teken je eerst?','het lijnstuk AB',['hoek C','de hoogtelijn','een cirkel om C']]]);
 if(ri(0,1))return mc(f[0],f[1],f[2],`Goed is: <b>${f[1]}</b>.`);
 const A=5*ri(6,14),B=5*ri(6,14);return num(`Je tekent driehoek ABC met AB = 6 cm, ∠A = ${A}° en ∠B = ${B}°. Hoe groot wordt <b>∠C</b>?`,180-A-B,`De hoeken van een driehoek zijn samen 180°. 180 ${M} ${A} ${M} ${B} = <b>${180-A-B}°</b>.`,{unit:'°',svg:triSvg(A,B,0,[A+'°',B+'°','?'])})},
'Nulpunt op het hoekpunt, 0-lijn langs het been.');

def('5.5','Hoeken berekenen bij snijdende lijnen',['hoeken berekenen bij lijnen die elkaar snijden'],
`<ul><li><b>Overstaande hoeken</b> (tegenover elkaar bij een kruising) zijn <b>even groot</b>.</li><li><b>Nevenhoeken</b> (naast elkaar op een rechte lijn) zijn samen <b>180°</b>.</li><li>Alle hoeken <b>rond een punt</b> zijn samen <b>360°</b>.</li></ul>
<div class="ex"><b>Voorbeeld</b>Twee lijnen snijden en één hoek is 70°. De hoek ernaast is 180 − 70 = 110°. De hoek ertegenover is ook 70°.</div>`,
()=>{const t=ri(0,2);
 if(t<2){const al=5*ri(5,31);const given=ri(0,3);const ask=t===0?(given+2)%4:(given+1)%4;const gv=given%2?180-al:al;const av=ask%2?180-al:al;
  return num('Twee lijnen snijden elkaar. Hoe groot is de hoek met het <b>vraagteken</b>?',av,t===0?`De hoeken liggen tegenover elkaar: overstaande hoeken zijn even groot. Antwoord: <b>${av}°</b>.`:`De hoeken liggen naast elkaar op een rechte lijn: samen 180°. 180 ${M} ${gv} = <b>${av}°</b>.`,{unit:'°',svg:crossSvg(al,given,ask)})}
 const a=5*ri(10,30),b=5*ri(10,30);if(a+b>=330)return W['5.5'].gen();return num(`Rond één punt liggen drie hoeken. Twee ervan zijn ${a}° en ${b}°. Hoe groot is de <b>derde</b> hoek?`,360-a-b,`Rond een punt is samen 360°. 360 ${M} ${a} ${M} ${b} = <b>${360-a-b}°</b>.`,{unit:'°'})},
'Tegenover elkaar: gelijk. Naast elkaar op een lijn: samen 180°.');

def('5.6','Hoeken in een driehoek',['de hoekensom van een driehoek kennen','een onbekende hoek berekenen'],
`<p>De drie hoeken van <b>elke</b> driehoek zijn samen <b>180°</b>.</p>
<div class="ex"><b>Voorbeeld</b>∠A = 65° en ∠B = 45°. Dan ∠C = 180 − 65 − 45 = <b>70°</b>.</div>
<ul><li>In een <b>rechthoekige</b> driehoek is één hoek 90°, dus de andere twee zijn samen 90°.</li><li>In een <b>gelijkbenige</b> driehoek zijn de twee basishoeken even groot.</li></ul>`,
()=>{const t=ri(0,2);
 if(t===0){const A=5*ri(5,20),B=5*ri(5,20);if(A+B>150)return W['5.6'].gen();const ask=ri(0,2);const vals=[A,B,180-A-B];const show=vals.map((v,i)=>i===ask?'?':v+'°');const known=vals.filter((_,i)=>i!==ask);
  return num(`Hoe groot is <b>∠${'ABC'[ask]}</b>?`,vals[ask],`Samen 180°: 180 ${M} ${known[0]} ${M} ${known[1]} = <b>${vals[ask]}°</b>.`,{unit:'°',svg:triSvg(A,B,0,show)})}
 if(t===1){const a=ri(15,75);return num(`In een rechthoekige driehoek is ∠A = 90° en ∠B = ${a}°. Hoe groot is <b>∠C</b>?`,90-a,`180 ${M} 90 ${M} ${a} = <b>${90-a}°</b>.`,{unit:'°'})}
 const top=2*ri(10,70);return num(`Een gelijkbenige driehoek heeft een tophoek van ${top}°. Hoe groot is <b>één basishoek</b>?`,(180-top)/2,`Voor de twee basishoeken samen blijft 180 ${M} ${top} = ${180-top}° over. Ze zijn even groot: ${180-top} : 2 = <b>${(180-top)/2}°</b>.`,{unit:'°'})},
'Hoeken van een driehoek: samen 180°.');

/* H6 */
def('6.1','Kwadraten en wortels',['kwadraten en wortels uitrekenen','de kwadraten tot en met 15² uit je hoofd kennen'],
`<p>Het <b>kwadraat</b> van een getal is dat getal keer zichzelf: 7² = 7 × 7 = 49.<br>De <b>wortel</b> is het omgekeerde: √49 = 7, want 7² = 49.</p>
<div class="ex"><b>Leer uit je hoofd</b>1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225</div>
<div class="warn">(−3)² = (−3) × (−3) = 9, maar −3² = −(3 × 3) = −9. Het kwadraat gaat vóór het minteken, tenzij er haakjes staan.</div>`,
()=>{const t=ri(0,4);const a=ri(2,15);
 if(t===0)return num(`Bereken: <b>${a}²</b>`,a*a,`${a} × ${a} = <b>${a*a}</b>.`);
 if(t===1)return num(`Bereken: <b>√${a*a}</b>`,a,`${a} × ${a} = ${a*a}, dus √${a*a} = <b>${a}</b>.`);
 if(t===2){const b=ri(2,9);return num(`Bereken: <b>(${M}${b})²</b>`,b*b,`(${M}${b}) × (${M}${b}) = <b>${b*b}</b>. Min keer min is plus.`)}
 if(t===3){const b=ri(2,9);return num(`Bereken: <b>${M}${b}²</b>`,-b*b,`Eerst het kwadraat: ${b}² = ${b*b}. Het minteken staat ervoor: <b>${M}${b*b}</b>.`)}
 const b=ri(2,9),c=ri(2,20);return num(`Bereken: <b>${c} + ${b}²</b>`,c+b*b,`Eerst het kwadraat: ${b}² = ${b*b}. Dan ${c} + ${b*b} = <b>${c+b*b}</b>.`)},
'Let op: (−3)² = 9 en −3² = −9.');

def('6.2','Formules met kwadraten',['rekenen met formules waarin een kwadraat staat'],
`<p>Vul het getal in en volg de rekenvolgorde: eerst het <b>kwadraat</b>, dan keer, dan plus en min.</p>
<div class="ex"><b>Voorbeeld</b><i class="v">y</i> = 2<i class="v">x</i>² − 3 met <i class="v">x</i> = −4:<br><i class="v">y</i> = 2 × (−4)² − 3 = 2 × 16 − 3 = 32 − 3 = <b>29</b></div>
<div class="warn">Een negatief getal ín een kwadraat wordt altijd positief: zet het tussen haakjes.</div>`,
()=>{const a=pick([1,1,2,3,-1]),c=ri(-9,9),x=ri(-5,5);const y=a*x*x+c;const fa=a===1?'':a===-1?M:a;
 return num(`Gegeven: <b>${V('y')} = ${fa}${V('x')}² ${c<0?M:'+'} ${Math.abs(c)}</b>. Bereken ${V('y')} als ${V('x')} = ${sn(x)}.`,y,`${V('y')} = ${a===1?'':(a===-1?M:a+' × ')}${pn(x)}² ${c<0?M:'+'} ${Math.abs(c)} = ${a===1?'':(a===-1?M:a+' × ')}${x*x} ${c<0?M:'+'} ${Math.abs(c)} = <b>${sn(y)}</b>.`)},
'Eerst het kwadraat uitrekenen, dan pas de rest.');

def('6.3','Grafieken van kwadratische formules',['de grafiek van een kwadratische formule tekenen','lineair en kwadratisch van elkaar onderscheiden'],
`<p>Een <b>lineaire</b> formule (zoals <i class="v">y</i> = 2<i class="v">x</i> + 1) geeft een <b>rechte lijn</b>.<br>Een <b>kwadratische</b> formule (met <i class="v">x</i>², zoals <i class="v">y</i> = <i class="v">x</i>² − 4) geeft een <b>parabool</b>: een boog die symmetrisch is.</p>
<div class="ex"><b>Voorbeeld</b><i class="v">y</i> = <i class="v">x</i>²: bij <i class="v">x</i> = −2, −1, 0, 1, 2 hoort <i class="v">y</i> = 4, 1, 0, 1, 4. De tabel is symmetrisch, de grafiek een dalparabool.</div>
<div class="warn">Staat er een min vóór <i class="v">x</i>², dan is het een <b>bergparabool</b> (opening naar beneden).</div>`,
()=>{if(ri(0,1)){const f=pick([['y = 3x + 2','lineair'],['y = x² − 1','kwadratisch'],['y = 2x²','kwadratisch'],['y = 5 − x','lineair'],['y = x × x + 3','kwadratisch'],['y = 4x','lineair'],['y = −x² + 6','kwadratisch'],['y = 0,5x − 3','lineair']]);
  return mc(`Is de formule <b>${V(f[0])}</b> lineair of kwadratisch?`,f[1],['lineair','kwadratisch'],f[1]==='lineair'?'Er staat geen <i>x</i>² of <i>x</i> × <i>x</i> in: <b>lineair</b>, een rechte lijn.':'Er staat een <i>x</i>² (of <i>x</i> × <i>x</i>) in: <b>kwadratisch</b>, een parabool.')}
 const k=pick([['y = x² − 4','dalparabool'],['y = −x² + 3','bergparabool'],['y = 2x + 1','rechte lijn'],['y = x²','dalparabool'],['y = −2x²','bergparabool']]);
 return mc(`Wat voor grafiek hoort bij <b>${V(k[0])}</b>?`,k[1],['rechte lijn','dalparabool','bergparabool'],`${k[1]==='rechte lijn'?'Geen kwadraat: een rechte lijn.':k[1]==='dalparabool'?'Kwadraat met een plus ervoor: een dalparabool (opening naar boven).':'Min vóór het kwadraat: een bergparabool (opening naar beneden).'} Antwoord: <b>${k[1]}</b>.`)},
'Zie je x²? Dan is het een parabool.');

def('6.4','Producten herleiden',['een product met letters herleiden','gelijksoortige termen herkennen'],
`<p><b>Herleiden</b> is een formule korter en eenvoudiger schrijven. Bij een <b>product</b> (keer) doe je: <b>getallen keer getallen</b> en <b>letters achter elkaar</b>.</p>
<div class="ex"><b>Voorbeeld</b>3<i class="v">a</i> × 4<i class="v">b</i> = 12<i class="v">ab</i> &nbsp;·&nbsp; 2<i class="v">a</i> × 5<i class="v">a</i> = 10<i class="v">a</i>² &nbsp;·&nbsp; 6 × 2<i class="v">x</i> = 12<i class="v">x</i></div>
<p><b>Gelijksoortige termen</b> hebben precies dezelfde letters: 3<i class="v">a</i> en 7<i class="v">a</i> wel, 3<i class="v">a</i> en 3<i class="v">a</i>² niet.</p>
<p class="tip">Typ een kwadraat als a^2 of a². Keer-tekens mag je weglaten.</p>`,
()=>{const t=ri(0,3);const k1=ri(2,7),k2=ri(2,7);const [x,y]=pick([['a','b'],['p','q'],['x','y']]);
 if(t===0)return alq(`Herleid: <b>${V(k1+x)} × ${V(k2+y)}</b>`,[[k1*k2,x+y]],`Getallen: ${k1} × ${k2} = ${k1*k2}. Letters: ${V(x+y)}. Antwoord: <b>${V(k1*k2+x+y)}</b>.`);
 if(t===1)return alq(`Herleid: <b>${V(k1+x)} × ${V(k2+x)}</b>`,[[k1*k2,x+'2']],`Getallen: ${k1} × ${k2} = ${k1*k2}. ${V(x)} × ${V(x)} = ${V(x)}². Antwoord: <b>${k1*k2}${V(x)}²</b>.`);
 if(t===2)return alq(`Herleid: <b>${k1} × ${V(k2+x)}</b>`,[[k1*k2,x]],`${k1} × ${k2} = ${k1*k2}. Antwoord: <b>${V(k1*k2+x)}</b>.`);
 return alq(`Herleid: <b>${V(x)} × ${k1} × ${V(y)}</b>`,[[k1,x+y]],`Getal vooraan, letters erachter: <b>${V(k1+x+y)}</b>.`)},
'Getallen met elkaar vermenigvuldigen, letters achter elkaar zetten.');

def('6.5','Sommen en verschillen herleiden',['gelijksoortige termen optellen en aftrekken','een som of verschil herleiden'],
`<p>Je mag alleen <b>gelijksoortige termen</b> samennemen. Tel dan de getallen ervoor bij elkaar op (of trek ze af). De letters blijven hetzelfde.</p>
<div class="ex"><b>Voorbeeld</b>3<i class="v">a</i> + 5<i class="v">a</i> = 8<i class="v">a</i><br>4<i class="v">a</i> + 3<i class="v">b</i> − <i class="v">a</i> + 2<i class="v">b</i> = 3<i class="v">a</i> + 5<i class="v">b</i><br>7<i class="v">x</i> − 9<i class="v">x</i> + 2 = −2<i class="v">x</i> + 2</div>
<div class="warn">Het teken vóór een term hoort bij die term. En <i class="v">a</i> betekent 1<i class="v">a</i>.</div>`,
()=>{const t=ri(0,3);const [x,y]=pick([['a','b'],['p','q'],['x','y']]);const c=()=>ri(1,9);
 const term=(k,v,first)=>{const a=Math.abs(k);const s=(a===1&&v?'':a)+v;return first?(k<0?M:'')+V(s):(k<0?' '+M+' ':' + ')+V(s)};
 if(t===0){const a=c(),b=c();return alq(`Herleid: <b>${term(a,x,1)}${term(b,x)}</b>`,[[a+b,x]],`${a} + ${b} = ${a+b}, dus <b>${algShow([[a+b,x]])}</b>.`)}
 if(t===1){const a=c(),b=c()+a,k=c();if(a===b)return W['6.5'].gen();return alq(`Herleid: <b>${term(a,x,1)}${term(-b,x)}${term(k,'')}</b>`,[[a-b,x],[k,'']],`${a} ${M} ${b} = ${sn(a-b)}. Het getal ${k} blijft staan. Antwoord: <b>${algShow([[a-b,x],[k,'']])}</b>.`)}
 if(t===2){const a=c()+1,b=c(),d=ri(1,a-1),e=c();return alq(`Herleid: <b>${term(a,x,1)}${term(b,y)}${term(-d,x)}${term(e,y)}</b>`,[[a-d,x],[b+e,y]],`${V(x)}-termen: ${a} ${M} ${d} = ${a-d}. ${V(y)}-termen: ${b} + ${e} = ${b+e}. Antwoord: <b>${algShow([[a-d,x],[b+e,y]])}</b>.`)}
 const a=c(),b=c(),d=c();return alq(`Herleid: <b>${term(a,x+'²',1)}${term(b,x)}${term(d,x+'²')}</b>`,[[a+d,x+'2'],[b,x]],`Alleen de ${V(x)}²-termen kun je samennemen: ${a} + ${d} = ${a+d}. Antwoord: <b>${algShow([[a+d,x+'2'],[b,x]])}</b>.`)},
'Alleen termen met precies dezelfde letters mag je samennemen.');


const T={"1.1": "Prisma en cilinder hebben een onder- en bovenvlak dat precies hetzelfde is. Piramide en kegel lopen spits toe naar één punt.", "1.2": "Een kubus is een dobbelsteen. Pak er een: 6 vlakken, 8 hoekjes, 12 randen.", "1.3": "Alle ribben van een balk: eerst lengte + breedte + hoogte, dan keer 4.", "1.4": "De middellijn is twee stralen achter elkaar: middellijn = 2 × straal.", "1.5": "Een prisma is twee keer dezelfde vorm met staande ribben ertussen: hoekpunten 2n, ribben 3n.", "1.6": "Bij een piramide is het aantal vlakken en het aantal hoekpunten hetzelfde getal: n + 1.", "2.1": "Ezelsbrug: <b>H</b>oe <b>M</b>oeten <b>W</b>ij <b>V</b>an <b>D</b>e <b>O</b>nvoldoendes <b>A</b>fkomen? Haakjes, Machten/Wortels, Vermenigvuldigen/Delen, Optellen/Aftrekken.", "2.2": "Vereenvoudigen: probeer eerst te delen door 2, dan 3, dan 5. Gelijknamig maken: lukt het niet slim, vermenigvuldig dan gewoon de twee noemers.", "2.3": "Denk aan geld. −5 is een schuld van 5 euro. Krijg je er 8 bij, dan houd je 3 over.", "2.4": "Tel de mintekens. Even aantal → plus. Oneven aantal → min.", "2.5": "Zet in gedachten haakjes om de hele bovenkant en de hele onderkant. Die reken je eerst uit.", "3.1": "In het alfabet komt x vóór y. Dus bij coördinaten ook: eerst x, dan y.", "3.2": "Leg een liniaal of je geodriehoek tegen het scherm of papier om recht omhoog en recht opzij te gaan.", "3.3": "Terugrekenen: doe het omgekeerde in omgekeerde volgorde. In plaats van × doe je :, in plaats van + doe je −.", "3.4": "Schrijf de formule eerst helemaal over en vul dan pas de getallen in. Zo zie je elke stap.", "3.5": "Bij <i class=\"v\">y</i> = a<i class=\"v\">x</i> + b is b het begingetal (bij <i class=\"v\">x</i> = 0) en a de stap in de tabel.", "4.1": "Komma schuiven: het aantal nullen is het aantal plekken. × 1000 = 3 plekken naar rechts.", "4.2": "Rond af op getallen waarmee je makkelijk rekent: tientallen of honderdtallen.", "4.3": "Miljoen = 6 nullen, miljard = 9 nullen. Tel ze van achteren in groepjes van drie.", "4.4": "Reken eerst 10% of 1% uit. Daarmee maak je elk percentage.", "4.5": "Reken altijd eerst terug naar 1 (één pak, één persoon). Daarna is het makkelijk.", "5.1": "Een lijnstuk is het enige dat je met een liniaal kunt opmeten: het heeft twee stippen.", "5.2": "De hoek van je schrift of tafel is een rechte hoek. Is een hoek kleiner? Scherp. Groter? Stomp.", "5.3": "Schat altijd eerst: kleiner of groter dan 90°? Dan weet je welke schaal je moet aflezen.", "5.4": "Eerst een stipje zetten, geodriehoek weg, dan pas de lijn trekken. Zo schuift er niets.", "5.5": "Bij twee snijdende lijnen zie je twee grote en twee kleine hoeken. Groot + klein = 180°.", "5.6": "Check jezelf: tel de drie hoeken op. Komt er 180 uit? Dan klopt het.", "6.1": "Leer de kwadraten tot 15 met de flitskaarten van dit hoofdstuk. Dat scheelt op elke toets tijd.", "6.2": "Haakjes om een negatief getal en het kwadraat altijd eerst. Dan gaat het bijna nooit mis.", "6.3": "De tabel van een kwadratische formule is symmetrisch: links en rechts van het midden staan dezelfde y-waarden.", "6.4": "Eerst de getallen met elkaar vermenigvuldigen, dan de letters in alfabetische volgorde erachter.", "6.5": "Onderstreep gelijke termen met dezelfde kleur. Tel dan per kleur de getallen op."};
Object.keys(T).forEach(k=>{W[k].learn+=`<div class="trick"><b>Trucje</b>${T[k]}</div>`});
['2.5','3.5','4.5','6.5','5.5'].forEach(k=>W[k].hard=true);
W['2.1'].learn+=`<div class="ex"><b>Zo schrijf je het uit</b>5 + 3 × 4<br>= 5 + 12<br>= 17<br><span class="tip">Elke stap op een nieuwe regel, met het =-teken vooraan. Zo zie je (en je docent) precies wat je deed.</span></div>`;
const C=(n,t,ids,o={})=>Object.assign({id:'h'+n,n,t,ps:ids.map(i=>W[i])},o);
HUB.vak({id:'wi',naam:'Wiskunde',boek:'Getal & Ruimte 1 vwo',kleur:'#17663f',
 intro:`<h2>Tip voor wiskunde</h2><p>Schrijf altijd je tussenstappen op, ook als je het antwoord al weet. Op een toets krijg je punten voor de stappen, en je ziet zelf waar het misgaat. Kies bij het oefenen <b>Uitschrijven: hier typen</b> of vink aan dat je het op papier deed: dat geeft extra XP.</p>`,
 chs:[
 C(1,'Figuren',['1.1','1.2','1.3','1.4','1.5','1.6'],{cards:[['ribbe','Een lijn waar twee vlakken van een ruimtefiguur samenkomen.'],['zijvlak','Een plat vlak aan de buitenkant van een ruimtefiguur.'],['hoekpunt','Een punt waar ribben samenkomen.'],['uitslag','Een ruimtefiguur opengeknipt en plat neergelegd.'],['prisma','Ruimtefiguur met twee gelijke grondvlakken en rechthoeken ertussen.'],['piramide','Ruimtefiguur met een grondvlak en driehoeken die samenkomen in een top.'],['cilinder','Twee cirkels met een gebogen wand ertussen, zoals een blik.'],['kegel','Een cirkel als grondvlak en één punt bovenaan.'],['straal','Lijnstuk van het middelpunt naar de cirkel.'],['middellijn','Lijnstuk door het middelpunt van rand tot rand: 2 × de straal.'],['diagonaal','Lijnstuk tussen twee hoekpunten die niet naast elkaar liggen.'],['stippellijn','Een ribbe die je niet kunt zien omdat hij achter de figuur zit.']]}),
 C(2,'Getallen en bewerkingen',['2.1','2.2','2.3','2.4','2.5'],{cards:[['rekenvolgorde','Haakjes, machten, keer en delen, plus en min.'],['teller','Het getal boven de breukstreep.'],['noemer','Het getal onder de breukstreep.'],['vereenvoudigen','Teller en noemer door hetzelfde getal delen.'],['gelijknamig maken','Breuken dezelfde noemer geven, zodat je ze kunt optellen.'],['min × min','plus'],['min × plus','min'],['a − (−b)','a + b'],['deelstreep','Werkt als haakjes: eerst boven, dan onder, dan delen.']]}),
 C(3,'Grafieken en formules',['3.1','3.2','3.3','3.4','3.5'],{cards:[['assenstelsel','Een horizontale x-as en een verticale y-as.'],['oorsprong','Het punt (0, 0), waar de assen elkaar snijden.'],['coördinaten','Eerst x (opzij), dan y (omhoog of omlaag): (x, y).'],['woordformule','Formule in woorden, bijv. kosten = 3 × uur + 5.'],['3x','betekent 3 × x'],['globale grafiek','Grafiek zonder getallen die alleen laat zien hoe iets verandert.'],['lineaire formule','Geeft een rechte lijn, bijv. y = 2x + 1.']]}),
 C(4,'Rekenen in de praktijk',['4.1','4.2','4.3','4.4','4.5'],{cards:[['afronden','5 of meer: omhoog. Minder dan 5: laten staan.'],['× 100','komma 2 plekken naar rechts'],[': 1000','komma 3 plekken naar links'],['miljoen','1.000.000 (6 nullen)'],['miljard','1.000.000.000 (9 nullen)'],['10%','delen door 10'],['25%','een kwart: delen door 4'],['recht evenredig','Twee keer zoveel van het ene geeft twee keer zoveel van het andere.'],['omgekeerd evenredig','Meer van het ene geeft juist minder van het andere, zoals meer schilders = minder dagen.']]}),
 C(5,'Lijnen en hoeken',['5.1','5.2','5.3','5.4','5.5','5.6'],{cards:[['lijn','Gaat aan beide kanten oneindig door.'],['halve lijn','Eén beginpunt, aan de andere kant oneindig.'],['lijnstuk','Twee eindpunten, heeft een lengte.'],['⊥','loodrecht'],['//','evenwijdig'],['scherpe hoek','kleiner dan 90°'],['stompe hoek','tussen 90° en 180°'],['gestrekte hoek','180°'],['overstaande hoeken','zijn even groot'],['nevenhoeken','samen 180°'],['hoeken van een driehoek','samen 180°'],['∠ABC','hoek met hoekpunt B']]}),
 C(6,'Formules en letters',['6.1','6.2','6.3','6.4','6.5'],{later:true,cards:[...Array(15)].map((_,i)=>[(i+1)+'²',String((i+1)**2)]).concat([['√144','12'],['(−4)²','16'],['−4²','−16'],['herleiden','Een formule korter en eenvoudiger schrijven.'],['gelijksoortige termen','Termen met precies dezelfde letters, zoals 3a en 7a.']])})
 ]});
})();
