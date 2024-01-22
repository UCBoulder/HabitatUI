import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { getLocationPins } from "../utils/APICalls";
import CustomMarker from "../components/CustomMarker";

const MapPage = ({ userLocation }) => {
  const [apiCoordinates, setApiCoordinates] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const coordinates = await getLocationPins();
        coordinates && setApiCoordinates(coordinates);
      } catch (error) {
        console.error("Error fetching API data: ", error);
      }
    };

    fetchPins();
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="hybrid"
        initialRegion={{
          latitude: 38.5449,
          longitude: -106.9329,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && (
          <CustomMarker
            data={userLocation}
          />
        )}

        {apiCoordinates.map((coordinate, index) => (
          <CustomMarker
            key={index}
            data={coordinate}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapPage;
