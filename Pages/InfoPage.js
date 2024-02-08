import React from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'

const InfoPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image source={require('../images/CheatgrassInfographic.png')} style={styles.infographic} />
      {/* <Image source={require('../images/CheatGrassBrochure-1.png')} style={styles.image} /> */}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  infographic: {
    width: 250,
    height: 625
  },
  image: {
    width: 550,
    height: 250
  }
})

export default InfoPage
