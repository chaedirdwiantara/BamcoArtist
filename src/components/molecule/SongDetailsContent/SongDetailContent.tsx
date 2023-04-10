import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  InteractionManager,
} from 'react-native';

import {
  heightPercentage,
  heightResponsive,
  width,
  widthPercentage,
} from '../../../utils';
import {Dropdown} from '../DropDown';
import {ListAlbum} from './ListAlbum';
import {ListAvatar} from './ListAvatar';
import Color from '../../../theme/Color';
import {Gap, SsuToast} from '../../atom';
import {ModalShare} from '../Modal/ModalShare';
import {TopNavigation} from '../TopNavigation';
import {ModalDonate} from '../Modal/ModalDonate';
import {color, font, typography} from '../../../theme';
import {ModalSuccessDonate} from '../Modal/ModalSuccessDonate';
import {PhotoPlaylist} from '../PlaylistContent/PhotoPlaylist';
import {dropDownHeaderSongDetails} from '../../../data/dropdown';
import {
  ArrowLeftIcon,
  DefaultImage,
  TickCircleIcon,
} from '../../../assets/icon';
import {ListenersAndDonate} from '../ListenersAndDonate/ListenersAndDonate';
import {DataDetailSong, SongAlbum} from '../../../interface/song.interface';
import {mvs} from 'react-native-size-matters';
import {dateLongMonth} from '../../../utils/date-format';
import {useTranslation} from 'react-i18next';
import {useCreditHook} from '../../../hooks/use-credit.hook';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';

interface Props {
  onPressGoBack: () => void;
  goToAlbum: (dataAlbum: SongAlbum) => void;
  goToShowCredit: () => void;
  dataDetail: DataDetailSong;
}

export const SongDetailsContent: React.FC<Props> = ({
  onPressGoBack,
  goToAlbum,
  goToShowCredit,
  dataDetail,
}) => {
  const {t} = useTranslation();
  const {creditCount, getCreditCount} = useCreditHook();
  const [toastVisible, setToastVisible] = useState(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);

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

  const resultDataMore = (dataResult: any) => {
    if (dataResult.value === '3') {
      setModalShare(true);
    } else if (dataResult.value === '4') {
      goToShowCredit();
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
            {dataDetail.imageUrl ? (
              <PhotoPlaylist
                uri={
                  dataDetail.album.imageUrl !== null &&
                  dataDetail.album.imageUrl.length !== 0
                    ? dataDetail.album.imageUrl[0].image
                    : ''
                }
              />
            ) : (
              <View style={styles.undefinedImg}>
                <DefaultImage.PlaylistCover width={148} height={148} />
              </View>
            )}
          </View>
          <View style={styles.containerTitle}>
            <View>
              <Text style={styles.titleSong}>{dataDetail.title}</Text>
              <Text style={styles.artist}>{`${dataDetail.musicianName}`}</Text>
              <Text style={styles.albumName}>{`${
                dataDetail.title
              } · ${dateLongMonth(dataDetail.publishedDate)}`}</Text>
            </View>
          </View>
          <ListenersAndDonate
            totalListener={
              dataDetail.listenerCount ? dataDetail.listenerCount : 0
            }
            onPress={() => setModalDonate(true)}
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.containerContent}>
          <View style={{marginBottom: heightResponsive(15)}}>
            <ListAvatar
              title={t('Home.Topbar.Search.Musician')}
              text={dataDetail.musicianName}
              avatarUri={
                dataDetail.imageUrl !== null && dataDetail.imageUrl.length !== 0
                  ? dataDetail.imageUrl[0].image
                  : ''
              }
            />
            {dataDetail.featuringArtists ? (
              <ListAvatar
                title={t('Music.Credit.Featuring')}
                featuring
                featuringData={dataDetail.featuringArtists}
              />
            ) : null}

            <Text style={[typography.Subtitle1, styles.titleContent]}>
              {t('Music.Label.SongDesc')}
            </Text>
            <Text style={styles.description}>{dataDetail.description}</Text>

            <ListAlbum
              title={t('Home.Topbar.Search.Album') || ''}
              albumName={dataDetail.album.title}
              onPress={() => goToAlbum(dataDetail.album)}
              createdOn={dateLongMonth(dataDetail.album.publishedDate)}
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
          'https://i.pinimg.com/originals/b3/51/66/b35166174c9bde2d0cc436150a983912.jpg'
        }
        type={'Album'}
        titleSong={'Smoke + Mirror'}
        createdOn={'2019'}
        artist={'Imagine Dragons, The Wekeend'}
        onPressCopy={() =>
          InteractionManager.runAfterInteractions(() => setToastVisible(true))
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
              {t('General.LinkCopied')}
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
  },
  artistName: {
    fontFamily: font.InterMedium,
    fontSize: mvs(15),
    lineHeight: heightPercentage(20),
    color: color.Neutral[10],
  },
  description: {
    fontSize: mvs(12),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    lineHeight: heightPercentage(16),
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
    zIndex: 1,
  },
  textStyle: {
    color: color.Neutral[10],
  },
  undefinedImg: {
    marginTop: heightResponsive(36),
    marginBottom: heightResponsive(28),
  },
});
