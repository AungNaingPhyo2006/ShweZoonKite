import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import BottomDrawerSupport from './BottomDrawerSupport';
const BottomDrawer = () => {
  return (
    <Animated.ScrollView pagingEnabled style={styles.container}>
      {/* so here are your screens, for example first camera second images */}
      <BottomDrawerSupport title={'PAGE 1 '} index={0} />
      <BottomDrawerSupport title={'PAGE 2'} index={1} />
    </Animated.ScrollView>
  );
};

export default BottomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
