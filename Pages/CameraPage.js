import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

function CameraPage() {
    const camera = useRef<Camera> (null);
    const device = useCameraDevices('back');

    const [showCamera, setShowCamera] = useState(false);
    const [imageSource, setImageSource] = useState('');

    async function takePhoto() {
        if (camera.current !== null) {
            const photo = await camera.current.takePhoto({});
            setImageSource(photo.path);
            setShowCamera(false);
            console.log(photo.path);
        }
    }

    if (device == null) {
        return <Text>Camera not available</Text>;
    }
    
    return (
        <View style={styles.container}>
          {showCamera ? (
            <>
              <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
              />
    
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.camButton}
                  onPress={() => takePhoto()}
                />
              </View>
            </>
          ) : (
            <>
              <Button title="Launch Camera" onPress={() => setShowCamera(true)} />
              {imageSource !== '' ? (
                <Image
                  style={styles.image}
                  source={{
                    uri: `file://'${imageSource}`,
                  }}
                />
              ) : null}
            </>
          )}
        </View>
      );
    }
    
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
        height: 'auto',
        aspectRatio: 9 / 16,
      },
    });
    
    export default CameraPage;