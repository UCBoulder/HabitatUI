import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { request, PERMISSIONS } from "react-native-permissions";
import axios from "axios";

export default function App() {
  useEffect(() => {
    // Request location permissions
    request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
      .then((result) => {
        if (result === "granted") {
          console.log("Location permission granted");
        } else {
          console.log("Location permission denied");
        }
      })
      .catch((error) => {
        console.error("Error requesting location permission: ", error);
      });
    
    // Send a POST request to backend
    axios
      .post("http://YOU_IP_ADDRESS:8080/APITEST", {
        message: "Hello world",
      })
      .then((response) => {
        console.log("Response from backend: ", response.data);
      })
      .catch((error) => {
        console.error("Error sending request to backend: ", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Example Map</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          // Specify coordinates for Gunnison, Colorado
          initialRegion={{
            latitude: 38.5449,
            longitude: -106.9329,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        />

        {/* Location button */}
        <View style={styles.locationButton}>
          <Button
            title="Get user location"
            onPress={() => Alert.alert('Pressed')} //change this to get cords
          />
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
    flex: 1,
    width: "100%",
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationButton: {
    position: 'relative',
    height: 1000, 
    alignItems: "center",
    justifyContent: "center",
  },
});
