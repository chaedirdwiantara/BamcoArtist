import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Typography from '../../../theme/Typography';
import {heightPercentage, widthPercentage} from '../../../utils';
import Gap from '../Gap/Gap';
import Color from '../../../theme/Color';

interface DeliveryItemProps {
  title: string;
  time: string;
  price: string | number;
  onPress?: () => void;
}

const DeliveryItem: React.FC<DeliveryItemProps> = props => {
  const {title, time, price, onPress} = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View>
        <Text
          numberOfLines={1}
          style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
          {title}
        </Text>
        <Gap height={heightPercentage(4)} />
        <Text style={[Typography.Subtitle3, {color: Color.Dark[50]}]}>
          Estimated time {time}
        </Text>
      </View>

      <Text style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
        {price} Credits
      </Text>
    </TouchableOpacity>
  );
};

export default DeliveryItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    paddingHorizontal: widthPercentage(24),
  },
});
