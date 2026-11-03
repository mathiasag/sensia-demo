/* Google Maps is optional. Configure a domain-restricted browser key in config.js. */
if(window.SENSIA_GOOGLE_MAPS_KEY){
 let googleMap=null,googleStations=[],googleCritical=[];
 function recoverMap(){if(!googleMap)return;window.sensiaGoogleMap=null;googleStations=[];googleCritical=[];googleMap=null;document.getElementById('map').replaceChildren();window.initSensiaLeaflet();render();document.getElementById('provider-name').textContent='OpenStreetMap · Google no disponible';}
 window.gm_authFailure=recoverMap;
 window.initSensiaGoogle=async function(){try{
  const {Map}=await google.maps.importLibrary('maps');const {AdvancedMarkerElement}=await google.maps.importLibrary('marker');
  if(map){map.remove();map=null;}markers=[];
  googleMap=new Map(document.getElementById('map'),{center:{lat:-25.282,lng:-57.587},zoom:12,mapId:window.SENSIA_GOOGLE_MAP_ID||'DEMO_MAP_ID',mapTypeControl:true,streetViewControl:false,fullscreenControl:true,gestureHandling:'cooperative'});
  const bounds=new google.maps.LatLngBounds();allMapCoordinates.forEach(([lat,lng])=>bounds.extend({lat,lng}));googleMap.fitBounds(bounds,40);
  points.forEach((p,i)=>{const node=document.createElement('div');node.innerHTML=stationIconHTML(i,i===selected);const marker=new AdvancedMarkerElement({map:googleMap,position:{lat:p.coords[0],lng:p.coords[1]},title:p.name+' · hipotética'});marker.append(node);marker.addListener('click',()=>choose(i,true));googleStations.push({marker,node});});
  const info=new google.maps.InfoWindow();criticalPoints.forEach(p=>{const node=document.createElement('span');node.className='geo-critical';const marker=new AdvancedMarkerElement({map:googleMap,position:{lat:p.coords[0],lng:p.coords[1]},title:p.id+' · punto crítico aproximado'});marker.append(node);marker.addListener('click',()=>{info.setContent('<b>'+p.id+' · punto crítico</b><p>Coordenadas aproximadas de demostración, por verificar. No es una alerta actual.</p>');info.open({map:googleMap,anchor:marker});});googleCritical.push(marker);});
  window.sensiaGoogleMap={focus(i){const c=points[i].coords;googleMap.panTo({lat:c[0],lng:c[1]});},fit(){googleMap.fitBounds(bounds,40);},update(){googleStations.forEach(({node},i)=>node.innerHTML=stationIconHTML(i,i===selected));},layers(stations,critical){googleStations.forEach(({marker})=>marker.map=stations?googleMap:null);googleCritical.forEach(marker=>marker.map=critical?googleMap:null);}};
  document.getElementById('provider-name').textContent='Google Maps';render();
 }catch{if(googleMap)recoverMap();else{if(!map)window.initSensiaLeaflet();render();document.getElementById('provider-name').textContent='OpenStreetMap · Google no disponible';}}};
 const script=document.createElement('script');script.src='https://maps.googleapis.com/maps/api/js?key='+encodeURIComponent(window.SENSIA_GOOGLE_MAPS_KEY)+'&loading=async&callback=initSensiaGoogle&v=weekly&language=es';script.async=true;script.onerror=()=>{document.getElementById('provider-name').textContent='OpenStreetMap · Google no disponible';};document.head.append(script);
}
