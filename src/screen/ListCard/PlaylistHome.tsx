import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {EmptyStateSongMusician} from '../../components/molecule/EmptyState/EmptyStateSongMusician';
import PlaylistHomeCard from '../../components/molecule/ListCard/PlaylistHomeCard';
import {Playlist} from '../../interface/playlist.interface';
import {ListDataSearchPlaylist} from '../../interface/search.interface';
import {RootStackParams} from '../../navigations';
import {widthResponsive} from '../../utils';

interface PlaylistProps {
  dataPlaylist: Playlist[] | ListDataSearchPlaylist[];
}

const PlaylistHome: FC<PlaylistProps> = (props: PlaylistProps) => {
  const {t} = useTranslation();
  const {dataPlaylist} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <>
      {dataPlaylist?.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: widthResponsive(24),
          }}>
          {dataPlaylist?.map((item, index) => {
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
      ) : (
        <EmptyStateSongMusician
          text={t('Home.Playlist.EmptyState')}
          height={200}
        />
      )}
    </>
  );
};

export default PlaylistHome;
