import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Gap, SearchBar, TabFilter, TopNavigation} from '../../components';
import Color from '../../theme/Color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {color} from '../../theme';
import {widthResponsive} from '../../utils';
import {SearchListType} from '../../data/search';
import {ModalPlayMusic} from '../../components/molecule/Modal/ModalPlayMusic';
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

  const filterData = (item: string, index: number) => {
    setSelectedIndex(index);
    setTypeSearch(item);
  };

  const goToSongDetails = () => {
    navigation.navigate('MusicPlayer');
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
              {typeSearch === 'Musician' && (
                <ListResultMusician keyword={state} />
              )}
              {typeSearch === 'Fans' && <ListResultFans keyword={state} />}
              {typeSearch === 'Song' && <ListResultSong keyword={state} />}
              {typeSearch === 'Album' && <ListResultAlbum keyword={state} />}
              {typeSearch === 'Playlist' && (
                <ListResultPlaylists keyword={state} />
              )}
              {typeSearch === 'Merch' && <ListResultMerch keyword={state} />}
              {typeSearch === 'Event' && <ListResultEvent keyword={state} />}
            </>
          ) : null}
        </View>
        {modalVisible && <ModalPlayMusic onPressModal={goToSongDetails} />}
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
