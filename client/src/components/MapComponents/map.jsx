// eslint-disable-next-line no-unused-vars
import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "@react-google-maps";

function Map() {
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 51.0447, lng: 114.0719 }}
        />
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function CalgaryMap() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <WrappedMap
                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyDz7ZMiaTHwnM3p1jV7YmlPloDccJu-y-s&libraries=places"}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}
