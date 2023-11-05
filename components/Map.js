import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";

const Map = ({ userLocation }) => {
  const [apiCoordinates, setApiCoordinates] = useState([]);

  useEffect(() => {
    // Define the function to fetch the location pins
    const getLocationPins = async () => {
      try {
        const locTestResponse = await axios.get("http://192.168.56.1:3000/locTest");
        setApiCoordinates(locTestResponse.data);
      } catch (error) {
        console.error("Error fetching API data: ", error);
      }
    };

    // Call the function to fetch location pins when the component mounts
    getLocationPins();
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: 38.5449,
          longitude: -106.9329,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && ( //place pin at users location when button is pressed
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
          />
        )}
        
        {apiCoordinates.map((coordinate, index) => (
          // Place all the pins that the api is sending 
          <Marker
            key={index}
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
            title={`Marker ${index + 1}`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    minHeight: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
