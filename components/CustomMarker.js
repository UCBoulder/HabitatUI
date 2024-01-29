import React, { useState } from 'react'
import { Marker, Callout } from 'react-native-maps'
import { ColorCode } from './ColorCode'
import { FormatDate } from '../utils/FormatDate'
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const CustomMarker = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const calloutPress = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
        <Marker coordinate={{
          latitude: data.coords.latitude,
          longitude: data.coords.longitude
        }}
            pinColor={ColorCode(data.VerificationRating)}>
            <Callout tooltip onPress={calloutPress}>

                <View style={styles.calloutContainer}>

                    <Text style={styles.calloutText}>
                        {`Observation made on: ${FormatDate(data.timestamp)}\n`}
                        {`Latitude: ${data.coords.latitude}\nLongitude: ${data.coords.longitude}\n`}
                        {`Accuracy: ${data.coords.accuracy.toFixed(3)}\n`}
                        {`${data.Notes}\n`}
                    </Text>

                    <Text style={styles.calloutTextCentered}>
                        {'Tap to view image'}
                    </Text>

                </View>

                {/* Image popup */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                >
                    <View style={styles.modalContainer}>
                        <Image
                            source={require('../images/PXL_20231211_211945981.MP.jpg')}
                            style={styles.modalImage}
                            resizeMode="contain"
                        />
                        <TouchableOpacity style={styles.modalExitButton} onPress={closeModal}>
                            <Text style={styles.buttonText}>X</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>

            </Callout>
        </Marker>
  )
}

// Define PropTypes for the data prop
CustomMarker.propTypes = {
  data: PropTypes.shape({
    coords: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      accuracy: PropTypes.number
    }),
    VerificationRating: PropTypes.number,
    timestamp: PropTypes.number,
    Notes: PropTypes.string
  })
}

const styles = StyleSheet.create({
  calloutContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 4
  },
  calloutText: {
    fontSize: 14,
    color: 'black'
  },
  calloutTextCentered: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1
  },
  modalExitButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10
  },
  modalExitButtonText: {
    color: 'black',
    fontSize: 20
  },
  modalImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
})

export default CustomMarker
