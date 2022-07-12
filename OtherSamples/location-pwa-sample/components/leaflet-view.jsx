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
  const locationRef = useRef();

  const now = useStore((s) => s.now);
  const setNearestMarker = useStore((s) => s.setNearestMarker);
  const popAnimationView = useStore((s) => s.popAnimationView);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(currentLocation);
    }

    setUseVirtual(false);
  }, [now]);

  //
  const cmpDist = (markers, current) => {
    let d_nearest = 1000;
    let p_nearest = null;

    for (let i = 0; i < markers.length; i++) {
      const l = L.latLng(markers[i].location);
      const l2 = current;
      const d = l.distanceTo(l2);

      if (d < d_nearest) {
        d_nearest = d;
        p_nearest = markers[i];
      }
    }

    return [p_nearest, d_nearest];
  };

  const zeroDist = (l1, l2) => {
    return l1.distanceTo(l2) == 0;
  };

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef);
    timerRef.current = false;

    if (useVirtual) {
      timerRef.current = setInterval(() => {
        const [p, d] = cmpDist(markers, currentVPin);
        const ckZero = locationRef.current ? zeroDist(currentVPin, locationRef.current) : false;

        console.info('virtual', p, d);

        if (d < 200 && !ckZero) {
          setNearestMarker(p);
          locationRef.current = currentVPin;
          popAnimationView();
        }
      }, 2000);
   }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentVPin, useVirtual]);

  useEffect(() => {
    const [p, d] = cmpDist(markers, currentLocation);
    const ckZero = locationRef.current ? zeroDist(currentLocation, locationRef.current) : false;

    console.info('real', p, d);

    if (d < 200 && !ckZero) {
      setNearestMarker(p);
      popAnimationView();
    }
  }, [currentLocation]);

  useEffect(() => {
    navigator.geolocation.watchPosition((pos) => {
      if (timerRef.current !== false) {
        setCurrentLocation(L.latLng({ lat: pos.coords.latitude, lng: pos.coords.longitude }));
        setLastMapCenter(L.latLng({ lat: pos.coords.latitude, lng: pos.coords.longitude }));
      }
    }, (err) => {
      console.warn('ERROR(' + err.code + '): ' + err.message);
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
