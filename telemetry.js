'use strict';
const icons={water:'M3 8c3-4 6 4 9 0s6 4 9 0M3 14c3-4 6 4 9 0s6 4 9 0M3 20c3-4 6 4 9 0s6 4 9 0',rain:'M7 14a5 5 0 1 1 0-10 6 6 0 0 1 11 3 4 4 0 0 1 0 8M7 18l-1 3m6-3-1 3m6-3-1 3',trend:'M3 17l6-6 4 3 8-10m-7 0h7v7',sensor:'M9 9h6v6H9zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4',energy:'M13 2L4 14h7l-1 8 10-13h-8z',agro:'M5 20C2 9 10 3 21 3c0 12-6 18-16 17Zm0 0L16 8',chart:'M3 3v18h18M7 16v-5m5 5V7m5 9V4',share:'M8 8l8-4M8 16l8 4M5 9v6M8 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm14-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm0 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',target:'M12 2v4m0 12v4M2 12h4m12 0h4M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',layers:'m12 3 10 5-10 5L2 8Zm-10 10 10 5 10-5M2 18l10 5 10-5'};
const icon=k=>`<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[k]||icons.sensor}"/></svg>`;
document.querySelector('.appicon').innerHTML=icon('water');
[['energy','energy','Energía y agua'],['machines','sensor','Equipos'],['agro','agro','Agro'],['process','chart','Procesos']].forEach(([k,i,t])=>document.querySelector(`[data-app="${k}"]`).innerHTML=icon(i)+t);
document.querySelectorAll('.signal-node i').forEach((e,i)=>e.innerHTML=icon(['sensor','chart','trend'][i]));
document.querySelectorAll('.cap-tabs button>span').forEach((e,i)=>e.innerHTML=icon(['sensor','chart','trend','share'][i]));
$('recenter').innerHTML=icon('target')+'<span>Ver zona</span>';$('layersButton').innerHTML=icon('layers')+'<span>Capas</span>';
const fmt=(v,n=2)=>v.toLocaleString('es-PY',{minimumFractionDigits:n,maximumFractionDigits:n});
function historyChart(kind){
 if(mode==='missing')return '<div class="empty-chart">Sin lecturas en este escenario.<br><small>Elegí otro escenario para explorar los gráficos.</small></div>';
 const isLevel=kind==='level',v=isLevel?values(points[selected]):rain.map(x=>mode==='normal'?2:x),max=isLevel?3.2:50,start=$('data-window').value==='30'?Math.max(0,step-3):0,end=$('data-window').value==='30'?step:6;
 const indices=Array.from({length:end-start+1},(_,i)=>start+i),x=i=>62+(i-start)*490/Math.max(1,end-start),y=n=>215-n/max*180;
 let svg=`<svg viewBox="0 0 600 265" role="img" aria-label="${isLevel?'Nivel en metros':'Lluvia en milímetros'}, datos simulados de ${time(start)} a ${time(end)}"><title>${isLevel?'Nivel del agua':'Lluvia acumulada en 30 minutos'} · ${points[selected].short} · simulación</title>`;
 for(let n=0;n<=4;n++){const val=max*n/4;svg+=`<path d="M50 ${y(val)}H565" stroke="#e5e8f1"/><text x="40" y="${y(val)+4}" text-anchor="end">${fmt(val,isLevel?1:0)}</text>`;}
 if(isLevel){svg+=`<path d="M50 ${y(threshold)}H565" stroke="#d39823" stroke-dasharray="5 5"/>`;const past=indices.filter(i=>i<=step),future=indices.filter(i=>i>=step);if(past.length)svg+=`<path d="M${x(past[0])} 215L${past.map(i=>x(i)+' '+y(v[i])).join('L')}L${x(past.at(-1))} 215Z" fill="#464af012"/><polyline points="${past.map(i=>x(i)+','+y(v[i])).join(' ')}" fill="none" stroke="#454af3" stroke-width="3"/>`;if(future.length)svg+=`<polyline points="${future.map(i=>x(i)+','+y(v[i])).join(' ')}" fill="none" stroke="#9497f8" stroke-width="3" stroke-dasharray="6 5"/>`;}
 indices.forEach(i=>{svg+=isLevel?`<circle cx="${x(i)}" cy="${y(v[i])}" r="${i===step?5:3}" fill="${i<=step?'#454af3':'#a5a8ef'}"><title>${time(i)}: ${fmt(v[i])} m · simulado</title></circle>`:`<rect x="${x(i)-13}" y="${y(v[i])}" width="26" height="${215-y(v[i])}" rx="3" fill="${i<=step?'#18a8ca':'#c4e9f1'}"><title>${time(i)}: ${v[i]} mm en 30 min · simulado</title></rect>`;svg+=`<text x="${x(i)}" y="240" text-anchor="middle">${time(i)}</text>`;});return svg+'</svg>';
}
window.renderTelemetry=function(){
 const p=points[selected],s=state(p),missing=mode==='missing',delta=step? (values(p)[step]-values(p)[step-1])*100:null;
 $('telemetry-context').textContent=`${p.id} · ${p.short} · ${time(step)} (hora ficticia). Todos los valores son de ejemplo.`;
 const cards=[['water','Nivel del agua',missing?'—':fmt(s.level)+' m','Altura simulada en el punto elegido'],['rain','Lluvia / últimos 30 min',missing?'—':(mode==='normal'?2:rain[step])+' mm','Acumulado de ejemplo, no lluvia real'],['trend','Cambio de nivel / 10 min',missing||delta===null?'—':(delta>=0?'+':'')+fmt(delta,0)+' cm',step?'Comparado con la lectura anterior':'No hay una lectura anterior'],['sensor','Puntos con datos de prueba',missing?'0 / 3':'3 / 3',missing?'No se generan estimaciones':'No son sensores conectados']];
 $('metric-grid').innerHTML=cards.map(([i,t,v,n])=>`<article class="metric-card"><span class="metric-icon">${icon(i)}</span><span>${t}</span><strong>${v}</strong><small>${n}</small></article>`).join('');
 $('level-history').innerHTML=historyChart('level');$('rain-history').innerHTML=historyChart('rain');$('extended-outlook').textContent=outlook();$('data-quality').textContent=missing?'Sin datos · estimación no disponible':'Origen: secuencia inventada · intervalos de 10 min';
 $('point-table').innerHTML=points.map((pt,i)=>{const st=state(pt);return `<tr class="${i===selected?'active':''}"><td><button data-point="${i}" aria-pressed="${i===selected}">${pt.id} · ${pt.short}</button></td><td>${missing?'—':fmt(st.level)+' m'}</td><td>${missing?'—':(mode==='normal'?2:rain[step])+' mm'}</td><td><span class="table-status" style="color:${st.color}">${st.name}</span></td></tr>`;}).join('');
 document.querySelectorAll('[data-point]').forEach(b=>b.onclick=()=>choose(+b.dataset.point,true));
};
$('data-window').onchange=window.renderTelemetry;window.renderTelemetry();
