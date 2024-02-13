import Geolocation from 'react-native-geolocation-service'
import { sendLocationPin } from './APICalls'

// helper to combine button functionality and sending to the API
export const makeObservation = (setUserLocation, userID, cover, acres, description, ownership, imageSource) => {
  Geolocation.getCurrentPosition((position) => {
    setUserLocation(position)
    sendLocationPin(position, userID, cover, acres, description, ownership, imageSource)
  })
}
