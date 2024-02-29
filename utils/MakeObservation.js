import Geolocation from 'react-native-geolocation-service'
import { sendLocationPin } from './APICalls'
import { makeJson } from './MakeJson'

// helper to combine button functionality and sending to the API
export const makeObservation = (userID, cover, acres, description, ownership, imageSource) => {
  Geolocation.getCurrentPosition(async (position) => {
    const observation = await makeJson(position, userID, cover, acres, description, ownership, imageSource)
    await sendLocationPin(observation)
    return observation
  })
}
