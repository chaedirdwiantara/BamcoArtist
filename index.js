import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './src/App';
import {PlaybackService} from './src/service/musicPlayback';
import {name as appName} from './app.json';
import 'react-native-get-random-values';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => PlaybackService);
