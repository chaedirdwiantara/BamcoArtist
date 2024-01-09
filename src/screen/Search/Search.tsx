import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Gap, SearchBar, TabFilter, TopNavigation} from '../../components';
import Color from '../../theme/Color';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
import {useTranslation} from 'react-i18next';
import {usePlayerStore} from '../../store/player.store';
import ListResultLiveEvent from './ListSearchLiveEvent';

export const SearchScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();
  const {setWithoutBottomTab, show} = usePlayerStore();

  const [state, setState] = useState<string>('');
  const [forTrigger, setForTrigger] = useState<boolean>(false);
  const [triggerSuggest, setTriggerSuggest] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [typeSearch, setTypeSearch] = useState<string>('');

  const filter: string[] = [
    // t('Home.Topbar.Search.Song'),
    t('Home.Topbar.Search.Musician'),
    t('Home.Topbar.Search.Fans'),
    // t('Home.Topbar.Search.Album'),
    // t('Home.Topbar.Search.Playlist'),
    // t('Home.Topbar.Search.Merch'),
    t('Home.Topbar.Search.Event'),
  ];

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  useEffect(() => {
    if (state.length > 0) {
      setTriggerSuggest(true);
    }
  }, [state]);

  const filterData = (item: string, index: number) => {
    setSelectedIndex(index);
    setTypeSearch(item);
    setForTrigger(true);
  };

  const goToSongDetails = () => {
    navigation.navigate('MusicPlayer');
  };

  const handleBackAction = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('Home.Topbar.Search.Title')}
          leftIconAction={handleBackAction}
          maxLengthTitle={40}
          itemStrokeColor={color.Neutral[10]}
        />
        <View style={styles.container}>
          <Gap height={16} />
          <SearchBar
            value={state}
            onChangeText={(newText: string) => setState(newText)}
            rightIcon={state !== '' && true}
            reset={() => setState('')}
          />
          <Gap height={16} />
          <TabFilter.Type2
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
          />
          {forTrigger ? (
            <>
              {typeSearch === t('Home.Topbar.Search.Musician') && (
                <ListResultMusician keyword={state} />
              )}
              {typeSearch === t('Home.Topbar.Search.Fans') && (
                <ListResultFans keyword={state} />
              )}
              {typeSearch === t('Home.Topbar.Search.Song') && (
                <ListResultSong keyword={state} />
              )}
              {typeSearch === t('Home.Topbar.Search.Album') && (
                <ListResultAlbum keyword={state} />
              )}
              {typeSearch === t('Home.Topbar.Search.Playlist') && (
                <ListResultPlaylists keyword={state} />
              )}
              {typeSearch === t('Home.Topbar.Search.Merch') && (
                <ListResultMerch keyword={state} />
              )}
              {typeSearch === t('Home.Topbar.Search.Event') && (
                <ListResultLiveEvent keyword={state} />
              )}
            </>
          ) : triggerSuggest && state.length > 0 ? (
            <ScrollView>
              <ListResultMusician keyword={state} listType="suggest" />
              <ListResultFans keyword={state} listType="suggest" />
              <ListResultLiveEvent keyword={state} listType="suggest" />
            </ScrollView>
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
