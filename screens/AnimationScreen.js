import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Animated,
  Image,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
const AnimationScreen = () => {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, {
            toValue: 1,

            useNativeDriver: true,
          }),
          Animated.spring(progress, {
            toValue: 0.5,

            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.spring(scale, {
            toValue: 2,

            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,

            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);
  console.log(
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 100],
    }),
  );
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            borderRadius: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [(0 * 100) / 2, (1 * 100) / 2],
            }),
            opacity: progress,
            transform: [
              {scale},
              {
                rotate: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', (2 * Math.PI).toString() + 'deg'],
                }),
              },
            ],
          },
        ]}></Animated.View>
    </View>
  );
};

export default AnimationScreen;
const SIZE = 100.0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,256,0.5)',
  },
});
