import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { MapContainer, ImageOverlay, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';
import Header from '../header/header';



const MapMarker = withRouter(({history, page}) => {
  const smallIcons = {
    basicIconSize: [40, 50],
    hoveredIconSize: [58, 58],
    hoveredIconShadowSize: [78, 100],
    hoveredIconShadowAnchor: [39, 39]
  }
  const largeIcons = {
    basicIconSize: [80, 100],
    hoveredIconSize: [135, 135],
    hoveredIconShadowSize: [155, 200],
    hoveredIconShadowAnchor: [77, 77]
  }
  const [isHovered, setIsHovered] = useState(false);
  const [iconSizes, setIconSizes] = useState(smallIcons);
  const map = useMapEvents({
    zoom: () => {
      const zoom = map.getZoom();
      setIconSizes(zoom > 8.5
        ? largeIcons
        : smallIcons
      )
    }
  })

  const basicIcon = L.icon({
    iconUrl: './images/global/marker.png',
    shadowUrl: './images/global/marker.png',
    iconSize: iconSizes.basicIconSize,
    shadowSize: iconSizes.basicIconSize
  });

  const hoveredIcon = L.icon({
    iconUrl: `./images/pages/${page.image}-small.png`,
    shadowUrl: './images/global/marker.png',
    iconSize: iconSizes.hoveredIconSize,
    shadowSize: iconSizes.hoveredIconShadowSize,
    shadowAnchor: iconSizes.hoveredIconShadowAnchor
  });

  return <Marker
    position={page.coordinates}
    eventHandlers={{
      mouseover: () => setIsHovered(true),
      mouseout: () => setIsHovered(false),
      click: () => {
        history.push(`/page/${page.id}`)
      }
    }}
    icon={
      isHovered ? hoveredIcon : basicIcon
    }
  />
})

function Map() {
  const { pages } = require('../../data.json');
  return (
    <div className='map'>
      <Header />
      <div className='map__container'>
      <MapContainer center={[0.4, 0.4]} zoom={7} minZoom={7} maxZoom={9} maxBounds={[
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
