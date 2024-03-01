import { v4 as uuidv4 } from 'uuid'
import { s3Upload } from './S3Upload'

export const makeJson = async (position, userID, cover, acres, description, ownership, imageSource) => {
  const ObservationID = uuidv4()

  const observation = {
    UserID: userID,
    ObservationID,
    coords: {
      latitude: position.coords.latitude.toString(),
      longitude: position.coords.longitude.toString(),
      accuracy: position.coords.accuracy.toString()
    },
    Notes: description,
    VerificationRating: 1, // Numeric value directly, not wrapped in an object
    timestamp: position.timestamp.toString()
  }

  if (imageSource) {
    try {
      const s3Location = s3Upload(imageSource)
      observation.image = { S: s3Location._j }
    } catch (error) {
      console.error('Failed to upload to S3:', error)
    }
  }

  return observation
}
