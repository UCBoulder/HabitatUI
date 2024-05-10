import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground, Alert, Modal } from 'react-native'
import { BurgerMenuButton } from '../components/BurgerMenuButton'
import { convertToCSV, saveCSVToFile } from '../utils/CsvSaving'
import { getLocationPins } from '../utils/APICalls'
import { useNavigation } from '@react-navigation/native'
import Mailer from 'react-native-mail'
import Icon from 'react-native-vector-icons/FontAwesome6'

const DownloadPage = () => {
  const [apiCoordinates, setApiCoordinates] = useState([])
  const navigation = useNavigation()
  const [iModalVisible, setiModalVisible] = useState(false)

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

  const closeModal = () => {
    setiModalVisible(false)
  }

  function handleI () {
    setiModalVisible(true)
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
        <TouchableOpacity
            style={styles.iButton}
            onPress={() => handleI()}
          >
            <Icon name="circle-info" size={30} color="white" />
            </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
            animationType="slide"
            visible={iModalVisible}
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalXButton} onPress={closeModal}>
                  <Icon name="x" size={25} color="black" />
                </TouchableOpacity>
                <Text style={styles.modalText}>{'\n'}To view all current pins as a .csv file,
                 press this button to download and email the file.</Text>
              </View>
            </View>
          </Modal>
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
    marginRight: 10,
    backgroundColor: 'white'
  },
  iButton: {
    marginTop: 4
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '80%',
    height: '36%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  modalXButton: {
    zIndex: 2,
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 50,
    padding: 10
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 25
  }

})

export default DownloadPage
