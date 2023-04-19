import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  Event,
  State,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import SleepModal from './SleepModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import BackgroundTimer from 'react-native-background-timer';

const PlayerControl = ({onShuffle}) => {
  const [sleepTime, setSleepTime] = useState(null); // sleep timer
  const [sleepModalVisible, setSleepModalVisible] = useState(false);
  const [playerState, setPlayerState] = useState(null); // player state
  const [isActive, setIsActive] = useState(false);
  const [test, setTest] = useState(0);

  console.log('testing->', test);

  const onClose = () => {
    setSleepModalVisible(false);
  };

  async function handlePlayPress() {
    if (playerState === State.Playing) {
      await TrackPlayer.pause();
      setPlayerState(State.Paused);
      stopTimer();
    } else {
      await TrackPlayer.play();
      setPlayerState(State.Playing);
      startTimer();
    }
  }

  const stopTimer = async () => {
    setIsActive(false);
  };

  const startTimer = () => {
    setIsActive(true);
  };

  useEffect(() => {
    let intervalId = null;
    if (isActive && sleepTime !== null) {
      if (test === 0) {
        console.log('stopped');
        setPlayerState(State.Paused);
        return;
      }
      intervalId = setInterval(() => {
        setTest(prev => prev - 1);
      }, 1000);
    } else if (!isActive) {
      clearInterval(intervalId);
      console.log('clearInterval is run', test);
    }
    //clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isActive, test, sleepTime]);

  const setSleepTimer = async minutes => {
    if (minutes === 'stop') {
      setSleepTime(null);
    } else {
      const sleepTime = minutes * 60; // to convert minutes to seconds

      setSleepTime(sleepTime);
      setTest(sleepTime); //add ++
      setSleepModalVisible(false);
    }
  };

  //<---------------------->

  useEffect(() => {
    const progressListener = TrackPlayer.addEventListener(
      Event.PlaybackProgressUpdated,
      ({position, duration}) => {
        if (sleepTime !== null && test === 0) {
          TrackPlayer.pause();
          setSleepTime(null);
          setTest(0);
          console.log('PlaybackProgressUpdated is running');
        }
      },
    );

    // Remove  event listener when the component unmounts
    return () => {
      progressListener.remove();
    };
  }, [sleepTime, test]);

  const onStop = async () => {
    setSleepTime(null);
    setTest(0);
    setSleepModalVisible(false);
  };

  const sleepTimes = async minutes => {
    let sleepMinutes;
    switch (minutes) {
      case 5:
      case 10:
      case 15:
      case 30:
      case 45:
      case 60:
      case 'stop':
        sleepMinutes = minutes;
        break;
      default:
        sleepMinutes = 0;
    }

    if (sleepMinutes > 0) {
      setSleepTimer(sleepMinutes);
      // Play the track if it's not playing
      if (playerState !== State.Playing) {
        console.log('i am playing in sleepTimes Fn with: ', sleepMinutes);
        handlePlayPress();
      }
    }
  };

  return (
    <View
      style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
      <Icon.Button
        name="random"
        size={28}
        backgroundColor="transparent"
        onPress={onShuffle}
      />
      <Icon.Button
        name="arrow-left"
        size={28}
        backgroundColor="transparent"
        onPress={() => TrackPlayer.skipToPrevious()}
      />
      <Icon.Button
        name={playerState == State.Playing ? 'pause' : 'play'}
        size={28}
        backgroundColor="transparent"
        onPress={handlePlayPress}
      />
      <Icon.Button
        name="arrow-right"
        size={28}
        backgroundColor="transparent"
        onPress={() => TrackPlayer.skipToNext()}
      />

      {sleepTime === null ? (
        <Icon.Button
          name="clock-o"
          size={28}
          backgroundColor="transparent"
          // onPress={sleepTimes}     // onPress={() => sleepTimes(10)}
          onPress={() => setSleepModalVisible(!sleepModalVisible)}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setSleepModalVisible(!sleepModalVisible)}>
          <Text style={{color: '#fff'}}>
            ⏰
            {sleepTime !== null && test > 0
              ? moment.utc(Math.max(test * 1000, 0)).format('m:ss')
              : ''}
          </Text>
        </TouchableOpacity>
      )}
      {/* TEST */}
      <Text style={{color: 'pink', fontSize: 11}}>
        {/* {!isNaN(Date.parse(stopTime))
          ? moment.utc(Math.ceil(stopTime, 0)).format('m:ss')
          : ''} */}
        {/* {moment.utc(Math.max(test * 1000, 0)).format('m:ss')} */}
      </Text>
      <SleepModal
        visible={sleepModalVisible}
        onClose={onClose}
        onSelect={sleepTimes}
        onStop={onStop}
      />
    </View>
  );
};

export default PlayerControl;

const styles = StyleSheet.create({});
