import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {View, Button} from 'react-native';
import TrackPlayer from 'react-native-track-player';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: 'track1',
        url: require('../../assets/songs/track1.mp3'),
        title: 'Track 1',
        artist: 'Artist 1',
        artwork: require('../../assets/images/chef1024.png'),
      });
    };
    setupPlayer();
  }, []);

  const handlePlay = async () => {
    await TrackPlayer.play();
    setIsPlaying(true);
  };

  const handlePause = async () => {
    await TrackPlayer.pause();
    setIsPlaying(false);
  };

  const handleStop = async () => {
    await TrackPlayer.reset();
    setIsPlaying(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 15,
      }}>
      <View>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={isPlaying ? handlePause : handlePlay}
        />
      </View>
      <Button title="Heart" onPress={handleStop} />
    </View>
  );
};

export default Player;
