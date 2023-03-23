import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextTicker from 'react-native-text-ticker';

const TextTickerScreen = ({title}) => {
  return (
    <View style={styles.container}>
      <TextTicker
        style={styles.text}
        duration={6000}
        loop
        bounce
        repeatSpacer={50}
        marqueeDelay={1000}>
        {title}
      </TextTicker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TextTickerScreen;
