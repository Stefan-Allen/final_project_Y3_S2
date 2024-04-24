"use client"
import React, {useState} from 'react';
import axios from 'axios';
import styles from '../../../app/page.module.css';

interface Coordinates {
    lat: number;
    lng: number;
}

interface CoordinateFinderProps {
    selectedCoordinates: Coordinates | null;
    setSelectedCoordinates: React.Dispatch<React.SetStateAction<Coordinates | null>>;
}

const CoordinateFinder: React.FC<CoordinateFinderProps> = ({selectedCoordinates, setSelectedCoordinates}) => {
    const [postcode, setPostcode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${postcode}&key=96aaeacb4e9549e5825e2856fe6f0bdc`);

        if (response.data.results[0]) {
            setSelectedCoordinates({
                lat: response.data.results[0].geometry.lat,
                lng: response.data.results[0].geometry.lng
            });
        } else {
            alert('Unable to find coordinates for this postcode.');
        }

        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainheading}>Coordinate Locator</div>
            <div className={styles.heading}>Enter postcode or click on map</div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="Enter Coordinates"
                    className={styles.input}
                />
                <button type="submit" className={styles.buttoncorrinates}>Find Coordinates</button>
            </form>

        </div>
    );
};

export default CoordinateFinder;