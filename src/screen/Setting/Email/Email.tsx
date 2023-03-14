import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import Color from '../../../theme/Color';
import {color, font} from '../../../theme';
import {Gap, SsuToast} from '../../../components';
import {TickCircleIcon} from '../../../assets/icon';
import {RootStackParams} from '../../../navigations';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {ModalLoading} from '../../../components/molecule/ModalLoading/ModalLoading';
import {EmailContent} from '../../../components/molecule/SettingContent/EmailContent';

type EmailProps = NativeStackScreenProps<RootStackParams, 'Email'>;

export const EmailScreen: React.FC<EmailProps> = ({
  navigation,
  route,
}: EmailProps) => {
  const {t} = useTranslation();
  const {info} = route.params;
  const {dataProfile, getProfileUser} = useProfileHook();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToChangeEmail = () => {
    navigation.navigate('ChangeEmail', {
      type: dataProfile?.data?.email ? 'Change' : 'Add',
      oldEmail: dataProfile?.data?.email ?? '',
    });
  };

  const fetchUser = async () => {
    await getProfileUser();
    setIsFetching(false);
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
      <EmailContent
        email={dataProfile?.data?.email ?? undefined}
        onPressGoBack={onPressGoBack}
        goToChangeEmail={goToChangeEmail}
        registrationType={dataProfile?.data?.registrationType}
      />
      <ModalLoading visible={isFetching} />
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
    backgroundColor: Color.Dark[800],
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
    fontSize: normalize(13),
    lineHeight: mvs(15),
  },
});
