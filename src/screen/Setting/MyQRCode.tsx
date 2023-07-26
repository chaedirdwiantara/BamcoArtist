import React, {FC, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {usePlayerStore} from '../../store/player.store';
import {mvs} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {color, font} from '../../theme';
import {MyQRCodeContent} from '../../components/molecule/ProfileContent/MyQRCodeContent';
import {useMusicianHook} from '../../hooks/use-musician.hook';

type MyQRCodeProps = NativeStackScreenProps<RootStackParams, 'MyQRCode'>;

export const MyQRCode: FC<MyQRCodeProps> = ({route}: MyQRCodeProps) => {
  const {t} = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {uuid} = route.params;

  const {dataProfile, getProfileUser} = useProfileHook();
  const {dataDetailMusician, getDetailMusician} = useMusicianHook();
  const {setWithoutBottomTab, show} = usePlayerStore();

  useEffect(() => {
    if (uuid !== '' && uuid !== undefined) {
      getDetailMusician({id: uuid});
    } else {
      getProfileUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

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
      {dataProfile?.data || dataDetailMusician ? (
        <MyQRCodeContent
          type={
            uuid !== '' && uuid !== undefined ? 'musician detail' : 'profile'
          }
          profile={
            uuid !== '' && uuid !== undefined ? dataDetailMusician : profile
          }
          onPressGoBack={onPressGoBack}
        />
      ) : null}
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
