import React from 'react'
import { Image, ScrollView, Text, StyleSheet, View } from 'react-native'
import { BurgerMenuButton } from '../components/BurgerMenuButton'
import { useNavigation } from '@react-navigation/native'

const TutorialPage = () => {
  const navigation = useNavigation()

  return (
    <View backgroundColor='#98bd55'>
      <View style={styles.burgerMenuContainer}>
        <BurgerMenuButton navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>{'\n'}{'\n'}Hello, welcome to CheatMaps</Text>
        <Text style={styles.text}>To make an observation, tap the {'"'}Make Observation{'"'} button at the bottom of the Map.</Text>
        <Image source={require('../images/tutorial/MapTutorial.png')} style={styles.image} />
        <Text style={styles.text}>Take a picture by tapping the circle at the bottom of the next screen.</Text>
        <Image source={require('../images/tutorial/CameraTutorial.png')} style={styles.image} />
        <Text style={styles.text}>To retake a picture tap the retry button, or tap the check mark to continue.</Text>
        <Image source={require('../images/tutorial/ConfirmImageTutorial.png')} style={styles.image} />
        <Text style={styles.text}>Answer as many of the 3 questions on the confirmation page as you can, then scroll down and tap the
          {'"'}Confirm Observation{'"'} button. Or tap the X in the upper left hand corner to abandon the observation.</Text>
        <Image source={require('../images/tutorial/QuestionsTutorial.png')} style={styles.image} />
        <Image source={require('../images/tutorial/LocationDescriptionTutorial.png')} style={styles.image} />
        <Text style={styles.text}>Once you see the success dialogue your observation has been uploaded! If you are out of service your
        observation will be saved and uploaded once you are back in range!</Text>
        <Image source={require('../images/tutorial/SuccessTutorial.png')} style={styles.image} />
        <Text style={styles.header}>Thank you for helping us track cheatgrass in the Gunnison Valley!</Text>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  burgerMenuContainer: {
    position: 'absolute',
    zIndex: 100
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginBottom: 15,
    marginLeft: 15,
    textAlign: 'center'

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 20
  }
})

export default TutorialPage
