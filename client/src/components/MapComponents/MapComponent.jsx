import "./MapComponent.css"
import calgaryLocationMap from "../../Pages/Map/maps"

export default function MapComponent() {
  return (
    <div>
      <h1>Calgary Map!</h1>
      <div id="map"></div>

      <div>{calgaryLocationMap()}</div>

      <script
        async
        defer
        src="https://maps.googleapis.com/maps/api/js?key=&libraries=places&callback=calgaryLocationMap"
      ></script>
    </div>
  )
}
