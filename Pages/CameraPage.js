import { Camera, useCameraDevice } from "react-native-vision-camera";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import React, { useState, useRef } from 'react';
import { useNavigation } from "@react-navigation/native";

// Page for taking a picture, confirming, and retaking a picture to then be sent to the ConfirmationPage
const CameraPage = () => {
    const navigation = useNavigation();
    const camera = useRef(null);
    const device = useCameraDevice('back')

    const [imageSource, setImageSource] = useState('');
    const [photoTaken, setPhotoTaken] = useState(false);

    async function capturePhoto() {
        if (camera.current !== null) {
            const photo = await camera.current.takePhoto({});
            setImageSource(photo.path);
            setPhotoTaken(true);
            console.log(photo.path);
        }
    }

    function handleConfirmation() {
        navigation.navigate("Confirmation", { imageSource })
    }

    function handleRedo() {
        setImageSource('');
        setPhotoTaken(false);
    }

    if (device == null) return <Text>No Camera Found</Text>

    return (
        <View style={styles.container}>

            {/* Camera component */}
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={!photoTaken} // Deactivate camera when photo is taken
                enableZoomGesture={true}
                photo={true}
            />

            {/* Button for taking a photo */}
            {!photoTaken && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.camButton}
                        onPress={() => capturePhoto()}
                    />
                </View>
            )}

            {/* Display the taken photo */}
            {photoTaken && (
                <Image
                    source={{ uri: `file://'${imageSource}` }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

            {/* Confirm and redo buttons after a photo has been taken */}
            {photoTaken && (
                <View style={styles.confirmationContainer}>

                    <TouchableOpacity
                        style={styles.redoButton}
                        onPress={() => handleRedo()}
                    >
                        <Text>Retake</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.confirmationButton}
                        onPress={() => handleConfirmation()}
                    >
                        <Text>Confirm</Text>
                    </TouchableOpacity>

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        bottom: 0,
        padding: 20,
    },
    confirmationContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        bottom: 0,
        padding: 20,
    },
    camButton: {
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 5,
        borderColor: 'white',
    },
    confirmationButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    redoButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default CameraPage;
