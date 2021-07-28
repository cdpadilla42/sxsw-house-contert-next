import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
    ReactDOM.render(<div className="marker" onClick={onPinHighlight} />, el);
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

  const clearHighlights = () => {
    // TODO How to handle click highlighting... not an elegant solution when using HTML markers.
    // State is kept in the mapbox GL, so it's still an option....
  };

  const onPinHighlight = (e) => {
    e.currentTarget.classList.toggle('highlighted-marker');
    e.currentTarget.classList.toggle('marker');
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
    <StyledMap className="map-wrapper">
      <div className="map-container" ref={mapRef} />
    </StyledMap>
  );
};

const StyledMap = styled.div`
  flex: 1;
  position: relative;
  width: 400px;
  height: 65vh;

  .map-container {
    height: 65vh;
  }

  .highlighted-marker {
  }
`;

export default Map;
