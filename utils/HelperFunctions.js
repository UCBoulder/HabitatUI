import { request, PERMISSIONS } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";

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

export const sendRequestToBackend = async (position) => {
  try {
    const response = await axios.post("http://192.168.56.1:8080/APITEST", {
      position,
    });
    console.log("Response from backend: ", response.data);
  } catch (error) {
    console.error("Error sending request to backend: ", error);
  }
};

export const handleGetLocation = (setUserLocation) => {
  Geolocation.getCurrentPosition((position) => {
    setUserLocation(position);
    sendRequestToBackend(position);
  });
};
