"use client"
import React, {useState} from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';
import styles from '../../../app/page.module.css'

interface Coordinates {
    lat: number;
    lng: number;
}

interface MapComponentProps {
    selectedCoordinates: Coordinates | null;
    setSelectedCoordinates: React.Dispatch<React.SetStateAction<Coordinates | null>>;
}

const MapComponent: React.FC<MapComponentProps> = ({selectedCoordinates, setSelectedCoordinates}) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyDe2ZOCqYCYERPI2DEbS5z6ZQw8kC2F6q4",
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setSelectedCoordinates({
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            });
        }
    };

    const handleMapLoad = (map: google.maps.Map) => {
        setMap(map);
    };

    const handleMapResize = () => {
        if (map && selectedCoordinates) {
            map.panTo(selectedCoordinates);
        }
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div className={styles.map}>
            <GoogleMap
                mapContainerStyle={{width: '500px', height: '500px'}}
                center={selectedCoordinates || {lat: 0, lng: 0}}
                zoom={2}
                onClick={handleMapClick}
                onLoad={handleMapLoad}
                onResize={handleMapResize}
            >
                {selectedCoordinates && <Marker position={selectedCoordinates}/>}
            </GoogleMap>
            {selectedCoordinates && (
                <p className={styles.mapselected}>Selected
                    Coordinates: {selectedCoordinates.lat}, {selectedCoordinates.lng}</p>
            )}
        </div>
    );
};

export default MapComponent;