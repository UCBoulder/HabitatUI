import React, {useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {makeObservation} from '../utils/MakeObservation';
import RadioGroup from 'react-native-radio-buttons-group';


state = {
  selectedPercent: [],
};

onPercentChange = selectedPercent => {
  this.setState({selectedPercent});
};

state = {
  selectedOwnership: [],
};

onOwnershipChange = selectedOwnership => {
  this.setState({selectedOwnership});
};

const ConfirmationPage = ({route, setUserLocation}) => {
  const navigation = useNavigation();
  const {imageSource} = route.params;
  const [acres, onChangeAcres] = useState('');
  const [description, onChangeDescription] = useState('');
  const [ownership, onChangeOwnership] = useState('');
  const [cover, onChangeCover] = useState();

  const confirmationButton = () => {
    makeObservation(setUserLocation, cover, acres, description, ownership);
    navigation.navigate('Map');
  };

  const plantDensity = useMemo(
    () => [
      {

        id: '1', // acts as primary key, should be unique and non-empty string
        label: '0-20%',
        value: '0-20%',
      },
      {
        id: '2',
        label: '20-40%',
        value: '20-40%',
      },
      {
        id: '3',
        label: '40-60%',
        value: '40-60%',
      },
      {
        id: '4',
        label: '60-80%',
        value: '60-80%',
      },
      {
        id: '5',
        label: '80-100%',
        value: '80-100%',
      },
    ],
    [],
  );
    const landOwnership = useMemo(
          () => [
      {
        id: 'Private', // acts as primary key, should be unique and non-empty string
        label: 'Private',
        value: 'Private',
      },
      {
        id: 'Bureau of Land Management (BLM)',
        label: 'Bureau of Land Management (BLM)',
        value: 'Bureau of Land Management (BLM)',
      },
      {
        id: 'US Forest Service (USFS)',
        label: 'US Forest Service (USFS)',
        value: 'US Forest Service (USFS)',
      },
      {
        id: 'Colorado State',
        label: 'Colorado State',
        value: 'Colorado State',
      },
      {
        id: 'National Park Service (NPS)',
        label: 'National Park Service (NPS)',
        value: 'National Park Service (NPS)',
      },
      {
        id: 'Unknown',
        label: 'Unknown',
        value: 'Unknown',
      },
    ],
    [],
  );


  return (
    <View style={styles.container}>
      {/* Display photo that was taken */}
      <Image
        source={{uri: `file://${imageSource}`}}
        style={styles.confirmationImage}
      />
      <ScrollView>
      {/* <Text style={styles.label}>All fields optional</Text> */}
        {/* <Text> "Estimated cover or density of plants (optional)"</Text> */}
        <Text style={styles.label}> Select Estimated Plant Cover (optional):</Text>
        <RadioGroup
          radioButtons={plantDensity}
          onPress={onChangeCover}
          selectedId={cover}
          layout="row"
          flexDirection="row"
          containerStyle={styles.radioGroupContainer} // Add this line for additional styling
          buttonContainerStyle={styles.radioButtonContainer}
          labelStyle={{color: 'black'}}
        />
        
        <Text style={styles.label}>Land Owned By (optional):</Text>
        <RadioGroup
          radioButtons={landOwnership}
          onPress={onChangeOwnership}
          selectedId={ownership}
          layout="row"
          flexDirection="row"
          containerStyle={styles.radioGroupContainer} // Add this line for additional styling
          buttonContainerStyle={styles.radioButtonContainer}
          labelStyle={{color: 'black'}}
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
      
      <TouchableOpacity
        style={styles.confirmationButton}
        onPress={confirmationButton}>
        <Text style={styles.buttonText}>Confirm Observation</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationImage: {
    width: '100%',
    height: '50%',
  },
  input: {
    flex: 1,
    height: 100,
    width: 350,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    textDecorationColor: '#aaa',
    textAlignVertical: 'top',
  },
  confirmationButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    bottom: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
radioGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  radioButtonContainer: {
    width: '30%', // Adjust this value as needed
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ConfirmationPage;
