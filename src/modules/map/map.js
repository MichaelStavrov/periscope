import React, {useState} from 'react';
import { MapContainer, ImageOverlay, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';
import Header from '../header/header';



function MapMarker ({page}) {
  const [isHovered, setIsHovered] = useState(false);
  const map = useMap();
  
  const zoom = map.getZoom();

  const basicIconSize = zoom < 10 ? [40, 50] : [79, 102]
  const basicIcon = L.icon({
    iconUrl: './images/global/marker.png',
    shadowUrl: './images/global/marker.png',
    iconSize: basicIconSize,
    shadowSize: basicIconSize
  });

  const hoveredIcon = L.icon({
    iconUrl: `./images/pages/${page.image}-small.png`,
    shadowUrl: './images/global/marker.png',
    iconSize: [135, 135],
    shadowSize: [155, 200],
    shadowAnchor: [77, 77]
  });

  return <Marker
    position={page.coordinates}
    eventHandlers={{
      mouseover: () => setIsHovered(true),
      mouseout: () => setIsHovered(false)
    }}
    icon={
      isHovered ? hoveredIcon : basicIcon
    }
  />
}

function Map() {
  const { pages } = require('../../data.json');
  return (
    <div className='map'>
      <Header />
      <div className='map__container'>
      <MapContainer center={[0.4, 0.4]} zoom={8} minZoom={7.5} maxZoom={9} maxBounds={[
        [0, 0],
        [8, 12.8],
      ]} scrollWheelZoom={true} zoomSnap={0.5} zoomDelta={0.5} wheelPxPerZoomLevel={200}>
        <ImageOverlay
          bounds={[
            [0, 0],
            [8, 12.8],
          ]}
          url='./images/global/map.jpg'
          zIndex={100000}
        />
        { pages.map((page, index) => <MapMarker page={page} key={page.id} />)
        }
      </MapContainer>
      </div>
    </div>
  )
}

export default Map;
