import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import {kFormatter, width, widthPercentage} from '../../../utils';
import {font} from '../../../theme';

interface ListProps {
  amount: number;
  title: string;
  path: ImageSourcePropType;
  type: 'white' | 'black';
}

const OverviewCard: React.FC<ListProps> = ({amount, title, path, type}) => {
  const colorAmount = type === 'black' ? '#222' : '#FFF';
  const colorTitle = type === 'black' ? '#535353' : '#DADADA';
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        borderRadius={mvs(4)}
        style={styles.image}
        source={path}>
        <View style={styles.containerContent}>
          <Text style={[styles.amount, {color: colorAmount}]}>
            {kFormatter(amount, 1)}
          </Text>
          <Text style={[styles.title, {color: colorTitle}]}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OverviewCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.45,
    aspectRatio: mvs(159 / 71),
    borderRadius: mvs(4),
    paddingHorizontal: ms(4),
    paddingVertical: mvs(4),
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  containerContent: {
    paddingLeft: widthPercentage(12),
    paddingBottom: mvs(10),
  },
  amount: {
    fontSize: mvs(20),
    fontFamily: font.InterRegular,
    fontWeight: '700',
  },
  title: {
    fontSize: mvs(10),
    fontFamily: font.InterRegular,
    fontWeight: '600',
  },
});
