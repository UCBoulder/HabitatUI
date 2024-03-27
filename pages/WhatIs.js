import React from 'react'
import { Image, ScrollView, Text, StyleSheet, View, Dimensions } from 'react-native'
import { BurgerMenuButton } from '../components/BurgerMenuButton'
import { useNavigation } from '@react-navigation/native'
// import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'
// import { AnimatedText } from 'react-native-reanimated/lib/typescript/reanimated2/component/Text'

//  gets the dimensions of the screen, should allow images to adapt to different sreen sizes
const windowWidth = Dimensions.get('window').width
// const windowHight = Dimensions.get('window').height

const WhatIs = () => {
  const navigation = useNavigation()

  return (
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

          <Text style={styles.header}>Cheatgrass and Fire: A Deadly Combination </Text>

          <Text style={styles.text}>-Cheatgrass begins to invade the areas between Sagebrush and native grasses, potentially leading to a Cheatgrass monoculture,
            which creates a continuous layer of dry fuel{'\n'}-Cheatgrass creates a more fire susceptible landscape,
            making it easy to ignite and kill off native sagebrush and fauna{'\n'}-After fires occur, Cheatgrass replaces the Sagebrush, and the cycle continues
            {'\n'}-Fire become much more frequent, threatening homes and eliminating the Sagebrush and making Cheatgrass the dominant landscape </Text>

          <Text style={styles.header}>Cheatgrass: Bad for Wildlife; Bad for Business  </Text>

          <Text style={styles.text}>-In Nevada, Cheatgrass has replaced native plants and now makes up 90% of the total biomass
            {'\n'}-The poor forage is bad for wildlife including elk, Sage-Grouse, and deer{'\n'}-Also creates poor grazing conditions for cattle
            and decreases the economic value of land{'\n'}-Cheatgrass threatens the largest remaining population of the Gunnison Sage-Grouse,
            which will become extinct if the spread of Cheatgrass continues{'\n'}-Many ranching, hunting and other economic and outdoor opportunities will be lost too </Text>

          <Text style={styles.header}>Statistics </Text>

          <Text style={styles.text}>-87% of Gunnison Sage-Grouse population in the Gunnison Valley is threatened
            {'\n'}-10,000 Cheatgrass plants can grow in one square meter, dramatically increasing the fire risk
            {'\n'}-12 million acres have been transformed into Cheatgrass monoculture in the Great Basin </Text>
            <Image source={require('../images/cheatgrassInfestation.jpg')} style={styles.image} />

          <Text style={styles.header}>Prevent the Spread: Don’t Get Cheated </Text>

          <Text style={styles.text}>-Removing Cheatgrass from your property is an effective solution
            {'\n'}-Pulling it by hand or using commercially available herbicides are two common forms of removal
            {'\n'}-Removal is most effective when accompanied by planting of native grasses
            {'\n'}-Clean boots, gear, and vehicles before traveling to another location to avoid spreading Cheatgrass </Text>
          <Image source={require('../images/CheatgrassStuckInSocks.jpg')} style={styles.longImage} />

          <Text style={styles.header}>Contact Information </Text>

          <Text style={styles.nametext}>Bureau of Land Management (BLM) Gunnison Field Office:</Text>
          <Text style={styles.text}>Phone: (970) 642-4940{'\n'}
          Address: 2500 E New York Ave, Gunnison, CO 81230</Text>

          <Text style={styles.nametext}>County Weed Management Program:</Text>
          <Text style={styles.text}>Phone: (970) 641-4393{'\n'}
            Address: 725 S. 10th Street, Gunnison, CO 81230</Text>

          <Text style={styles.nametext}>US Forest Service Supervisor{"'"}s Office
           - Grand Mesa, Uncompahgre and Gunnison National Forests</Text>
          <Text style={styles.text}>Phone: (970) 874-6600{'\n'}
          Address: 2250 South Main St, Delta, CO 81416</Text>

          <Text style={styles.nametext}>Paul M. Rady School of Computer Science & Engineering</Text>
          <Text style={styles.text}>Phone: (970) 943-2400{'\n'}
            Address: 777 E Georgia Ave, Gunnison, CO 81230</Text>
          <Image source={require('../images/WesternCULogo.jpg')} style={styles.WCULogo} />
          <Text></Text>

        </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
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
  WCULogo: {
    flex: 1,
    width: windowWidth,
    height: 94
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 15,
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15,
    marginLeft: 10
  },
  nametext: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15,
    marginLeft: 10,
    textDecorationLine: 'underline'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'center',
    alignItems: 'center'
  }
})

export default WhatIs
