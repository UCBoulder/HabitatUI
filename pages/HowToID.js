import React from 'react'
import { Image, ScrollView, Text, StyleSheet, View, Dimensions } from 'react-native'
import { BurgerMenuButton } from '../components/BurgerMenuButton'
import { useNavigation } from '@react-navigation/native'

//  gets the dimensions of the screen, should allow images to adapt to different sreen sizes
const windowWidth = Dimensions.get('window').width
// const windowHight = Dimensions.get('window').height

const HowToID = () => {
  const navigation = useNavigation()

  return (
    <View backgroundColor= '#98bd55'>
      <ScrollView contentContainerStyle={styles.container} >
        <BurgerMenuButton navigation={navigation} />

        <Text style={styles.header}>{'\n'}{'\n'}How do you identify Cheatgrass? </Text>
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

export default HowToID
