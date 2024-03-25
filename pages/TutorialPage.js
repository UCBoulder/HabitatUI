import React, { useState, useRef, createRef } from 'react'
import { Image, ScrollView, Text, StyleSheet, View, Dimensions, ImageBackground } from 'react-native'
import { BurgerMenuButton } from '../components/BurgerMenuButton'
import { useNavigation } from '@react-navigation/native'

const TutorialPage = () => {
  const navigation = useNavigation()

  return (
        <View>
            <BurgerMenuButton navigation={navigation} />
            <Text>Hello</Text>
        </View>

  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between'
  }
})

export default TutorialPage
