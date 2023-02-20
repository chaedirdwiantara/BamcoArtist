import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {color} from '../../theme';
import TopSong from '../ListCard/TopSong';
import {ArrowLeftIcon} from '../../assets/icon';
import {SongList} from '../../interface/song.interface';
import {EmptyState, TopNavigation} from '../../components';
import {heightPercentage, widthPercentage} from '../../utils';

interface Props {
  listSong: SongList[] | undefined;
  onPressSong: (param: SongList | null) => void;
  playerVisible: boolean;
  onPressGoBack: () => void;
}

export const DefaultPlaylist: React.FC<Props> = ({
  listSong,
  onPressSong,
  playerVisible,
  onPressGoBack,
}) => {
  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title="Default Playlist"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        rightIcon={<></>}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <ScrollView
        style={{marginBottom: playerVisible ? heightPercentage(40) : 0}}>
        <View style={{paddingHorizontal: widthPercentage(20)}}>
          {listSong === null || listSong?.length === 0 ? (
            <EmptyState
              text="You don't have any liked songs"
              containerStyle={{marginTop: heightPercentage(100)}}
            />
          ) : (
            <TopSong
              dataSong={listSong}
              type={'defaultPlaylist'}
              onPress={onPressSong}
              loveIcon={true}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
});
