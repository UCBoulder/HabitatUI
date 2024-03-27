import React, { useState, useRef, createRef } from 'react'
import { Image, ScrollView, Text, StyleSheet, View, Dimensions, ImageBackground } from 'react-native'
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
    // <ImageBackground
    //   source={require('../images/infoPage.jpeg')}
    //   style={styles.backgroundImage}
    // >
    <View backgroundColor= '#98bd55'>
      <ScrollView contentContainerStyle={styles.container} >
        <BurgerMenuButton navigation={navigation} />

        {/* <Image source={require('../images/CheatgrassInfographic.png')} style={styles.infographic} /> */}
        {/* <Image source={require('../images/CheatGrassBrochure-1.png')} style={styles.image} /> */}

        <Text style={styles.header}>{'\n'}{'\n'}What is Cheatgrass?</Text>
        <Text style={styles.text}>Cheatgrass, an invasive species in Gunnison County, threatens the way of life of the Western
          slope. Whether it is decreasing grass availability for ranching, degrading recreational opportunities, or posing fire threats to homeowners, nearly
          everybody is affected by Cheatgrass. Through education, outreach, and volunteering we can prevent the spread of Cheatgrass.  </Text>
        <Image source={require('../images/cheatgrass.jpg')} style={styles.image} />

        <Text style={styles.header}>How do you identify Cheatgrass? </Text>
        <Text style={styles.text}>-Short flat blade-length (6”-24”) {'\n'}-Sharp seedlet emerging from a “sheath”
          {'\n'}-Sharp spiky seeds typically containing 5-8 seeds in each seedlet {'\n'}-High density of seeds and stalks in a growing area
          {'\n'}-Variable coloration ranging from green, to purple, to tan {'\n'}-Initially bright green in early life stages
        </Text>
        <Image source={require('../images/cheatgrass3.jpg')} style={styles.image} />
        <Text style={styles.text}>
          {'\n'}-Turns purplish when it begins to die and then becomes tan or light brown when it dies completely</Text>
        <Image source={require('../images/cheatgrass2.jpg')} style={styles.image} />

        <Text style={styles.header}>Similar speces to look out for </Text>

        <Text style={styles.text}>Indian Rice Grass {'\n'}-Blonde or light green color{'\n'}-Deep roots so it will not come out of the ground
          {'\n'}-Spikelets contain a single floret {'\n'}-Loose branches with seeds spread at wide angles </Text>
        <Image source={require('../images/indianRiceGrass.jpg')} style={styles.image} />

        <Text style={styles.text}>Needle-and-Thread Grass{'\n'}-Blonde color in the Summer, otherwise greenish
          {'\n'}-Up to three feet in height {'\n'}-Bunchgrass with deep roots {'\n'}Very long bristles that stick to clothing </Text>
        <Image source={require('../images/needleAndThreadGrass.jpg')} style={styles.image} />

        <Text style={styles.text}>Foxtail Barley{'\n'}-1-2 feet tall{'\n'}-Bristly seeds up to four inches long that resemble the tail of a fox
          {'\n'}-About three spikes per node {'\n'}-Seeds can be reddish-brown to purplish in color {'\n'}-Densely packed seeds </Text>
        <Image source={require('../images/foxtailBarley.jpg')} style={styles.image} />

        <Text style={styles.header}>Cheatgrass and Fire: A Deadly Combination </Text>

        <Text style={styles.text}>-Cheatgrass begins to invade the areas between Sagebrush and native grasses, potentially leading to a Cheatgrass monoculture,
          which creates a continuous layer of dry fuel{'\n'}-Cheatgrass creates a more fire susceptible landscape,
          making it easy to ignite and kill off native sagebrush and fauna{'\n'}-After fires occur, Cheatgrass replaces the Sagebrush, and the cycle continues
          {'\n'}-Fire become much more frequent, threatening homes and eliminating the Sagebrush and making Cheatgrass the dominant landscape </Text>

        <Text style={styles.header}>Cheatgrass: Bad for Wildlife, Bad for Business  </Text>

        <Text style={styles.text}>-In Nevada, Cheatgrass has replaced native plants and now makes up 90% of the total biomass
          {'\n'}-The poor forage is bad for wildlife including elk, Sage-Grouse, and deer{'\n'}-Also creates poor grazing conditions for cattle
          and decreases the economic value of land{'\n'}-Cheatgrass threatens the largest remaining population of the Gunnison Sage-Grouse,
          which will become extinct if the spread of Cheatgrass continues{'\n'}-Many ranching, hunting and other economic and outdoor opportunities will be lost too </Text>

        <Text style={styles.header}>Statistics </Text>

        <Text style={styles.text}>-87% of Gunnison Sage-Grouse population in the Gunnison Valley is threatened
          {'\n'}-10,000 Cheatgrass plants can grow in one square meter, dramatically increasing the fire risk
          {'\n'}-12 million acres have been transformed into Cheatgrass monoculture in the Great Basin </Text>
          <Image source={require('../images/cheatgrassInfestation.jpg')} style={styles.image} />

        <Text style={styles.header}>Don’t Get Cheated </Text>

        <Text style={styles.text}>-Removing Cheatgrass from your property is an effective solution
          {'\n'}-Pulling it by hand or using commercially available herbicides are two common forms of removal
          {'\n'}-Removal is most effective when accompanied by planting of native grasses
          {'\n'}-Clean boots, gear, and vehicles before traveling to another location to avoid spreading Cheatgrass </Text>
        <Image source={require('../images/CheatgrassStuckInSocks.jpg')} style={styles.longImage} />

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
  backgroundImage: {
    flex: 1
  },
  infographic: {
    width: windowWidth,
    objectFit: 'contain',
    resizeMode: 'contain'
  },
  image: {
    width: windowWidth,
    height: 350
  },
  longImage: {
    width: windowWidth,
    height: 450
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 15
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15,
    marginLeft: 10
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'center',
    alignItems: 'center'
  }
})

export default InfoPage
