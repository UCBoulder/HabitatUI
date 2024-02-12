import Geolocation from "react-native-geolocation-service";
import { sendLocationPin } from "./APICalls";

// helper to combine button functionality and sending to the API
export const makeObservation = (setUserLocation, cover, acres, description, ownership) => {
  Geolocation.getCurrentPosition((position) => {
    setUserLocation(position);
    sendLocationPin(position, cover, acres, description, ownership);

  });
};
