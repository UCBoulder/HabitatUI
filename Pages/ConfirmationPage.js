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

const percents = [
  {
    percent: '0-20%',
  },
  {
    percent: '20-40%',
  },
  {
    percent: '40-60%',
  },
  {
    percent: '60-80%',
  },
  {
    percent: '80-100%',
  },
];

const ownership = [
  {
    ownedby: 'Private',
  },
  {
    ownedby: 'BLM (Bureau of Land Management)',
  },
  {
    ownedby: 'USFS (US Forest Service)',
  },
  {
    ownedby: 'Colorado State',
  },
  {
    ownedby: 'NPS (National Park Service)',
  },
  {
    ownedby: 'Unknown',
  },
];

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
  const [cover, onChangeCover] = useState('');
  const [acres, onChangeAcres] = useState('');
  const [description, onChangeDescription] = useState('');
  const [ownership, onChangeOwnership] = useState('');
  const [selectedId, setSelectedId] = useState();

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

  return (
    <View style={styles.container}>
      {/* Display photo that was taken */}
      <Image
        source={{uri: `file://${imageSource}`}}
        style={styles.confirmationImage}
      />
      <ScrollView>
        {/* <Text> "Estimated cover or density of plants (optional)"</Text> */}
        <RadioGroup
          radioButtons={plantDensity}
          onPress={setSelectedId}
          selectedId={selectedId}
          layout="row"
          flexDirection="row"
          containerStyle={styles.radioGroupContainer} // Add this line for additional styling
          buttonContainerStyle={styles.radioButtonContainer}
          labelStyle={{color: 'black'}}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeAcres}
          value={acres}
          placeholder="Estimated acres"
          placeholderTextColor={'#aaa'}
          multiline={true}
          textAlignVertical="top"
          color="#aaa"
        />
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
      </ScrollView>

      <TouchableOpacity
        style={styles.confirmationButton}
        onPress={confirmationButton}>
        <Text style={styles.buttonText}>Confirm Observation</Text>
      </TouchableOpacity>
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
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  radioGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  radioButtonContainer: {
    width: '30%', // Adjust this value as needed
    marginVertical: 5,
  },
});

export default ConfirmationPage;
