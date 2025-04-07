'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getAssetPath } from '../utils/paths';

// Dynamic import Google Maps components to prevent client-side errors
const GoogleMapModule = dynamic(
  () => import('@react-google-maps/api').then(mod => ({ 
    default: mod.GoogleMap 
  })),
  { ssr: false }
);

const LoadScriptModule = dynamic(
  () => import('@react-google-maps/api').then(mod => ({ 
    default: mod.LoadScript 
  })),
  { ssr: false }
);

const MarkerModule = dynamic(
  () => import('@react-google-maps/api').then(mod => ({ 
    default: mod.Marker 
  })),
  { ssr: false }
);

const InfoWindowModule = dynamic(
  () => import('@react-google-maps/api').then(mod => ({ 
    default: mod.InfoWindow 
  })),
  { ssr: false }
);

// Thông tin cửa hàng Tho Giò
const storeLocations = [
  {
    id: 1,
    name: 'Tho Giò - Chi Nhánh 1',
    address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    phone: '0987654321',
    position: { lat: 10.7758, lng: 106.7029 }, // Tọa độ TP.HCM
    hours: '08:00 - 22:00',
  },
  {
    id: 2,
    name: 'Tho Giò - Chi Nhánh 2',
    address: '456 Lê Văn B, Quận 2, TP.HCM',
    phone: '0987654322',
    position: { lat: 10.7868, lng: 106.7329 }, // Tọa độ hơi khác một chút
    hours: '08:00 - 22:00',
  },
];

// Khung bản đồ
const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

// Tọa độ trung tâm ban đầu của bản đồ
const center = {
  lat: 10.7813,
  lng: 106.7179, // Điểm giữa 2 cửa hàng
};

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyCuA8i_AJZIy7LCoAjYPzWL4AeRiNSw3hE"; // Demo key, nên thay thế bằng key thật của bạn

export default function Map() {
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // Kiểm tra xem đang ở môi trường browser
    setIsBrowser(typeof window !== 'undefined');
    
    // Thêm độ trễ trước khi hiển thị bản đồ để tránh vấn đề bố cục
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Xử lý lỗi tải bản đồ
  const handleLoadError = () => {
    console.error('Error loading Google Maps');
    setLoadError(true);
  };

  // Xử lý khi bản đồ tải thành công
  const handleMapLoad = () => {
    console.log('Google Maps loaded successfully');
  };

  // Fallback UI - hiển thị khi không thể tải Google Maps hoặc ở server-side
  const FallbackUI = () => (
    <div className="w-full min-h-[500px] flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 className="font-bold text-red-700 mb-4 text-center text-xl">Các Cửa Hàng Tho Giò</h3>
        
        {storeLocations.map(store => (
          <div key={store.id} className="mb-4 p-4 border-b border-gray-200 last:border-b-0">
            <h4 className="font-semibold text-lg">{store.name}</h4>
            <p className="text-sm my-1">{store.address}</p>
            <p className="text-sm">SĐT: {store.phone}</p>
            <p className="text-sm">Giờ mở cửa: {store.hours}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Nếu có lỗi khi tải Google Maps hoặc không phải browser, hiển thị giao diện dự phòng
  if (loadError || !isBrowser) {
    return <FallbackUI />;
  }

  // Nếu đang tải bản đồ, hiển thị loading
  if (!mapLoaded) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Đang tải bản đồ...</p>
        </div>
      </div>
    );
  }

  // Sử dụng try-catch để bắt lỗi khi render Google Maps
  try {
    // Hiển thị bản đồ Google Maps
    return (
      <div className="w-full rounded-lg overflow-hidden shadow-md">
        <LoadScriptModule
          id="google-map-script"
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          onError={handleLoadError}
          onLoad={handleMapLoad}
        >
          <GoogleMapModule
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
            }}
          >
            {storeLocations.map((store) => (
              <MarkerModule
                key={store.id}
                // @ts-ignore - TS error with dynamic imports
                position={store.position}
                onClick={() => setSelectedStore(store.id)}
                icon={{
                  url: getAssetPath('/images/map-marker.svg'),
                  // @ts-ignore - TS error with dynamic imports
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ))}

            {selectedStore !== null && (
              <InfoWindowModule
                // @ts-ignore - TS error with dynamic imports
                position={storeLocations.find(store => store.id === selectedStore)?.position}
                onCloseClick={() => setSelectedStore(null)}
              >
                <div className="p-3 max-w-xs">
                  <h3 className="font-bold text-red-700 mb-2">
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
              </InfoWindowModule>
            )}
          </GoogleMapModule>
        </LoadScriptModule>
      </div>
    );
  } catch (error) {
    console.error('Error rendering Google Maps:', error);
    return <FallbackUI />;
  }
}