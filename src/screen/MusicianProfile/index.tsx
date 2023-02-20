import {StyleSheet, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {MusicianDetail} from './MusicianDetail';
import {color} from '../../theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AlbumData} from '../../interface/musician.interface';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {
  BottomSheetGuest,
  ModalDonate,
  ModalSuccessDonate,
} from '../../components';
import {storage} from '../../hooks/use-storage.hook';

type PostDetailProps = NativeStackScreenProps<
  RootStackParams,
  'MusicianProfile'
>;

const MusicianProfile: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const uuid = route.params.id;

  const isLogin = storage.getString('profile');

  const {
    isLoading,
    isError,
    dataDetailMusician,
    dataAlbum,
    dataFollow,
    getDetailMusician,
    getAlbum,
    setFollowMusician,
    setUnfollowMusician,
    setDataFollow,
  } = useMusicianHook();

  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);

  //  ? Get Detail Musician
  useFocusEffect(
    useCallback(() => {
      getDetailMusician({id: uuid});
    }, []),
  );

  //  ? Get Album Musician
  useFocusEffect(
    useCallback(() => {
      getAlbum({uuid: uuid});
    }, []),
  );

  useEffect(() => {
    if (dataFollow !== null) {
      getDetailMusician({id: uuid}), setDataFollow(null);
    }
  }, [dataFollow]);

  const [followersCount, setFollowersCount] = useState<number>(0);

  useEffect(() => {
    if (dataDetailMusician !== undefined && dataDetailMusician.followers) {
      setFollowersCount(dataDetailMusician.followers);
    }
  }, [dataDetailMusician]);

  const followOnPress = () => {
    if (isLogin) {
      setFollowMusician({musicianID: uuid}, {}, false);
      setFollowersCount(followersCount + 1);
    } else {
      setModalGuestVisible(true);
    }
  };

  const unFollowOnPress = () => {
    if (isLogin) {
      setUnfollowMusician({musicianID: uuid}, {}, false);
      setFollowersCount(followersCount - 1);
    } else {
      setModalGuestVisible(true);
    }
  };

  const donateOnPress = () => {
    if (isLogin) {
      setModalDonate(true);
    } else {
      setModalGuestVisible(true);
    }
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const onPressCloseModalDonate = () => {
    setModalDonate(false);
    setModalSuccessDonate(false);
    setTrigger2ndModal(false);
  };

  return (
    <View style={styles.root}>
      {dataDetailMusician && (
        <MusicianDetail
          profile={dataDetailMusician}
          uuid={uuid}
          dataAlbum={dataAlbum}
          followOnPress={followOnPress}
          unfollowOnPress={unFollowOnPress}
          donateOnPress={donateOnPress}
          followersCount={followersCount}
        />
      )}
      <ModalLoading visible={isLoading} />
      <ModalDonate
        totalCoin={'1000'}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={onPressCloseModalDonate}
        onModalHide={() => setModalSuccessDonate(true)}
      />
      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
      />
      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />
    </View>
  );
};

export default MusicianProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  imageBg: {
    flex: 1,
    justifyContent: 'center',
  },
});
