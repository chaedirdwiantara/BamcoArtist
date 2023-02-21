import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';

import {
  heightPercentage,
  heightResponsive,
  normalize,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  DefaultImage,
  MusicSquareAddIcon,
} from '../../../assets/icon';
import {Gap, SsuToast} from '../../atom';
import {Dropdown} from '../DropDown';
import Color from '../../../theme/Color';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {dateFormat} from '../../../utils/date-format';
import TopSong from '../../../screen/ListCard/TopSong';
import {color, font, typography} from '../../../theme';
import {deletePlaylist} from '../../../api/playlist.api';
import {SongList} from '../../../interface/song.interface';
import {SongTitlePlay} from '../SongTitlePlay/SongTitlePlay';
import {Playlist} from '../../../interface/playlist.interface';
import {useTranslation} from 'react-i18next';
import {ModalShare} from '../Modal/ModalShare';

interface Props {
  goBackProfile: (showToast: boolean) => void;
  goToEditPlaylist: () => void;
  goToAddSong: () => void;
  dataDetail: Playlist;
  listSongs: SongList[] | undefined;
  onPressSong: (param: SongList | null) => void;
  playerVisible: boolean;
  isPlaying: boolean;
  handlePlayPaused: () => void;
}

export const PlaylistContent: React.FC<Props> = ({
  goBackProfile,
  goToEditPlaylist,
  goToAddSong,
  dataDetail,
  listSongs,
  onPressSong,
  playerVisible,
  isPlaying,
  handlePlayPaused,
}) => {
  const {t} = useTranslation();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');
  const [modalShare, setModalShare] = useState<boolean>(false);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  const dataMore = [
    {label: t('Home.Tab.TopSong.Queue'), value: 'AddToQueue'},
    {label: t('Music.Playlist.Edit'), value: 'EditPlaylist'},
    {label: t('Music.Playlist.Share'), value: 'SharePlaylist'},
    {label: t('Music.Playlist.Delete'), value: 'DeletePlaylist'},
  ];

  const songDataMore = [
    {label: t('Home.Tab.TopSong.Queue'), value: 'AddToQueue'},
    {label: t('Music.Playlist.Remove'), value: 'RemoveFromPlaylist'},
    {label: t('Home.Tab.TopSong.Share'), value: 'ShareSong'},
    {label: t('Home.Tab.TopSong.Details'), value: 'ShowDetails'},
  ];

  const onPressDelete = async () => {
    try {
      await deletePlaylist(dataDetail);
      goBackProfile(true);
    } catch (error) {
      console.log(error);
    }
  };

  const resultDataMore = (dataResult: any) => {
    if (dataResult?.value === 'DeletePlaylist') {
      setModalVisible(true);
    } else if (dataResult?.value === 'EditPlaylist') {
      goToEditPlaylist();
    } else if (dataResult?.value === 'AddToQueue') {
      setToastVisible(true);
      setToastText('Playlist added to queue!');
    } else {
      setModalShare(true);
    }
  };

  const pressSongDataMore = (dataResult: any) => {
    if (dataResult?.value === 'DeletePlaylist') {
      setModalVisible(true);
    } else if (dataResult?.value === 'EditPlaylist') {
      goToEditPlaylist();
    } else if (dataResult?.value === 'AddToQueue') {
      setToastVisible(true);
      setToastText('Song added to queue!');
    } else {
      setModalShare(true);
    }
  };

  const songIsExist = listSongs !== null && listSongs !== undefined;
  const firstSong = songIsExist ? listSongs[0] : null;

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title={t('Home.Topbar.Search.Playlist')}
        rightIcon={
          <Dropdown.More
            data={dataMore}
            selectedMenu={resultDataMore}
            containerStyle={styles.dropdownMore}
          />
        }
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={() => goBackProfile(false)}
        rightIconAction={() => null}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <ScrollView
        style={{marginBottom: playerVisible ? heightPercentage(40) : 0}}>
        <View style={{paddingHorizontal: widthPercentage(10)}}>
          <View style={{alignSelf: 'center'}}>
            {dataDetail?.thumbnailUrl ? (
              <PhotoPlaylist uri={dataDetail?.thumbnailUrl} />
            ) : (
              <DefaultImage.PlaylistCover
                width={widthResponsive(148)}
                height={widthResponsive(148)}
                style={{
                  marginTop: heightResponsive(36),
                  marginBottom: heightResponsive(28),
                }}
              />
            )}
          </View>
          <SongTitlePlay
            title={dataDetail?.name}
            totalSong={dataDetail?.totalSong}
            createdDate={dateFormat(dataDetail?.createdAt)}
            createdBy={dataDetail?.playlistOwner?.fullname}
            avatarUri={dataDetail?.playlistOwner?.image}
            showIconPlay={songIsExist && listSongs?.length > 0}
            isPlaying={isPlaying}
            handlePlayPaused={handlePlayPaused}
            onPressSong={() => onPressSong(firstSong)}
          />

          <TouchableOpacity
            style={styles.containerAddSong}
            onPress={goToAddSong}>
            <MusicSquareAddIcon />
            <Gap width={widthPercentage(10)} />
            <Text style={styles.textAddSong}>{t('Music.Label.AddSong')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.containerContent}>
          {dataDetail?.description && (
            <View style={{marginBottom: heightPercentage(15)}}>
              <Text style={[typography.Subtitle1, {color: color.Success[500]}]}>
                Description
              </Text>
              <Text style={styles.description}>{dataDetail.description}</Text>
            </View>
          )}

          <Text style={[typography.Subtitle1, {color: color.Success[500]}]}>
            {t('Music.Label.SongList')}
          </Text>
          <View>
            {listSongs === null || listSongs?.length === 0 ? (
              <Text style={styles.description}>{t('Music.Label.NoSong')}</Text>
            ) : (
              <TopSong
                dataSong={listSongs}
                hideDropdownMore={true}
                type={'home'}
                onPress={onPressSong}
                loveIcon={true}
                newDataMore={songDataMore}
                newOnPressMore={pressSongDataMore}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <ModalConfirm
        modalVisible={isModalVisible}
        title={t('Music.Playlist.Delete') || ''}
        subtitle={t('Modal.Playlist.Delete') || ''}
        onPressClose={() => setModalVisible(false)}
        onPressOk={onPressDelete}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <CheckCircle2Icon />
            <Gap width={4} />
            <Text style={[styles.textStyle]} numberOfLines={2}>
              {toastText}
            </Text>
          </View>
        }
        modalStyle={styles.toast}
      />

      <ModalShare
        url={
          'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0'
        }
        modalVisible={modalShare}
        onPressClose={() => setModalShare(false)}
        titleModal={t('General.Share.Playlist')}
        imgUri={dataDetail?.thumbnailUrl}
        type={'Playlist'}
        titleSong={dataDetail?.name}
        createdOn={dateFormat(dataDetail?.createdAt)}
        artist={dataDetail?.playlistOwner?.fullname}
        onPressCopy={() => {
          InteractionManager.runAfterInteractions(() => setToastVisible(true));
          setToastText(t('General.LinkCopied') || '');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  dropdownMore: {
    width: widthPercentage(123),
    marginLeft: widthPercentage(-113),
    marginTop: heightPercentage(-8),
  },
  containerAddSong: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(12),
    marginTop: heightPercentage(12),
  },
  textAddSong: {
    fontSize: normalize(12),
    color: color.Dark[50],
    fontFamily: font.InterMedium,
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
    marginBottom: heightPercentage(30),
  },
  description: {
    fontSize: normalize(12),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    lineHeight: heightPercentage(16),
    paddingTop: heightPercentage(8),
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
