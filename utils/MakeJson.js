import { v4 as uuidv4 } from 'uuid'
import RNFS from 'react-native-fs'
import { Image } from 'react-native-compressor'

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
    const compressedImage = await Image.compress(imageSource)
    const imageBase64 = await RNFS.readFile(compressedImage, 'base64')
    observation.image = imageBase64
  }
  return observation
}
