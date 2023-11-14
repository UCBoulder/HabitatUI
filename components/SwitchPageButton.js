import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

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
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 0,
    },
    buttonText: {
        color: "#000",
    },
});
