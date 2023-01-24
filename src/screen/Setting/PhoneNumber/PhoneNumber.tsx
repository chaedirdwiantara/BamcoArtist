import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../../theme/Color';
import {RootStackParams} from '../../../navigations';
import {PhoneNumberContent} from '../../../components/molecule/SettingContent/PhoneNumberContent';
import {Gap, SsuToast} from '../../../components';
import {ms, mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {heightPercentage, normalize, widthResponsive} from '../../../utils';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {ModalLoading} from '../../../components/molecule/ModalLoading/ModalLoading';
import {TickCircleIcon} from '../../../assets/icon';

type PhoneNumberProps = NativeStackScreenProps<RootStackParams, 'PhoneNumber'>;

export const PhoneNumberScreen: React.FC<PhoneNumberProps> = ({
  navigation,
  route,
}: PhoneNumberProps) => {
  const {info, message} = route.params;
  const {dataProfile, getProfileUser} = useProfileHook();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToChangePhoneNumber = () => {
    navigation.navigate('ChangePhoneNumber', {
      type: dataProfile?.data?.phoneNumber ? 'Change' : 'Add',
      oldPhone: dataProfile?.data?.phoneNumber ?? '',
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
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      <PhoneNumberContent
        phone={dataProfile?.data?.phoneNumber ?? undefined}
        onPressGoBack={onPressGoBack}
        goToChangePhoneNumber={goToChangePhoneNumber}
      />
      <ModalLoading visible={isFetching} />
      <SsuToast
        modalVisible={visibleModal}
        onBackPressed={() => setVisibleModal(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthResponsive(30)}
              height={heightPercentage(30)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthResponsive(7)} />
            <Text style={[styles.modalText]}>{message}</Text>
          </View>
        }
        modalStyle={{marginHorizontal: ms(24)}}
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
    flexDirection: 'row',
    backgroundColor: color.Success[400],
    paddingVertical: mvs(16),
    paddingHorizontal: ms(12),
    borderRadius: 4,
    height: mvs(48),
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: mvs(22),
  },
  modalText: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
    lineHeight: mvs(15),
  },
});
