/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { BurgerMenuButton } from '../components/BurgerMenuButton'
import { useNavigation } from '@react-navigation/native'

const AboutPage = () => {
  const navigation = useNavigation()
  return (
        <ScrollView contentContainerStyle={styles.container}>
          <BurgerMenuButton navigation={navigation} />
            <Text style={styles.title}> This app was made for Gunnison community members to log local infestations of cheatgrass
            and help the containment efforts</Text>

            {/* <Text style={styles.title}>How to Log Cheatgrass</Text>

            <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>1.</Text>
                <Text style={styles.stepText}>
                    When you spot cheatgrass, open the app and tap on the "Make Observation" button.
                </Text>
            </View>

            <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>2.</Text>
                <Text style={styles.stepText}>
                    Capture a clear photo of the cheatgrass. You can confirm your picture using the checkmark or retake the picture using the retry loop.
                </Text>
            </View>

            <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>3.</Text>
                <Text style={styles.stepText}>
                    Once confirmed, you will be brought to a page displaying the captured picture and a list of optional questions.
                </Text>
            </View>

            <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>4.</Text>
                <Text style={styles.stepText}>
                    Fill out the optional questions as needed. Then press the "Confirm Observation" button to submit your observation.
                </Text>
            </View>

            <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>5.</Text>
                <Text style={styles.stepText}>
                    You will be redirected to back the map with a pin indicating the location you just logged the cheatgrass at.
                </Text>
            </View>

            <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>6.</Text>
                <Text style={styles.stepText}>
                    A success message will be displayed, confirming that your observation was successfully uploaded to our database.
                </Text>
            </View>

            <View style={{ height: 200 }} /> */}

        </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    padding: 20
  },
  stepContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    textAlignVertical: 'top',
    color: 'black'
  },
  stepText: {
    fontSize: 18,
    flex: 1,
    color: 'black'
  },
  title: {
    flex: 1,
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 25
  }
})

export default AboutPage
