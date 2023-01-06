import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
} from 'react-native';

import {
  elipsisText,
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {font} from '../../../theme';
import {ListCard} from '../ListCard';
import {TabFilter} from '../TabFilter';
import Color from '../../../theme/Color';
import {ProfileHeader} from './components/Header';
import {EmptyState} from '../EmptyState/EmptyState';
import {TopSongListData} from '../../../data/topSong';
import TopSong from '../../../screen/ListCard/TopSong';
import {UserInfoCard} from '../UserInfoCard/UserInfoCard';
import {CreateNewCard} from '../CreateNewCard/CreateNewCard';
import {SettingIcon} from '../../../assets/icon';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface NewPlaylistProps {
  playlist: any;
  goToPlaylist: () => void;
}

interface ProfileContentProps {
  playlist: any;
  profile: any;
  goToEditProfile: () => void;
  goToPlaylist: () => void;
  onPressGoTo: (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => void;
}

const NewCreatedPlaylist: React.FC<NewPlaylistProps> = ({
  playlist,
  goToPlaylist,
}) => {
  return (
    <TouchableOpacity onPress={goToPlaylist}>
      <ListCard.MusicList
        imgUri={playlist?.playlistUri?.path}
        musicNum={'01'}
        musicTitle={elipsisText(playlist?.playlistName, 22)}
        singerName={'by Weaboo'}
        containerStyles={{marginTop: heightPercentage(20)}}
        hideDropdownMore={true}
      />
    </TouchableOpacity>
  );
};

export const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  playlist,
  goToEditProfile,
  goToPlaylist,
  onPressGoTo,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'SONG'},
    {filterName: 'TOP MUSICIAN'},
    {filterName: 'BADGE'},
  ]);
  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
  };

  return (
    <View style={{flex: 1}}>
      {scrollEffect && (
        <View style={styles.containerStickyHeader}>
          <Text style={[styles.name, styles.topIos]}>{profile.fullname}</Text>
          <TouchableOpacity onPress={() => onPressGoTo('Setting')}>
            <SettingIcon style={styles.topIos} />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        <ProfileHeader
          avatarUri={profile.avatarUri}
          backgroundUri={profile.backgroundUri}
          fullname={profile.fullname}
          username={profile.username}
          bio={profile.bio}
          onPress={goToEditProfile}
          iconPress={() => onPressGoTo('Setting')}
          scrollEffect={scrollEffect}
        />
        <UserInfoCard
          type="self"
          containerStyles={styles.infoCard}
          totalFollowing={profile.totalFollowing}
          onPress={() => onPressGoTo('Following')}
        />
        <View style={styles.containerContent}>
          <TabFilter.Type1
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
          />
          {filter[selectedIndex].filterName === 'SONG' ? (
            TopSongListData.length > 0 ? (
              <View>
                <CreateNewCard
                  num="00"
                  text="Create New Playlist"
                  onPress={() => onPressGoTo('CreateNewPlaylist')}
                />
                {playlist?.playlistName !== undefined && (
                  <NewCreatedPlaylist
                    playlist={playlist}
                    goToPlaylist={goToPlaylist}
                  />
                )}
                <TopSong
                  hideDropdownMore={true}
                  onPress={() => null}
                  scrollable={false}
                />
              </View>
            ) : (
              <CreateNewCard
                num="01"
                text="Default Playlist"
                onPress={() => onPressGoTo('CreateNewPlaylist')}
              />
            )
          ) : filter[selectedIndex].filterName === 'TOP MUSICIAN' ? (
            // Dihold karena point belum fix

            // MusicianListData.length > 0 ? (
            //   <TopMusician
            //     scrollable={false}
            //     type={'profile'}
            //     dataMusician={[]}
            //   />
            // ) :
            <EmptyState
              text="This user don't have contribution to any musician"
              containerStyle={{marginTop: heightPercentage(30)}}
            />
          ) : (
            // Dihold karena badge belum fix

            // MusicianListData.length > 0 ? (
            //   <MenuText.LeftIconWithSubtitle
            //     text="No Room for Speed"
            //     subtitle="Be the first jam contributor on 100 artist"
            //     onPress={() => null}
            //     icon={<ProcessingIcon />}
            //   />
            // ) :
            <EmptyState
              text="This user don't have any badge"
              containerStyle={{marginTop: heightPercentage(30)}}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Color.Dark[50],
  },
  infoCard: {
    position: 'absolute',
    top: heightPercentage(310),
    left: widthPercentage(20),
  },
  containerContent: {
    flex: 1,
    marginTop: heightPercentage(70),
    paddingHorizontal: widthPercentage(20),
    marginBottom: heightPercentage(20),
    width: '100%',
  },
  flashlistStyle: {
    width: '100%',
    height: '100%',
  },
  containerStickyHeader: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(20),
    backgroundColor: Color.Dark[800],
    height: heightPercentage(85),
  },
  name: {
    fontFamily: font.InterSemiBold,
    fontSize: normalize(16),
    lineHeight: heightPercentage(20),
    color: Color.Neutral[10],
  },
  topIos: {
    top: heightPercentage(15),
  },
});
