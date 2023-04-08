import {View, Text, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import CheckBox from '../CheckBox';
import Typography from '../../../theme/Typography';
import Color from '../../../theme/Color';
import {Avatar} from '../Avatar/Avatar';
import Gap from '../Gap/Gap';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

const CartBox = ({children}: {children: ReactNode}) => {
  return (
    <View style={styles.root}>
      <View
        style={[
          styles.row,
          styles.alignCenter,
          {
            marginBottom: 10,
          },
        ]}>
        <CheckBox handleOnPress={() => null} active={false} />
        <Gap width={widthPercentage(10)} />
        <View style={[styles.row, styles.alignCenter]}>
          <Avatar imgUri="https://picsum.photos/200" />
          <Gap width={widthPercentage(6)} />
          <Text
            style={[
              Typography.Subtitle2,
              {color: Color.Neutral[10], fontSize: normalize(12)},
            ]}
            numberOfLines={1}>
            Blackpink
          </Text>
        </View>
      </View>

      {children}
    </View>
  );
};

export default CartBox;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: widthPercentage(24),
    paddingTop: heightPercentage(16),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
});
