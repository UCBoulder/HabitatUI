import React from "react";
import MapPage from "../Pages/MapPage";
import { SwitchPageButton } from "./SwitchPageButton";
import MakeObservationButton from "./MakeObservationButton";
import { View, StyleSheet } from "react-native";
import { makeObservation } from "../utils/HelperFunctions";

// Function that makes the MapScreen with various props
export function MapScreen(props) {

  return (
    <View style={styles.MapScreen}>
      <MapPage userLocation={props.userLocation} />
      <MakeObservationButton
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