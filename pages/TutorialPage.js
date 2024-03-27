import React, { useState, useRef, createRef } from 'react'
import { Image, ScrollView, Text, StyleSheet, View, Dimensions, ImageBackground } from 'react-native'
import { BurgerMenuButton } from '../components/BurgerMenuButton'
import { useNavigation } from '@react-navigation/native'

const TutorialPage = () => {
  const navigation = useNavigation()

  return (
  <View backgroundColor= '#98bd55'>
    <ScrollView contentContainerStyle={styles.container}>
      <BurgerMenuButton navigation={navigation} />
      <Text style ={styles.header}>{'\n'}{'\n'}Hello, welcome to the tracking growth of cheatgrass app.</Text>
      <Text style ={styles.text}>To make an observation, tap the {'"'}Make Observation{'"'} button at the bottom of the Map.{'\n'}
      Take a picture by tapping the circle at the bottom of the next screen.{'\n'}
      To retake a picture tap the retry button, or tap the check mark to continue.{'\n'}
      Answer as many of the 3 questions on the confirmation page as you can, then scroll down and tap the
       {'"'}Confirm Observation{'"'} button. Or tap the X in the upper left hand corner to abandon the observation.</Text>
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
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15,
    marginLeft: 10
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 20
  }
})

export default TutorialPage
