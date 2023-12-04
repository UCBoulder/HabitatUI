import React, { useState, useRef, createRef } from "react";
import { Text, ScrollView, StyleSheet, StatusBar, View, Dimensions, Animated } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
//Will need to run: npm i react-native-gesture-handler

const windowWidth = Dimensions.get('window').width; //gets the dimensions of the screen, should allow images to adapt to different sreen sizes


const InfoPage = () => {

  const scale = useRef(new Animated.Value(1)).current; //measures zooming effect
  const transX = useRef(new Animated.Value(0)).current; //measure l/r panning
  const transY = useRef(new Animated.Value(0)).current;

  const [panEnabled, setPanEnabled] = useState(false);

  const pinchRef = createRef();
  const panRef = createRef();


  const onPinch = Animated.event([{
    nativeEvent: { scale }
  }],
    { useNativeDrive: true }
  );

  const onPan = Animated.event([{
    nativeEvent: {
      translationX: transX,
      translationY: transY
    }
  }],
    { useNativeDrive: true }
  );

  const handlePinchStateChange = ({ nativeEvent }) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true
        }).start();
        Animated.spring(transX, {
          toValue: 0,
          useNativeDriver: true
        }).start();
        Animated.spring(transY, {
          toValue: 0,
          useNativeDriver: true
        }).start();

        setPanEnabled(false);
      }
    }
  };


  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={styles.scrollView} >
        <PanGestureHandler
          onGestureEvent={onPan}
          ref={panRef}
          simultaneousHandlers={[pinchRef]}
          enabled={panEnabled}
          failOffsetX={[-1000, 1000]}
          shouldCancelWhenOutside
        >
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinch}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}
          >
            <Animated.View>
              <Text style={styles.headerText}>What is Cheatgrass?</Text>
              <Animated.Image
                source={require('../images/CheatgrassInfographic.png')}
                style={{
                  width: windowWidth,
                  height: windowWidth * 2.75,
                  resizeMode: 'contain',
                  transform: [
                    { scale: scale },
                    { translateX: transX },
                    { translateY: transY }]
                }} />
              <Text style={styles.headerText}>How To Identify Cheatgrass</Text>
              <Animated.Image source={require('../images/IdentifyCheat.png')} style={{
                width: windowWidth,
                height: windowWidth * 2.5,
                padding: 5,
                transform: [
                  { scale: scale },
                  { translateX: transX },
                  { translateY: transY }]
              }} />
              <Text style={styles.headerText}>How To Stop The Spread Of Cheatgrass</Text>
              <Animated.Image source={require('../images/DontGetCheated.png')} style={{
                width: windowWidth,
                height: windowWidth * 2.5,
                padding: 5,
                transform: [
                  { scale: scale },
                  { translateX: transX },
                  { translateY: transY }]
              }} />
              <Text style={styles.headerText}>How Cheatgrass Effects The Gunnison Valley</Text>
              <Animated.Image source={require('../images/DangerOnTheRange.png')} style={{
                width: windowWidth,
                height: windowWidth * 2.5,
                padding: 5,
                transform: [
                  { scale: scale },
                  { translateX: transX },
                  { translateY: transY }]
              }} />
              <Text style={styles.headerText}>The Dangers Of Cheatgrass</Text>
              <Animated.Image source={require('../images/CheatAndFire.png')} style={{
                width: windowWidth,
                height: windowWidth * 2.5,
                padding: 5,
                transform: [
                  { scale: scale },
                  { translateX: transX },
                  { translateY: transY }]
              }} />
            </Animated.View>
          </PinchGestureHandler>
        </PanGestureHandler>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  infographic: {
    width: windowWidth,
    height: windowWidth * 2.75,
    resizeMode: 'contain',
    //transform: [{scale}, {transX}, {transY}]
  },
  image: {
    width: windowWidth,
    height: windowWidth * 2.5,
    padding: 5,
    //transform: [{scale}, {transX}, {transY}]
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  }
}
);

export default InfoPage;


