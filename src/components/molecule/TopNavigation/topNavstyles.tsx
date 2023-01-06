import {NativeModules, Platform, StyleSheet} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {heightResponsive} from '../../../utils/dimensionFormat';

const {StatusBarManager} = NativeModules;
const barHeight = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const topNavstyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: mvs(1),
    borderBottomColor: color.Dark[300],
    paddingTop: heightResponsive(20 + barHeight),
    paddingBottom: heightResponsive(20),
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centerTitle: {
    fontSize: mvs(16),
    fontFamily: font.InterSemiBold,
    letterSpacing: 0.15,
    textAlign: 'center',
  },
  iconLeftContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconRightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default topNavstyles;
