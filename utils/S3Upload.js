import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { v4 as uuidv4 } from 'uuid'
import RNFS from 'react-native-fs'

const region = 'us-east-1'
const client = new S3Client({ region })

async function s3Upload (bucket, key, file) {
  const upload = new Upload({
    client,
    params: {
      Bucket: bucket,
      Key: key,
      Body: file
    }
  })

  try {
    await upload.done()
    console.log(`File uploaded successfully to ${bucket}/${key}`)
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}` // return the location of the file
  } catch (e) {
    console.error('Upload failed', e)
    return undefined
  }
}

export async function processImageFile (filePath) {
  try {
    const fileBuffer = await RNFS.readFile(filePath, 'base64')
    const chunks = splitFileToChunks(fileBuffer)
    const chunkBuffers = Buffer.concat(chunks)
    const location = await s3Upload('test-cow', 'test-photos/' + uuidv4() + '.jpg', chunkBuffers)
    console.log(location) // For testing
    return location
  } catch (err) {
    console.error(err)
    return undefined
  }
}

function splitFileToChunks (fileBuffer, chunkSize = 1024 * 1024 * 5) { // default size of each chunk is 5MB
  const chunks = []

  for (let i = 0; i < fileBuffer.length; i += chunkSize) {
    chunks.push(fileBuffer.slice(i, i + chunkSize))
  }

  return chunks
}
