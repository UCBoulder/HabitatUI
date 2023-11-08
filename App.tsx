import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { requestLocationPermission, handleGetLocation } from "./utils/HelperFunctions";

import MapPage from "./Pages/MapPage";
import LocationButton from "./components/LocationButton";
import AppNavigator from "./Navigation/AppNavigator";

export default function App() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // ask for location permissions when the app first loads
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapPage userLocation={userLocation} />
      <LocationButton
        onGetLocation={() => handleGetLocation(setUserLocation)}
      />    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
