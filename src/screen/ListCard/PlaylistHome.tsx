import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import PlaylistHomeCard from '../../components/molecule/ListCard/PlaylistHomeCard';
import {Playlist} from '../../interface/playlist.interface';
import {RootStackParams} from '../../navigations';
import {widthResponsive} from '../../utils';

interface PlaylistProps {
  dataPlaylist: Playlist[];
}

const PlaylistHome: FC<PlaylistProps> = (props: PlaylistProps) => {
  const {t} = useTranslation();
  const {dataPlaylist} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingLeft: widthResponsive(24),
      }}>
      {dataPlaylist.length > 0 &&
        dataPlaylist?.map((item, index) => {
          return (
            <PlaylistHomeCard
              key={index}
              imgUri={item.thumbnailUrl}
              musicTitle={item.name}
              singerName={item.playlistOwner.fullname}
              onPressCard={() =>
                navigation.navigate('Playlist', {id: item.id, from: 'other'})
              }
            />
          );
        })}
    </ScrollView>
  );
};

export default PlaylistHome;
