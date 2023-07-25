import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {AvatarProfile, Button, Gap, SettingContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {usePlayerStore} from '../../store/player.store';
import ReferralQRImage from '../../assets/image/ReferralQR.image';
import ReferralQRSuccessImage from '../../assets/image/ReferralQRSuccess.image';
import {heightPercentage} from '../../utils';
import {mvs} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {color, font} from '../../theme';
import initialname from '../../utils/initialname';
import {CameraIcon} from '../../assets/icon';
import Typography from '../../theme/Typography';
import {MyQRCodeContent} from '../../components/molecule/ProfileContent/MyQRCodeContent';

const BtnScan = 'Setting.ReferralQR.OnBoard.BtnScan';

export interface ProfileHeaderProps {
  avatarUri?: string;
  backgroundUri?: string;
  fullname?: string;
  username?: string;
  bio?: string;
  type?: string;
  scrollEffect?: boolean;
  onPress?: () => void;
  iconPress: (params: string) => void;
  containerStyles?: ViewStyle;
  noEdit?: boolean;
  backIcon?: boolean;
  onPressImage?: (uri: string) => void;
  refreshing?: boolean;
}

export const MyQRCode: React.FC<ProfileHeaderProps> = (
  props: ProfileHeaderProps,
) => {
  const {
    avatarUri = '',
    backgroundUri = '',
    fullname = '',
    username,
    bio,
    type = '',
    onPress,
    iconPress,
    containerStyles,
    scrollEffect,
    noEdit,
    backIcon,
    onPressImage,
    refreshing,
  } = props;

  const {t} = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {dataProfile, getProfileUser} = useProfileHook();
  const {dataShippingInfo, getShippingInfo} = useSettingHook();
  const {setWithoutBottomTab, show} = usePlayerStore();

  useEffect(() => {
    getProfileUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [dataProfile]);

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  const onPressGoBack = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  const onPressGoTo = (screenName: any, params: any) => {
    if (screenName === 'Account') {
      navigation.navigate(screenName, {
        data: dataProfile?.data,
        fromScreen: 'setting',
      });
    } else if (screenName === 'ShippingInformation') {
      navigation.navigate(screenName, {data: dataShippingInfo});
    } else {
      navigation.navigate(screenName, {...params});
    }
  };

  const avatar =
    dataProfile?.data !== undefined &&
    dataProfile?.data.imageProfileUrls?.length > 0
      ? dataProfile?.data.imageProfileUrls[2].image
      : null;

  const profile = {
    fullname: dataProfile?.data.fullname,
    username: dataProfile?.data.username,
    avatarUri: avatar,
  };

  return (
    <View style={[styles.root, styles.container]}>
      {dataProfile?.data && (
        <MyQRCodeContent
          fullname={profile.fullname}
          username={profile.username}
          avatar={profile.avatarUri}
          onPressGoBack={onPressGoBack}
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
  container: {
    // paddingTop: heightPercentage(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: color.Neutral[10],
    marginVertical: mvs(10),
  },
  textSubtitle: {
    fontSize: mvs(12),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    lineHeight: mvs(14.5),
    color: '#788AA9',
    textAlign: 'center',
    // maxWidth: width * 0.8,
  },
});
