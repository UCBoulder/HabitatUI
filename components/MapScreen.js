import React from "react";
import MapPage from "../Pages/MapPage";
import { SwitchPageButton } from "./SwitchPageButton";
import LocationButton from "./LocationButton";
import { handleGetLocation } from "../utils/HelperFunctions";
import { View, StyleSheet } from "react-native";
import { makeObservation } from "../utils/HelperFunctions";

export function MapScreen(props) {

  return (
    <View style={styles.MapScreen}>
      <MapPage userLocation={props.userLocation} />
      <LocationButton
        onGetLocation={() => makeObservation(props.setUserLocation)}
      />
      <SwitchPageButton
        navigation={props.navigation}
        destinationScreen="Info"
        title="Info"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  MapScreen: {
    flex: 1,
  },
});