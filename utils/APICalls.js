import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import RNFS from 'react-native-fs'
import { Alert } from 'react-native'
import config from '../config'
import { processImageFile, s3Upload } from './S3Upload'
import { Buffer } from 'buffer'

// recieve one or many lat long coordinates from the API
export const getLocationPins = async () => {
  try {
    const response = await axios.get(`${config.apiTestAddress}${config.apiPath}`)
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
  const oid = uuidv4()
  const observation = {
    UserID: userID,
    ObservationID: oid,
    coords: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    },
    Notes: description,
    VerificationRating: 1,
    timestamp: position.timestamp
  }

  if (imageSource) {
    try {
      const s3Location = s3Upload(imageSource)
      observation.image = s3Location._j
    } catch (error) {
      console.error('Failed to upload to S3:', error)
    }
  }
  try {
    const response = await axios.post(`${config.apiTestAddress}${config.apiPath}`, observation)
    console.log('Response from backend: ', response.data)
    Alert.alert('Success', 'Your Observation Was Successfully Uploaded. If your information does not show up in your pin, refresh the page.')
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
