import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  Gap,
  ListCard,
  SearchBar,
  TabFilter,
  TopNavigation,
} from '../../components';
import Color from '../../theme/Color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {color} from '../../theme';
import {widthResponsive} from '../../utils';
import {SearchListData, SearchListType} from '../../data/search';
import {mvs} from 'react-native-size-matters';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {ModalPlayMusic} from '../../components/molecule/Modal/ModalPlayMusic';
import {useSearchHook} from '../../hooks/use-search.hook';
import ListResultMusician from './ListResultMusician';
import ListResultFans from './LstResultFans';
import ListResultSong from './ListResultSong';
import ListResultAlbum from './ListResultAlbum';
import ListResultPlaylists from './ListResultPlaylist';
import ListResultMerch from './ListResultMerch';
import ListResultEvent from './ListResultEvent';

export const SearchScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [state, setState] = useState<string>('');
  const [dataShow, setDataShow] = useState<SearchListType[]>([]);
  const [forTrigger, setForTrigger] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [typeSearch, setTypeSearch] = useState<string>('');

  const filter: string[] = [
    'Song',
    'Musician',
    'Fans',
    'Album',
    'Playlist',
    'Merch',
    'Event',
  ];

  const {
    searchLoading,
    dataSearchFans,
    dataSearchMusicians,
    dataSearchSongs,
    dataSearchAlbums,
    dataSearchPlaylists,
    getSearchAlbums,
    getSearchPlaylists,
    getSearchFans,
    getSearchMusicians,
    getSearchSongs,
  } = useSearchHook();

  const filterData = (item: string, index: number) => {
    setSelectedIndex(index);
    setTypeSearch(item);
    if (item === 'Song') {
      getSearchSongs({keyword: state});
    }
    if (item === 'Musician') {
      getSearchMusicians({keyword: state});
    }
    if (item === 'Fans') {
      getSearchFans({keyword: state});
    }
    if (item === 'Album') {
      getSearchAlbums({keyword: state});
    }
    if (item === 'Playlist') {
      getSearchPlaylists({keyword: state});
    }
  };

  const goToSongDetails = () => {
    navigation.navigate('MusicPlayer');
  };

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  return (
    <>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={`Search`}
          leftIconAction={() => navigation.goBack()}
          maxLengthTitle={40}
          itemStrokeColor={color.Neutral[10]}
        />
        <View style={styles.container}>
          <Gap height={16} />
          <SearchBar
            value={state}
            onChangeText={(newText: string) => setState(newText)}
            onSubmitEditing={() => setForTrigger(true)}
            rightIcon={state !== '' && true}
            reset={() => setState('')}
          />
          <Gap height={16} />
          {forTrigger ? (
            <>
              <TabFilter.Type2
                filterData={filter}
                onPress={filterData}
                selectedIndex={selectedIndex}
              />
              {dataSearchMusicians && typeSearch === 'Musician' && (
                <ListResultMusician dataSearchMusicians={dataSearchMusicians} />
              )}
              {dataSearchFans && typeSearch === 'Fans' && (
                <ListResultFans dataSearchFans={dataSearchFans} />
              )}
              {dataSearchSongs && typeSearch === 'Song' && (
                <ListResultSong dataSearchSongs={dataSearchSongs} />
              )}
              {dataSearchAlbums && typeSearch === 'Album' && (
                <ListResultAlbum dataSearchAlbums={dataSearchAlbums} />
              )}
              {dataSearchPlaylists && typeSearch === 'Playlist' && (
                <ListResultPlaylists
                  dataSearchPlaylists={dataSearchPlaylists}
                />
              )}
              {typeSearch === 'Merch' && <ListResultMerch keyword={state} />}
              {typeSearch === 'Event' && <ListResultEvent keyword={state} />}
            </>
          ) : null}
        </View>
        {modalVisible && (
          <ModalPlayMusic
            imgUri={
              'https://cdns-images.dzcdn.net/images/cover/7f7aae26b50cb046c872238b6a2a10c2/264x264.jpg'
            }
            musicTitle={'Thunder'}
            singerName={'Imagine Dragons, The Wekeend'}
            onPressModal={goToSongDetails}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  container: {
    paddingHorizontal: widthResponsive(24),
  },
});
