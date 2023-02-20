import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

import {
  AddCircleIcon,
  ArrowLeftIcon,
  TickCircleIcon,
} from '../../../assets/icon';
import Color from '../../../theme/Color';
import {
  AddSongPropsType,
  Playlist,
} from '../../../interface/playlist.interface';
import {TopNavigation} from '../TopNavigation';
import {color, typography} from '../../../theme';
import {Gap, SearchBar, SsuToast} from '../../atom';
import TopSong from '../../../screen/ListCard/TopSong';
import {SongList} from '../../../interface/song.interface';
import {heightPercentage, widthPercentage} from '../../../utils';
import {useTranslation} from 'react-i18next';

interface AddSongProps {
  search: string;
  setSearch: (text: string) => void;
  playlist: Playlist;
  listSongs: SongList[];
  onPressGoBack: () => void;
  setAddSongToPlaylist: (props?: AddSongPropsType) => void;
}

export const AddSongContent: React.FC<AddSongProps> = ({
  search,
  setSearch,
  playlist,
  listSongs,
  onPressGoBack,
  setAddSongToPlaylist,
}) => {
  const {t} = useTranslation();
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  const onPressIcon = (songId: number) => {
    setAddSongToPlaylist({playlistId: playlist.id, songId: songId});
    setToastVisible(true);
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Music.Label.AddSong')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />
      <SearchBar
        value={search}
        onChangeText={(text: string) => setSearch(text)}
        containerStyle={{
          paddingHorizontal: widthPercentage(20),
          paddingVertical: heightPercentage(20),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: widthPercentage(20),
          }}>
          <TopSong
            dataSong={listSongs}
            onPress={() => null}
            rightIcon={true}
            rightIconComponent={<AddCircleIcon />}
            onPressIcon={onPressIcon}
            activeOpacity={1}
          />
        </View>
      </ScrollView>

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
              {t('Music.Playlist.Success')}
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
  textVersion: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
    paddingTop: heightPercentage(15),
  },
  textSignOut: {
    color: Color.Neutral[10],
    paddingLeft: widthPercentage(15),
  },
  containerSignout: {
    flexDirection: 'row',
    paddingLeft: widthPercentage(15),
    position: 'absolute',
    bottom: heightPercentage(20),
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
