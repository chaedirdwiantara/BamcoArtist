import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';

import {ListItem} from './ListItem';
import TopSong from '../../ListCard/TopSong';
import {widthPercentage} from '../../../utils';
import {useIsFocused} from '@react-navigation/native';
import {storage} from '../../../hooks/use-storage.hook';
import {useSongHook} from '../../../hooks/use-song.hook';
import {SongList} from '../../../interface/song.interface';
import {usePlayerHook} from '../../../hooks/use-player.hook';

interface ListSongProps {
  title: string;
  fromMainTab: boolean;
  onPressHidePlayer: () => void;
}

export const ListSong: React.FC<ListSongProps> = ({
  title,
  fromMainTab,
  onPressHidePlayer,
}) => {
  const {dataSong, getListDataSong} = useSongHook();
  const isFocused = useIsFocused();
  const {isPlaying, showPlayer, hidePlayer, addPlaylist} = usePlayerHook();

  useEffect(() => {
    getListDataSong({
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
    return (
      <ScrollView>
        <View style={{paddingHorizontal: widthPercentage(20)}}>
          <TopSong
            dataSong={dataSong}
            type="home"
            onPress={onPressSong}
            loveIcon={true}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <ListItem
      title={title}
      children={children()}
      onPressBack={fromMainTab ? onPressHidePlayer : undefined}
    />
  );
};
