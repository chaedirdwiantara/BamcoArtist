import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {color, typography} from '../../../theme';
import {MenuText} from '../../atom/MenuText/MenuText';
import {heightPercentage, width} from '../../../utils';

interface PhoneProps {
  phone: string | undefined;
  onPressGoBack: () => void;
  goToChangePhoneNumber: () => void;
}

export const PhoneNumberContent: React.FC<PhoneProps> = ({
  phone,
  goToChangePhoneNumber,
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.containerInput}>
      <Text style={[typography.Overline, styles.label]}>
        {t('Setting.Phone.Title') || ''}
      </Text>
      <MenuText.RightIcon
        text={phone ?? '-'}
        containerStyles={{marginTop: heightPercentage(15)}}
        onPress={goToChangePhoneNumber}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    width: width * 0.9,
    alignSelf: 'center',
    paddingTop: heightPercentage(15),
  },
  label: {
    color: color.Neutral[50],
  },
});
