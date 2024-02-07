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

  const confirmationButton = () => {
    makeObservation(setUserLocation, cover, acres, description, ownership);
    navigation.navigate('Map');
  };

  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Option 1',
        value: 'option1',
      },
      {
        id: '2',
        label: 'Option 2',
        value: 'option2',
      },
    ],
    [],
  );
  const [selectedId, setSelectedId] = useState();

  return (
    <View style={styles.container}>
      {/* Display photo that was taken */}
      <Image
        source={{uri: `file://${imageSource}`}}
        style={styles.confirmationImage}
      />
      <ScrollView>
        {/* <Text> "Estimated cover or density of plants (optional)"</Text> */}
        <TextInput
          style={styles.input}
          onChangeText={onChangeCover}
          value={cover}
          placeholder="Estimated cover or density of plants (optional)"
          placeholderTextColor={'#aaa'}
          multiline={true}
          textAlignVertical="top"
          color="#aaa"
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
        <TextInput
          style={styles.input}
          onChangeText={onChangeOwnership}
          value={ownership}
          placeholder="Land Owned By"
          placeholderTextColor={'#aaa'}
          multiline={true}
          textAlignVertical="top"
          color="#aaa"
        />
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
        />
        {/* <MultiSelect
          hideTags
          percent={percents}
          uniqueKey="percent"
          ref={(component) => { this.multiSelect = component }}
          onPercentChange={this.onPercentChange}
          selectedPercent={selectedPercent}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
         /> */}
      </ScrollView>
      {/*
         <View>
           {this.multiSelect.getSelectedItemsExt(selectedItems)}
         </View> */}
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
});

export default ConfirmationPage;
