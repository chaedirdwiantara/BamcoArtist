import {AppRegistry, Text} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './src/App';
import {PlaybackService} from './src/service/musicPlayback';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import './src/locale/index';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => PlaybackService);
