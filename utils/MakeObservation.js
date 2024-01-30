import Geolocation from 'react-native-geolocation-service'
import { sendLocationPin, sendStoredObservations } from './APICalls'
import AsyncStorage from '@react-native-async-storage/async-storage'

// helper to combine button functionality and sending to the API
export const makeObservation = (setUserLocation, userID, text, imageSource) => {
  Geolocation.getCurrentPosition(async (position) => {
    setUserLocation(position)
    const storedObservations = await AsyncStorage.getItem('Observations')
    if (storedObservations) {
      sendStoredObservations()
    } else {
      sendLocationPin(position, userID, text, imageSource)
    }
  })
}
