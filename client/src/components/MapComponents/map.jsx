import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import "./map.css";

const containerStyle = {
    width: "400px",
    height: "4000px",
};

const center = {
    lat: 51.0447,
    lng: -114.0719,
};

function CalgaryMap() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "",
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {

        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: 51.0447, lng: -114.0719 }); // Extend the bounds to include the center coordinate
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : (
        <></>
    );
}

export default CalgaryMap;
