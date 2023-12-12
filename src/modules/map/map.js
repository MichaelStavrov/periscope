import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { MapContainer, ImageOverlay, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';
import Header from '../header/header';
import { pages } from '../../data/pages.js';


const MapMarker = withRouter(({history, page, onVisibleDescription}) => {
  const smallIcons = {
    basicIconSize: [40, 50],
    hoveredIconSize: [58, 58],
    hoveredIconShadowSize: [78, 100],
    hoveredIconShadowAnchor: [39, 39],
    shadowAnchor: [40, 77],
    iconAnchor: [30, 67],
    className: 'leaflet-hovered-icon_small'
  }
  const largeIcons = {
    basicIconSize: [80, 100],
    hoveredIconSize: [135, 135],
    hoveredIconShadowSize: [155, 200],
    hoveredIconShadowAnchor: [77, 77],
    shadowAnchor: [80, 147],
    iconAnchor: [70, 137],
    className: 'leaflet-hovered-icon_large'
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
      onVisibleDescription(zoom < 8)
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
    shadowAnchor: iconSizes.shadowAnchor,
    iconAnchor: iconSizes.iconAnchor,
    className: iconSizes.className
  });

  return <Marker
    position={page.coordinates}
    eventHandlers={{
      mouseover: (e) => {
        setIsHovered(true)
      },
      mouseout: () => {
        setIsHovered(false)
      },
      click: () => {
        history.push(`/page/${page.id}`)
      }
    }}
    icon={
      isHovered ? hoveredIcon : basicIcon
    }
  />
})

function DraggingOnlyWithinBounds() {
  const map = useMap();
  const maximumBounds = [[0, 0], [8, 12.8]];
  map.on('drag', function() {
      map.panInsideBounds(maximumBounds, { animate: false });
  });
  return null;
}

function Map() {
    const [isVisibleDescription, setIsVisibleDescription] = useState(true);

  return (
    <div className='map'>
      <Header isMenuVisible />
      <div className='map__description-wrapper'>
        <p
          style={
            isVisibleDescription
              ? {height: 'auto', visibility: 'visible' }
              : {height: 0, margin: 0, visibility: 'hidden'}
          }
          className='map__description'
        >
          «Архитектурный перископ» — интерактивная карта исчезающего архитектурного наследия России. Социальная сеть «Одноклассники» и фонд «Внимание» рассказывают о четырнадцати малоизвестных памятниках архитектуры, которым нужна помощь.
        </p>

        <img style={isVisibleDescription ? {} : {top: -40}} className='map__romb' src='./images/global/romb.svg' alt='arrow' />
      </div>
      <div className='map__container'>
      <MapContainer center={[4.5, 2.7]} zoom={7.5} minZoom={7.5} maxZoom={9} maxBounds={[
        [0, 0],
        [8, 12.8],
      ]} scrollWheelZoom={true} zoomSnap={0.5} zoomDelta={0.5} wheelPxPerZoomLevel={200}>
        <ImageOverlay
          bounds={[
            [0, 0],
            [8, 12.8],
          ]}
          url='./images/global/map.png'
          zIndex={100000}
        />
        { pages.map((page) => (
          <MapMarker
            page={page}
            key={page.id}
            onVisibleDescription={(isVisibleDescription) => setIsVisibleDescription(isVisibleDescription)} />
          ))
        }
        <DraggingOnlyWithinBounds />
      </MapContainer>
      </div>
    </div>
  )
}

export default Map;
