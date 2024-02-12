import axios from 'axios'
import RNFS from 'react-native-fs'
import { Alert } from 'react-native'
import config from '../config'

// recieve one or many lat long coordinates from the API
export const getLocationPins = async () => {
  try {
    const response = await axios.get(`${config.emulatorAddress}/observations`)
    return response.data
  } catch (error) {
    console.error('Error fetching API data: ', error)
    return null
  }
}

// send one lat long coordinate to the API
export const sendLocationPin = async (position, userID, imageSource, cover, acres, description, ownership) => {
  const observation = {
    userID,
    coords: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    },
    Notes: {
      estimatedCover: cover,
      estimatedArea: acres,
      locationDescription: description,
      ownership
    },
    VerificationRating: 1,
    timestamp: position.timestamp
  }

  try {
    if (imageSource) {
      const imageBase64 = await RNFS.readFile(imageSource, 'base64')

      const formData = new FormData()
      formData.append('image', {
        uri: imageSource,
        type: 'image/jpeg',
        name: 'image.jpg',
        encoded64: imageBase64
      })

      observation.image = imageBase64
    }
    const response = await axios.post(`${config.emulatorAddress}/observations`, observation)

    console.log('Response from backend: ', response.data)
    Alert.alert('Success', 'Your Observation Was Successfully Uploaded')
  } catch (error) {
    console.error('Error sending data to backend: ', error)

    Alert.alert('Failed', 'Your Observation Failed to Upload', [{
      text: 'Retry',
      onPress: () => sendLocationPin(position, userID, imageSource, cover, acres, description, ownership)
    },
    {
      text: 'Ok'
    }])

    return null
  }
}
