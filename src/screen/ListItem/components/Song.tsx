import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {ListItem} from './ListItem';
import {color, font} from '../../../theme';
import {EmptyState} from '../../../components';
import {widthPercentage} from '../../../utils';
import ListSongs from '../../ListCard/ListSongs';
import {useIsFocused} from '@react-navigation/native';
import {storage} from '../../../hooks/use-storage.hook';
import {useSongHook} from '../../../hooks/use-song.hook';
import {SongList} from '../../../interface/song.interface';
import {usePlayerHook} from '../../../hooks/use-player.hook';

interface ListSongProps {
  title: string;
  fromMainTab: boolean;
  id?: number;
  filterBy?: any;
  onPressHidePlayer: () => void;
}

export const ListSong: React.FC<ListSongProps> = ({
  id,
  filterBy,
  title,
  fromMainTab,
  onPressHidePlayer,
}) => {
  const {t} = useTranslation();
  const {isLoadingSong, dataSong, getListDataSong} = useSongHook();
  const isFocused = useIsFocused();
  const {isPlaying, showPlayer, hidePlayer, addPlaylist} = usePlayerHook();
  const emptyState =
    filterBy === 'mood'
      ? t('Home.ListMood.EmptyState')
      : t('Home.ListGenre.EmptyState');

  useEffect(() => {
    getListDataSong({
      [filterBy]: id,
      page: 1,
      perPage: 10,
    });
    storage.set('withoutBottomTab', true);
  }, []);

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onPressSong = (val: SongList | null) => {
    addPlaylist({
      dataSong: dataSong !== undefined ? dataSong : [],
      playSongId: val?.id,
      isPlay: true,
    });
    showPlayer();
  };

  const children = () => {
    if (isLoadingSong) {
      return null;
    }

    if (dataSong.length > 0) {
      return (
        <ScrollView>
          <View style={{paddingHorizontal: widthPercentage(20)}}>
            <ListSongs
              dataSong={dataSong}
              type="home"
              onPress={onPressSong}
              loveIcon={true}
            />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <EmptyState
          text={emptyState}
          containerStyle={styles.containerEmpty}
          textStyle={styles.emptyText}
          hideIcon={true}
        />
      );
    }
  };

  return (
    <ListItem
      title={title}
      children={children()}
      onPressBack={fromMainTab ? onPressHidePlayer : undefined}
    />
  );
};

const styles = StyleSheet.create({
  containerEmpty: {
    alignSelf: 'center',
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(16),
  },
});
