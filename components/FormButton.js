import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

function Button({children, onPress, disabled}) {
  return (
    <Pressable
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <View>
        <Text
          style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: '#2e64e5',

    justifyContent: 'center',
    height: 44,
    width: 270,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    backgroundColor: '#e3e3e3',
    elevation: 0,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#a9abb8',
  },
});
