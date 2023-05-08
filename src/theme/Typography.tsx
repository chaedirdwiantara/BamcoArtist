import {mvs} from 'react-native-size-matters';
import {normalize} from '../utils';
import Font from './Font';

const Typography = {
  Heading1: {
    fontFamily: Font.InterSemiBold,
    fontSize: normalize(30),
    lineHeight: mvs(40),
    letterSpacing: -1.5,
  },
  Heading2: {
    fontFamily: Font.InterSemiBold,
    fontSize: normalize(27),
    lineHeight: mvs(36),
    letterSpacing: -0.5,
  },
  Heading3: {
    fontFamily: Font.InterSemiBold,
    fontSize: normalize(24),
    lineHeight: mvs(32),
    letterSpacing: 0,
  },
  Heading4: {
    fontFamily: Font.InterSemiBold,
    fontSize: normalize(20),
    lineHeight: mvs(28),
    letterSpacing: 0.25,
  },
  Heading5: {
    fontFamily: Font.InterSemiBold,
    fontSize: normalize(18),
    lineHeight: mvs(24),
    letterSpacing: 0,
  },
  Heading6: {
    fontFamily: Font.InterSemiBold,
    fontSize: mvs(16),
    lineHeight: mvs(20),
    letterSpacing: 0.15,
  },
  Subtitle1: {
    fontFamily: Font.InterMedium,
    fontSize: mvs(15),
    lineHeight: mvs(20),
    letterSpacing: 0.15,
  },
  Subtitle2: {
    fontFamily: Font.InterMedium,
    fontSize: normalize(13),
    lineHeight: mvs(16),
    letterSpacing: 0.1,
  },
  Subtitle3: {
    fontFamily: Font.InterMedium,
    fontSize: normalize(12),
    lineHeight: mvs(16),
    letterSpacing: 0.1,
  },
  Body1: {
    fontFamily: Font.InterRegular,
    fontSize: normalize(15),
    lineHeight: mvs(24),
    letterSpacing: 0.5,
  },
  Body2: {
    fontFamily: Font.InterRegular,
    fontSize: mvs(13),
    lineHeight: mvs(20),
    letterSpacing: 0.25,
  },
  Body3: {
    fontFamily: Font.InterBold,
    fontSize: normalize(12),
    lineHeight: mvs(16),
    letterSpacing: 0.1,
  },
  Body4: {
    fontFamily: Font.InterRegular,
    fontSize: normalize(10),
    lineHeight: mvs(12),
    letterSpacing: 0,
  },
  Button1: {
    fontFamily: Font.InterMedium,
    fontSize: normalize(15),
    lineHeight: mvs(24),
    letterSpacing: 0.15,
  },
  Button2: {
    fontFamily: Font.InterMedium,
    fontSize: mvs(13),
    lineHeight: mvs(20),
    letterSpacing: 0.1,
  },
  Caption: {
    fontFamily: Font.InterRegular,
    fontSize: mvs(12),
    lineHeight: mvs(16),
    letterSpacing: 0.4,
  },
  Overline: {
    fontFamily: Font.InterRegular,
    fontSize: mvs(10),
    lineHeight: mvs(12),
    letterSpacing: 0.5,
  },
};

export default Typography;
