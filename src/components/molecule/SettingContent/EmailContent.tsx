import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {color, typography} from '../../../theme';
import {MenuText} from '../../atom/MenuText/MenuText';
import {heightPercentage, width} from '../../../utils';

interface EmailProps {
  email: string | undefined;
  onPressGoBack: () => void;
  goToChangeEmail: () => void;
  registrationType: string | undefined;
}

export const EmailContent: React.FC<EmailProps> = ({
  email,
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
    <View style={styles.containerInput}>
      <Text style={[typography.Overline, styles.label]}>
        {t('Setting.Email.Label.Old') || ''}
      </Text>
      {isSSO ? (
        <MenuText.RightIconDisable
          text={email ?? '-'}
          containerStyles={{marginTop: heightPercentage(15)}}
          onPress={() => (isSSO ? null : goToChangeEmail())}
        />
      ) : (
        <MenuText.RightIcon
          text={email ?? '-'}
          containerStyles={{marginTop: heightPercentage(10)}}
          onPress={() => (isSSO ? null : goToChangeEmail())}
        />
      )}
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
