import * as map from "./map.js";
import * as ajax from "./ajax.js";

let poi;

function loadPOI(){
  const url = "https://igm.rit.edu/~acjvks/courses/shared/330/maps/igm-points-of-interest.php";
  
  // callback function for when data shows up
  function poiLoaded(jsonString){
    poi = JSON.parse(jsonString);;
    console.log(poi);
    
    // make markers and add them to the map
    for (let p of poi){
      // map.addMarker(coordinates, title, description, className)
      map.addMarker(p.coordinates, p.title, "A POI!", "poi");
    }
  }
  
  // start download
  ajax.downloadFile(url, poiLoaded);
}

function init(){
  map.initMap();
  map.loadMarkers();
  map.addMarkersToMap();
  
  setupUI();
}

function setupUI(){
  // it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
  const lnglatRIT = [-77.67454147338866, 43.08484339838443];
  const lnglatIGM = [-77.67990589141846, 43.08447511795301];
  
  // RIT Zoom 15.1
  btn1.onclick = () => {
    map.setZoomLevel(15.5);
    map.setPitchAndBearing(0, 0);
    map.flyTo(lnglatRIT);
  }
  
  // RIT isometric view
  btn2.onclick = () => {
    map.setZoomLevel(15.5);
    map.setPitchAndBearing(45, 0);
    map.flyTo(lnglatRIT);
  }
  
  // World zoom 0
  btn3.onclick = () => {
    map.setZoomLevel();
    map.setPitchAndBearing(0, 0);
    map.flyTo();
  }
  
  // IGME zoom 18
  btn4.onclick = () => {
    map.setZoomLevel(18);
    map.setPitchAndBearing(0, 0);
    map.flyTo(lnglatIGM);
  }
  
  // load some marker data
  btn5.onclick = () => {
    // only download this data once
    if (!poi){
      loadPOI();
      btn5.disabled = true;
    }
  }
}

export {init};