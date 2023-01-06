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
import {RootStackParams} from '../../../navigations';
import {CheckCircle2Icon} from '../../../assets/icon';
import {storage} from '../../../hooks/use-storage.hook';
import {heightPercentage, normalize, widthResponsive} from '../../../utils';

interface MusicianProps {
  musicianId: string;
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
}

interface DataMore {
  label: string;
  value: string;
}

const MusicianSection: React.FC<MusicianProps> = (props: MusicianProps) => {
  const {isFollowed, followOnPress, musicianId} = props;
  const follow = isFollowed ? 'Unfollow' : 'Follow';
  const [textFollow, setTextFollow] = useState(follow);
  const [dropdownText, setDropdownText] = useState(follow);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isLogin = storage.getString('profile');
  const dataMore = [
    {label: dropdownText, value: '1'},
    {label: 'Send Donation', value: '2'},
    {label: 'Go To Musician', value: '3'},
  ];
  const [toastVisible, setToastVisible] = useState(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [modalGuestVisible, setModalGuestVisible] = useState(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);

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
        setTextFollow(isFollowed ? 'Unfollow' : 'Follow');
        setDropdownText(isFollowed ? 'Follow' : 'Unfollow');
        followOnPress && followOnPress();
      } else {
        setModalGuestVisible(true);
      }
    } else if (dataResult.value === '3') {
      navigation.navigate('MusicianProfile', {id: musicianId});
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

  return (
    <>
      <ListCard.MusicianList
        dataFilter={dataMore}
        onPressMore={resultDataMore}
        {...props}
      />
      <ModalDonate
        totalCoin={'1000'}
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
