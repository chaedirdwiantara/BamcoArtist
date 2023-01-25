import React, {useEffect, useState} from 'react';
import {ms, mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {ListCard} from '../ListCard';
import {Gap, SsuToast} from '../../atom';
import {color, font} from '../../../theme';
import {RootStackParams} from '../../../navigations';
import {ModalShare} from '../Modal/ModalShare';
import {ModalDonate} from '../Modal/ModalDonate';
import {CheckCircle2Icon} from '../../../assets/icon';
import {storage} from '../../../hooks/use-storage.hook';
import {ModalSuccessDonate} from '../Modal/ModalSuccessDonate';
import {heightPercentage, normalize, widthResponsive} from '../../../utils';
import {BottomSheetGuest} from '../GuestComponent/BottomSheetGuest';

interface ListProps {
  imgUri: string;
  onPressMore?: (data: any) => void;
  onPressCard?: () => void;
  musicNum?: number | string;
  musicTitle: string;
  singerName: string;
  containerStyles?: ViewStyle;
  played?: boolean;
  hideDropdownMore?: boolean;
  rightIcon?: boolean;
  rightIconComponent?: React.ReactNode;
  onPressIcon?: (data: any) => void;
  activeOpacity?: number;
}

interface DataMore {
  label: string;
  value: string;
}

export const MusicSection: React.FC<ListProps> = (props: ListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isLogin = storage.getString('profile');

  const dataMore = [
    {label: 'Add to Playlist', value: '1'},
    {label: 'Send Donation', value: '2'},
    {label: 'Add to Queue', value: '3'},
    {label: 'Share Music', value: '4'},
    {label: 'Show Credits', value: '5'},
  ];
  const [textToast, setTextToast] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
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

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const onPressCopy = () => {
    setToastVisible(true);
    setTextToast('Link have been copied to clipboard!');
  };

  const resultDataMore = (dataResult: DataMore) => {
    if (isLogin || dataResult.value === '5') {
      if (dataResult.value === '1') {
        navigation.navigate('AddToPlaylist');
      } else if (dataResult.value === '2') {
        setModalDonate(true);
      } else if (dataResult.value === '3') {
        setToastVisible(true);
        setTextToast('Song added to queue!');
      } else if (dataResult.value === '4') {
        setModalShare(true);
      } else {
        navigation.navigate('ShowCredit');
      }
    } else {
      setModalGuestVisible(true);
    }
  };

  return (
    <>
      <ListCard.MusicList
        dataFilter={dataMore}
        onPressMore={resultDataMore}
        {...props}
      />

      <ModalDonate
        totalCoin="1000"
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={() => setModalDonate(false)}
        onModalHide={() => setModalSuccessDonate(true)}
      />

      <ModalShare
        url={
          'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0'
        }
        modalVisible={modalShare}
        onPressClose={() => setModalShare(false)}
        titleModal={'Share Music'}
        hideMusic={true}
        onPressCopy={onPressCopy}
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
              {textToast}
            </Text>
          </View>
        }
        modalStyle={styles.toast}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankStyle: {
    fontFamily: font.InterMedium,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    width: widthResponsive(30),
    color: color.Dark[100],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: ms(12),
  },
  songTitle: {
    fontFamily: font.InterRegular,
    fontSize: normalize(14),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: color.Dark[100],
  },
  likeButton: {
    justifyContent: 'center',
    marginRight: ms(5),
  },
  dotsButton: {
    justifyContent: 'center',
  },
  modalContainer: {
    width: '90%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
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
