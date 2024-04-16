import React, { useEffect, useState, useContext } from "react"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"
import ItineraryContext from '../../contexts/ItineraryContext';
import "./calgarymap.css"


const containerStyle = {
  width: "100%",
  height: "700px",
}

const center = {
  lat: 51.05,
  lng: -114.07,
}

function CalgaryMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCIC_vfw1KByMvwLXmgHdY5ZKfA8NorD5w",
  })

  const [map, setMap] = React.useState(null)
  const [markersData, setMarkersData] = useState([]) // New state for the markers data
  const { selectedMarker, setSelectedMarker } = useContext(ItineraryContext);

const handleAddToItinerary = async () => {
  // Add the selected marker to the itinerary
  const response = await fetch('/api/itinerary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(selectedMarker),
  });
  const data = await response.json();
  console.log(data); // Log the saved itinerary item

  // Close the InfoWindow
  setSelectedMarker(null);
};
  useEffect(() => {
    // Fetch the data from the endpoint and set it to the markersData state
    fetch('/api/public-art')
      .then(response => response.json())
      .then(data => setMarkersData(data.map(item => ({
        lat: item.point.coordinates[1],
        lng: item.point.coordinates[0],
        title: item.title,
        imageUrl: `/assets/${item.imgpath}`,
      }))))
  }, [])

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Map over the markersData to create a Marker for each data point */}
      {markersData.map((marker, index) => (
        <Marker 
          key={index} 
          position={{ lat: marker.lat, lng: marker.lng }} 
          onMouseOver={() => {
            setSelectedMarker(marker)
          }}
        />
      ))}

      {/* Display an InfoWindow for the selected marker */}
      {selectedMarker && (
        <InfoWindow 
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)} // Add this line
        >
          <div className="info-window">
            <p className="info-text">{selectedMarker.title}</p>
            <img className="info-pic" src={selectedMarker.imageUrl} alt={selectedMarker.title} />
            <button onClick={handleAddToItinerary}>Add to Itinerary</button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default CalgaryMap