import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import "./calgarymap.css";

const YOUR_MAP_KEY = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "420px",
  borderRadius: "15px",
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
    console.log(location);
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
    googleMapsApiKey: YOUR_MAP_KEY, // Add your Google Maps API key here
    libraries,
  });
  const [map, setMap] = useState(null);
  const [markersData, setMarkersData] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchMade, setSearchMade] = useState(false);
  const [range, setRange] = useState(5); // [km]
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const itemsPerSlide = 4;

  // Calculate the items for the current slide
  const currentItems = markersData.slice(
    currentStartIndex,
    currentStartIndex + itemsPerSlide
  );

  // Calculate the total number of slides
  const totalSlides = Math.ceil(markersData.length / itemsPerSlide);
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
    event.preventDefault();
    if (searchValue) {
      const location = `${mapCenter.lat},${mapCenter.lng}`;
      const radius = range * 1000; // Convert km to meters for the Google Places API
      const keyword = searchValue;

      const url = `/api/places?location=${encodeURIComponent(
        location
      )}&radius=${encodeURIComponent(radius)}&keyword=${encodeURIComponent(
        keyword
      )}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          console.log(data.results);
          setMarkersData(
            data.results.map((place) => ({
              name: place.name,
              vicinity: place.vicinity,
              photoref: place.photos
                ? place.photos[0].photo_reference
                : "default_photo_reference",
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            }))
          );
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setSearchMade(true);
  };

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <form className="searchForm">
        <div>
          <input
            className="searchBar"
            placeholder="Search for places..."
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button className="searchButton" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="rangeSlider">
          <div className="rangeValue">Within: {range}km</div>
          <input
            type="range"
            name=""
            id=""
            min="1"
            max="20"
            value={range}
            onChange={(event) => setRange(event.target.value)}
          />
        </div>
      </form>
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
            onMouseOver={() => setActiveMarker(marker)}
          />
        ))}
        {activeMarker && (
          <InfoWindow
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div className="info-window">
              <img
                className="info-window-image"
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=325&photoreference=${activeMarker.photoref}&key=AIzaSyCIC_vfw1KByMvwLXmgHdY5ZKfA8NorD5w`}
                alt={activeMarker.name}
              />
              <p className="info-text">{activeMarker.name}</p>
              <p className="info-text">{activeMarker.vicinity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div className="carousel-container">
        {searchMade && (
          <button
            className={currentStartIndex === 0 ? "button-disabled" : ""}
            onClick={() => {
              if (currentStartIndex > 0) {
                setCurrentStartIndex(currentStartIndex - itemsPerSlide);
              }
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Previous
          </button>
        )}
        <div className="carousel-slide">
          {currentItems.map((marker, index) => (
            <div className="places-card" key={index}>
              <div className="places-card-info">
                <img
                  className="places-card-image"
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=325&photoreference=${marker.photoref}&key=AIzaSyCIC_vfw1KByMvwLXmgHdY5ZKfA8NorD5w`}
                  alt={marker.name}
                />
                <div className="places-card-text">{marker.name}</div>
              </div>

              <button className="places-card-button">Add to Itinerary</button>
            </div>
          ))}
        </div>
        {searchMade && (
          <button
            className={
              currentStartIndex === (totalSlides - 1) * itemsPerSlide
                ? "button-disabled"
                : ""
            }
            onClick={() => {
              if (currentStartIndex < (totalSlides - 1) * itemsPerSlide) {
                setCurrentStartIndex(currentStartIndex + itemsPerSlide);
              }
            }}
          >
            Next <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default CalgaryMap;
