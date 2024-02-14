import React, { useState } from 'react'
import { Marker, Callout } from 'react-native-maps'
import { ColorCode } from './ColorCode'
import { FormatDate } from '../utils/FormatDate'
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { simplifyJson } from '../utils/simplifyJson'
import Icon from 'react-native-vector-icons/FontAwesome6'

const CustomMarker = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const parsedData = simplifyJson(data)

  const calloutPress = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <Marker coordinate={{
      latitude: parsedData.coords.latitude,
      longitude: parsedData.coords.longitude
    }}
      pinColor={ColorCode(parsedData.VerificationRating ? parsedData.VerificationRating : '1')}>
      <Callout tooltip onPress={calloutPress}>

        <View style={styles.calloutContainer}>

          <Text style={styles.calloutText}>
            {`Observation made on: ${FormatDate(parsedData.timestamp)}\n`}
            {`Latitude: ${parsedData.coords.latitude}\nLongitude: ${parsedData.coords.longitude}\n`}
            {`Accuracy: ${parsedData.coords.accuracy}\n`}
            {/* {parsedData.Notes.locationDescription !== undefined ? `${parsedData.Notes.locationDescription}\n` : '\n'} */}
          </Text>

          <Text style={styles.calloutTextCentered}>
            {'Tap to view image'}
          </Text>

        </View>

        {/* Image popup */}
        <Modal
          animationType="slide"
          visible={modalVisible}
        >
          <View style={styles.modalContainer}>
            <Image
              source={require('../images/PXL_20231211_211945981.MP.jpg')}
              style={styles.modalImage}
              resizeMode="stretch"
            />
            <TouchableOpacity style={styles.modalExitButton} onPress={closeModal}>
              <Icon name="x" size={25} color="white" />
            </TouchableOpacity>
          </View>

        </Modal>

      </Callout>
    </Marker>
  )
}

CustomMarker.propTypes = {
  data: PropTypes.shape({
    coords: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      accuracy: PropTypes.number
    }),
    VerificationRating: PropTypes.object,
    timestamp: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    Notes: PropTypes.shape({
      estimatedCover: PropTypes.string,
      estimatedArea: PropTypes.string,
      locationDescription: PropTypes.string,
      ownership: PropTypes.string
    })
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
    flex: 1,
    width: '100%',
    height: '100%'
  },
  modalExitButton: {
    zIndex: 2,
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 50,
    padding: 10
  },
  modalImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
})

export default CustomMarker
