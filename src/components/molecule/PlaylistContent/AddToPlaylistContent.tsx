import React, {useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';

import {SearchBar} from '../../atom';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import TopSong from '../../../screen/ListCard/TopSong';
import {CreateNewCard} from '../CreateNewCard/CreateNewCard';
import {heightPercentage, widthPercentage} from '../../../utils';
import {useTranslation} from 'react-i18next';

interface AddToPlaylistProps {
  onPressGoBack: () => void;
}

export const AddToPlaylistContent: React.FC<AddToPlaylistProps> = ({
  onPressGoBack,
}) => {
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Home.Tab.TopSong.Playlist')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />

      <SearchBar
        value={search}
        onChangeText={(text: string) => setSearch(text)}
        containerStyle={{
          paddingHorizontal: widthPercentage(20),
          paddingVertical: heightPercentage(20),
        }}
      />
      <ScrollView style={{paddingHorizontal: widthPercentage(20)}}>
        <CreateNewCard
          num="00"
          text={t('Profile.Button.CreatePlaylist')}
          // onPress={() => onPressGoTo('CreateNewPlaylist')}
        />
        <TopSong
          hideDropdownMore={true}
          scrollable={false}
          onPress={() => null}
        />
      </ScrollView>
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
});
