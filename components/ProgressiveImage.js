import {View, StyleSheet, Animated} from 'react-native';
import React, {useState} from 'react';

const ProgressiveImage = props => {
  const defaultImageAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);
  const handleDefaultImageLoad = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleImageLoad = () => {
    // Will change fadeAnim value to 0 in 3 seconds

    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={{width: '100%'}}>
      <Animated.Image
        {...props}
        source={{uri: props.defaultImageSource}}
        style={[props.style, {opacity: defaultImageAnimated}]}
        onLoad={handleDefaultImageLoad}
        blurRadius={1}
      />
      <Animated.Image
        {...props}
        source={{uri: props.source}}
        style={[props.style, {opacity: imageAnimated}, styles.imageOverlay]}
        onLoad={handleImageLoad}
      />
      <Animated.Image
        {...props}
        source={{uri: props.source}}
        style={[props.style, {opacity: imageAnimated}, styles.imageOverlay]}
        onLoad={handleImageLoad}
      />
    </View>
  );
};

export default ProgressiveImage;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
