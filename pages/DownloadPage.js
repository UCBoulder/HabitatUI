import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native'
import { BurgerMenuButton } from '../components/BurgerMenuButton'
import { convertToCSV, saveCSVToFile } from '../utils/CsvSaving'
import { getLocationPins } from '../utils/APICalls'
import { useNavigation } from '@react-navigation/native'
import Mailer from 'react-native-mail'

const DownloadPage = () => {
  const [apiCoordinates, setApiCoordinates] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    fetchPins()
  }, [])

  const fetchPins = async () => {
    try {
      const coordinates = await getLocationPins()
      coordinates && setApiCoordinates(coordinates)
    } catch (error) {
      console.error('Error fetching API data: ', error)
    }
  }

  const handleDownload = async () => {
    if (apiCoordinates.length > 0) {
      const csvData = convertToCSV(apiCoordinates)
      const filePath = await saveCSVToFile(csvData)

      Mailer.mail({
        subject: 'CSV File',
        body: 'Attached is the CSV file containing pin information from CheatMaps.',
        isHTML: false,
        attachments: [{
          path: filePath,
          type: 'csv'
        }]
      }, (error, event) => {
        if (error) {
          console.error('Error sending email:', error)
          Alert.alert('Error', 'Failed to send email.')
        } else {
          Alert.alert('Success', 'Email sent successfully.')
        }
      })
    }
  }

  return (
    <ImageBackground
      source={require('../images/downloadPage.png')}
      style={styles.backgroundImage}>
      <View style={styles.buttonContainer}>
        <BurgerMenuButton navigation={navigation} />
        <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <Text style={styles.text}>Download and Email Observations</Text>
        </TouchableOpacity>
        <Text style={styles.textHeader}>To view all current pins as a .csv, use this button to download and email the file.</Text>
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
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    height: 55,
    width: 200,
    marginRight: 10
  },
  text: {
    color: 'black',
    textAlign: 'center'
  },
  textHeader: {
    fontSize: 20,
    color: 'black',
    marginBottom: 15,
    marginLeft: 10,
    textDecorationLine: 'underline'
  }
})

export default DownloadPage
