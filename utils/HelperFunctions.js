import { request, PERMISSIONS } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import { sendLocationPin } from "./APICalls";

// request location permissions
export const requestLocationPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    if (result === "granted") {
      console.log("Location permission granted");
    } else {
      console.log("Location permission denied");
    }
  } catch (error) {
    console.error("Error requesting location permission: ", error);
  }
};

// helper to combine button functionality and sending to the API
export const handleGetLocation = (setUserLocation) => {
  Geolocation.getCurrentPosition((position) => {
    setUserLocation(position);
    sendLocationPin(position);
  });
};
