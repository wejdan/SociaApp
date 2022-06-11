import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Animated,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {markers, mapDarkStyle, mapStandardStyle} from '../model/mapData';
import ResturentCard from '../components/ResturentCard';
import {Dimensions} from 'react-native';

let {width, height} = Dimensions.get('window');

const CARD_HEIGHT = 230;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const Map = () => {
  const _map = useRef(null);
  const _scrollView = useRef(null);
  const [location, setCoords] = useState(null);

  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);

      _map.current.animateToRegion({
        ...markers[index].coordinate,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      });
    });
  });
  const categories = [
    {
      name: 'Fastfood Center',
      icon: (
        <MaterialCommunityIcons
          style={styles.chipsIcon}
          name="food-fork-drink"
          size={18}
        />
      ),
    },
    {
      name: 'Restaurant',
      icon: (
        <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />
      ),
    },
    {
      name: 'Dineouts',
      icon: (
        <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />
      ),
    },
    {
      name: 'Snacks Corner',
      icon: (
        <MaterialCommunityIcons
          name="food"
          style={styles.chipsIcon}
          size={18}
        />
      ),
    },
    {
      name: 'Hotel',
      icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
    },
  ];
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setCoords({
        latitude: 22.62938671242907,
        longitude: 88.4354486029795,
      });
    });
  }, []);
  if (location == null) {
    return null;
  }
  const onMarkerPress = e => {
    console.log(e._targetInst.return.key);
    const marker_id = e._targetInst.return.key;
    let x = marker_id * CARD_WIDTH;
    x = x - 10;
    _scrollView.current.scrollTo({
      x: x,
      y: 0,
      Animated: true,
    });
  };
  return (
    <View style={styles.body}>
      <View style={styles.searchBox}>
        <TextInput style={{flex: 1}} placeholder="Search here" />
        <Ionicons name="search" size={22} />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEventThrottle={1}
        contentContainerStyle={{
          paddingRight: 20,
        }}
        style={[styles.categories]}>
        {categories.map((cate, index) => {
          return (
            <View style={styles.categoryItem} key={index}>
              {cate.icon}

              <Text>{cate.name}</Text>
            </View>
          );
        })}
      </ScrollView>

      <Animated.ScrollView
        snapToAlignment="center"
        snapToInterval={CARD_WIDTH + 20}
        // onScroll={(event)=>{mapAnimation.setValue(event.nativeEvent.contentOffset.x)}}
        onScroll={Animated.event(
          //whenever scrolling event fires mapAnimation.setValue(contentOffset.x)
          [{nativeEvent: {contentOffset: {x: mapAnimation}}}],
          {useNativeDriver: true},
        )}
        ref={_scrollView}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEventThrottle={1}
        contentContainerStyle={{
          paddingHorizontal: width * 0.1 - 10,
          alignItems: 'center',
        }}
        style={{position: 'absolute', bottom: 10, left: 0, zIndex: 100}}>
        {markers.map((mark, index) => {
          return <ResturentCard {...mark} key={index} />;
        })}
      </Animated.ScrollView>

      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
        }}>
        {markers.map((mark, index) => {
          return (
            <Marker
              onPress={onMarkerPress}
              key={index}
              coordinate={{
                latitude: mark.coordinate.latitude,
                longitude: mark.coordinate.longitude,
              }}>
              <Animated.View
                style={{
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Animated.Image
                  style={{
                    width: 30,
                    height: 30,
                    transform: [
                      {
                        scale: mapAnimation.interpolate({
                          inputRange: [
                            (index - 1) * CARD_WIDTH,
                            index * CARD_WIDTH,
                            (index + 1) * CARD_WIDTH,
                          ],
                          outputRange: [1, 1.5, 1],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  }}
                  source={require('../assets/map_marker.png')}
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  map: {
    flex: 1,
    zIndex: -1,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  searchBox: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',

    marginTop: 30,
    elevation: 8,
    paddingHorizontal: 10,
  },
  fixedView1: {
    position: 'absolute',

    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  categories: {
    marginTop: 70,
    paddingHorizontal: 10,
    position: 'absolute',
  },
  categoryItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    height: 35,
    elevation: 8,
    marginVertical: 20,
  },
  chipsIcon: {
    marginRight: 5,
  },
});
