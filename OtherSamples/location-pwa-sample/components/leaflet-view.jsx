import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState } from 'react';

import {
  MapContainer, TileLayer, Marker, CircleMarker, Polyline,
  useMapEvents
} from 'react-leaflet';

import L from 'leaflet';

const MapEventEffector = (props) => {
  const {
    zoomendCb = () => { },
    moveendCb = () => { },
    dbclickCb = () => { }
  } = props;

  const map = useMapEvents({
    dblclick(e) {
      dbclickCb(map);
    },

    zoomend(e) {
      zoomendCb(map);
    },

    moveend(e) {
      moveendCb(map);
    }
  });

  return null;
};

const LeafletView = (props) => {
  // const [currentLocation, setCurrentLocation] = useState(lastLocation);
  // const [currentMapCenter, setCurrentMapCenter] = useState(lastMapCenter)
  const [currentLocation, setCurrentLocation] = useState({ lat: 35.67134149999999, lng: 139.7646748 });
  const [currentMapCenter, setCurrentMapCenter] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(null);

  //
  const [lastMapCenter, setLastMapCenter] = useState({ lat: 35.67134149999999, lng: 139.7646748 });
  const [lastZoom, setLastZoom] = useState(10);

  const mapBoundary = useRef(
    // L.latLngBounds(
    //   L.latLng(35.71460112595024, 139.7857475280762),
    //   L.latLng(35.62158189955968, 139.72137451171878)
    // )
    null
  );

  useEffect(() => {
    // const params = queryString.parse(location.search);
    // const { debugBoundary = false } = params;
    // if(debugBoundary) {
    //   mapBoundary.current = null;
    // }

    navigator.geolocation.watchPosition((pos) => {
      const cl = L.latLng(pos.coords.latitude, pos.coords.longitude);
      if (mapBoundary.current == null || mapBoundary.current.contains(cl)) {
        setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLastMapCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      }
    }, (err) => {
      // TODO:
      console.warn('ERROR(' + err.code + '): ' + err.message);
      // --
    }, {
      timeout: 6000
    });
  }, []);

  return (
    <Suspense fallback={null}>
      <MapContainer
        center={lastMapCenter}
        zoom={lastZoom}
        zoomControl={false}
        doubleClickZoom={false}
        zoomOffset={-1}
        zoomSnap={0.25}
        zoomDelta={0.25}
        /* whenCreated={(map) => map.setMaxBounds(mapBoundary.current)} */
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 98,
          background: '#e0e0e0'
        }}>

        <MapEventEffector
          zoomendCb={(map) => setCurrentZoom(map.getZoom())}
          moveendCb={(map) => setCurrentMapCenter(map.getCenter())}
          dbclickCb={(map) => map.setView(currentLocation)} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* TODO: */}
        {/* { */}
        {/*   defaultMarkers.map((el, i) => */}
        {/*     <Marker */}
        {/*       eventHandlers={{ */}
        {/*         click: () => history.push(`/ar/?scene=${el.name}`) */}
        {/*       }} */}
        {/*       icon={svgIcon({ label: `${i + 1}.` })} */}
        {/*       position={[el.location.lat, el.location.lng]}> */}
        {/*     </Marker> */}
        {/*   ) */}
        {/* } */}

        {/* { */}
        {/*   walkingPaths.map((el) => */}
        {/*     <Polyline */}
        {/*       pathOptions={ */}
        {/*         el.dash ? { color: el.color, dashArray: '6' } : { color: el.color } */}
        {/*       } */}
        {/*       positions={el.paths} /> */}
        {/*   ) */}
        {/* } */}

        <CircleMarker
          className="app-beacon"
          weight={2}
          fillOpacity={0.4}
          center={currentLocation}
          radius={25}
          zIndexOffset={1001}
        />

      </MapContainer>
    </Suspense>
  );
};

export default LeafletView;

// export default dynamic(
//   () => Promise.resolve(LeadletView),
//   { ssr: false }
// );
