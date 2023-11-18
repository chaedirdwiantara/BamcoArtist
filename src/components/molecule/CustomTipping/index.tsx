import React from 'react';
import {
  Text,
  View,
  Image,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {color, font} from '../../../theme';
import {ms, mvs} from 'react-native-size-matters';

interface ChipCreditProps {
  source: ImageSourcePropType;
  credit: number;
  onPress: (credit: number) => void;
  chipStyles?: ViewStyle;
}

interface CustomTippingProps {
  onPress: (credit: number) => void;
  chipStyles?: ViewStyle;
  containerStyles?: ViewStyle;
}

const ChipCredit: React.FC<ChipCreditProps> = ({
  source,
  credit,
  onPress,
  chipStyles,
}) => {
  return (
    <TouchableOpacity
      style={[styles.containerItem, chipStyles]}
      onPress={() => onPress(credit)}>
      <Image source={source} />
      <Text style={styles.credit}>{credit + ' Credit'}</Text>
    </TouchableOpacity>
  );
};

export const CustomTipping: React.FC<CustomTippingProps> = ({
  onPress,
  chipStyles,
  containerStyles,
}) => {
  const credits = [1, 10, 50];
  const chipSrc = [
    require('../../../assets/image/chip_1_credit.png'),
    require('../../../assets/image/chip_10_credit.png'),
    require('../../../assets/image/chip_50_credit.png'),
  ];
  return (
    <View style={[styles.root, containerStyles]}>
      {credits.map((val, index) => (
        <ChipCredit
          key={index}
          credit={val}
          source={chipSrc[index]}
          chipStyles={chipStyles}
          onPress={onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  containerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ms(10),
  },
  credit: {
    fontFamily: font.InterMedium,
    color: color.Neutral[10],
    fontSize: mvs(10),
    marginTop: mvs(10),
  },
});
