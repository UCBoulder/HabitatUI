import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { requestLocationPermission, handleGetLocation } from "./utils/HelperFunctions";

import Map from "./components/Map";
import LocationButton from "./components/LocationButton";

export default function App() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Map userLocation={userLocation} />
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
