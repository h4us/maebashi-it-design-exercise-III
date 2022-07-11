import { Suspense, useEffect, useRef, useState } from 'react';

import {
  MapContainer, TileLayer, Marker, CircleMarker,
  useMapEvents
} from 'react-leaflet';
import L from 'leaflet';

import useStore from './store';

// TODO:
const svgIcon = (custom = {}) => {
  const { fillColor = '#CC2200', label = '' } = custom;

  return L.divIcon({
    className: 'marker-no-bd',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="${fillColor}" d="M12 13.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path><path fill="${fillColor}" fill-rule="evenodd" d="M19.071 3.429C15.166-.476 8.834-.476 4.93 3.429c-3.905 3.905-3.905 10.237 0 14.142l.028.028 5.375 5.375a2.359 2.359 0 003.336 0l5.403-5.403c3.905-3.905 3.905-10.237 0-14.142zM5.99 4.489A8.5 8.5 0 0118.01 16.51l-5.403 5.404a.859.859 0 01-1.214 0l-5.378-5.378-.002-.002-.023-.024a8.5 8.5 0 010-12.02z"></path></svg>`,
    iconSize: [50, 50],
    iconAnchor: [25, 37]
  });
};

const MapEventEffector = (props) => {
  const {
    zoomendCb = () => { },
    moveendCb = () => { },
    dbclickCb = () => { }
  } = props;

  const map = useMapEvents({
    dblclick(e) {
      dbclickCb(e, map);
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
  const { markers = [] } = props;

  const [currentLocation, setCurrentLocation] = useState({ lat: 35.67134149999999, lng: 139.7646748 });
  const [currentMapCenter, setCurrentMapCenter] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(null);
  const [lastMapCenter, setLastMapCenter] = useState({ lat: 35.67134149999999, lng: 139.7646748 });
  const [lastZoom, setLastZoom] = useState(10);

  // tester
  const [useVirtual, setUseVirtual] = useState(false);
  const [currentVPin, setCurrentVPin] = useState({ lat: 35.67134149999999, lng: 139.7646748 });

  const mapRef = useRef();
  const timerRef = useRef();
  const mapBoundary = useRef(
    // L.latLngBounds(
    //   L.latLng(35.71460112595024, 139.7857475280762),
    //   L.latLng(35.62158189955968, 139.72137451171878)
    // )
    null
  );

  const now = useStore((s) => s.now);
  const setNearestMarker= useStore((s) => s.setNearestMarker);
  const popAnimationView= useStore((s) => s.popAnimationView);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(currentLocation);
    }

    setUseVirtual(false);
  }, [now]);

  //
  const cmpDist = (markers, current) => {
    let d_nearest = 1000;
    let p_nearest = false;

    for (let i = 0; i < markers.length; i++) {
      const l = L.latLng(markers[i].location);
      const l2 = L.latLng(current);
      const d = l.distanceTo(l2);

      if (d < d_nearest) {
        d_nearest = d;
        p_nearest = markers[i];
      }
    }

    return [p_nearest, d_nearest];
  };

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef);
    timerRef.current = false;

    if (useVirtual) {
      timerRef.current = setInterval(() => {
        const [p, d] = cmpDist(markers, currentVPin);
        //
        console.log('virtual', p, d);
        if (d < 200) {
          setNearestMarker(p);
          popAnimationView();
        }
      }, 3000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [useVirtual]);

  useEffect(() => {
    const [p, d] = cmpDist(markers, currentLocation);
    //
    console.log('current', p, d);

    if (d < 200) {
      setNearestMarker(p);
      popAnimationView();
    }
  }, [currentLocation]);


  useEffect(() => {
    navigator.geolocation.watchPosition((pos) => {
      const cl = L.latLng(pos.coords.latitude, pos.coords.longitude);

      if (mapBoundary.current == null || mapBoundary.current.contains(cl)) {
        if (timerRef.current !== false) {
          setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLastMapCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        }
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
        ref={mapRef}
        center={lastMapCenter}
        zoom={lastZoom}
        zoomControl={false}
        doubleClickZoom={false}
        zoomOffset={-1}
        zoomSnap={0.25}
        zoomDelta={0.25}
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
          dbclickCb={(e, map) => { setCurrentVPin(e.latlng);  setUseVirtual(true); }} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          markers.map((el, i) =>
            <Marker
            key={`marker-${i}`}
              /* eventHandlers={{ click: () => {} }} */
              icon={svgIcon({ label: `${i + 1}.` })}
              position={[el.location.lat, el.location.lng]}>
            </Marker>
          )
        }

        {
          useVirtual && (
            <CircleMarker
              className="virtual-beacon"
              weight={2}
              fillOpacity={0.4}
              center={currentVPin}
              radius={25}
              zIndexOffset={1001}
            />
          )
        }
        {
          !useVirtual && (
            <CircleMarker
              className="app-beacon"
              weight={2}
              fillOpacity={0.4}
              center={currentLocation}
              radius={25}
              zIndexOffset={1001}
            />
          )
        }

      </MapContainer>
    </Suspense>
  );
};

export default LeafletView;
