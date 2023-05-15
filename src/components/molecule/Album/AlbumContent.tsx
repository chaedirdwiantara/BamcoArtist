import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  InteractionManager,
} from 'react-native';

import Color from '../../../theme/Color';
import {Gap, SsuToast} from '../../atom';
import {TopNavigation} from '../TopNavigation';
import {color, font, typography} from '../../../theme';
import {dropDownHeaderAlbum} from '../../../data/dropdown';
import {PhotoPlaylist} from '../PlaylistContent/PhotoPlaylist';
import {ArrowLeftIcon, TickCircleIcon} from '../../../assets/icon';
import {
  SongTitlePlay,
  ListenersAndDonate,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
} from '../';
import {useTranslation} from 'react-i18next';
import {DataDetailAlbum, SongList} from '../../../interface/song.interface';
import {dateLongMonth} from '../../../utils/date-format';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainTabParams, RootStackParams} from '../../../navigations';
import {useCreditHook} from '../../../hooks/use-credit.hook';
import {usePlayerHook} from '../../../hooks/use-player.hook';
import ListSongs from '../../../screen/ListCard/ListSongs';
import {mvs} from 'react-native-size-matters';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';
import {profileStorage} from '../../../hooks/use-storage.hook';

interface Props {
  dataSong: SongList[] | null;
  detailAlbum: DataDetailAlbum;
  onPressGoBack: () => void;
  comingSoon?: boolean;
}

export const AlbumContent: React.FC<Props> = ({
  detailAlbum,
  dataSong,
  onPressGoBack,
  comingSoon,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();

  const {
    isPlaying,
    visible: playerVisible,
    showPlayer,
    hidePlayer,
    addPlaylist,
    addSong,
  } = usePlayerHook();

  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const {creditCount, getCreditCount} = useCreditHook();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState<string>('');
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [songIdList, setSongIdList] = useState<number[]>([]);

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused, isPlaying]);

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

  useEffect(() => {
    if (dataSong !== null) {
      let Xter = [];
      for (let i = 1; i <= dataSong.length; i++) {
        Xter.push(dataSong[i]?.id);
      }
      setSongIdList(Xter);
    }
  }, [dataSong]);

  const resultDataMore = (dataResult: any) => {
    if (dataResult.value === '1') {
      if (dataSong !== null) {
        setToastVisible(true);
        setToastText('Playlist added to queue!');
        addSong(dataSong);
      }
    } else if (dataResult.value === '2') {
      setModalShare(true);
    } else if (dataResult.value === '3') {
      navigation.navigate('AddToPlaylist', {id: songIdList, type: 'album'});
    }
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const onPressSong = (val: SongList) => {
    addPlaylist({
      dataSong: dataSong ? dataSong : [],
      playSongId: val?.id,
      isPlay: true,
    });
    showPlayer();
  };

  const goToMusicianProfile = () => {
    if (detailAlbum.musician.uuid === profileStorage()?.uuid) {
      navigation2.navigate('Profile', {});
    } else {
      navigation.push('MusicianProfile', {id: detailAlbum.musician.uuid});
    }
  };

  const createdDate = comingSoon
    ? dateLongMonth(detailAlbum.releaseDateScheduled)
    : dateLongMonth(detailAlbum.publishedDate);

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title={t('Musician.Label.Album')}
        rightIcon={
          comingSoon ? (
            <></>
          ) : (
            <DropdownMore
              dataFilter={dropDownHeaderAlbum}
              selectedMenu={resultDataMore}
            />
          )
        }
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        rightIconAction={() => null}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <ScrollView>
        <View style={{paddingHorizontal: widthPercentage(10)}}>
          <View style={{alignSelf: 'center'}}>
            <PhotoPlaylist
              uri={
                detailAlbum?.imageUrl.length > 0
                  ? detailAlbum?.imageUrl[1].image
                  : ''
              }
              dark={comingSoon}
            />
          </View>
          <SongTitlePlay
            title={detailAlbum?.title}
            totalSong={dataSong?.length || 0}
            createdDate={createdDate}
            createdBy={
              detailAlbum?.musician?.name !== undefined
                ? detailAlbum?.musician.name
                : ''
            }
            avatarUri={detailAlbum?.musician.imageProfile || ''}
            showIconPlay={false}
            isPlaying={false}
            handlePlayPaused={() => {}}
            onPressSong={() => {}}
            goToMusicianProfile={goToMusicianProfile}
            comingSoon={comingSoon}
          />
          {!comingSoon && (
            <ListenersAndDonate
              totalListener={
                detailAlbum?.totalCountListener
                  ? detailAlbum?.totalCountListener
                  : 0
              }
              onPress={() => setModalDonate(true)}
            />
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.containerContent}>
          <View style={{marginBottom: heightPercentage(15)}}>
            <Text style={[typography.Subtitle1, {color: color.Success[500]}]}>
              {t('Event.Description')}
            </Text>
            <Text style={styles.description}>
              {detailAlbum.description
                ? detailAlbum.description
                : 'No Description Given'}
            </Text>
          </View>

          <Text style={[typography.Subtitle1, {color: color.Success[500]}]}>
            {t('Music.Label.SongList')}
          </Text>
          <View style={{marginBottom: heightPercentage(30)}}>
            {dataSong !== null && (
              <ListSongs
                onPress={onPressSong}
                hideDropdownMore={true}
                dataSong={dataSong}
                type="home"
                disabled={comingSoon}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <ModalDonate
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onModalHide={() => setModalSuccessDonate(true)}
        onPressClose={() => setModalDonate(false)}
      />

      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
      />

      <ModalShare
        url={
          'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0'
        }
        modalVisible={modalShare}
        onPressClose={() => setModalShare(false)}
        titleModal={t('General.Share.Album')}
        imgUri={
          'https://i.pinimg.com/originals/b3/51/66/b35166174c9bde2d0cc436150a983912.jpg'
        }
        type={'Album'}
        titleSong={'Smoke + Mirror'}
        createdOn={'2019'}
        artist={'Imagine Dragons, The Wekeend'}
        onPressCopy={() =>
          InteractionManager.runAfterInteractions(() => {
            setToastVisible(true);
            setToastText(t('General.LinkCopied') || '');
          })
        }
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthPercentage(21)}
              height={heightPercentage(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthPercentage(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              {toastText}
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
  dropDownMore: {
    width: widthPercentage(123),
    marginLeft: widthPercentage(-113),
    marginTop: heightPercentage(-8),
  },
  separator: {
    width,
    height: 1,
    backgroundColor: color.Dark[500],
    marginTop: heightPercentage(15),
  },
  containerContent: {
    flex: 1,
    paddingHorizontal: widthPercentage(20),
    paddingTop: heightPercentage(15),
  },
  description: {
    fontSize: mvs(13),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    paddingTop: heightPercentage(8),
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
  textStyle: {
    color: color.Neutral[10],
  },
});
