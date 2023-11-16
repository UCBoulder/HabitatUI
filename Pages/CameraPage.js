import { Camera, useCameraDevice } from "react-native-vision-camera";

const CameraPage = () => {
    const device = useCameraDevice('back')

    if (device == null) return <NoCameraDeviceError />
    return (
        <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        />
    );
};

export default CameraPage;