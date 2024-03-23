import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Icon, marker} from 'leaflet';
import './styles/Map.css'
import icon from './assets/pin-logo.png'
import buildingIcon from './assets/building-pin2.png'
import { Link } from 'react-router-dom'
import axios from 'axios';

const iconScale=0.03;

const customIcon = new Icon({
    iconUrl: buildingIcon, // URL to your custom icon
    iconSize: [1200*iconScale, 1600*iconScale], // Size of the icon
    iconAnchor: [600 * iconScale, 1600 * iconScale] // Anchor point at the center-bottom
});

const userIcon = new Icon({
    iconUrl: icon,
    iconSize: [64,64],
    iconAnchor: [32, 64]
})

const Map = () => {

    const [userLocation, setUserLocation] = useState(null);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
          });
        }

        const getMarkerData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/data');
                console.log(res.data.data);
                const data = res.data.data;
                console.log(data);
                setPositions(data);
            } catch(error) {
                console.log(error);
            }
        }
        getMarkerData();
      }, []);

  return (
    <div>
        <MapContainer center={[29.645, -82.35]} zoom={15} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
            {positions && positions.map((object) => (
                    <Marker position={[object.latitude, object.longitude]} icon={customIcon}>
                        <Popup>
                            {object.name}
                            <br/>
                            {object.latitude}, {object.latitude}
                            <br />
                            <Link to={'/moreinfo'}>Building Info ...</Link>
                        </Popup>
                    </Marker>
                ))};
                {userLocation && (
                        <Marker position={userLocation} icon={userIcon}>
                          <Popup>You are here</Popup>
                        </Marker>
                    )};
        </MapContainer>
    </div>
  );
};

export default Map;