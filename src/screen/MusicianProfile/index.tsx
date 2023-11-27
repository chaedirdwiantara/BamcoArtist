import {StyleSheet, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {MusicianDetail} from './MusicianDetail';
import {color} from '../../theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {
  BottomSheetGuest,
  ModalDonate,
  ModalSuccessDonate,
} from '../../components';
import {profileStorage, storage} from '../../hooks/use-storage.hook';
import {useCreditHook} from '../../hooks/use-credit.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {useSettingHook} from '../../hooks/use-setting.hook';

type PostDetailProps = NativeStackScreenProps<
  RootStackParams,
  'MusicianProfile'
>;

const MusicianProfile: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const uuid = route.params.id;
  const MyUuid = profileStorage()?.uuid;
  const isLogin = storage.getString('profile');

  const {dataCountProfile, getTotalCountProfile} = useProfileHook();
  const {dataPlaylist, getPlaylist} = usePlaylistHook();

  const {
    isLoadingAlbum,
    isLoadingMusician,
    dataDetailMusician,
    dataAlbum,
    dataFollow,
    dataAppearsOn,
    getDetailMusician,
    getAlbum,
    setFollowMusician,
    setUnfollowMusician,
    setDataFollow,
    getDataAppearsOn,
  } = useMusicianHook();

  const {dataExclusiveContent, getExclusiveContent} = useSettingHook();
  const {creditCount, getCreditCount, checkSubs, alreadySubsEC} =
    useCreditHook();

  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (modalDonate) getCreditCount();
  }, [modalDonate]);

  useEffect(() => {
    if (dataExclusiveContent) checkSubs(uuid);
  }, [dataExclusiveContent]);

  //  ? Get Detail Musician
  useFocusEffect(
    useCallback(() => {
      getTotalCountProfile({uuid});
      getDetailMusician({id: uuid, myUUID: MyUuid});
      getPlaylist({uuid});
      getExclusiveContent({uuid: uuid});

      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }, [uuid, refresh]),
  );

  //  ? Get Album Musician
  useFocusEffect(
    useCallback(() => {
      getAlbum({uuid: uuid});
      getDataAppearsOn({uuid});
    }, [uuid, refresh]),
  );

  useEffect(() => {
    if (dataFollow !== null) {
      getDetailMusician({id: uuid}), setDataFollow(null);
    }
  }, [dataFollow, uuid]);

  const [followersCount, setFollowersCount] = useState<number>(0);

  useEffect(() => {
    if (dataDetailMusician !== undefined && dataDetailMusician?.followers) {
      setFollowersCount(dataDetailMusician?.followers);
    }
  }, [dataDetailMusician, uuid]);

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

  const goToPlaylist = (id: number) => {
    navigation.push('Playlist', {id, from: 'other'});
  };

  const handleRefreshing = () => {
    getDetailMusician({id: uuid, myUUID: MyUuid});
  };

  const musicianPlaylist =
    dataPlaylist !== undefined && dataPlaylist !== null
      ? dataPlaylist?.filter(val => !val.isDefaultPlaylist && val.isPublic)
      : [];

  return (
    <View style={styles.root}>
      {dataDetailMusician && (
        <MusicianDetail
          profile={{...dataDetailMusician, ...dataCountProfile}}
          uuid={uuid}
          dataAlbum={dataAlbum}
          dataAppearsOn={dataAppearsOn}
          dataPlaylist={musicianPlaylist}
          followOnPress={followOnPress}
          unfollowOnPress={unFollowOnPress}
          donateOnPress={donateOnPress}
          followersCount={followersCount}
          goToPlaylist={goToPlaylist}
          exclusiveContent={
            dataExclusiveContent
              ? {...dataExclusiveContent, musician: dataDetailMusician}
              : undefined
          }
          subsEC={alreadySubsEC}
          refresh={refresh}
          setRefresh={() => setRefresh(true)}
          setRefreshing={handleRefreshing}
          isLoading={isLoadingMusician || isLoadingAlbum}
        />
      )}
      <ModalLoading
        visible={(isLoadingMusician || isLoadingAlbum) && !refresh}
      />
      <ModalDonate
        userId={uuid}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={onPressCloseModalDonate}
        onModalHide={() =>
          setTimeout(() => {
            setModalSuccessDonate(true);
          }, 1000)
        }
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
