const apiKey = "AIzaSyCIC_vfw1KByMvwLXmgHdY5ZKfA8NorD5w";

((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: apiKey,
  v: "weekly",
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});

// Initialize and add the map
let map;
let markers = []; // Array to hold all markers

async function initMap() {
  const position = { lat: 51.037611, lng: -114.063163 };

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
}

initMap();

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

let currentlat, currentlng;

async function logCurrentLocation() {
  try {
    const position = await getCurrentLocation();
    currentlat = position.coords.latitude;
    currentlng = position.coords.longitude;
    console.log(`Latitude: ${currentlat}, Longitude: ${currentlng}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Get the search input and form
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

// Update the range value
window.addEventListener("DOMContentLoaded", (event) => {
  const range = document.getElementById("range");
  const rangeValue = document.getElementById("rangeValue");

  range.oninput = function () {
    rangeValue.textContent = this.value;
  };
});

logCurrentLocation().then(() => {
  searchForm.addEventListener("submit", function (event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Clear previous markers
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];

    // Get the user's search query
    const query = `?location=${encodeURIComponent(currentlat)},${encodeURIComponent(currentlng)}&radius=${encodeURIComponent(range.value * 1000)}&keyword=${encodeURIComponent(searchInput.value)}`;
    // Make a GET request to your Express endpoint
    fetch(`/places${query}`)
      .then((response) => response.json())
      .then((data) => {

        // Update the map with the data
        data.results.forEach((item) => {
          const results = document.getElementById("results");
          const div = document.createElement("gmpx-place-overview");
          div.setAttribute("place", item.place_id);
          div.setAttribute("size", "medium");
          results.appendChild(div);

          const marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: {
              lat: item.geometry.location.lat,
              lng: item.geometry.location.lng,
            },
            title: item.name,
          });
          markers.push(marker); // Add the marker to the array
        });
      })
      .catch((error) => console.error("Error:", error));
  });
});
