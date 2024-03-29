import { v4 as uuidv4 } from 'uuid'
import RNFS from 'react-native-fs'

export const makeJson = async (position, userID, cover, acres, description, imageSource) => {
  const ObservationID = uuidv4()

  const observation = {
    UserID: userID,
    ObservationID,
    coords: {
      latitude: position.coords.latitude.toString(),
      longitude: position.coords.longitude.toString(),
      accuracy: position.coords.accuracy.toString()
    },
    Notes: {
      cover: cover !== undefined ? cover : '',
      acres: acres !== undefined ? acres : '',
      description: description !== undefined ? description : ''
    },
    VerificationRating: 1,
    timestamp: position.timestamp.toString()
  }

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

  return observation
}
