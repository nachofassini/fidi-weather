"use client";

import React from "react";
import dynamic from "next/dynamic";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = dynamic(() => import("react-map-gl").then((mod) => mod.Map), {
  ssr: false,
});
const Marker = dynamic(() => import("react-map-gl").then((mod) => mod.Marker), {
  ssr: false,
});

interface MapPreviewProps {
  lat: number;
  lon: number;
}

const MapPreview: React.FC<MapPreviewProps> = ({ lat, lon }) => {
  return (
    <Map
      initialViewState={{
        latitude: lat,
        longitude: lon,
        zoom: 13,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
    >
      <Marker latitude={lat} longitude={lon} />
    </Map>
  );
};

export default MapPreview;
