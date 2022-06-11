import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Stars from './Stars';
import {Dimensions} from 'react-native';

let {width, height} = Dimensions.get('window');

const CARD_HEIGHT = 230;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const ResturentCard = props => {
  return (
    <View style={styles.card}>
      <Image source={props.image} style={styles.img} />
      <View style={styles.details}>
        <Text style={{fontWeight: 'bold'}}>{props.title}</Text>
        <View>
          <Stars count={props.rating} reviews={props.reviews} />
        </View>
        <Text style={{fontSize: 12}}>{props.description}</Text>
        <TouchableOpacity style={styles.btn}>
          <Text style={{color: '#FF6347'}}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResturentCard;
const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: '#FF6347',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 4,
    padding: 5,
  },
  details: {
    padding: 10,
    flex: 2,
  },
  img: {
    width: '100%',
    flex: 3,
  },
  card: {
    backgroundColor: 'white',
    width: CARD_WIDTH,

    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    height: CARD_HEIGHT,
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
