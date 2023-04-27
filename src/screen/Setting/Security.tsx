import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {color, font} from '../../theme';
import {RootStackParams} from '../../navigations';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {MenuText} from '../../components/atom/MenuText/MenuText';
import {EmailContent, Gap, SsuToast, TopNavigation} from '../../components';
import {heightPercentage, widthPercentage, widthResponsive} from '../../utils';
import {ArrowLeftIcon, ArrowRightIcon, TickCircleIcon} from '../../assets/icon';
import {PhoneNumberContent} from '../../components/molecule/SettingContent/PhoneNumberContent';

type SecurityProps = NativeStackScreenProps<RootStackParams, 'Security'>;

export const SecurityScreen: React.FC<SecurityProps> = ({
  navigation,
  route,
}: SecurityProps) => {
  const {t} = useTranslation();
  const {info} = route.params;
  const {dataProfile, getProfileUser} = useProfileHook();
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onPressGoTo = (screenName: 'ChangePassword' | 'AboutDeletion') => {
    navigation.navigate(screenName);
  };

  const goToChangeEmail = () => {
    navigation.navigate('ChangeEmail', {
      type: dataProfile?.data?.email ? 'Change' : 'Add',
      oldEmail: dataProfile?.data?.email ?? '',
    });
  };

  const goToChangePhoneNumber = () => {
    navigation.navigate('ChangePhoneNumber', {
      type: dataProfile?.data?.phoneNumber ? 'Change' : 'Add',
      oldPhone: dataProfile?.data?.phoneNumber ?? '',
    });
  };

  const fetchUser = async () => {
    await getProfileUser();
    if (info) {
      setTimeout(() => {
        setVisibleModal(true);
      }, 500);
    }
  };

  useEffect(() => {
    visibleModal &&
      setTimeout(() => {
        setVisibleModal(false);
      }, 3000);
  }, [visibleModal]);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Security.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: heightPercentage(10),
          paddingHorizontal: widthPercentage(15),
        }}
      />

      <MenuText.RightIcon
        text={t('Setting.Password.Title') || ''}
        containerStyles={{marginTop: heightPercentage(12)}}
        onPress={() => onPressGoTo('ChangePassword')}
      />

      <EmailContent
        email={dataProfile?.data?.email ?? undefined}
        onPressGoBack={onPressGoBack}
        goToChangeEmail={goToChangeEmail}
        registrationType={dataProfile?.data?.registrationType}
      />

      <PhoneNumberContent
        phone={dataProfile?.data?.phoneNumber ?? undefined}
        onPressGoBack={onPressGoBack}
        goToChangePhoneNumber={goToChangePhoneNumber}
      />

      <MenuText.RightIcon
        text={t('Setting.DeleteAccount.Title') || ''}
        containerStyles={{marginTop: heightPercentage(15)}}
        textStyles={{color: color.Error[400]}}
        icon={<ArrowRightIcon stroke={color.Error[400]} />}
        onPress={() => onPressGoTo('AboutDeletion')}
      />

      <SsuToast
        modalVisible={visibleModal}
        onBackPressed={() => setVisibleModal(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthPercentage(21)}
              height={heightPercentage(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthResponsive(7)} />
            <Text style={[styles.modalText]}>
              {t('Setting.Email.Toast.Success')}
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
    backgroundColor: color.Dark[800],
  },
  modalContainer: {
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
  modalText: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(14),
    lineHeight: mvs(15),
  },
});
