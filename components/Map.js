import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import ReactDOM from 'react-dom';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2RwYWRpbGxhNDIiLCJhIjoiY2tyNms5dzRsMWphYzJubjNxbDZqOHBwbyJ9.v-4FKZnlExdu_wmXrtgPvw';

const Map = ({ data }) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const center = [-73.9012, 40.6839];
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);

  const initiatePin = (restaurant) => {
    const el = document.createElement('div');
    el.className = 'marker';
    ReactDOM.render(<div className="marker" />, el);
    const marker = new mapboxgl.Marker(el)
      .setLngLat(restaurant.address.coord)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            '<h3>' + restaurant.name + '</h3><p>' + restaurant.cuisine + '</p>'
          )
      )
      .addTo(map.current);
    return { marker, el };
  };

  const clearPins = () => {
    markers.forEach(({ marker, el }) => {
      marker.remove();
      ReactDOM.unmountComponentAtNode(el);
    });
  };

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 10,
    });

    setMapLoaded(true);

    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (mapLoaded && data) {
      const markers = data?.data?.map((restaurant) => initiatePin(restaurant));
      setMarkers(markers);
    }
  }, [mapLoaded, data]);

  useEffect(() => {
    clearPins();
  }, [data]);

  return (
    <>
      <div className="map-wrapper">
        <div className="map-container" ref={mapRef} />
      </div>

      <style jsx>{`
        .map-wrapper {
          position: relative;
          width: 400px;
        }

        .map-container {
          height: 400px;
        }
      `}</style>
    </>
  );
};

export default Map;
