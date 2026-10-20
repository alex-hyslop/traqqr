/* Traqqr globe (homepage, above the footer): dotted Earth on a <canvas>, rim glow (.dome box-shadows),
   city lights with pulsing amber rings, and 5 signal readouts whose stems follow their city.
   Ported 1:1 from the prototype (Traqqr Homepage Motion). Example data only.
   Usage: initGlobe(sectionEl)  — the section needs .dome, <canvas> and .sig[data-city][data-top] children (see Globe.astro). */
import { LAND } from './globe-land.js';
const TICK = '<svg class="ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

export function initGlobe(sec, { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const cv = sec.querySelector('canvas'), ctx = cv.getContext('2d');
  const dome = sec.querySelector('.dome');
  const D2R = Math.PI/180;
  // Design space (from Figma "Brand / Globe signals"): 1600 wide, viewport rows 40–900, globe R 980, centre (800, 1310)
  const DW = 1600, DY0 = 40, DH = 860, R = 980, CX = 800, CY = 1310, P0 = -4*D2R, L0 = 12;
  const n = LAND.length/2, lat = new Float32Array(n), lon = new Float32Array(n), sf = new Float32Array(n), cf = new Float32Array(n);
  for (let i=0;i<n;i++){ lat[i]=LAND[2*i]/10*D2R; lon[i]=LAND[2*i+1]/10; sf[i]=Math.sin(lat[i]); cf[i]=Math.cos(lat[i]); }
  const CITIES = {Berlin:[52.5,13.4],London:[51.5,-0.1],Paris:[48.9,2.35],'Zürich':[47.4,8.5],Madrid:[40.4,-3.7],Vienna:[48.2,16.4],Amsterdam:[52.4,4.9],
    Dubai:[25.2,55.3],Cairo:[30.0,31.2],Stockholm:[59.3,18.1],Istanbul:[41.0,29.0],Dublin:[53.3,-6.3],Warsaw:[52.2,21.0],Rome:[41.9,12.5]};
  let s=1, ox=0, W=0, H=0, dpr=1, l0=L0, sinP=Math.sin(P0), cosP=Math.cos(P0);
  function proj(la, lo, r){ // la in rad, lo in deg
    const l=(lo-l0)*D2R, cfl=Math.cos(la), sfl=Math.sin(la), cl=Math.cos(l);
    const c = sinP*sfl + cosP*cfl*cl;
    return [ox + (CX + r*cfl*Math.sin(l))*s, (CY - r*(cosP*sfl - sinP*cfl*cl) - DY0)*s, c];
  }
  function size(){
    const r = sec.getBoundingClientRect(); W = r.width; H = r.height; dpr = Math.min(2, devicePixelRatio||1);
    cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr);
    s = H/DH; if (DW*s < W*0.98) { s = Math.max(s, W/DW*0.9); } ox = (W - DW*s)/2;
    const d = 2*R*s;
    Object.assign(dome.style,{width:d+'px',height:d+'px',left:(ox+(CX-R)*s)+'px',top:((CY-R-DY0)*s)+'px',
      boxShadow:`0 0 ${110*s}px ${8*s}px rgba(255,217,160,.32), inset 0 ${16*s}px ${22*s}px -${6*s}px rgba(255,244,224,.95), inset 0 ${52*s}px ${64*s}px -${18*s}px rgba(255,183,77,.7), inset 0 ${140*s}px ${150*s}px -${40*s}px rgba(180,83,9,.55)`});
    const mobile = W < 980;
    sigs.forEach(g => { g.el.style.setProperty('--sc', mobile ? Math.max(.62, Math.min(1, s*1.5)) : Math.min(1.1, Math.max(.75, s))); });
  }
  const sigs = [...sec.querySelectorAll('.sig')].map(el => ({el, city:el.dataset.city, top:+el.dataset.top, stem:el.querySelector('.stem')}));
  const bursts = []; // {city, t0}
  const POOL = {
    Berlin:[['Purchase · €49.00','Digistore24 · server'],['Lead','KlickTipp · server'],['Purchase · €97.00','Ablefy · server'],['Registration','EverWebinar']],
    London:[['Lead','Deduplicated'],['PageView','Reverse proxy'],['Purchase · €29.00','Digistore24 · server']],
    Madrid:[['Purchase · €129.00','Ablefy · server'],['Lead','Deduplicated'],['Registration','Webinaris']],
    Istanbul:[['Registration','EverWebinar'],['Lead','KlickTipp · server'],['PageView','Reverse proxy']],
    Dubai:[['PageView','Reverse proxy'],['Purchase · €249.00','Digistore24 · server'],['Lead','Deduplicated']]
  };
  let motion = !reduce, t0 = performance.now(), visible = false;

  function frame(now){
    const t = (now - t0)/1000;
    if (motion) l0 = L0 + 7*Math.sin(t*2*Math.PI/70);
    ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,W,H);
    // dots, three brightness buckets by distance from the limb
    const rDot = Math.max(.7, 1.15*s*1.6);
    for (let bkt=0;bkt<3;bkt++){
      ctx.fillStyle = ['rgba(231,229,228,.26)','rgba(231,229,228,.42)','rgba(231,229,228,.58)'][bkt];
      ctx.beginPath();
      for (let i=0;i<n;i++){
        const l=(lon[i]-l0)*D2R, cl=Math.cos(l), c = sinP*sf[i] + cosP*cf[i]*cl;
        if (c <= 0.03) continue;
        const bk = c < .28 ? 0 : c < .55 ? 1 : 2; if (bk!==bkt) continue;
        const x = ox + (CX + R*cf[i]*Math.sin(l))*s, y = (CY - R*(cosP*sf[i] - sinP*cf[i]*cl) - DY0)*s;
        if (y < -4 || y > H+4 || x < -4 || x > W+4) continue;
        const rr = rDot*(.65+.45*c);
        ctx.moveTo(x+rr,y); ctx.arc(x,y,rr,0,6.283);
      }
      ctx.fill();
    }
    // city lights
    const cityXY = {};
    for (const [name,[la,lo]] of Object.entries(CITIES)){
      const p = proj(la*D2R, lo, R); cityXY[name]=p; if (p[2] <= 0.05) continue;
      const big = sigs.some(g=>g.city===name), pulse = .6 + .4*Math.sin(t*2 + la);
      const g = ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],(big?18:10)*s*1.4);
      g.addColorStop(0,`rgba(255,183,77,${(big?.85:.6)*pulse})`); g.addColorStop(1,'rgba(255,183,77,0)');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p[0],p[1],(big?18:10)*s*1.4,0,6.283); ctx.fill();
      if (big){ const ph=((t*0.45 + la*.7) % 1); ctx.strokeStyle=`rgba(255,183,77,${.55*(1-ph)})`; ctx.lineWidth=1.2; ctx.beginPath(); ctx.arc(p[0],p[1],(6+30*ph)*s*1.3,0,6.283); ctx.stroke(); }
      ctx.fillStyle= big ? '#fff' : '#ffd9a0'; ctx.beginPath(); ctx.arc(p[0],p[1],Math.max(1.2,(big?3:2)*s*1.3),0,6.283); ctx.fill();
    }
    for (let i=bursts.length-1;i>=0;i--){ const bu=bursts[i], age=(now-bu.t0)/1000; if (age>1.4){ bursts.splice(i,1); continue; }
      const p=cityXY[bu.city]; if (!p) continue; const rr=(6+60*age)*s*1.3;
      ctx.strokeStyle=`rgba(255,183,77,${.8*(1-age/1.4)})`; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(p[0],p[1],rr,0,6.283); ctx.stroke(); }
    // signal cards follow their city
    for (const g of sigs){ const p = cityXY[g.city]; if (!p) continue;
      const top = g.top*s - DY0*s + 0; const hgt = Math.max(0, p[1]-top);
      g.el.style.transform = `translate(${p[0].toFixed(1)}px,${top.toFixed(1)}px)`; g.stem.style.height = hgt.toFixed(1)+'px';
      g.el.style.opacity = p[2] > .08 ? 1 : 0;
    }
    if (visible || !('IntersectionObserver' in window)) requestAnimationFrame(frame); else running=false;
  }
  let running=false;
  function start(){ if (!running){ running=true; requestAnimationFrame(frame); } }
  size(); addEventListener('resize', ()=>{ size(); start(); });

  // Cards rise one after another when the globe comes into view; then events keep arriving
  let revealed=false, liveTimer=0;
  function revealCards(){ if (revealed) return; revealed=true;
    sigs.forEach((g,i) => setTimeout(()=>{ g.el.classList.add('on'); bursts.push({city:g.city,t0:performance.now()}); }, reduce?0:250+i*380));
    if (!reduce) liveTimer = setInterval(liveEvent, 3200);
  }
  function liveEvent(){
    if (!motion || !visible) return;
    const g = sigs[Math.floor(Math.random()*sigs.length)]; if (getComputedStyle(g.el).display==='none') return;
    const pool = POOL[g.city], cur = g.el.querySelector('b').textContent; let pick = pool[Math.floor(Math.random()*pool.length)];
    if (pick[0]===cur) pick = pool[(pool.indexOf(pick)+1)%pool.length];
    g.el.querySelector('b').textContent = pick[0]; g.el.querySelector('.s').innerHTML = pick[1] + '<em aria-label="confirmed">'+TICK+'</em>';
    g.el.classList.remove('swap'); void g.el.offsetWidth; g.el.classList.add('swap','ping');
    setTimeout(()=>g.el.classList.remove('ping'), 900);
    bursts.push({city:g.city,t0:performance.now()});
  }
  if ('IntersectionObserver' in window){
    new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; if (visible){ start(); if (e.intersectionRatio > .25 || e.boundingClientRect.top < innerHeight*.6) revealCards(); } }), {threshold:[0,.25,.5]}).observe(sec);
  } else { visible=true; start(); revealCards(); }
  start();
  return { setMotion(on){ motion = on && !reduce; } };
}
