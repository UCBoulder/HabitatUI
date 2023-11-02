import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const Map = ({ userLocation }) => (
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
      {userLocation && (
        <Marker
          coordinate={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          }}
        />
      )}
    </MapView>
  </View>
);

const styles = StyleSheet.create({
  mapContainer: {
    minHeight: '100%'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
