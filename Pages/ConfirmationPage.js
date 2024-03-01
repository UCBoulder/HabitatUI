import React, { useMemo, useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView, Alert
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
  const [cover, onChangeCover] = useState()
  const [iModalVisible, setiModalVisible] = useState(false)

  const confirmationButton = () => {
    makeObservation(setUserLocation, userID, cover, acres, description, imageSource)
    navigation.navigate('Map')
  }

  const closeModal = () => {
    setiModalVisible(false)
  }

  function handleI () {
    setiModalVisible(true)
  }

  function handleBack () {
    Alert.alert('', 'Are you sure you want to discard your observation?', [{
      text: 'Keep'
    },
    {
      text: 'Discard',
      onPress: () => navigation.navigate('Map')
    }])
  }

  const plantDensity = useMemo(
    () => [
      {
        id: '0-5%',
        label: '0-5%',
        value: '0-5%'
      },
      {
        id: '5-15%',
        label: '5-15%',
        value: '5-15%'
      },
      {
        id: '15-25%',
        label: '15-25%',
        value: '15-25%'
      },
      {
        id: '25-50%',
        label: '25-50%',
        value: '25-50%'
      },
      {
        id: 'more than 50%',
        label: 'more than 50%',
        value: 'more than 50%'
      }
    ],
    []
  )

  const sizeSelect = useMemo(
    () => [
      {
        id: 'smaller than a picnic table',
        label: 'smaller than a picnic table',
        value: 'smaller than a picnic table'
      },
      {
        id: 'between a picnic table and a 2 car garage',
        label: 'between a picnic table and a 2 car garage',
        value: 'between a picnic table and a 2 car garage'
      },
      {
        id: 'between a 2 car garage and a basketball court',
        label: 'between a 2 car garage and a basketball court',
        value: 'between a 2 car garage and a basketball court'
      },
      {
        id: 'between a basketball court and a football field',
        label: 'between a basketball court and a football field',
        value: 'between a basketball court and a football field'
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
      <TouchableOpacity style={styles.backButton} onPress={() => handleBack()}>
        <Icon name="x" size={25} color="black" />
      </TouchableOpacity>

      {/* questions portion */}
      <Text style={styles.label}>All questions are optional.{'\n'}</Text>
      <ScrollView>

        {/* estimated size of infestation question */}
        <Text style={styles.label}>Select Estimated Size of Infestation:</Text>
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

        {/* confirmation questions */}
        <Text style={styles.label}>
          Select Estimated Plant Cover:
        {/* i button with information pop up */}
        <TouchableOpacity
          style={styles.IButton}
          onPress={() => handleI()}
        ><Icon name="circle-info" size={15} color="black" />
        </TouchableOpacity>
        </Text>

        {/* buttons for questions */}
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

        {/* modal for i button  */}
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
              <Text style={styles.modalText}>{'\n'}Estimate the amount of the ground in an infestation that is covered with cheat grass. For example,
                if about half the plants in a square foot are cheat grass, then it is 50% cover.</Text>
            </View>
          </View>
        </Modal>

        {/* location description text input */}
        <Text style={styles.label}>Location Description:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeDescription}
          value={description}
          multiline={true}
          placeholder={'Please describe the area. \nInclude landmarks, the cardinal direction, etc.'}
          placeholderTextColor={'#aaa'}
          textAlignVertical="top"
          color='black'
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
  modalCancelButton: {
    zIndex: 2,
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderRadius: 100,
    padding: 10,
    backgroundColor: '#9d9e9d'
  },
  modalDiscardButton: {
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
    borderRadius: 15,
    backgroundColor: 'white'
  }
})

export default ConfirmationPage
