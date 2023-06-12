import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  InteractionManager,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  Gap,
  Button,
  ProfileHeader,
  ModalConfirm,
  SsuStatusBar,
  UserInfoCard,
} from '../../components';
import {color, font} from '../../theme';
import {RootStackParams} from '../../navigations';
import {restoreAccount} from '../../api/auth.api';
import {useFcmHook} from '../../hooks/use-fcm.hook';
import {useAuthHook} from '../../hooks/use-auth.hook';
import * as FCMService from '../../service/notification';
import {imageTypes} from '../../interface/base.interface';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {heightPercentage, widthPercentage} from '../../utils';
import {profileStorage, storage} from '../../hooks/use-storage.hook';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

export const RecoverAccountScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();
  const {onLogout} = useAuthHook();
  const {removeFcmToken} = useFcmHook();
  const {dataProfile, dataCountProfile, getProfileUser, getTotalCountProfile} =
    useProfileHook();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalType, setModalType] = useState<string>('recover');
  const [modalSubtitle, setModalSubtitle] = useState<string>('');

  useEffect(() => {
    getProfileUser();
    getTotalCountProfile({uuid: profileStorage()?.uuid});
  }, []);

  const goToMainTab = () => {
    storage.set('isLogin', true);
    storage.set('recoverSuccess', true);
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTab'}],
    });
  };

  const checkImage = (images: imageTypes[], selectedIndex?: number) => {
    const index = selectedIndex ? selectedIndex : 2;
    if (images !== undefined && images.length > 0) {
      return images[index].image;
    } else {
      return '';
    }
  };

  const signOut = async () => {
    await onLogout();
    FCMService.getTokenFCM({
      onGetToken: token => {
        removeFcmToken(token);
      },
    });
    navigation.reset({
      index: 0,
      routes: [{name: 'SignInGuest'}],
    });
  };

  const onPressConfirm = async () => {
    setShowModal(false);
    if (modalType === 'recover') {
      InteractionManager.runAfterInteractions(() => setIsLoading(true));
      setShowModal(false);
      try {
        await restoreAccount();
        goToMainTab();
      } catch (error) {
        setShowModal(false);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      signOut();
    }
  };

  const banners =
    dataProfile?.data !== undefined ? checkImage(dataProfile.data.banners) : '';

  const avatar =
    dataProfile?.data !== undefined
      ? checkImage(dataProfile.data.imageProfileUrls)
      : '';

  const profile = {
    fullname: dataProfile?.data.fullname,
    username: '@' + dataProfile?.data.username,
    bio: dataProfile?.data.bio || t('Profile.Label.Description'),
    backgroundUri: banners,
    avatarUri: avatar,
    totalFollowing: dataProfile?.data.following,
    totalFollowers: dataProfile?.data.followers,
    totalFans: dataProfile?.data.fans,
    totalRelease: dataCountProfile?.countAlbumReleased,
    totalPlaylist: dataCountProfile?.countPlaylist,
    rank: dataProfile?.data.rank || 0,
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      {dataProfile && (
        <View style={{flex: 1}}>
          <ProfileHeader
            noEdit={true}
            backIcon={false}
            bio={profile.bio || ''}
            onPress={() => null}
            iconPress={() => null}
            onPressImage={() => null}
            fullname={profile.fullname}
            username={profile.username}
            avatarUri={profile.avatarUri}
            backgroundUri={profile.backgroundUri}
          />
          <UserInfoCard
            profile={profile}
            type={''}
            containerStyles={styles.containerCardInfo}
            onPress={() => null}
            followersCount={profile.totalFollowers}
          />

          <View style={styles.containerContent}>
            <View>
              <Text style={[styles.title]}>{t('RecoverAccount.Title')}</Text>
              <Text style={[styles.subtitle]}>
                {t('RecoverAccount.FirstParagraph')}
              </Text>
              <Text style={[styles.subtitle]}>
                {t('RecoverAccount.SecondParagraph')}
              </Text>
              <Text style={[styles.subtitle]}>
                {t('RecoverAccount.ThirdParagraph')}
              </Text>
            </View>

            <View style={styles.containerButton}>
              <Button
                label={t('RecoverAccount.Btn.Recover')}
                textStyles={{fontSize: mvs(12)}}
                containerStyles={styles.btnContainer}
                onPress={() => {
                  setShowModal(true);
                  setModalType('recover');
                  setModalTitle(t('RecoverAccount.Modal.Title') || '');
                  setModalSubtitle(t('RecoverAccount.Modal.Subtitle') || '');
                }}
              />
              <Gap height={4} />
              <Button
                type="border"
                label={t('RecoverAccount.Btn.SignOut')}
                borderColor="transparent"
                textStyles={{fontSize: mvs(12), color: color.Success[400]}}
                containerStyles={styles.btnContainer}
                onPress={() => {
                  setShowModal(true);
                  setModalType('signOut');
                  setModalTitle(t('Btn.SignOut') || '');
                  setModalSubtitle(t('Modal.SignOut') || '');
                }}
              />
            </View>
          </View>
          <ModalConfirm
            modalVisible={showModal}
            title={modalTitle}
            subtitle={modalSubtitle}
            onPressClose={() => setShowModal(false)}
            onPressOk={onPressConfirm}
          />
          <ModalLoading visible={isLoading} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  containerCardInfo: {
    position: 'absolute',
    left: widthPercentage(20),
    top: heightPercentage(310),
  },
  containerContent: {
    marginTop:
      Platform.OS === 'ios' ? heightPercentage(70) : heightPercentage(60),
    paddingHorizontal: widthPercentage(20),
    marginBottom: heightPercentage(20),
    width: '100%',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontFamily: font.InterSemiBold,
    fontSize: mvs(18),
    lineHeight: mvs(32),
    color: color.Neutral[10],
    marginBottom: heightPercentage(20),
  },
  subtitle: {
    fontFamily: font.InterRegular,
    fontSize: Platform.OS === 'ios' ? mvs(14) : mvs(13),
    lineHeight: mvs(17),
    color: color.Neutral[10],
    marginBottom: heightPercentage(15),
  },
  containerButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  btnContainer: {
    width: '100%',
    aspectRatio: heightPercentage(327 / 40),
  },
});
