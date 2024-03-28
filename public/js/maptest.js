const apiKey = "";

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

// Get the search input and form
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

// Add an event listener to the form
searchForm.addEventListener("submit", function (event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the user's search query
  const query = searchInput.value;

  // Make a GET request to your Express endpoint
  fetch(`/places?query=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data) => {
      // Clear the map

      // Update the map with the data
      data.results.forEach((item) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: map,
          position: {
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
          },
          title: item.name,
        });
      });
    })
    .catch((error) => console.error("Error:", error));
});
