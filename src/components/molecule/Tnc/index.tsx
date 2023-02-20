import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {CheckBox, Gap} from '../../atom';
import {CheckBoxProps} from '../../../interface/checkbox.interface';
import {ErrorIcon} from '../../../assets/icon';
import {useTranslation} from 'react-i18next';

const ErrorColor = color.Error[400];

const TermAndConditions: React.FC<
  CheckBoxProps & {onTncPress: () => void; onPrivacyPress: () => void}
> = ({handleOnPress, active, errorMsg, onTncPress, onPrivacyPress}) => {
  const {t} = useTranslation();
  return (
    <View>
      <View style={styles.container}>
        <CheckBox handleOnPress={handleOnPress} active={active} />
        <Text style={styles.textStyle}>
          {t('SignUp.TnC.Phrase1')}
          <Text
            style={[styles.textStyle, {color: color.Success[400]}]}
            onPress={onTncPress}>
            {t('SignUp.TnC.Phrase2')}
          </Text>
          {t('SignUp.TnC.Phrase3')}
          <Text
            style={[styles.textStyle, {color: color.Success[400]}]}
            onPress={onPrivacyPress}>
            {t('SignUp.TnC.Phrase4')}
          </Text>
        </Text>
      </View>
      {errorMsg && (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: mvs(4),
            alignItems: 'flex-end',
          }}>
          <ErrorIcon fill={ErrorColor} style={{marginBottom: mvs(-1)}} />
          <Gap width={4} />
          <Text
            style={{
              fontFamily: font.InterRegular,
              fontWeight: '400',
              fontSize: mvs(10),
              lineHeight: mvs(12),
              color: ErrorColor,
              maxWidth: '90%',
            }}>
            {errorMsg}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TermAndConditions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textStyle: {
    maxWidth: '90%',
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(10),
    color: color.Neutral[10],
    marginLeft: widthResponsive(8),
  },
  checkbox: {
    width: widthResponsive(20),
    height: mvs(20),
    borderWidth: 1,
    borderColor: color.Dark[500],
    borderRadius: 6,
  },
});
