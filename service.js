import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      stopWithApp: false, // not stop also app is quited
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

// export async function addTracks() {
//   await TrackPlayer.add([
//     {
//       id: '1',
//       url: require('./src/assets/songs/track1.mp3'),
//       title: 'စိတ်ညို့ရှင်',
//       artist: 'စိုင်းထီးဆိုင်',
//       duration: 255.634,
//     },
//     {
//       id: '2',
//       url: require('./src/assets/songs/track2.mp3'),
//       title: 'ပုဂံလမ်းမှ အလွမ်းရှင် ',
//       artist: 'အောင်သူ',
//       duration: 352.078,
//     },
//   ]);
//   await TrackPlayer.setRepeatMode(RepeatMode.Queue);

//   TrackPlayer.addEventListener('playback-track-changed', async event => {
//     const duration = await TrackPlayer.getDuration();
//     const position = await TrackPlayer.getPosition();
//     console.log(`Current duration: ${duration}, Current position: ${position}`);
//   });
// }

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });
}
