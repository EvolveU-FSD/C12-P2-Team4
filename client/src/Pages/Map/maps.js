// import { config as dotenvConfig } from "dotenv";
// dotenvConfig();

let map // Declaring map as a global variable
// api_key = process.env.GOOGLEMAPS_API_KEY;

export default async function calgaryLocationMap() {
  const calgaryLocation = {
    center: { lat: 51.0447, lng: -114.0719 },
    zoom: 13,
    mapTypeId: "roadmap",
  }
  //New Map
  map = await new google.maps.Map(
    document.getElementById("map"),
    calgaryLocation
  )
  infowindow = new google.maps.InfoWindow()
}

export function search() {
  const request = {
    query: document.getElementById("searchInput").value,
    fields: ["name", "geometry"],
  }

  const service = new google.maps.places.PlacesService(map) // Accessing map globally
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      map.setCenter(results[0].geometry.location)
      const marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      })
      infowindow.setContent(results[0].name)
      infowindow.open(map, marker)
    } else {
      console.error("Place not Found")
    }
  })
}
