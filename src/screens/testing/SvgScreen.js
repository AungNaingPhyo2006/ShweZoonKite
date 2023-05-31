import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

// import SvgAnimator from '../SvgAnimator';
const SvgScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Helloe</Text>
      <View>
        <FastImage
          source={require('../../assets/images/happy.gif')}
          style={{width: 200, height: 200, borderRadius: 100}}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </View>
  );
};

export default SvgScreen;

const styles = StyleSheet.create({});
