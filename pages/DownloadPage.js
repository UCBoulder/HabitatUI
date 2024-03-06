import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
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
        <View style={styles.buttonContainer}>
            <BurgerMenuButton navigation={navigation} />
            <Text style={styles.text}>Download all pins in csv format</Text>
            <TouchableOpacity style={styles.button} onPress={handleDownload}>
                <Text style={styles.text}>Download</Text>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
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
    width: 200
  },
  text: {
    color: 'black',
    textAlign: 'center'
  }
})
export default DownloadPage
