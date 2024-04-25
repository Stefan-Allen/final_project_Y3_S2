import React, {useState, useEffect} from 'react';
import {GoogleMap, Marker, InfoWindow, useLoadScript} from '@react-google-maps/api';
import styles from '../../../app/page.module.css'

interface Coordinates {
    lat: number;
    lng: number;
}

const MapComponent: React.FC = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyDe2ZOCqYCYERPI2DEbS5z6ZQw8kC2F6q4",
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [pollutionData, setPollutionData] = useState<any[]>([]); // Add state for pollution data
    const [selectedMarker, setSelectedMarker] = useState<any | null>(null); // Add state for selected marker

    const handleMapLoad = (map: google.maps.Map) => {
        setMap(map);
    };

    useEffect(() => {
        // Fetch pollution data when component mounts and every 5 minutes
        const fetchPollutionData = async () => {
            const response = await fetch('https://api.openaq.org/v1/latest?country=GB', {
                headers: {
                    'Authorization': `Bearer ${'d03478471844a8950a8b337c9f98f648bf45ae6f'}` // Replace with your API key
                }
            });
            const data = await response.json();
            setPollutionData(data.results);
        };

        fetchPollutionData();
        const intervalId = setInterval(fetchPollutionData, 5 * 60 * 1000);

        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    if (loadError) {
        return <div className={styles.maploading}>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div className={styles.maploading}>Loading maps</div>;
    }

    return (
        <div className={styles.map}>
            <GoogleMap
                mapContainerStyle={{width: '500px', height: '500px'}}
                center={{lat: 54.68707254062863, lng: -3.503926035116276}}
                zoom={5}
                onLoad={handleMapLoad}
            >
                {pollutionData.map((data, index) => (
                    <Marker
                        key={index}
                        position={{lat: data.coordinates.latitude, lng: data.coordinates.longitude}}
                        onClick={() => {
                            console.log(data); // Log the data object
                            setSelectedMarker(data);
                        }}
                        icon={{
                            url: '/pin.png', // URL of the image
                            scaledSize: new google.maps.Size(25, 20), // size of the image
                            origin: new google.maps.Point(0, 0), // origin of the image
                            anchor: new google.maps.Point(25, 25) // anchor point of the image
                        }}
                    />
                ))}
                {selectedMarker && (
                    <InfoWindow
                        position={{lat: selectedMarker.coordinates.latitude, lng: selectedMarker.coordinates.longitude}}
                        onCloseClick={() => setSelectedMarker(null)}
                    >
                        <div>
                            <h2 className={styles.RealtimePollutionData}>{`Location: ${selectedMarker.location}`}</h2>
                            <p className={styles.RealtimePollutionData}>{`Pollution Level: ${selectedMarker.measurements[0].value} ${selectedMarker.measurements[0].unit}`}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
};

export default MapComponent;