import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {
  heightPercentage,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import Color from '../../../theme/Color';
import {typography} from '../../../theme';
import {TopNavigation} from '../TopNavigation';
import {Gap, SearchBar, SsuToast} from '../../atom';
import {CreateNewCard} from '../CreateNewCard/CreateNewCard';
import {Playlist} from '../../../interface/playlist.interface';
import ListPlaylist from '../../../screen/ListCard/ListPlaylist';
import {ArrowLeftIcon, InfoCircleIcon} from '../../../assets/icon';

interface AddToPlaylistProps {
  dataPlaylist: Playlist[];
  onPressGoBack: () => void;
  goToCreatePlaylist: () => void;
  pressAddToPlaylist: (id: number) => void;
  toastVisible: boolean;
  toastError: boolean;
  setToastVisible: (param: boolean) => void;
  search: string;
  setSearch: (value: string) => void;
}

export const AddToPlaylistContent: React.FC<AddToPlaylistProps> = ({
  dataPlaylist,
  onPressGoBack,
  goToCreatePlaylist,
  pressAddToPlaylist,
  toastVisible,
  toastError,
  setToastVisible,
  search,
  setSearch,
}) => {
  const {t} = useTranslation();

  const toastText = toastError
    ? 'Song has already added'
    : 'Song have been added to playlist!';
  const toastBg = toastError ? Color.Error[400] : Color.Success[400];

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
        <View style={{marginBottom: heightPercentage(30)}}>
          <CreateNewCard
            num=""
            text={t('Profile.Button.NewPlaylist')}
            onPress={goToCreatePlaylist}
          />
          <ListPlaylist
            data={
              dataPlaylist === null
                ? []
                : dataPlaylist.filter(v => !v.isDefaultPlaylist)
            }
            onPress={pressAddToPlaylist}
            scrollable={false}
            withoutNum={true}
          />
        </View>
      </ScrollView>

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer, {backgroundColor: toastBg}]}>
            <InfoCircleIcon
              width={widthResponsive(21)}
              height={heightPercentage(20)}
              stroke={Color.Neutral[10]}
            />
            <Gap width={widthResponsive(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              {toastText}
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthResponsive(24)}}
      />
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
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: Color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  textStyle: {
    color: Color.Neutral[10],
  },
});
