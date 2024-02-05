import Geolocation from 'react-native-geolocation-service'
import { sendLocationPin } from './APICalls'

// helper to combine button functionality and sending to the API
export const makeObservation = (setUserLocation, userID, text, imageSource) => {
  Geolocation.getCurrentPosition(async (position) => {
    setUserLocation(position)
    sendLocationPin(position, userID, text, imageSource)
  })
}
