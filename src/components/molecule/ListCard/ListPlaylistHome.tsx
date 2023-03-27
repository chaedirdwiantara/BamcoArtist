import React from 'react';
import {ViewStyle} from 'react-native';

import HorizontalCard from './HorizontalCard';
import PlaylistHome from '../../../screen/ListCard/PlaylistHome';
import {Playlist} from '../../../interface/playlist.interface';
import {ListDataSearchPlaylist} from '../../../interface/search.interface';

export interface ListPlaylistHomeProps {
  title: string;
  data: Playlist[] | ListDataSearchPlaylist[] | undefined;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

const ListPlaylistHome: React.FC<ListPlaylistHomeProps> = (
  props: ListPlaylistHomeProps,
) => {
  const {title, data, onPress, containerStyle} = props;

  const children = () => {
    return <PlaylistHome dataPlaylist={data ?? []} />;
  };

  return (
    <HorizontalCard
      title={title}
      children={children()}
      onPress={onPress}
      containerStyle={containerStyle}
    />
  );
};

export default ListPlaylistHome;
