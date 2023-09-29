import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Button,
  View,
  Alert,
} from 'react-native';

const App = () => {
const [session, setSession] = useState(1);
const onClickHandler = () => {
  setSession(session + 1)
  checkSession(session + 1);
};

const checkSession = (newSession: number) => {
  if (newSession === 10) {
    showSessionReachedAlert();
  }
};

const showSessionReachedAlert = () => {
  Alert.alert('Stop', 'congrats you can count to 10', [
    {
      text: 'OK',
    },
  ]);
};


  return (
    <View style={styles.body}>
      <Text style={styles.text}> This is session number {session}</Text>
      <Button title='Update session number' onPress={onClickHandler}></Button>
      </View>
  );
  };

const styles = StyleSheet.create({
  body : {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});

export default App;