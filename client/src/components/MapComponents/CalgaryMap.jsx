import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import "./calgarymap.css";

const YOUR_MAP_KEY = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "650px",
  borderRadius: "15px",
};

const searchBoxStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  zIndex: 1,
  backgroundColor: "white",
  padding: "10px",
  borderRadius: "4px",
};

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          reject(new Error("Unable to retrieve your location"));
        }
      );
    }
  });
}

let center = {
  lat: 0,
  lng: 0,
};

getCurrentLocation()
  .then((location) => {
    console.log(location); // { lat: ..., lng: ... }
    center = {
      lat: location.lat,
      lng: location.lng,
    };
  })
  .catch((error) => {
    console.error(error);
  });
const libraries = ["places"];
function CalgaryMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCIC_vfw1KByMvwLXmgHdY5ZKfA8NorD5w", // Add your Google Maps API key here
    libraries,
  });
  const [map, setMap] = useState(null);
  const [markersData, setMarkersData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    getCurrentLocation()
      .then((location) => {
        console.log(location);
        setMapCenter({
          lat: location.lat,
          lng: location.lng,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = async () => {
    if (searchValue) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            searchValue + ", Calgary"
          )}&key=${YOUR_MAP_KEY}`
        );
        const data = await response.json();
        if (data.status === "OK" && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setMapCenter({ lat, lng });
          setSearchResult({ lat, lng });
        } else {
          console.log("No results found for the search query.");
          setSearchResult(null);
        }
      } catch (error) {
        console.error("Error occurred while searching:", error);
        setSearchResult(null);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <div style={containerStyle}>
        <div style={searchBoxStyle}>
          <input
            type="text"
            placeholder="Search for a place..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ color: "black" }}
          />
          <Button variant="contained" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </div>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {markersData.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}

          {/* Black flag marker for search result */}
          {searchResult && (
            <Marker
              position={searchResult}
              icon={{
                url: "/assets/images/black flag.png", // Path to your custom black flag icon image
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          )}
        </GoogleMap>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default CalgaryMap;
