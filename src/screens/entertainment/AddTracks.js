import TrackPlayer, {RepeatMode} from 'react-native-track-player';

export async function addTracks(tracks) {
  // if (!tracks) {
  //   console.warn('Tracks are not defined.');
  //   return;
  // }

  await TrackPlayer.add(tracks);
  // await TrackPlayer.add(tracks.filter(track => !track.url));

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
  {
    id: '3',
    url: require('../../assets/songs/track3.mp3'),
    title: 'ဒဏ်ရာများနဲ့',
    artist: 'အိုင်ရင်းဇင်မာမြင့်',
    duration: 198.112,
  },
  {
    id: '4',
    url: require('../../assets/songs/track4.mp3'),
    title: 'မေ့မှာပါ',
    artist: '၀ိုင်၀ိုင်း',
    duration: 255.216,
  },
  {
    id: '5',
    url: require('../../assets/songs/track5.mp3'),
    title: 'ကိုယ်ပိုင်တဲ့ကိုယ့်နေရာ',
    artist: 'ရှင်ဖုန်း',
    duration: 188.16,
  },
];

addTracks(tracks);
