import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native'
import { BurgerMenuButton } from '../components/BurgerMenuButton'
import { convertToCSV, saveCSVToFile } from '../utils/CsvSaving'
import { getLocationPins } from '../utils/APICalls'
import { useNavigation } from '@react-navigation/native'

const DownloadPage = () => {
  const [apiCoordinates, setApiCoordinates] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    fetchPins()
  })

  const fetchPins = async () => {
    try {
      const coordinates = await getLocationPins()
      coordinates && setApiCoordinates(coordinates)
    } catch (error) {
      console.error('Error fetching API data: ', error)
    }
  }
  const handleDownload = () => {
    if (apiCoordinates.length > 0) {
      const csvData = convertToCSV(apiCoordinates)
      saveCSVToFile(csvData)
    }
  }

  return (
        <ImageBackground
            source={require('../images/downloadPage.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.buttonContainer}>
                <BurgerMenuButton navigation={navigation} />
                <TouchableOpacity style={styles.button} onPress={handleDownload}>
                    <Text style={styles.text}>Download Pin Information</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    height: 50,
    width: 200,
    marginRight: 10
  },
  text: {
    color: 'black',
    textAlign: 'center'
  }
})
export default DownloadPage
