import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import PropTypes from 'prop-types'

const FetchS3Image = ({ imageURL }) => {
  const [imageUri, setImageUri] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const s3Url = imageURL
        const response = await RNFetchBlob.fetch('GET', s3Url)
        const base64Image = response.base64()
        const uri = `data:image/jpeg;base64,${base64Image}`
        setImageUri(uri)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching image:', error)
        setError(true)
        setLoading(false)
      }
    }

    fetchImage()
  }, [])

  return (
    <View style={styles.container}>
      {loading
        ? (
        <ActivityIndicator size="large" color="black" />
          )
        : error
          ? (
        <Text>Image not found</Text>
            )
          : (
        <Image source={{ uri: imageUri }} style={styles.image} />
            )}
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
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})

export default FetchS3Image
