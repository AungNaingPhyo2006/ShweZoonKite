import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const BackTimer = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = BackgroundTimer.setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
    }, 1000); // 1000 milliseconds = 1 second

    return () => {
      BackgroundTimer.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    console.log('timer ===>', counter);
  }, [counter]);

  return (
    <View>
      <Text>Timer Screen</Text>
      <Text>Counter: {counter}</Text>
    </View>
  );
};

export default BackTimer;

const styles = StyleSheet.create({});
