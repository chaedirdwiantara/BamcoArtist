import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {color} from '../../../theme';
import {TopNavigation} from '../../../components';
import {ArrowLeftIcon} from '../../../assets/icon';
import {RootStackParams} from '../../../navigations';
import {menuAccount} from '../../../data/Settings/setting';
import {heightPercentage, widthPercentage} from '../../../utils';
import {MenuText} from '../../../components/atom/MenuText/MenuText';

type AccountProps = NativeStackScreenProps<RootStackParams, 'Account'>;
export const AccountScreen: React.FC<AccountProps> = ({
  navigation,
  route,
}: AccountProps) => {
  const {data} = route.params;
  const listMenu = menuAccount;
  const {t} = useTranslation();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onPress = (val: string) => {
    if (val === 'BlockedUser') {
      navigation.navigate(val);
    } else {
      navigation.navigate('AccountInformation', {fromScreen: 'Account', data});
    }
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Account.Title')}
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
