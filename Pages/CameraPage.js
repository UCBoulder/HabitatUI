import { Camera, useCameraDevice } from "react-native-vision-camera";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState, useRef } from 'react';

const CameraPage = () => {
    const camera = useRef(null);
    const device = useCameraDevice('back')

    const [imageSource, setImageSource] = useState('');

    async function capturePhoto() {
        if (camera.current !== null) {
            const photo = await camera.current.takePhoto({});
            setImageSource(photo.path);
            console.log(photo.path);
        }
    }

    if (device == null) return <NoCameraDeviceError />
    return (
        <View style={styles.container}>

            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
            />

            {imageSource ? (
                <Image
                    source={{ uri: `file://'${imageSource}` }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : null}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.camButton}
                    onPress={() => capturePhoto()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'gray',
    },
    buttonContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        bottom: 0,
        padding: 20,
    },
    camButton: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default CameraPage;
