import {StyleSheet} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import Color from '../../../theme/Color';
import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';

const styles = StyleSheet.create({
  root: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: heightPercentage(30),
  },
  title: {
    color: Color.Neutral[10],
    maxWidth: width * 0.9,
  },
  description: {
    maxWidth: width * 0.9,
    color: Color.Neutral[50],
    textAlign: 'center',
    marginVertical: mvs(5),
  },
  containerInput: {
    width: '90%',
    marginBottom: mvs(60),
  },
  footer: {
    width: widthPercentage(327),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: mvs(10),
  },
  btnContainer: {
    width: widthPercentage(155),
    aspectRatio: heightPercentage(155 / 46),
  },
  containerActivated: {
    marginBottom: mvs(40),
  },
  containerReferralCode: {
    width: width * 0.9,
    borderWidth: ms(1),
    borderColor: Color.Dark[500],
    paddingVertical: mvs(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFriendRef: {
    color: Color.Neutral[50],
    fontSize: normalize(11),
    marginBottom: mvs(2),
  },
  refCode: {
    color: Color.Neutral[10],
    paddingLeft: ms(5),
  },
  note: {
    textAlign: 'center',
    color: Color.Neutral[10],
    marginVertical: mvs(5),
  },
});

export default styles;
