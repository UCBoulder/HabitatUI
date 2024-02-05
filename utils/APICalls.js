import axios from 'axios'
import RNFS from 'react-native-fs'
import { Alert } from 'react-native'
import { NetworkInfo } from 'react-native-network-info'

// recieve one or many lat long coordinates from the API
export const getLocationPins = async () => {
  try {
    // const ipAddress = await NetworkInfo.getIPV4Address()
    // const response = await axios.get(`http://${ipAddress}:3000/observations`)
    return response.data
  } catch (error) {
    console.error('Error fetching API data: ', error)
    return null
  }
}

// send one lat long coordinate to the API
export const sendLocationPin = async (position, userID, text, imageSource) => {
  const observation = {
    userID,
    coords: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    },
    Notes: text,
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
    // console.log(observation.image._parts)
    const ipAddress = await NetworkInfo.getIPAddress()
    const response = await axios.post(`http://${ipAddress}:3000/observations`, observation)

    console.log('Response from backend: ', response.data)
    Alert.alert('Success', 'Your Observation Was Successfully Uploaded')
  } catch (error) {
    console.error('Error sending data to backend: ', error)

    Alert.alert('Failed', 'Your Observation Failed to Upload', [{
      text: 'Retry',
      onPress: () => sendLocationPin(position, userID, text, imageSource)
    },
    {
      text: 'Ok'
    }])

    return null
  }
}
