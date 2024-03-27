async function calgaryLocationMap() {
  const calgaryLocation =
  {
    center: { lat: 51.0447, lng: -114.0719 },
    zoom: 9,
  }
  //New Map
  const map = new google.maps.Map(document.getElementById("map"), calgaryLocation)


}

