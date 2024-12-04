import { FC } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { TourLocations } from 'types/tourTypes';
import 'leaflet/dist/leaflet.css';
import { Gps01Icon } from 'hugeicons-react';
import Leaflet from 'leaflet';

const customMarker = Leaflet.icon({
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  iconUrl: '/src/assets/svg/Location.svg',
});

const ResetMapButton: FC<{
  initialCenter: [number, number];
  initialZoom: number;
}> = ({ initialCenter, initialZoom }) => {
  const map = useMap();

  const resetMap = (): void => {
    map.setView(initialCenter, initialZoom);
  };

  return (
    <button
      onClick={resetMap}
      className="absolute right-5 top-3 z-[1000] cursor-pointer rounded-full border
border-none bg-backgroundLight p-2 text-gray-800 hover:bg-slate-200"
    >
      <Gps01Icon />
    </button>
  );
};

const TourMap: FC<{ locations: TourLocations[] }> = ({ locations }) => {
  const initialZoom = 11;

  return (
    <div>
      <MapContainer
        center={[locations[0].coordinates[0], locations[0].coordinates[1]]}
        zoom={initialZoom}
        scrollWheelZoom={false}
        className="z-10 mt-6 h-96 w-full rounded-lg"
      >
        <TileLayer
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          attribution="&copy; OpenStreetMap"
        />
        {locations.map((location) => (
          <Marker
            key={location._id}
            position={[location.coordinates[0], location.coordinates[1]]}
            icon={customMarker}
          />
        ))}
        <ResetMapButton
          initialCenter={[
            locations[0].coordinates[0],
            locations[0].coordinates[1],
          ]}
          initialZoom={initialZoom}
        />
      </MapContainer>
    </div>
  );
};

export default TourMap;
