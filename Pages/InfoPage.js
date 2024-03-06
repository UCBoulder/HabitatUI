import React, { useState, useRef, createRef } from 'react'
import { Image, ScrollView, Text, StyleSheet, StatusBar, View, Dimensions, Animated } from 'react-native'
import { BurgerMenuButton } from '../components/BurgerMenuButton'
import { useNavigation } from '@react-navigation/native'
// import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'
// import { AnimatedText } from 'react-native-reanimated/lib/typescript/reanimated2/component/Text'

//  gets the dimensions of the screen, should allow images to adapt to different sreen sizes
const windowWidth = Dimensions.get('window').width
const windowHight = Dimensions.get('window').height

const InfoPage = () => {
  const navigation = useNavigation()

  return (
    <View>
      <BurgerMenuButton navigation={navigation}/>
    <ScrollView contentContainerStyle={styles.container} >

      <Image source={require('../images/CheatgrassInfographic.png')} style={styles.infographic} />
      {/* <Image source={require('../images/CheatGrassBrochure-1.png')} style={styles.image} /> */}

      <Text style={styles.header}>This is a header</Text>
      <Text style={styles.text}>Cheatgrass, an invasive species in Gunnison County, threatens the way of life of the Western
      slope. Whether it is decreasing grass availability for ranching, degrading recreational opportunities, or posing fire threats to homeowners, nearly 
      everybody is affected by Cheatgrass. Through education, outreach, and volunteering we can prevent the spread of Cheatgrass.  </Text>

    </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  infographic: {
    //width: 350,
    objectFit: 'contain',
    resizeMode: 'contain'
    //height: 650
  },
  image: {
    width: windowWidth,
    height: 250
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    marginLeft: 10
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15,
    marginLeft: 10
  }
})

export default InfoPage
