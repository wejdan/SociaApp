import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

function SocialButton({
  children,
  onPress,
  title,
  icon,
  color,
  backgroundColor,
}) {
  return (
    <Pressable
      style={{...styles.button, backgroundColor: backgroundColor}}
      onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={icon} size={22} color={color} />

        <Text style={{...styles.buttonText, color: color, flex: 1}}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

export default SocialButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: '#2e64e5',

    justifyContent: 'center',
    height: 44,
    width: 270,
    alignSelf: 'center',
    width: '100%',
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
