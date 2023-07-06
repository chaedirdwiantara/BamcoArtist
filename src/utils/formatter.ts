import {Dimensions, Platform, PixelRatio} from 'react-native';
import {DataShippingProps} from '../interface/setting.interface';
import {toCurrency} from './currency-format';

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

const getCoinFromProductId = (props: {
  productId: string;
  type?: 'number' | 'currency';
}): string => {
  const {productId, type = 'currency'} = props;
  let totalCoin = '';
  let indexDelimiter = productId.lastIndexOf('_');
  if (indexDelimiter > -1) {
    if (type === 'currency') {
      totalCoin = toCurrency(
        parseInt(productId.substring(indexDelimiter + 1)),
        {
          withFraction: false,
        },
      );
    } else {
      totalCoin = productId.substring(indexDelimiter + 1);
    }
  }
  return totalCoin;
};

export {normalize, elipsisText, formatShipping, getCoinFromProductId};
