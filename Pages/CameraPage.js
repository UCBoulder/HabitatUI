import { Camera, useCameraDevice } from "react-native-vision-camera";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import React, { useState, useRef } from 'react';

const CameraPage = () => {
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
    }

    function handleRedo() {
        setImageSource('');
        setPhotoTaken(false);
    }

    if (device == null) return <NoCameraDeviceError />

    return (
        <View style={styles.container}>

            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={!photoTaken} // Deactivate camera when photo is taken
                photo={true}
            />

            {!photoTaken && ( // provide a button that takes a photo
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.camButton}
                        onPress={() => capturePhoto()}
                    />
                </View>
            )}

            {photoTaken && ( // show photo after it has been taken
                <Image
                    source={{ uri: `file://'${imageSource}` }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

            {photoTaken && ( // confirm and redo buttons after a photo has been taken
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
        backgroundColor: 'white',
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
