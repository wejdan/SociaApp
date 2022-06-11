import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {Dimensions} from 'react-native';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const backgroundColor = isLight => (isLight ? 'blue' : 'lightblue');
const color = isLight => backgroundColor(!isLight);
const Square = ({isLight, selected}) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Done = ({isLight, ...props}) => (
  <TouchableOpacity {...props} style={{marginHorizontal: 10}}>
    <Text style={{fontSize: 16}}>Done</Text>
  </TouchableOpacity>
);

const Skip = ({...props}) => (
  <TouchableOpacity {...props} style={{marginHorizontal: 10}}>
    <Text style={{fontSize: 16}}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity {...props} style={{marginHorizontal: 10}}>
    <Text style={{fontSize: 16}}>Next</Text>
  </TouchableOpacity>
);
const OnBoardingScreen = ({navigation}) => {
  return (
    <Onboarding
      DotComponent={Square}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.replace('Login')}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={styles.img}
              source={{
                uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ebc954bc-c11c-41eb-9169-e70b840c7545/dcrroqf-4dfb1b9e-035c-499a-bae4-db12ce168367.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ViYzk1NGJjLWMxMWMtNDFlYi05MTY5LWU3MGI4NDBjNzU0NVwvZGNycm9xZi00ZGZiMWI5ZS0wMzVjLTQ5OWEtYmFlNC1kYjEyY2UxNjgzNjcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.8ppEK-JcyGFaRWberJGesMg5G9gzHLbjRWFWbPJheMw',
              }}
            />
          ),
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fe6e58',
          image: (
            <Image
              style={styles.img}
              source={{
                uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5dc3813c-0a92-481b-8993-31f61f6165d7/dcddgiu-9f51cecf-36ec-473a-af51-91999b91e946.png/v1/fill/w_1000,h_586,strp/my_hero_academia___boy_band_version__by_banana_banshee_dcddgiu-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTg2IiwicGF0aCI6IlwvZlwvNWRjMzgxM2MtMGE5Mi00ODFiLTg5OTMtMzFmNjFmNjE2NWQ3XC9kY2RkZ2l1LTlmNTFjZWNmLTM2ZWMtNDczYS1hZjUxLTkxOTk5YjkxZTk0Ni5wbmciLCJ3aWR0aCI6Ijw9MTAwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.L464TuIQMHi2dJqRbpFmuGTyjQjL9elxphsQg24rHdw',
              }}
            />
          ),
          title: 'The Title',
          subtitle: 'This is the subtitle that sumplements the title.',
        },
        {
          backgroundColor: '#999',
          image: (
            <Image
              style={styles.img}
              source={{
                uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/251b0a36-fbb8-4677-a422-ebb1bb71003a/dbu7lgw-c2bebef5-c7ba-40f6-b86c-8e398e46539b.jpg/v1/fill/w_1201,h_665,q_70,strp/deku___bnha_wallpaper_by_spukycat_dbu7lgw-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzA5IiwicGF0aCI6IlwvZlwvMjUxYjBhMzYtZmJiOC00Njc3LWE0MjItZWJiMWJiNzEwMDNhXC9kYnU3bGd3LWMyYmViZWY1LWM3YmEtNDBmNi1iODZjLThlMzk4ZTQ2NTM5Yi5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.rxhA4spcPiNlDNC7I4dONfeJmzMnuOvMKtLV4xLmdXA',
              }}
            />
          ),
          title: 'Triangle',
          subtitle: "Beautiful, isn't it?",
        },
      ]}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  img: {
    width: windowWidth,
    height: windowHeight / 2,
    top: 0,
  },
  link: {
    color: '#2e64e5',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
  },
});
