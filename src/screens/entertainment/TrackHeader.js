import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  useProgress,
  Event,
  State,
} from 'react-native-track-player';

const TrackHeader = () => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 9,
      }}>
      <Text style={styles.songTitle}>{info.title}</Text>
      <Text style={styles.artistName}>{info.artist}</Text>
    </View>
  );
};

export default TrackHeader;

const styles = StyleSheet.create({
  songTitle: {
    fontSize: 16,
    color: '#c0c',
  },
  artistName: {
    fontSize: 16,
    color: '#888',
  },
});
