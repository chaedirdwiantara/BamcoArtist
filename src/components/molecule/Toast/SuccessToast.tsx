import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Gap, SsuToast} from '../../atom';
import {TickCircleIcon} from '../../../assets/icon';
import {heightPercentage, widthResponsive} from '../../../utils';
import {color, typography} from '../../../theme';

interface SuccessToastProps {
  toastVisible: boolean;
  onBackPressed: () => void;
  caption: string;
}

const SuccessToast: FC<SuccessToastProps> = (props: SuccessToastProps) => {
  const {toastVisible, onBackPressed, caption} = props;
  return (
    <SsuToast
      modalVisible={toastVisible}
      onBackPressed={onBackPressed}
      children={
        <View style={[styles.modalContainer]}>
          <TickCircleIcon
            width={widthResponsive(21)}
            height={heightPercentage(20)}
            stroke={color.Neutral[10]}
          />
          <Gap width={widthResponsive(7)} />
          <Text style={[typography.Button2, styles.textStyle]}>{caption}</Text>
        </View>
      }
      modalStyle={{marginHorizontal: widthResponsive(24)}}
    />
  );
};

export default SuccessToast;

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
