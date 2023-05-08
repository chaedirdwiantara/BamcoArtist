import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Color from '../theme/Color';
import {color, typography} from '../theme';
import {TickCircleIcon} from '../assets/icon';
import {RootStackParams} from '../navigations';
import {heightPercentage, widthPercentage} from '../utils';
import {Gap, SignInGuestContent, SsuStatusBar, SsuToast} from '../components';

type SignInGuestProps = NativeStackScreenProps<RootStackParams, 'SignInGuest'>;

export const SignInGuestScreen: React.FC<SignInGuestProps> = ({
  route,
}: SignInGuestProps) => {
  const {showToastDelete} = route.params;
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [toastDeleteVisible, setToastDeleteVisible] = useState<boolean>(false);

  useEffect(() => {
    toastDeleteVisible &&
      setTimeout(() => {
        setToastDeleteVisible(false);
      }, 3000);
  }, [toastDeleteVisible]);

  useEffect(() => {
    showToastDelete &&
      setTimeout(() => {
        setToastDeleteVisible(showToastDelete);
      }, 500);
  }, [route.params]);

  const goToScreen = (screenName: 'Login' | 'Signup' | 'MainTab') => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <SignInGuestContent onPress={screenName => goToScreen(screenName)} />
      <SsuToast
        modalVisible={toastDeleteVisible}
        onBackPressed={() => setToastDeleteVisible(false)}
        children={
          <View style={[styles.modalContainerDelete]}>
            <TickCircleIcon
              width={widthPercentage(21)}
              height={heightPercentage(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthPercentage(7)} />
            <Text style={[typography.Button2, styles.textToastDelete]}>
              {t('Setting.DeleteAccount.ToastDeletion')}
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthPercentage(24)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  modalContainerDelete: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textToastDelete: {
    color: color.Neutral[10],
  },
});
