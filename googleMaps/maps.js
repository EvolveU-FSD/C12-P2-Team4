let map;

async function calgaryLocationMap() {
  const calgaryLocation =
  {
    center: { lat: 51.0447, lng: -114.0719 },
    zoom: 9,
  }
  //New Map
  map = new google.maps.Map(document.getElementById("map"), calgaryLocation)


}

function search() {

  const request = {
    query: document.getElementById('searchInput').value,
    fields: ['name', 'geometry']

  }

  service = new google.maps.places.PlacesService(map)
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      map.setCenter(results[0].geometry.location)
      const marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      })
      infowindow.setContent(results[0].name)
      infowindow.open(map, marker)
    } else {
      console.error('Place not Found')
    }
  })

}