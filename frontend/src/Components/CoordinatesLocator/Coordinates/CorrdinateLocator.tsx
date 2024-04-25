"use client"
import React, {useState} from 'react';
import axios from 'axios';
import styles from '../../../app/page.module.css';

interface Coordinates {
    lat: number;
    lng: number;
}

const CoordinateFinder: React.FC = () => {
    const [postcode, setPostcode] = useState('');
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${postcode}&key=96aaeacb4e9549e5825e2856fe6f0bdc`);

        if (response.data.results[0]) {
            setCoordinates({
                lat: response.data.results[0].geometry.lat,
                lng: response.data.results[0].geometry.lng
            });
        } else {
            alert('Unable to find coordinates for this postcode.');
        }

        setIsLoading(false);
    };

    return (
        <div className={styles.containerCoordinate}>
            <div className={styles.mainheadingHome}>Coordinate Locator</div>
            <div className={styles.heading}>Enter postcode</div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="Enter Postcode"
                    className={`${styles.input} ${styles['input-green-text']}`}
                />
                <button type="submit" className={styles.buttoncorrinates}>Find Coordinates</button>
            </form>
            {coordinates && (
                <p>Coordinates: {coordinates.lat}, {coordinates.lng}</p>
            )}
        </div>
    );
};

export default CoordinateFinder;