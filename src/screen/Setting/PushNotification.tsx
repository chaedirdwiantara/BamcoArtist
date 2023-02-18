import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {color, typography} from '../../theme';
import {ArrowLeftIcon} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import {Button, Gap, TopNavigation} from '../../components';
import {heightPercentage, width, widthPercentage} from '../../utils';
import {useTranslation} from 'react-i18next';

export const PushNotificationScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const openPhoneSettings = () => Linking.openSettings();

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Notification.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />
      <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
        {t('Setting.Notification.Label.Title')}
      </Text>
      <Gap height={heightPercentage(10)} />
      <Text style={[typography.Subtitle2, {color: color.Neutral[10]}]}>
        {t('Setting.Notification.Label.Subtitle')}
      </Text>
      <Button
        label={t('Btn.TurnOff')}
        onPress={openPhoneSettings}
        containerStyles={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthPercentage(15),
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    backgroundColor: color.Pink[200],
    alignSelf: 'center',
  },
});
