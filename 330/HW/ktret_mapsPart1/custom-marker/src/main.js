function init(){
  mapboxgl.accessToken = 'pk.eyJ1IjoicGFuZ3Vpbm9iIiwiYSI6ImNrbmdpcXQyMzI4d2sycHBqb21zbnNrZXAifQ.tQF3dnsMnAr-mzZtQ4TSNw';
  
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: 3
  });
  
  // GeoJSON Data
  let geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.674347, 43.084587]
        },
        properties: {
          title: 'Rochester Institute of Technology',
          description: 'Rochester, New York'
        }
      }]
  };
  
  // add markers to map
  for (let feature of geojson.features){
    
    // create a HTML element for each feature
    let el = document.createElement('div');
    el.className = 'marker';
    
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>'))
    .addTo(map);
  };
}

export {init};