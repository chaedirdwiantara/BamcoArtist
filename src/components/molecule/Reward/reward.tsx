import React from 'react';
import {
  Text,
  Image,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {color, font} from '../../../theme';
import {height, width, widthResponsive} from '../../../utils';

type Props = {
  points: number;
  freeCredit: number;
  image: string;
  onPress: () => void;
  redeemable: boolean;
  completed: boolean;
  containerStyle?: ViewStyle;
};

const VoucherReward: React.FC<Props> = ({
  points,
  freeCredit,
  image,
  onPress,
  redeemable,
  completed,
  containerStyle,
}) => {
  const {t} = useTranslation();
  const rewardActive = redeemable && !completed;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {opacity: rewardActive ? 1 : 0.4},
        containerStyle,
      ]}
      onPress={onPress}>
      <Image
        style={{width: '100%', height: mvs(100)}}
        source={
          image
            ? {uri: image}
            : require('../../../assets/image/default_reward.png')
        }
        borderRadius={mvs(4)}
      />
      <Text style={[styles.voucherText, {color: color.Neutral[10]}]}>
        {`${freeCredit} ${t('Rewards.FreeCredit')}`}
      </Text>
      <Text style={styles.pointsText}>{`Accumulate ${points} Credits`}</Text>
    </TouchableOpacity>
  );
};

export default VoucherReward;

const styles = StyleSheet.create({
  container: {
    width: width * 0.42,
    height: height * 0.252,
    backgroundColor: '#1A2435',
    borderRadius: mvs(8),
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(16),
    marginHorizontal: widthResponsive(10),
  },
  voucherText: {
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: mvs(12),
    maxWidth: '80%',
    marginTop: mvs(12),
  },
  pointsText: {
    color: color.Pink[200],
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(11),
    marginTop: mvs(4),
  },
});
