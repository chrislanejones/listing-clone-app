"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { memo, useCallback, useState } from "react";

const Map = ({ locations }) => {
  const containerStyle = {
    width: "100%",
    height: "90%",
  };
  const center = {
    lat: location[0].latitude,
    lng: location[0].longitude,
  };

  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap;
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locations.map((location, _index) => (
        <Marker
          key={_index}
          position={{
            Lat: location.latitude,
            lng: location.longitude,
          }}
          icon={{
            url: image,
            anchor: new window.google.maps.Point(5, 58),
          }}
        />
      ))}
      ;
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
