import React from "react";
import { View, Button, StyleSheet } from "react-native";

const LocationButton = ({ onGetLocation }) => (
  <View style={styles.locationButton}>
    <Button title="Get user location" onPress={onGetLocation} />
  </View>
);

const styles = StyleSheet.create({
  locationButton: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default LocationButton;
