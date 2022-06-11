import {View, Text} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Stars = props => {
  let icons = [];

  for (let index = 1; index <= 5; index++) {
    let name = 'ios-star';
    if (props.count < index) {
      name = 'ios-star-outline';
    }

    icons.push(<Ionicons name={name} color="#FF8C00" size={15} key={index} />);
  }
  return (
    <View style={{flexDirection: 'row'}}>
      {icons}

      <Text style={{fontSize: 12, marginLeft: 5, color: '#444'}}>
        ({props.reviews})
      </Text>
    </View>
  );
};

export default Stars;
