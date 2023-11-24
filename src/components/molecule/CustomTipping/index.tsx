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
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';

interface ChipCreditProps {
  source: ImageSourcePropType;
  credit: number;
  onPress: (credit: number) => void;
  selectedChip: number;
  chipStyles?: ViewStyle;
}

interface CustomTippingProps {
  selectedChip: number;
  onPress: (credit: number) => void;
  chipStyles?: ViewStyle;
  containerStyles?: ViewStyle;
}

const ChipCredit: React.FC<ChipCreditProps> = ({
  selectedChip,
  source,
  credit,
  onPress,
  chipStyles,
}) => {
  const {t} = useTranslation();
  const isActive = selectedChip === credit;
  const isActiveStyle = {
    backgroundColor: isActive ? 'rgba(196, 163, 54, 0.4)' : 'transparent',
    borderColor: isActive ? '#C4A436' : '#333B60',
  };

  return (
    <TouchableOpacity
      style={[styles.containerItem, isActiveStyle, chipStyles]}
      onPress={() => onPress(credit)}>
      <Image source={source} />
      <Text style={styles.credit}>
        {isActive ? t('LiveTipping.NowActive') : t('LiveTipping.Credit')}
      </Text>
    </TouchableOpacity>
  );
};

export const CustomTipping: React.FC<CustomTippingProps> = ({
  selectedChip,
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
          selectedChip={selectedChip}
          onPress={onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
  },
  containerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ms(10),
    borderWidth: mvs(1),
    borderRadius: mvs(6),
    paddingVertical: mvs(12),
    paddingHorizontal: ms(5),
    marginBottom: mvs(10),
  },
  credit: {
    fontFamily: font.InterMedium,
    color: color.Neutral[10],
    fontSize: mvs(7),
    marginTop: mvs(5),
  },
});
