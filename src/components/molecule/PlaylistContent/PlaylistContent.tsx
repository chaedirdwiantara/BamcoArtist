import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
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
  DefaultImage,
  MusicSquareAddIcon,
} from '../../../assets/icon';
import {Gap} from '../../atom';
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

interface Props {
  onPressGoBack: () => void;
  goBackProfile: () => void;
  goToEditPlaylist: () => void;
  goToAddSong: () => void;
  dataDetail: Playlist;
  listSongs: SongList[] | undefined;
}

export const PlaylistContent: React.FC<Props> = ({
  goBackProfile,
  goToEditPlaylist,
  goToAddSong,
  dataDetail,
  listSongs,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const dataMore = [
    {label: 'Add to Queue', value: 'AddToQueue'},
    {label: 'Edit Playlist', value: 'EditPlaylist'},
    {label: 'Share Playlist', value: 'SharePlaylist'},
    {label: 'Delete Playlist', value: 'DeletePlaylist'},
  ];

  const onPressDelete = async () => {
    try {
      await deletePlaylist(dataDetail);
      goBackProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const resultDataMore = (dataResult: any) => {
    if (dataResult?.value === 'DeletePlaylist') {
      setModalVisible(true);
    } else if (dataResult?.value === 'EditPlaylist') {
      goToEditPlaylist();
    }
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title="Playlist"
        rightIcon={
          <Dropdown.More
            data={dataMore}
            selectedMenu={resultDataMore}
            containerStyle={styles.dropdownMore}
          />
        }
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={goBackProfile}
        rightIconAction={() => null}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <ScrollView>
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
            createdBy={dataDetail?.createdBy}
            avatarUri={
              'https://thisis-images.scdn.co/37i9dQZF1DZ06evO2YqUuI-large.jpg'
            }
          />

          <TouchableOpacity
            style={styles.containerAddSong}
            onPress={goToAddSong}>
            <MusicSquareAddIcon />
            <Gap width={widthPercentage(10)} />
            <Text style={styles.textAddSong}>Add Song</Text>
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
            Song List
          </Text>
          <View>
            {listSongs === null || listSongs?.length === 0 ? (
              <Text style={styles.description}>No Song Added</Text>
            ) : (
              <TopSong
                dataSong={listSongs}
                hideDropdownMore={true}
                onPress={() => null}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <ModalConfirm
        modalVisible={isModalVisible}
        title="Delete"
        subtitle="Are you sure you want to delete this playlist?"
        onPressClose={() => setModalVisible(false)}
        onPressOk={onPressDelete}
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
});
