import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { makeObservation } from "../utils/MakeObservation";

const ConfirmationPage = ({ route, setUserLocation, userID }) => {
    const navigation = useNavigation();
    const { imageSource } = route.params;
    const [text, onChangeText] = useState('');

    const confirmationButton = () => {
        makeObservation(setUserLocation, userID, text);
        navigation.navigate("Map");
    };

    return (
        <View style={styles.container}>

            {/* Display photo that was taken */}
            <Image
                source={{ uri: `file://${imageSource}` }}
                style={styles.confirmationImage}
            />

            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Put text here"
                placeholderTextColor={"#aaa"}
                multiline={true}
                textAlignVertical="top"
                color="#aaa"
            />

            <TouchableOpacity
                style={styles.confirmationButton}
                onPress={confirmationButton}
            >
                <Text style={styles.buttonText}>Confirm Observation</Text>

            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmationImage: {
        width: '100%',
        height: '50%',
    },
    input: {
        flex: 1,
        height: 100,
        width: '100%',
        textDecorationColor: '#aaa',
        textAlignVertical: 'top'
    },
    confirmationButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        bottom: 20
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
});

export default ConfirmationPage;
