import React, { useState, useRef, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, StatusBar, View, Dimensions, Animated } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

const InfoPage = () => {
  const images = [
    require('../images/CheatgrassInfographic.png'),
    require('../images/IdentifyCheat.png'),
    require('../images/DontGetCheated.png'),
    require('../images/DangerOnTheRange.png'),
    require('../images/CheatAndFire.png'),
  ];

  const [panEnabled, setPanEnabled] = useState(false);

  const createPanRef = () => images.map(() => useRef(null));
  const panRefs = createPanRef();

  const createPinchRef = () => images.map(() => useRef(null));
  const pinchRefs = createPinchRef();

  const createScale = () => images.map(() => new Animated.Value(1));
  const scales = createScale();

  const createTransX = () => images.map(() => new Animated.Value(0));
  const transXs = createTransX();

  const createTransY = () => images.map(() => new Animated.Value(0));
  const transYs = createTransY();

  const onPinch = (index) =>
    Animated.event(
      [
        {
          nativeEvent: { scale: scales[index] },
        },
      ],
      { useNativeDriver: false } // Note: Set useNativeDriver to false
    );

  const onPan = (index) =>
    Animated.event(
      [
        {
          nativeEvent: {
            translationX: transXs[index],
            translationY: transYs[index],
          },
        },
      ],
      { useNativeDriver: false } // Note: Set useNativeDriver to false
    );

  const handlePinchStateChange = (index, { nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scales[index], { toValue: 1, useNativeDriver: false }).start();
        Animated.spring(transXs[index], { toValue: 0, useNativeDriver: false }).start();
        Animated.spring(transYs[index], { toValue: 0, useNativeDriver: false }).start();

        setPanEnabled(false);
      }
    }
  };

  useEffect(() => {
    // Clean up references
    return () => {
      panRefs.forEach((ref) => (ref.current = null));
      pinchRefs.forEach((ref) => (ref.current = null));
    };
  }, []);

  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {images.map((source, index) => (
          <View key={index}>
            <Text style={styles.headerText}>{`Image ${index + 1}`}</Text>
            <PanGestureHandler
              ref={(ref) => (panRefs[index].current = ref)}
              onGestureEvent={onPan(index)}
              simultaneousHandlers={pinchRefs[index]}
              enabled={panEnabled}
              failOffsetX={[-1000, 1000]}
              shouldCancelWhenOutside
            >
              <Animated.View>
                <PinchGestureHandler
                  ref={(ref) => (pinchRefs[index].current = ref)}
                  onGestureEvent={onPinch(index)}
                  simultaneousHandlers={panRefs[index]}
                  onHandlerStateChange={(event) => handlePinchStateChange(index, event)}
                >
                  <Animated.Image
                    source={source}
                    style={{
                      width: windowWidth,
                      height: windowWidth * 2.5,
                      padding: 5,
                      transform: [
                        { scale: scales[index] },
                        { translateX: transXs[index] },
                        { translateY: transYs[index] },
                      ],
                    }}
                  />
                </PinchGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </View>
        ))}
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


