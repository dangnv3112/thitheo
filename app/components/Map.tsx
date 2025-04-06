'use client';

import { useState } from 'react';

// Simple map placeholder component to avoid the Google Maps API error
export default function Map() {
  // Vì chúng ta chưa có API key Google Maps, tạm thời hiển thị UI tĩnh
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h3 className="font-bold text-red-700 mb-2 text-center">Các Cửa Hàng Tho Giò</h3>
        
        <div className="mb-4 p-3 border-b border-gray-200">
          <h4 className="font-semibold">Tho Giò - Chi Nhánh 1</h4>
          <p className="text-sm my-1">123 Nguyễn Văn A, Quận 1, TP.HCM</p>
          <p className="text-sm">SĐT: 0987 654 321</p>
        </div>
        
        <div className="p-3">
          <h4 className="font-semibold">Tho Giò - Chi Nhánh 2</h4>
          <p className="text-sm my-1">456 Lê Văn B, Quận 2, TP.HCM</p>
          <p className="text-sm">SĐT: 0987 654 322</p>
        </div>
        
        <div className="mt-4 p-3 bg-red-50 rounded text-center text-sm text-red-700">
          <p>Bản đồ chi tiết sẽ được hiển thị khi có Google Maps API Key</p>
        </div>
      </div>
    </div>
  );
}

// Dữ liệu cửa hàng mẫu
const storeLocations = [
  {
    id: 1,
    name: 'Tho Giò - Chi Nhánh 1',
    address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    phone: '0987654321',
    position: { lat: 10.7758, lng: 106.7029 },
    hours: '08:00 - 22:00',
  },
  {
    id: 2,
    name: 'Tho Giò - Chi Nhánh 2',
    address: '456 Lê Văn B, Quận 2, TP.HCM',
    phone: '0987654322',
    position: { lat: 10.7868, lng: 106.7329 },
    hours: '08:00 - 22:00',
  },
];

/* 
// Original Google Maps implementation - Uncomment and configure with your API key when ready
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Store location details
const storeLocations = [
  {
    id: 1,
    name: 'Tho Giò - Chi Nhánh 1',
    address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    phone: '0987654321',
    position: { lat: 10.7758, lng: 106.7029 }, // Example coordinates for Ho Chi Minh City
    hours: '08:00 - 22:00',
  },
  {
    id: 2,
    name: 'Tho Giò - Chi Nhánh 2',
    address: '456 Lê Văn B, Quận 2, TP.HCM',
    phone: '0987654322',
    position: { lat: 10.7868, lng: 106.7329 }, // Slightly different coordinates
    hours: '08:00 - 22:00',
  },
];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 10.7758,
  lng: 106.7029,
};

export default function Map() {
  const [selectedStore, setSelectedStore] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Add a delay before showing the map to prevent layout issues
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {mapLoaded && (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
          >
            {storeLocations.map((store) => (
              <Marker
                key={store.id}
                position={store.position}
                onClick={() => setSelectedStore(store.id)}
                icon={{
                  url: '/images/map-marker.svg',
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ))}

            {selectedStore && (
              <InfoWindow
                position={storeLocations.find(store => store.id === selectedStore)?.position}
                onCloseClick={() => setSelectedStore(null)}
              >
                <div className="p-2 max-w-xs">
                  <h3 className="font-bold text-red-700 mb-1">
                    {storeLocations.find(store => store.id === selectedStore)?.name}
                  </h3>
                  <p className="text-sm mb-1">
                    {storeLocations.find(store => store.id === selectedStore)?.address}
                  </p>
                  <p className="text-sm mb-1">
                    SĐT: {storeLocations.find(store => store.id === selectedStore)?.phone}
                  </p>
                  <p className="text-sm">
                    Giờ mở cửa: {storeLocations.find(store => store.id === selectedStore)?.hours}
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      )}

      {!mapLoaded && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">Đang tải bản đồ...</p>
        </div>
      )}
    </>
  );
}
*/