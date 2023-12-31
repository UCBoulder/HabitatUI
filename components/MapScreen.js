import React from "react";
import MapPage from "../pages/MapPage";
import { SwitchPageButton } from "./SwitchPageButton";
import MakeObservationButton from "./MakeObservationButton";
import { View, StyleSheet } from "react-native";

// Function that makes the MapScreen with various props
export function MapScreen(props) {

  return (
    <View style={styles.MapScreen}>
      <MapPage userLocation={props.userLocation} />
      <MakeObservationButton />
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