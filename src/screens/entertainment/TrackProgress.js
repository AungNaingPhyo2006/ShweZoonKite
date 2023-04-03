import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useProgress} from 'react-native-track-player';

const TrackProgress = () => {
  const {position, duration} = useProgress(200);

  function format(seconds) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.trackProgress}>{format(position)}</Text>
      <Text style={styles.trackProgress}>{format(duration)}</Text>
    </View>
  );
};

export default TrackProgress;

const styles = StyleSheet.create({
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#eee',
  },
});
