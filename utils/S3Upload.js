import { RNS3 } from 'react-native-aws3'

export async function s3Upload (filePath) {
  const fileUri = `file://${filePath}`
  return fileUri
  // const file = {
  //   uri: fileUri,
  //   type: 'image/jpg'
  // }

  // const options = {
  //   keyPrefix: 'test-photos/',
  //   bucket: 'test-cow',
  //   region: 'us-east-1',

  //   successActionStatus: 201
  // }

  // try {
  //   const response = await RNS3.put(file, options)

  //   if (response.status !== 201) {
  //     throw new Error('Failed to upload image to s3', response)
  //   }

  //   console.log(response.body)
  // } catch (error) {
  //   console.error('Error uploading image to s3:', error)
  // }
}
