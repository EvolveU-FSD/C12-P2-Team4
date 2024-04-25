import React, { useState, useEffect, useContext } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { AuthContext } from "../../components/Auth/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./calgarymap.css";
import DateTimeModal from "../../components/Itinerary/DateTimeModal";
const YOUR_MAP_KEY = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "420px",
  borderRadius: "15px",
  marginLeft: "6rem",
  marginRight: "8rem",
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
  const { auth } = useContext(AuthContext);
  const [map, setMap] = useState(null);
  const [markersData, setMarkersData] = useState([]);
  const [modalPlaceItem, setModalPlaceItem] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchMade, setSearchMade] = useState(false);
  const [range, setRange] = useState(5); // [km]
  const [showModal, setShowModal] = useState(false);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const itemsPerSlide = 4;
  const [eventData, setEventData] = useState({
    date: "",
    user: "",
    eventTime: "",
    eventTitle: "",
    place: "",
    description: "",
  });

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
          console.log("Search Data:", data.results);
          setMarkersData(
            data.results.map((place) => ({
              name: place.name,
              vicinity: place.vicinity,
              photoref: place.photos
                ? place.photos[0].photo_reference
                : "default_photo_reference",
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
              geometry: place.geometry,
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

  const handlePlaceItemPost = async (marker, eventData, date, time) => {
    console.log("Place item:", marker);
    if (!auth || !auth.accessToken) {
      setModalType("signin");
      setShowModal(true);
      return;
    }

    try {
      console.log("1. EventData: ", eventData);
      console.log("2. User:....", auth._id);
      const dateTime = new Date(`${date}T00:00:00.000Z`);
      const formattedDate = dateTime.toISOString();
      const response = await fetch("/api/dayevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({
          ...eventData,
          user: auth._id,
          username: auth.username,
          eventTitle: marker.name || eventData.eventTitle,
          date: formattedDate,
          eventTime: time,
          place: `${marker.lat},${marker.lng}`,
          description: marker.vicinity,
        }),
      });
      if (!response.ok) {
        throw new Error("Event creation failed...");
      }
      console.log("Event created successfully:", await response.json());
      setShowModal(false);
    } catch (error) {
      console.error("Event creation error:", error);
      setLoadError(error.message);
    }
  };

  const handleAddToItinerary = async (marker) => {
    console.log("Marker:", marker);
    // Create a new object with only the title and coordinates
    const event = {
      eventTitle: marker.name,
      lat: marker.geometry.location.lat,
      lng: marker.geometry.location.lng,
      vicinity: marker.vicinity,
    };

    // Populate eventData with the art item data
    setEventData({
      eventTitle: marker.name,
      place: `${marker.geometry.location.lat},${marker.geometry.location.lng}`,
      description: marker.vicinity,
    });

    // Show the modal and save the art item
    setModalPlaceItem(event);
    setShowModal(true);
  };

  const handleModalConfirm = async (date, time) => {
    // Set date and time in eventData
    const updatedEventData = {
      ...eventData,
      date: date,
      eventTime: time,
      eventTitle: modalPlaceItem.eventTitle,
    };
    setEventData(updatedEventData);

    // Close the modal
    setShowModal(false);
    await handlePlaceItemPost(modalPlaceItem, updatedEventData, date, time);
  };

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <DateTimeModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleModalConfirm}
      />
      <form className="searchForm ml-[6rem]">
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
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=325&photoreference=${activeMarker.photoref}&key=${YOUR_MAP_KEY}`}
                alt={activeMarker.name}
              />
              <p className="info-text">{activeMarker.name}</p>
              <p className="info-text">{activeMarker.vicinity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div className="carousel-container ml-[8rem]">
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
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=325&photoreference=${marker.photoref}&key=${YOUR_MAP_KEY}`}
                  alt={marker.name}
                />
                <div className="places-card-text">{marker.name}</div>
              </div>

              <button
                className="places-card-button"
                onClick={() => handleAddToItinerary(marker)}
              >
                Add to Itinerary
              </button>
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
