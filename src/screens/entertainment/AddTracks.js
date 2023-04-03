import TrackPlayer, {RepeatMode} from 'react-native-track-player';

export async function addTracks(tracks) {
  await TrackPlayer.add(tracks);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);

  TrackPlayer.addEventListener('playback-track-changed', async event => {
    const duration = await TrackPlayer.getDuration();
    const position = await TrackPlayer.getPosition();
    console.log(`Current duration: ${duration}, Current position: ${position}`);
  });
}

const tracks = [
  {
    id: '1',
    url: require('../../assets/songs/track1.mp3'),
    title: 'စိတ်ညို့ရှင်',
    artist: 'စိုင်းထီးဆိုင်',
    duration: 255.634,
  },
  {
    id: '2',
    url: require('../../assets/songs/track2.mp3'),
    title: 'ပုဂံလမ်းမှ အလွမ်းရှင် ',
    artist: 'အောင်သူ',
    duration: 352.078,
  },
];

addTracks(tracks);
