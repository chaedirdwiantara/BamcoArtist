import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  RefreshControl,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  width,
  normalize,
  widthPercentage,
  heightPercentage,
  widthResponsive,
} from '../../../utils';
import {color, font} from '../../../theme';
import {TabFilter} from '../TabFilter';
import {FansScreen} from '../ListFans';
import Color from '../../../theme/Color';
import {Gap, SsuToast} from '../../atom';
import {
  AlbumData,
  AppearsOnDataType,
  DataDetailMusician,
} from '../../../interface/musician.interface';
import {ProfileHeader} from './components/Header';
import {EmptyState} from '../EmptyState/EmptyState';
import {UserInfoCard} from '../UserInfoCard/UserInfoCard';
import ImageModal from '../../../screen/Detail/ImageModal';
import {CreateNewCard} from '../CreateNewCard/CreateNewCard';
import {Playlist} from '../../../interface/playlist.interface';
import ListPlaylist from '../../../screen/ListCard/ListPlaylist';
import ListAlbum from '../../../screen/MusicianProfile/ListAlbum';
import {CheckCircle2Icon, SettingIcon} from '../../../assets/icon';
import PostListPublic from '../../../screen/ListCard/PostListPublic';
import PostListProfile from '../../../screen/ListCard/PostListProfile';
import DataMusician from '../../../screen/MusicianProfile/DataMusician';
import {DataExclusiveResponse} from '../../../interface/setting.interface';
import {ProfileFansResponseType} from '../../../interface/profile.interface';
import {dropDownDataCategory, dropDownDataSort} from '../../../data/dropdown';
import ExclusiveDailyContent from '../../../screen/MusicianProfile/ExclusiveDailyContent';
import MerchList from '../../../screen/ListCard/MerchList';
import ConcertList from '../../../screen/ListCard/ConcertList';
import EventMusician from '../EventMusician';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface ProfileContentProps {
  profile: any;
  goToEditProfile: () => void;
  goToPlaylist: (id: number, name: string) => void;
  dataPlaylist?: Playlist[];
  uuid?: string;
  dataAlbum?: AlbumData[];
  dataAppearsOn?: AppearsOnDataType[];
  dataDetailMusician?: DataDetailMusician;
  selfProfile?: ProfileFansResponseType;
  ownProfile?: boolean;
  totalCountlikedSong?: number;
  goToFollowers: () => void;
  exclusiveContent?: DataExclusiveResponse;
  toastVisible: boolean;
  setToastVisible: (param: boolean) => void;
  toastText: string;
  refreshing: boolean;
  setRefreshing: () => void;
  goToSetting: () => void;
  goToCreatePlaylist: () => void;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  goToEditProfile,
  goToPlaylist,
  dataPlaylist,
  uuid,
  dataAlbum,
  dataDetailMusician,
  selfProfile,
  totalCountlikedSong,
  ownProfile = false,
  goToFollowers,
  exclusiveContent,
  toastVisible,
  setToastVisible,
  toastText,
  refreshing,
  setRefreshing,
  goToSetting,
  goToCreatePlaylist,
  dataAppearsOn,
}) => {
  const {t} = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'Profile.Tab.Playlist'},
    {filterName: 'Profile.Tab.TopMusician'},
    {filterName: 'Profile.Tab.Badge'},
  ]);

  const [filter2] = useState([
    // {filterName: 'Musician.Tab.Main'},// TODO: DISABLE FOR NOW
    {filterName: 'Musician.Tab.Musician'},
    {filterName: 'Musician.Tab.Music'},
    {filterName: 'Musician.Tab.Fans'},
    {filterName: 'Musician.Tab.Event'},
    {filterName: 'Musician.Tab.Profile'},
    // {filterName: 'Musician.Tab.Merchandise'},
    // {filterName: 'Musician.Tab.Ticket'},
  ]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string[]>([]);

  const showImage = (uri: string) => {
    setModalVisible(!isModalVisible);
    setZoomImage([uri]);
  };

  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
  };

  const topPosition =
    Platform.OS === 'ios' && refreshing
      ? heightPercentage(360)
      : heightPercentage(310);

  return (
    <View style={{flex: 1}}>
      {scrollEffect && (
        <View style={styles.containerStickyHeader}>
          <Text style={[styles.name, styles.topIos]}>{profile.fullname}</Text>
          <TouchableOpacity onPress={goToSetting}>
            <SettingIcon style={styles.topIos} />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={setRefreshing}
            tintColor={'transparent'}
          />
        }
        onScroll={handleScroll}>
        <ProfileHeader
          type={!ownProfile ? 'user detail' : 'profile'}
          avatarUri={profile.avatarUri}
          backgroundUri={profile.backgroundUri}
          fullname={profile.fullname}
          username={profile.username}
          bio={profile.bio}
          onPress={goToEditProfile}
          iconPress={goToSetting}
          scrollEffect={scrollEffect}
          noEdit={!ownProfile}
          backIcon={ownProfile}
          onPressImage={showImage}
          refreshing={refreshing}
        />
        <UserInfoCard
          profile={profile}
          type={ownProfile ? '' : 'self'}
          containerStyles={{
            position: 'absolute',
            left: widthPercentage(20),
            top: topPosition,
          }}
          totalFollowing={profile.totalFollowing}
          onPress={goToFollowers}
          selfProfile={selfProfile?.data}
          totalCountlikedSong={totalCountlikedSong}
          followersCount={profile.totalFollowers}
        />
        {exclusiveContent ? (
          <>
            <Gap height={heightPercentage(50)} />
            <ExclusiveDailyContent {...exclusiveContent} edit={true} />
            <Gap height={heightPercentage(20)} />
          </>
        ) : (
          <Gap height={heightPercentage(70)} />
        )}

        <TabFilter.Type1
          filterData={ownProfile ? filter2 : filter}
          onPress={filterData}
          selectedIndex={selectedIndex}
          translation={true}
          flatlistContainerStyle={{
            paddingHorizontal: widthResponsive(20),
            width: 'auto',
          }}
        />

        <View style={styles.containerContent}>
          {!ownProfile &&
          dataPlaylist !== null &&
          filter[selectedIndex].filterName === 'Profile.Tab.Playlist' ? (
            <View>
              <ListPlaylist
                data={dataPlaylist}
                onPress={goToPlaylist}
                scrollable={false}
              />
            </View>
          ) : !ownProfile &&
            filter[selectedIndex].filterName ===
              t('Profile.Tab.TopMusician') ? (
            <EmptyState
              text={t('Profile.Label.NoMusician') || ''}
              containerStyle={{marginTop: heightPercentage(30)}}
            />
          ) : null}
          {ownProfile &&
          dataDetailMusician &&
          dataAlbum &&
          filter2[selectedIndex].filterName === 'Musician.Tab.Profile' ? (
            <View style={{marginHorizontal: widthResponsive(-23)}}>
              <DataMusician
                profile={dataDetailMusician}
                dataAlbum={dataAlbum}
              />
            </View>
          ) : filter2[selectedIndex].filterName === 'Musician.Tab.Musician' ? (
            <View
              style={{
                width: '100%',
              }}>
              {ownProfile ? (
                exclusiveContent ? (
                  <PostListProfile uuidMusician={uuid} {...exclusiveContent} />
                ) : (
                  <PostListProfile uuidMusician={uuid} pricingPlans={[]} />
                )
              ) : (
                <PostListPublic
                  uuidMusician={uuid}
                  dataRightDropdown={dropDownDataCategory}
                  dataLeftDropdown={dropDownDataSort}
                />
              )}
            </View>
          ) : filter2[selectedIndex].filterName === 'Musician.Tab.Music' ? (
            <View>
              {ownProfile && (
                <CreateNewCard
                  num="00"
                  text={t('Profile.Button.CreatePlaylist')}
                  onPress={goToCreatePlaylist}
                />
              )}
              <ListPlaylist
                data={dataPlaylist === null ? [] : dataPlaylist}
                onPress={goToPlaylist}
                scrollable={false}
              />
              <Gap height={mvs(30)} />
              {/* List Album Horizontal */}
              {dataAlbum && dataAlbum?.length > 0 && (
                <ListAlbum
                  data={dataAlbum}
                  title={t('Musician.Label.MyAlbum')}
                  containerStyles={{marginBottom: mvs(30)}}
                />
              )}
              {/* List Appears On */}
              {dataAppearsOn && dataAppearsOn?.length > 0 && (
                <ListAlbum
                  data={dataAppearsOn}
                  title={t('Musician.Label.AppearsOn')}
                  containerStyles={{marginBottom: mvs(30)}}
                />
              )}
            </View>
          ) : filter2[selectedIndex].filterName === 'Musician.Tab.Fans' ? (
            <View style={{paddingHorizontal: widthResponsive(20)}}>
              {uuid && <FansScreen uuid={uuid} />}
            </View>
          ) : filter2[selectedIndex].filterName ===
            'Musician.Tab.Merchandise' ? (
            <MerchList musicianId={uuid} />
          ) : filter2[selectedIndex].filterName === 'Musician.Tab.Ticket' ? (
            <ConcertList musicianId={uuid} />
          ) : filter2[selectedIndex].filterName === 'Musician.Tab.Event' ? (
            <EventMusician musicianId={uuid} />
          ) : (
            // TODO: DISABLE FOR NOW
            // : filter2[selectedIndex].filterName === 'Musician.Tab.Main' ? (
            //   <MainTab uuid={uuid} />
            // )
            <EmptyState
              text={t('EmptyState.NoData') || ''}
              containerStyle={{marginTop: heightPercentage(30)}}
            />
          )}
        </View>
      </ScrollView>

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <CheckCircle2Icon />
            <Gap width={4} />
            <Text style={[styles.textStyle]} numberOfLines={2}>
              {toastText}
            </Text>
          </View>
        }
      />

      <ImageModal
        toggleModal={() => setModalVisible(!isModalVisible)}
        modalVisible={isModalVisible}
        imageIdx={0}
        dataImage={zoomImage}
        type={'zoomProfile'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Color.Dark[50],
  },
  containerContent: {
    flex: 1,
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
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: Color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: Color.Neutral[10],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: heightPercentage(20),
  },
  rightButtonStyle: {
    backgroundColor: color.Error.block,
    borderRadius: 4,
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(6),
  },
});
