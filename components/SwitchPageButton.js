import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

// Button that can be used to switch pages easily. Only being used as the "info" button on the map page
export const SwitchPageButton = ({ navigation, destinationScreen, title }) => {
    return (
        <View style={styles.SwitchPageButton}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(destinationScreen)}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    SwitchPageButton: {
        position: "absolute",
        alignItems: "center",
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
    },
});
