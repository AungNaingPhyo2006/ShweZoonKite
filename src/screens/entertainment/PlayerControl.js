import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  Event,
  State,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import SleepModal from './SleepModal';

const PlayerControl = ({onShuffle}) => {
  const [sleepTime, setSleepTime] = useState(null); // sleep timer

  const [sleepModalVisible, setSleepModalVisible] = useState(false);

  const onClose = () => {
    setSleepModalVisible(false);
  };
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) == State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  const setSleepTimer = minutes => {
    // const now = new Date();
    // const sleepTime = now.getTime() + minutes * 60 * 1000; // Convert minutes to milliseconds
    // setSleepTime(sleepTime);

    if (minutes === 'stop') {
      setSleepTime(null);
    } else {
      const now = new Date();
      const sleepTime = now.getTime() + minutes * 60 * 1000; // Convert minutes to milliseconds
      setSleepTime(sleepTime);

      setSleepModalVisible(false);
    }
  };

  useEffect(() => {
    const progressListener = TrackPlayer.addEventListener(
      Event.PlaybackProgressUpdated,
      ({position, duration}) => {
        if (sleepTime !== null && sleepTime <= new Date().getTime()) {
          TrackPlayer.pause();
          TrackPlayer.reset();
        }
      },
    );

    return () => {
      progressListener.remove();
    };
  }, [sleepTime]);

  // async function sleepTimes() {
  //   setSleepTimer(1); // Set sleep timer for 1 minute, you can replace this with any desired sleep time
  // }
  const onStop = () => {
    console.log('I am working');
    setSleepTimer(null);
    setSleepModalVisible(false);
  };

  async function sleepTimes(minutes) {
    let sleepMinutes;
    switch (minutes) {
      case 5:
        sleepMinutes = 5;
        break;
      case 10:
        sleepMinutes = 10;
        break;
      case 15:
        sleepMinutes = 15;
        break;
      case 20:
        sleepMinutes = 20;
        break;
      case 25:
        sleepMinutes = 25;
        break;
      case 30:
        sleepMinutes = 30;
        break;
      case 60:
        sleepMinutes = 60;
        break;
      case 'stop':
        sleepMinutes = 'stop';
        break;
      default:
        sleepMinutes = 0;
    }

    if (sleepMinutes > 0) {
      setSleepTimer(sleepMinutes);
    }
  }

  // const timestamp = sleepTime;
  // const date = new Date(timestamp);
  // const dateString = date.toLocaleString(); // adjust options as needed
  //console.log(dateString); // outputs something like "3/27/2023, 3:27:59 PM"

  // sleep time end
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
        <View onPress={() => setSleepModalVisible(!sleepModalVisible)}>
          <Text style={{color: '#fff'}}>hi</Text>
        </View>
      )}

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
