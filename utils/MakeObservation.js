import Geolocation from 'react-native-geolocation-service'
import { sendLocationPin } from './APICalls'
import { makeJson } from './MakeJson'

// helper to combine button functionality and sending to the API
export const makeObservation = (userID, cover, acres, description, imageSource) => {
  console.log('make', imageSource)
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(async (position) => {
      try {
        const observation = await makeJson(position, userID, cover, acres, description, imageSource)
        await sendLocationPin(observation)
        resolve(observation)
      } catch (error) {
        reject(error)
      }
    }, (error) => {
      reject(error)
    })
  })
}
