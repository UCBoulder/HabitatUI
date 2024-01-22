import React from "react";
import { Marker, Callout } from "react-native-maps";
import { ColorCode } from "./ColorCode";
import { formatDate } from "../utils/FormatDate";
import { View, Text, StyleSheet } from "react-native";

const CustomMarker = ({ coordinate, onPress, data }) => {
  return (
    <Marker coordinate={coordinate} pinColor={ColorCode(data.verification)} onPress={onPress}>
      <Callout>
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutText}>
            {`Observation made on: ${formatDate(data.timestamp)}\n`}
            {`Latitude: ${data.coords.latitude}\nLongitude: ${data.coords.longitude}\n`}
            {`Accuracy: ${data.coords.accuracy.toFixed(3)}\n`}
            {data.Notes}
          </Text>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    backgroundColor: "#fff",
  },
  calloutText: {
    fontSize: 14,
    color: "black",
  },
});

export default CustomMarker;
