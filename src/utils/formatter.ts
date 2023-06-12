import {Dimensions, Platform, PixelRatio} from 'react-native';
import {DataShippingProps} from '../interface/setting.interface';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

const normalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const elipsisText = (text: string, lengthText: number): string =>
  text?.length > lengthText ? text.substring(0, lengthText - 3) + '...' : text;

const formatShipping = (dataShippingInfo: DataShippingProps) => {
  if (dataShippingInfo) {
    const {
      fullname,
      phoneNumber,
      address,
      city,
      province,
      postalCode,
      country,
    } = dataShippingInfo;
    return (
      fullname +
      ' (' +
      phoneNumber +
      ') ' +
      address +
      ', ' +
      city +
      ', ' +
      province +
      ' (' +
      postalCode +
      ') ' +
      country
    );
  }
};

export {normalize, elipsisText, formatShipping};
