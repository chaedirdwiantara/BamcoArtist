import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  heightPercentage,
  heightResponsive,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {
  ArrowLeftIcon,
  DefaultImage,
  TickCircleIcon,
} from '../../../assets/icon';
import {ListAlbum} from './ListAlbum';
import {ListAvatar} from './ListAvatar';
import Color from '../../../theme/Color';
import {Gap, SsuToast} from '../../atom';
import {ModalShare} from '../Modal/ModalShare';
import {TopNavigation} from '../TopNavigation';
import {ModalDonate} from '../Modal/ModalDonate';
import {ModalCustom} from '../Modal/ModalCustom';
import {color, font, typography} from '../../../theme';
import {storage} from '../../../hooks/use-storage.hook';
import {dateLongMonth} from '../../../utils/date-format';
import {usePlayerHook} from '../../../hooks/use-player.hook';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';
import {ModalSuccessDonate} from '../Modal/ModalSuccessDonate';
import {PhotoPlaylist} from '../PlaylistContent/PhotoPlaylist';
import {dropDownHeaderSongDetails} from '../../../data/dropdown';
import {BottomSheetGuest} from '../GuestComponent/BottomSheetGuest';
import {DataDetailSong, SongList} from '../../../interface/song.interface';
import {ListenersAndDonate} from '../ListenersAndDonate/ListenersAndDonate';

interface Props {
  onPressGoBack: () => void;
  goToShowCredit: () => void;
  dataDetail: DataDetailSong;
  goToMusicianProfile: (uuid: string) => void;
  showModalNotAvail: boolean;
  closeModalNotAvail: () => void;
  goToAlbum: (id: number) => void;
  goToAddToPlaylist: () => void;
}

