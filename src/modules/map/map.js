import React from 'react';
import { MapContainer, TileLayer, ImageOverlay, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';
import Header from '../header/header';


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
        { pages.map((page, index) => {
          return (
            <Marker position={page.coordinates} icon={L.icon({ iconUrl: './images/global/marker.svg', iconSize: [79, 102], })}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )
        })
        }
      </MapContainer>
      </div>
    </div>
  )
}

export default Map;
