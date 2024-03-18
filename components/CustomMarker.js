import React, { useState, useRef, useEffect } from 'react'
import { Marker, Callout } from 'react-native-maps'
import { ColorCode } from './ColorCode'
import { FormatDate } from '../utils/FormatDate'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { simplifyJson } from '../utils/simplifyJson'
import Icon from 'react-native-vector-icons/FontAwesome6'
import FetchS3Image from '../utils/FetchS3Image'
import { loadUserID } from '../utils/UserID'

const CustomMarker = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const parsedData = simplifyJson(data)
  const [userID, setUserID] = useState(null)
  const markerRef = useRef(null)

  const calloutPress = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const observationDate = FormatDate(parsedData.timestamp)
  loadUserID(setUserID)
  const checkUserID = userID === parsedData.UserID
  const renderCallout = observationDate.recent && checkUserID

  useEffect(() => {
    if (renderCallout && markerRef.current && markerRef.current.showCallout) {
      markerRef.current.showCallout()
    }
  }, [renderCallout])

  return (
      <Marker coordinate={{
        latitude: parseFloat(parsedData.coords.latitude),
        longitude: parseFloat(parsedData.coords.longitude)
      }}
        ref={markerRef}
        pinColor={ColorCode(parsedData.VerificationRating ? parsedData.VerificationRating : '1')}>

        <Callout tooltip onPress={calloutPress}>
          <View style={styles.calloutContainer}>

            <Text style={styles.calloutText}>
              {`Observation made on: ${observationDate.formattedDate}\n`}
              {`Latitude: ${parsedData.coords.latitude}\nLongitude: ${parsedData.coords.longitude}\n`}
              {`Accuracy: ${parsedData.coords.accuracy}\n`}
              {`Notes: ${parsedData.Notes ?? ''}\n`}
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
              <FetchS3Image imageURL={parsedData.observationImageURL} />

              <TouchableOpacity style={styles.modalExitButton} onPress={closeModal}>
                <View style={styles.iconContainer}>
                  <Icon name="x" size={25} color="black" />
                </View>
              </TouchableOpacity>
            </View>

          </Modal>

        </Callout>
      </Marker>

  )
}

CustomMarker.propTypes = {
  data: PropTypes.object.isRequired
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
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5
  }
})

export default CustomMarker
