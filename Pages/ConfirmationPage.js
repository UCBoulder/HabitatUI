import React, { useMemo, useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { makeObservation } from '../utils/MakeObservation'
import RadioGroup from 'react-native-radio-buttons-group'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome6'

const ConfirmationPage = ({ route, setUserLocation, userID }) => {
  const navigation = useNavigation()
  const { imageSource } = route.params
  const [acres, onChangeAcres] = useState('')
  const [description, onChangeDescription] = useState('')
  const [ownership, onChangeOwnership] = useState('')
  const [cover, onChangeCover] = useState()
  const [iModalVisible, setiModalVisible] = useState(false)
  const [cancelModalVisible, setCancelModalVisible] = useState(false)

  const confirmationButton = () => {
    makeObservation(setUserLocation, userID, cover, acres, description, ownership, imageSource)
    navigation.navigate('Map')
  }

  const closeModal = () => {
    setiModalVisible(false)
    setCancelModalVisible(false)
  }

  function handleI () {
    setiModalVisible(true)
  }

  function handleBack () {
    navigation.navigate('Map')
  }

  function handleCancel () {
    setCancelModalVisible(true)
  }

  const plantDensity = useMemo(
    () => [
      {
        id: '0-20%',
        label: '0-20%',
        value: '0-20%'
      },
      {
        id: '20-40%',
        label: '20-40%',
        value: '20-40%'
      },
      {
        id: '40-60%',
        label: '40-60%',
        value: '40-60%'
      },
      {
        id: '60-80%',
        label: '60-80%',
        value: '60-80%'
      },
      {
        id: '80-100%',
        label: '80-100%',
        value: '80-100%'
      }
    ],
    []
  )
  const landOwnership = useMemo(
    () => [
      {
        id: 'Private',
        label: 'Private',
        value: 'Private'
      },
      {
        id: 'Bureau of Land Management (BLM)',
        label: 'Bureau of Land Management (BLM)',
        value: 'Bureau of Land Management (BLM)'
      },
      {
        id: 'US Forest Service (USFS)',
        label: 'US Forest Service (USFS)',
        value: 'US Forest Service (USFS)'
      },
      {
        id: 'Colorado State',
        label: 'Colorado State',
        value: 'Colorado State'
      },
      {
        id: 'National Park Service (NPS)',
        label: 'National Park Service (NPS)',
        value: 'National Park Service (NPS)'
      },
      {
        id: 'Unknown',
        label: 'Unknown',
        value: 'Unknown'
      }
    ],
    []
  )

  const sizeSelect = useMemo(
    () => [
      {
        id: 'the size of a car',
        label: 'the size of a car',
        value: 'the size of a car'
      },
      {
        id: 'the size of a garage',
        label: 'the size of a garage',
        value: 'the size of a garage'
      },
      {
        id: 'the size of a football field',
        label: 'the size of a football field',
        value: 'the size of a football field'
      },
      {
        id: 'larger than a football field',
        label: 'larger than a football field',
        value: 'larger than a football field'
      }
    ],
    []
  )

  return (
    <View style={styles.container}>
      {/* Display photo that was taken */}
      <Image
        source={{ uri: `file://${imageSource}` }}
        style={styles.confirmationImage}
      />
       {/* Cancel; back to home */}
    <TouchableOpacity style={styles.backButton} onPress={() => handleCancel()}>
    <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>
    {/* Pop up for do you want to cancel */}
    <Modal
          animationType="slide"
          visible={cancelModalVisible}
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>  </Text>
              <Text style={styles.modalText}> Are you sure you want to delete current observation?</Text>
              <TouchableOpacity style={styles.modalYesButton} onPress={() => handleBack()}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalNoButton} onPress={closeModal}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      {/* confirmation questions */}
      <ScrollView>
        <Text style={styles.label}>
          Select Estimated Plant Cover (optional):
        </Text>
        <RadioGroup
          radioButtons={plantDensity}
          onPress={onChangeCover}
          selectedId={cover}
          layout="row"
          flexDirection="row"
          containerStyle={styles.radioGroupContainer}
          buttonContainerStyle={styles.radioButtonContainer}
          labelStyle={styles.radioGroup}
        />
         {/* i button with information pop up */}
        <TouchableOpacity
          style={styles.IButton}
          onPress={() => handleI()}
        >
          <Icon name="circle-info" size={30} color="black" />
        </TouchableOpacity>

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
              <Text>  </Text>
              <Text style={styles.modalText}> Estimate the amount of the ground in an infestation that is covered with cheat grass. For example,
              if about half the plants in a square foot are cheat grass, then it is 50% cover.</Text>
            </View>
          </View>
        </Modal>
        <Text style={styles.label}>Land Owned By (optional):</Text>
        <RadioGroup
          radioButtons={landOwnership}
          onPress={onChangeOwnership}
          selectedId={ownership}
          layout="row"
          flexDirection="row"
          containerStyle={styles.radioGroupContainer} // Add this line for additional styling
          buttonContainerStyle={styles.radioButtonContainer}
          labelStyle={styles.radioGroup}
        />

        <Text style={styles.label}>Select Estimated Size (optional):</Text>
        <RadioGroup
          radioButtons={sizeSelect}
          onPress={onChangeAcres}
          selectedId={acres}
          layout="row"
          flexDirection="row"
          containerStyle={styles.radioGroupContainer}
          buttonContainerStyle={styles.radioButtonContainer}
          labelStyle={styles.radioGroup}
        />

        <Text style={styles.label}>Location Description (optional):</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeDescription}
          value={description}
          placeholder="Location Description"
          placeholderTextColor={'#aaa'}
          multiline={true}
          textAlignVertical="top"
          color="#aaa"
        />

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.confirmationButton}
            onPress={confirmationButton}>
            <Text style={styles.buttonText}>Confirm Observation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

ConfirmationPage.propTypes = {
  route: PropTypes.object.isRequired,
  setUserLocation: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmationImage: {
    width: '100%',
    height: '50%'
  },
  input: {
    height: 100,
    width: '95%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    textDecorationColor: '#aaa',
    textAlignVertical: 'top',
    marginLeft: 10
  },
  confirmationButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    bottom: 20,
    marginTop: 30,
    width: '50%'
  },
  buttonText: {
    color: 'black',
    textAlign: 'center'
  },
  radioGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  radioButtonContainer: {
    marginVertical: 5
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    marginLeft: 10
  },
  radioGroup: {
    color: 'black'
  },
  IButton: {
    padding: 10,
    borderRadius: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '80%',
    height: '50%',
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
  modalYesButton: {
    zIndex: 2,
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderRadius: 100,
    padding: 10,
    backgroundColor: '#0af23c'
  },
  modalNoButton: {
    zIndex: 2,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 100,
    padding: 10,
    backgroundColor: '#f20a0a'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 25
  },
  backButton: {
    zIndex: 2,
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white'
  }
})

export default ConfirmationPage
