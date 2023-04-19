import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const Timertest = () => {
  const [timer, setTimer] = useState(0);
  const [intervale, setIntervale] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId = null;
    if (isActive) {
      intervalId = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      //clear the interval when the component unmounts
      clearInterval(intervalId);
    }
    //clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isActive, timer]);

  //console.log(timer);
  const stopTimer = () => {
    //  clearInterval(intervale);
    // setTimer(null);
    // setIntervale(null);
    setIsActive(false);
  };
  const startTimer = () => {
    // const intervalId = setInterval(() => {
    //   setTimer(prev => prev + 1);
    // }, 1000);
    // setIntervale(intervalId);
    setIsActive(true);
    //  setTimer(0);
  };
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>Timertest</Text>
      <Text>{timer}</Text>
      <Button
        title={isActive ? 'Stop' : 'Start'}
        onPress={isActive ? stopTimer : startTimer}
      />
    </View>
  );
};

export default Timertest;

const styles = StyleSheet.create({});
