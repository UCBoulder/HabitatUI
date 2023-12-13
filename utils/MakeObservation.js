import Geolocation from "react-native-geolocation-service";
import { sendLocationPin } from "./APICalls";

// helper to combine button functionality and sending to the API
export const makeObservation = (setUserLocation, locText, plantText) => {
  Geolocation.getCurrentPosition((position) => {
    setUserLocation(position);
    sendLocationPin(position, locText, plantText);

  });
};
