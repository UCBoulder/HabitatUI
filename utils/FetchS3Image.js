import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import PropTypes from 'prop-types'

const FetchS3Image = ({ imageURL }) => {
  const [imageUri, setImageUri] = useState(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const s3Url = imageURL
        const response = await RNFetchBlob.fetch('GET', s3Url)
        const base64Image = response.base64()
        const uri = `data:image/jpeg;base64,${base64Image}`
        setImageUri(uri)
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchImage()
  }, [])

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  )
}

FetchS3Image.propTypes = {
  imageURL: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover'
  }
})

export default FetchS3Image
