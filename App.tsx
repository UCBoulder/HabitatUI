import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { request, PERMISSIONS } from "react-native-permissions";
import Geolocation, { GeoPosition } from "react-native-geolocation-service";
import axios from "axios";

export default function App() {
  // set state to initially be null
  const [userLocation, setUserLocation] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
      if (result === "granted") {
        console.log("Location permission granted");
      } else {
        console.log("Location permission denied");
      }
    } catch (error) {
      console.error("Error requesting location permission: ", error);
    }
  };

  // send the user location data from Geolocation.getCurrentPosition to backend
  const sendRequestToBackend = async (position: Geolocation.GeoPosition) => {
    try {
      const response = await axios.post("http://192.168.56.1:8080/APITEST", {
        position: position, // User location
      });
      console.log("Response from backend: ", response.data);
    } catch (error) {
      console.error("Error sending request to backend: ", error);
    }
  };

  // Helper for Get location button
  const handleGetLocation = () => {
    Geolocation.getCurrentPosition((position) => {
      setUserLocation(position);
      sendRequestToBackend(position);
    });
  };


  // Stuff that happens when the app is opened
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Example Map</Text>
      </View>

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

        <View style={styles.locationButton}>
          <Button title="Get user location" onPress={handleGetLocation} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  banner: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: "white",
    fontSize: 18,
  },
  mapContainer: {
    flex: 1,
  },
  locationButton: {
    position: "relative",
    height: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
});
