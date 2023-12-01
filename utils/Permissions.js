import { request, PERMISSIONS } from "react-native-permissions";

// request location permissions
export const requestLocationPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result === "granted") {
      console.log("Location permission granted");
    } else {
      console.log("Location permission denied");
    }
  } catch (error) {
    console.error("Error requesting location permission: ", error);
  }
};

export const requestCameraPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result === "granted") {
      console.log("Camera permission granted");
    } else {
      console.log("Camera permission denied");
    }
  } catch (error) {
    console.error("Error requesting camera permission: ", error);
  }
};

