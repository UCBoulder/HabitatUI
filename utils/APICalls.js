import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import RNFS from 'react-native-fs'
import { Alert } from 'react-native'
import config from '../config'

// recieve one or many lat long coordinates from the API
export const getLocationPins = async () => {
  try {
    const response = await axios.get(`https://lt0clq58fh.execute-api.us-east-1.amazonaws.com/test/Observations`)
    // console.log(response)
    // console.log("From the APICALLS")
    return response.data.Items
  } catch (error) {
    console.error('Error fetching API data: ', error)
    return null
  }
}

// send one lat long coordinate to the API
export const sendLocationPin = async (position, userID, cover, acres, description, ownership, imageSource) => {
  let oid = uuidv4()
  const observation = {
    UserID: userID,
    ObservationID : oid,
    coords: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    },
    Notes: {
      estimatedCover: cover,
      estimatedArea: acres,
      locationDescription: description,
      ownership: ownership
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

    const response = await axios.post(`https://lt0clq58fh.execute-api.us-east-1.amazonaws.com/test/Observations`, observation)
    console.log('Response from backend: ', response.data)
    Alert.alert('Success', 'Your Observation Was Successfully Uploaded')
  } catch (error) {
    console.error('Error sending data to backend: ', error)

    Alert.alert('Failed', 'Your Observation Failed to Upload', [{
      text: 'Retry',
      onPress: () => sendLocationPin(position, userID, cover, acres, description, ownership, imageSource)
    },
    {
      text: 'Ok'
    }])

    return null
  }
}
