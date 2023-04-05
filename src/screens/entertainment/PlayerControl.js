import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  const [remainingTime, setRemainingTime] = useState(null);
  const [playerState, setPlayerState] = useState(null); // player state
  const [sleepTimeoutId, setSleepTimeoutId] = useState(null);
  const [testTime, setTestTime] = useState(null);
  const [asyncSotrageTime, setAsyncStorageTime] = useState(null);
  // console.log('i am sleeptime', sleepTime);
  // console.log('i am remaining time', remainingTime);
  // console.log('i am playerState', playerState);
  //console.log('i am remainingTime', remainingTime);

  const onClose = () => {
    setSleepModalVisible(false);
  };

  async function handlePlayPress() {
    if (playerState === State.Playing) {
      setPlayerState(State.Paused);
      await TrackPlayer.pause();
      stopTimer(); //+

      // if (sleepTimeoutId) {
      //   // console.log(sleepTimeoutId);
      //   clearTimeout(sleepTimeoutId);
      // }
    } else {
      await TrackPlayer.play();
      setPlayerState(State.Playing);
    }
  }

  const stopTimer = async => {
    const now = new Date().getTime();
    const startTime = AsyncStorage.getItem('sleepTimer');

    const difference = parseInt(startTime) - now;

    TrackPlayer.pause();
    console.log('Diff==>', difference);
    // console.log('Start==>', startTime);

    AsyncStorage.setItem('sleepTimer', difference.toString());
    // setSleepTime(null);
    setAsyncStorageTime(difference);
  };
  // console.log('asynstorage', asyncSotrageTime);

  const setSleepTimer = async minutes => {
    if (minutes === 'stop') {
      setSleepTime(null);
      await AsyncStorage.removeItem('sleepTimer');
    } else {
      const now = new Date();
      const sleepTime = now.getTime() + minutes * 60 * 1000;
      await AsyncStorage.setItem('sleepTimer', sleepTime.toString());
      setSleepTime(sleepTime);
      setSleepModalVisible(false);

      const sleepTimeout = setTimeout(() => {
        if (sleepTime <= new Date().getTime()) {
          TrackPlayer.pause();
          setSleepTime(null);
          AsyncStorage.removeItem('sleepTimer');
        }
      }, minutes * 60 * 1000);
      setSleepTimeoutId(sleepTimeout); //+
    }
  };

  useEffect(() => {
    const loadSleepTimer = async () => {
      const sleepTimer = await AsyncStorage.getItem('sleepTimer');
      if (sleepTimer !== null) {
        setSleepTime(parseInt(sleepTimer));
      }
    };
    loadSleepTimer();
  }, []);

  useEffect(() => {
    // Start the sleep timer
    const startSleepTimer = async () => {
      const timerEnd = new Date().getTime() + sleepTime * 60 * 1000;
      setSleepTime(timerEnd);
      await AsyncStorage.setItem('sleepTimer', JSON.stringify(timerEnd));
    };

    if (sleepTime && !sleepTime) {
      startSleepTimer();
    }

    // Clear the sleep timer when playback ends
    const clearSleepTimer = async () => {
      setSleepTime(null);
      await AsyncStorage.removeItem('sleepTimer');
    };

    const endOfQueueListener = TrackPlayer.addEventListener(
      Event.EndOfQueue,
      clearSleepTimer,
    );

    const playbackStateListener = TrackPlayer.addEventListener(
      Event.PlaybackState,
      async ({state}) => {
        setPlayerState(state);
        // Stop the sleep timer if the track has ended or been stopped
        if (state === State.Stopped || state === State.Ended) {
          setSleepTime(null);
          await AsyncStorage.removeItem('sleepTimer');
        }
      },
    );

    const progressListener = TrackPlayer.addEventListener(
      Event.PlaybackProgressUpdated,
      ({position, duration}) => {
        if (sleepTime !== null && sleepTime <= new Date().getTime()) {
          TrackPlayer.pause();
          setSleepTime(null);
          AsyncStorage.removeItem('sleepTimer');
        }
      },
    );

    // Remove all event listeners when the component unmounts
    return () => {
      endOfQueueListener.remove();
      playbackStateListener.remove();
      progressListener.remove();
    };
  }, [sleepTime]);

  // for remaining time indicating live
  useEffect(() => {
    const interval = setInterval(() => {
      if (sleepTime !== null && sleepTime > new Date().getTime()) {
        const remainingTimeMs = sleepTime - new Date().getTime();
        const remainingTimeMin = Math.floor(remainingTimeMs / 1000 / 60);
        const remainingTimeSec = Number.isFinite(remainingTimeMs)
          ? Math.floor((remainingTimeMs / 1000) % 60)
          : 0;
        setRemainingTime(
          `${remainingTimeMin}:${
            remainingTimeSec < 10 ? '0' : ''
          }${remainingTimeSec}`,
        );
      } else {
        setRemainingTime(null);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [sleepTime]);

  const onStop = async () => {
    setSleepTimer(null);
    setSleepModalVisible(false);
    await AsyncStorage.removeItem('sleepTimer');
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
      await AsyncStorage.setItem('sleepMinutes', sleepMinutes.toString());
      setSleepTimer(sleepMinutes);

      // Play the track if it's not playing
      if (playerState !== State.Playing) {
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
            {sleepTime !== null
              ? moment
                  .utc(Math.max(sleepTime - new Date().getTime(), 0))
                  .format('m:ss')
              : ''}
            ⏰
          </Text>
        </TouchableOpacity>
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
