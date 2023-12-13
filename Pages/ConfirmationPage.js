import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { makeObservation } from "../utils/MakeObservation";

const ConfirmationPage = ({ route, setUserLocation }) => {
    const navigation = useNavigation();
    const { imageSource } = route.params;
    const [locationText, onChangeLocationText] = useState('');
    const [plantText, onChangePlantText] = useState('');

    const confirmationButton = () => {
        makeObservation(setUserLocation, locationText, plantText, imageSource);
        navigation.navigate("Map");
    };

    return (
        <View style={styles.container}>

            {/* Display photo that was taken */}
            <Image
                source={{ uri: `file://${imageSource}` }}
                style={styles.confirmationImage}
            />

            <Text style = {styles.label}>Please describle the location</Text>

            <TextInput
                style={styles.input}
                onChangeText={onChangeLocationText}
                value={locationText}
                placeholder="Put text here"
                placeholderTextColor={"#aaa"}
                multiline={true}
                textAlignVertical="top"
                color="#aaa"

            />

            <Text style = {styles.label}>Please describe the plant</Text>

            <TextInput
                style={styles.input}
                onChangeText={onChangePlantText}
                value={plantText}
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
        backgroundColor: 'silver',
        padding: 10,
        borderRadius: 5,
        bottom: 20
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
    label: {
       color: 'black', 
       textAlign: 'left' 
    },
});

export default ConfirmationPage;
