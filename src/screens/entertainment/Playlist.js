import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  Event,
  State,
} from 'react-native-track-player';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlayerControl from './PlayerControl';

const Playlist = () => {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.state == State.nextTrack) {
      let index = await TrackPlayer.getCurrentTrack();
      setCurrentTrack(index);
    }
  });

  function PlaylistItem({index, title, isCurrent}) {
    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    return (
      <TouchableOpacity onPress={handleItemPress}>
        <Text
          style={{
            ...styles.playlistItem,
            ...{backgroundColor: isCurrent ? '#666' : 'transparent'},
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  async function handleShuffle() {
    let queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);

    loadPlaylist();
  }

  console.log('Hi i am ', queue);
  return (
    <View>
      <View style={styles.playlist}>
        <FlatList
          keyExtractor={item => item.id}
          data={queue}
          renderItem={({item, index}) => (
            <PlaylistItem
              index={index}
              title={item.title}
              isCurrent={currentTrack == index}
            />
          )}
        />
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'blue',
          padding: 5,
          borderRadius: 10,
        }}>
        <PlayerControl onShuffle={handleShuffle} />
      </View>
    </View>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  playlist: {
    marginTop: 40,
    marginBottom: 40,
  },
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
  },
});
