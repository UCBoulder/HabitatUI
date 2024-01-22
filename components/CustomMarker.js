import React from "react";
import { Marker, Callout } from "react-native-maps";
import { ColorCode } from "./ColorCode";
import { FormatDate } from "../utils/FormatDate";
import { View, Text, StyleSheet } from "react-native";

const CustomMarker = ({ data }) => {
    return (
        <Marker coordinate={{
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
        }}
            pinColor={ColorCode(data.VerificationRating)}>
            <Callout>
                <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>
                        {`Observation made on: ${FormatDate(data.timestamp)}\n`}
                        {`Latitude: ${data.coords.latitude}\nLongitude: ${data.coords.longitude}\n`}
                        {`Accuracy: ${data.coords.accuracy.toFixed(3)}\n`}
                        {data.Notes}
                        {`\n`}
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
