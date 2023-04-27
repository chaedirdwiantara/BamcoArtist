import React, {useEffect, useState} from 'react';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  BottomSheetGuest,
  Gap,
  ListCard,
  ModalDonate,
  ModalSuccessDonate,
  SsuToast,
} from '../..';
import {color, font} from '../../../theme';
import {CheckCircle2Icon} from '../../../assets/icon';
import {MainTabParams, RootStackParams} from '../../../navigations';
import {profileStorage, storage} from '../../../hooks/use-storage.hook';
import {heightPercentage, normalize, widthResponsive} from '../../../utils';
import {useTranslation} from 'react-i18next';
import {useCreditHook} from '../../../hooks/use-credit.hook';

interface MusicianProps {
  userId: string;
  musicianNum: string;
  musicianName: string;
  imgUri: string;
  containerStyles?: ViewStyle;
  point?: number | null;
  isFollowed?: boolean;
  followerMode?: boolean;
  followersCount?: number;
  followOnPress?: () => void;
  activeMore?: boolean;
  type?: string;
}

interface DataMore {
  label: string;
  value: string;
}

const MusicianSection: React.FC<MusicianProps> = (props: MusicianProps) => {
  const {t} = useTranslation();
  const {creditCount, getCreditCount} = useCreditHook();
  const {isFollowed, followOnPress, userId, type} = props;

  const followText = isFollowed
    ? t('Home.Tab.TopMusician.Unfollow')
    : t('Home.Tab.TopMusician.Follow');
  const unfollowText = isFollowed
    ? t('Home.Tab.TopMusician.Follow')
    : t('Home.Tab.TopMusician.Unfollow');

  useEffect(() => {
    setTextFollow(followText);
    setDropdownText(followText);
  }, []);

  const [textFollow, setTextFollow] = useState(
    t('Home.Tab.TopMusician.Follow'),
  );
  const [dropdownText, setDropdownText] = useState(
    t('Home.Tab.TopMusician.Follow'),
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const isLogin = storage.getString('profile');
  const dataMore = [
    {label: dropdownText || '', value: '1'},
    {label: t('Home.Tab.TopMusician.Tip'), value: '2'},
    {label: t('Home.Tab.TopMusician.Profile'), value: '3'},
  ];
  const newDataMore =
    userId === profileStorage()?.uuid
      ? dataMore.filter(val => val.value !== '1')
      : dataMore;

  const [toastVisible, setToastVisible] = useState(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [modalGuestVisible, setModalGuestVisible] = useState(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);

  const handleNavigate = () => {
    if (userId === profileStorage()?.uuid) {
      navigation2.navigate('Profile', {});
    } else {
      if (type === 'fans') {
        navigation.navigate('OtherUserProfile', {id: userId});
      } else {
        navigation.navigate('MusicianProfile', {id: userId});
      }
    }
  };

  useEffect(() => {
    getCreditCount();
  }, [modalDonate]);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  useEffect(() => {
    modalSuccessDonate &&
      setTimeout(() => {
        setModalSuccessDonate(false);
      }, 3000);
  }, [modalSuccessDonate, trigger2ndModal]);

  const resultDataMore = (dataResult: DataMore) => {
    if (dataResult.value === '1') {
      if (isLogin) {
        setToastVisible(true);
        setTextFollow(followText);
        setDropdownText(unfollowText);
        followOnPress && followOnPress();
      } else {
        setModalGuestVisible(true);
      }
    } else if (dataResult.value === '3') {
      userId === profileStorage()?.uuid
        ? navigation2.navigate('Profile', {})
        : navigation.navigate('MusicianProfile', {id: userId});
    } else {
      if (isLogin) {
        setModalDonate(true);
      } else {
        setModalGuestVisible(true);
      }
    }
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const self = userId === profileStorage()?.uuid;

  return (
    <>
      <ListCard.MusicianList
        dataFilter={newDataMore}
        onPressMore={resultDataMore}
        activeMore={!self}
        self={self}
        onPressImage={handleNavigate}
        {...props}
      />
      <ModalDonate
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={() => setModalDonate(false)}
        onModalHide={() => setModalSuccessDonate(true)}
      />

      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal}
        toggleModal={onPressSuccess}
      />

      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <CheckCircle2Icon />
            <Gap width={4} />
            <Text style={[styles.textStyle]} numberOfLines={2}>
              {`You have been ${textFollow} selected musician`}
            </Text>
          </View>
        }
        modalStyle={styles.toast}
      />
    </>
  );
};

export default MusicianSection;

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'row',
    backgroundColor: color.Success[400],
    paddingVertical: heightPercentage(8),
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: mvs(22),
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  textStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
  },
  toast: {
    maxWidth: '100%',
    marginHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
