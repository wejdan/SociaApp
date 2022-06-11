import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  error,
  onBlur,
  icon,
  placeholder,
}) {
  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          borderRightWidth: 1,
          borderRightColor: '#E5E5E5',
          justifyContent: 'center',
          padding: 10,
          width: 50,
          alignItems: 'center',
        }}>
        <AntDesign name={icon} size={22} />
      </View>

      <TextInput
        style={[styles.input, error != null && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {error != null && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    paddingVertical: 0,

    borderRadius: 4,
    fontSize: 14,
    borderWidth: 1,

    borderColor: '#E5E5E5',
    backgroundColor: 'white',

    flexDirection: 'row',
  },

  input: {
    flex: 1,
    padding: 10,
  },
  inputInvalid: {
    borderColor: 'red',
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
});
