import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const statusBarHeight = StatusBar.currentHeight || 0; // Get the status bar height
const BottomDrawerSupport = ({index, title}) => {
  <View
    style={[
      styles.container,
      {backgroundColor: `rgba(0,0,50, 0.${index + 2})`},
    ]}>
    <Text style={styles.text}>{title}</Text>
  </View>;
};

export default BottomDrawerSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('screen').height - statusBarHeight, // Adjust the height by subtracting the status bar height
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
