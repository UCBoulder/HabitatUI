import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { getLocationPins } from "../utils/APICalls";
import { Pin } from "../components/Pin";

const MapPage = ({ userLocation }) => {
  const [apiCoordinates, setApiCoordinates] = useState([]);

  useEffect(() => {
    // fetch all of the pins from the api when the component loads
    const fetchPins = async () => {
      try {
        const coordinates = await getLocationPins();
        coordinates && setApiCoordinates(coordinates)
      } catch (error) {
        console.error("Error fetching API data: ", error);
      }
    };

    fetchPins();
  }, []);

  return (
    // set default map location to be Gunnison
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
            title="Your observation"
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

            pinColor = {Pin(coordinate.verification)}
            title={`Observation ${index + 1}`}
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

export default MapPage;
