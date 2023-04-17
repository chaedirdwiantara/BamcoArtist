import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import {color} from '../../theme';
import {TopNavigation} from '../../components';
import {ArrowLeftIcon} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import {menuTnCAndPP} from '../../data/Settings/setting';
import {heightPercentage, widthPercentage} from '../../utils';
import {MenuText} from '../../components/atom/MenuText/MenuText';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const TnCAndPPScreen: React.FC = () => {
  const listMenu = menuTnCAndPP;
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const handleWebview = (title: string, url: string) => {
    navigation.navigate('Webview', {
      title: title,
      url: url,
    });
  };

  const onPress = (val: string) => {
    const path = val === t('Setting.TnC.Title') ? 'tos' : 'privacy-policy';
    handleWebview(val, `https://sunnysideup.io/marketplace/${path}`);
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.TnC&PP.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />
      {listMenu.map((val, i) => (
        <MenuText.RightIcon
          key={i}
          text={t(val.text) || ''}
          containerStyles={{marginTop: heightPercentage(12)}}
          onPress={() => onPress(val.value)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
});