export const SongDetailsContent: React.FC<Props> = ({
  onPressGoBack,
  goToShowCredit,
  dataDetail,
  goToMusicianProfile,
  showModalNotAvail,
  closeModalNotAvail,
  goToAlbum,
  goToAddToPlaylist,
}) => {
  const {t} = useTranslation();
  const {addSong} = usePlayerHook();
  const isLogin = storage.getString('profile');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);

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

  const resultDataMore = (dataResult: any) => {
    if (dataResult.value === '1') {
      goToAddToPlaylist();
    } else if (dataResult.value === '2') {
      addSong(dataDetail as unknown as SongList);
      setToastVisible(true);
      setToastText('Song added to queue!');
    } else if (dataResult.value === '3') {
      setModalShare(true);
    } else {
      goToShowCredit();
    }
  };

  const onPressCoin = () => {
    isLogin ? setModalDonate(true) : setModalGuestVisible(true);
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const children = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{t('Modal.MusicianNotAvail.Title')}</Text>
        <Text style={styles.subtitle}>
          {t('Modal.MusicianNotAvail.Subtitle')}
        </Text>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={closeModalNotAvail}>
            <Text style={styles.button}>{t('General.GotIt')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title={t('Music.Label.SongDetails')}
        rightIcon={
          <DropdownMore
            dataFilter={dropDownHeaderSongDetails}
            selectedMenu={resultDataMore}
          />
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
            {dataDetail && dataDetail.imageUrl.length > 0 ? (
              <PhotoPlaylist uri={dataDetail.album.imageUrl[1].image} />
            ) : (
              <View style={styles.undefinedImg}>
                <DefaultImage.SongCover
                  width={widthResponsive(148)}
                  height={widthResponsive(148)}
                />
              </View>
            )}
          </View>
          <View style={styles.containerTitle}>
            <View>
              <Text style={styles.titleSong}>{dataDetail.title}</Text>
              <Text style={styles.artist}>{`${dataDetail.musicianName}`}</Text>
              <Text style={styles.albumName}>{`${
                dataDetail.album.title
              } · ${dateLongMonth(dataDetail.album.publishedDate)}`}</Text>
            </View>
          </View>
          <ListenersAndDonate
            totalListener={
              dataDetail.listenerCount ? dataDetail.listenerCount : 0
            }
            onPress={onPressCoin}
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.containerContent}>
          <View style={{marginBottom: heightResponsive(15)}}>
            <ListAvatar
              title={t('Home.Topbar.Search.Musician')}
              text={dataDetail.musicianName}
              avatarUri={dataDetail.album.musician.imageProfile}
              onPress={goToMusicianProfile}
              uuid={dataDetail.musicianUUID}
            />

            {dataDetail.featuring !== null &&
            dataDetail.featuring.length !== 0 ? (
              <ListAvatar
                title={t('Music.Credit.Featuring')}
                featuring
                featuringData={dataDetail.featuring}
                onPress={goToMusicianProfile}
              />
            ) : null}

            <Text style={[typography.Subtitle1, styles.titleContent]}>
              {t('Music.Label.SongDesc')}
            </Text>
            <Text style={styles.description}>
              {dataDetail.description
                ? dataDetail.description
                : t('General.NoDescription')}
            </Text>

            <ListAlbum
              title={t('Home.Topbar.Search.Album')}
              albumName={dataDetail.album.title}
              onPress={() => goToAlbum(dataDetail.album.id)}
              createdOn={dataDetail.album.productionYear}
              imgUri={
                dataDetail.album.imageUrl !== null &&
                dataDetail.album.imageUrl.length !== 0
                  ? dataDetail.album.imageUrl[0].image
                  : ''
              }
            />
          </View>
        </View>
      </ScrollView>

      <ModalDonate
        userId={dataDetail.musicianUUID}
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
        titleModal={t('General.Share.Music')}
        imgUri={
          dataDetail.album.imageUrl.length !== 0
            ? dataDetail.album.imageUrl[0].image
            : ''
        }
        type={'Album'}
        titleSong={dataDetail.title}
        createdOn={dataDetail.album.productionYear}
        artist={dataDetail.musicianName}
        onPressCopy={() => {
          setToastText(t('General.LinkCopied') || '');
          InteractionManager.runAfterInteractions(() => setToastVisible(true));
        }}
      />

      <ModalCustom
        modalVisible={showModalNotAvail}
        children={children()}
        onPressClose={closeModalNotAvail}
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
  titleSong: {
    fontSize: mvs(18),
    color: color.Neutral[10],
    fontFamily: font.InterSemiBold,
    lineHeight: heightPercentage(28),
  },
  artist: {
    fontSize: mvs(12),
    color: color.Neutral[50],
    fontFamily: font.InterMedium,
    marginTop: mvs(3),
  },
  albumName: {
    fontSize: mvs(12),
    color: color.Dark[50],
    fontFamily: font.InterMedium,
  },
  separator: {
    width,
    height: 1,
    backgroundColor: color.Dark[500],
    marginTop: heightPercentage(15),
  },
  containerAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: heightPercentage(12),
  },
  titleContent: {
    color: color.Success[500],
    paddingTop: heightPercentage(12),
  },
  titleAlbumStyle: {
    fontFamily: font.InterMedium,
    fontSize: mvs(15),
    lineHeight: mvs(20),
    letterSpacing: 0.15,
    color: color.Success[500],
    paddingTop: heightPercentage(12),
  },
  containerFeaturing: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: heightPercentage(8),
  },
  containerTitle: {
    paddingHorizontal: widthPercentage(12),
  },
  containerMore: {
    width: widthPercentage(123),
    marginLeft: widthPercentage(-113),
    marginTop: heightPercentage(-8),
  },
  containerContent: {
    paddingHorizontal: widthPercentage(20),
    paddingTop: heightPercentage(15),
    marginBottom: heightPercentage(20),
  },
  artistName: {
    fontFamily: font.InterMedium,
    fontSize: mvs(15),
    lineHeight: heightPercentage(20),
    color: color.Neutral[10],
  },
  description: {
    fontSize: mvs(13),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    lineHeight: mvs(16),
    paddingTop: heightPercentage(8),
    marginBottom: mvs(10),
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
    zIndex: 1,
  },
  textStyle: {
    color: color.Neutral[10],
  },
  undefinedImg: {
    marginTop: heightResponsive(36),
    marginBottom: heightResponsive(28),
  },
  card: {
    width: width * 0.9,
    backgroundColor: Color.Dark[900],
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(15),
  },
  title: {
    fontSize: mvs(16),
    color: Color.Neutral[10],
    fontFamily: font.InterSemiBold,
  },
  subtitle: {
    fontSize: mvs(15),
    color: Color.Neutral[10],
    fontFamily: font.InterRegular,
    marginTop: heightPercentage(10),
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: heightPercentage(25),
  },
  button: {
    fontSize: mvs(13),
    paddingHorizontal: widthPercentage(12),
    color: Color.Neutral[10],
    fontFamily: font.InterRegular,
  },
});
