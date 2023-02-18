import React from 'react';
import {View, StyleSheet} from 'react-native';

import {SsuInput} from '../../atom';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {MenuText} from '../../atom/MenuText/MenuText';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {useTranslation} from 'react-i18next';

interface EmailProps {
  email: string | undefined;
  onPressGoBack: () => void;
  goToChangeEmail: () => void;
  registrationType: string | undefined;
}

export const EmailContent: React.FC<EmailProps> = ({
  email,
  onPressGoBack,
  goToChangeEmail,
  registrationType,
}) => {
  const {t} = useTranslation();
  const isSSO = registrationType === ('apple' || 'google' || 'facebook');
  const text = isSSO
    ? t('Setting.Email.Label.Sso')
    : email
    ? t('Setting.Email.Label.Change')
    : t('Setting.Email.Label.Add');

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Email.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />
      <SsuInput.InputLabel
        label={t('Setting.Email.Title') || ''}
        value={email ?? '-'}
        editable={false}
        containerInputStyles={{borderBottomWidth: 0}}
        containerStyles={styles.containerInput}
      />
      {isSSO ? (
        <MenuText.RightIconDisable
          text={text}
          containerStyles={{marginTop: heightPercentage(15)}}
          onPress={() => (isSSO ? null : goToChangeEmail())}
        />
      ) : (
        <MenuText.RightIcon
          text={text}
          containerStyles={{marginTop: heightPercentage(15)}}
          onPress={() => (isSSO ? null : goToChangeEmail())}
        />
      )}
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
