// import React, { useState, useEffect } from 'react'
// import { View, Image, StyleSheet } from 'react-native'

// import RNFetchBlob from 'rn-fetch-blob'

// const FetchS3Image = () => {
//   const [imageUri, setImageUri] = useState(null)

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const s3Url = 'https://test-cow.s3.us-east-1.amazonaws.com/test-photos/eb26397a-5bb4-465d-88c0-94a9e40a87df.jpg'
//         const response = await RNFetchBlob.fetch('GET', s3Url)
//         console.log('response', response)
//         const base64Image = response.base64()
//         const uri = `data:image/jpeg;base64,${base64Image}`
//         console.log(uri)
//         setImageUri(uri)
//       } catch (error) {
//         console.error('Error fetching image:', error)
//       }
//     }

//     fetchImage()
//   }, [])

//   return (
//     <View style={styles.container}>
//       {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: 'cover'
//   }
// })

// export default FetchS3Image
