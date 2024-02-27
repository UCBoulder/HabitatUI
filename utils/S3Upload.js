import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { v4 as uuidv4 } from 'uuid'
import RNFS from 'react-native-fs'
import { Buffer } from 'buffer'

const region = 'us-east-1'
const client = new S3Client({ region })
const arn = 'arn:aws:s3:us-east-1:124008505402:accesspoint/habipoint'

async function s3Upload (arn, key, file) {
  const upload = new Upload({
    client,
    params: {
      Bucket: arn,
      Key: key,
      Body: file
    }
  })

  try {
    await upload.done()
    console.log(`File uploaded successfully to ${'test-cow'}/${key}`)
    return `https://${'test-cow'}.s3.${region}.amazonaws.com/${key}` // return the location of the file
  } catch (error) {
    console.error('Upload failed', error)
    return undefined
  }
}

export async function processImageFile (filePath) {
  try {
    const fileBuffer = await RNFS.readFile(filePath, 'base64')
    const chunks = splitFileToChunks(fileBuffer)
    const chunkBuffers = Buffer.concat(chunks)
    const location = await s3Upload(arn, 'test-photos/' + uuidv4() + '.jpg', chunkBuffers)
    console.log(location) // For testing
    return location
  } catch (error) {
    console.error('This is the error', error)
    return undefined
  }
}

function splitFileToChunks (fileBuffer, chunkSize = 1024 * 1024 * 5) { // default size of each chunk is 5MB
  const chunks = []

  for (let i = 0; i < fileBuffer.length; i += chunkSize) {
    const chunk = Buffer.from(fileBuffer.slice(i, i + chunkSize), 'base64')
    chunks.push(chunk)
  }

  return chunks
}
