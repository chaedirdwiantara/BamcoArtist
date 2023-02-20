import React from 'react';
import {View, StyleSheet} from 'react-native';

import {SsuInput} from '../../atom';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {MenuText} from '../../atom/MenuText/MenuText';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {useTranslation} from 'react-i18next';

interface PhoneProps {
  phone: string | undefined;
  onPressGoBack: () => void;
  goToChangePhoneNumber: () => void;
}

export const PhoneNumberContent: React.FC<PhoneProps> = ({
  phone,
  onPressGoBack,
  goToChangePhoneNumber,
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Phone.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />
      <SsuInput.InputLabel
        label={t('Setting.Phone.Title') || ''}
        value={phone ?? '-'}
        editable={false}
        containerInputStyles={{borderBottomWidth: 0}}
        containerStyles={styles.containerInput}
      />
      <MenuText.RightIcon
        text={
          (phone
            ? t('Setting.Phone.Label.Change')
            : t('Setting.Phone.Label.Add')) || ''
        }
        containerStyles={{marginTop: heightPercentage(15)}}
        onPress={goToChangePhoneNumber}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  containerInput: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: heightPercentage(15),
  },
});
