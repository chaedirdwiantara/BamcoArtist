import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {menuQrCode} from '../../../data/Settings/setting';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {color} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {TopNavigation} from '../../../components';
import {ArrowLeftIcon} from '../../../assets/icon';
import {MenuText} from '../../../components/atom/MenuText/MenuText';

const QrCode = () => {
  const listMenu = menuQrCode;
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onPress = (value: string) => {
    if (value === 'Referral Code') {
      navigation.navigate('ReferralCode');
    } else {
      navigation.navigate('Device');
    }
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.QrCode.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthResponsive(12)}}
      />
      {listMenu.map((val, i) => (
        <MenuText.RightIcon
          key={i}
          text={t(val.text) || ''}
          containerStyles={{marginTop: widthResponsive(12)}}
          onPress={() => onPress(val.value)}
        />
      ))}
    </View>
  );
};

export default QrCode;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
});
