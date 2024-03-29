import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {ArrowRightIcon, ClockIcon} from '../../../assets/icon';
import Color from '../../../theme/Color';
import {heightPercentage, widthPercentage} from '../../../utils';
import Typography from '../../../theme/Typography';

interface PromoItemProps {
  title: string;
  end: string;
  onPress: () => void;
  onApply: () => void;
}

const PromoItem: React.FC<PromoItemProps> = props => {
  const {title, end, onPress, onApply} = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onApply}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={[Typography.Subtitle2, styles.title]}>
          {title}
        </Text>
        <View style={styles.descContainer}>
          <ClockIcon />
          <Text style={styles.desc}>Ended in {end}</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.detail}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ArrowRightIcon />
    </TouchableOpacity>
  );
};

export default PromoItem;

const styles = StyleSheet.create({
  root: {
    marginTop: heightPercentage(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Color.Dark[500],
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    width: '100%',
  },
  textContainer: {maxWidth: '90%'},
  title: {
    color: Color.Neutral[10],
    marginBottom: heightPercentage(10),
  },
  descContainer: {
    flexDirection: 'row',
  },
  desc: {
    color: Color.Dark[50],
    marginHorizontal: widthPercentage(6),
  },
  detail: {
    color: Color.Success[400],
  },
});
