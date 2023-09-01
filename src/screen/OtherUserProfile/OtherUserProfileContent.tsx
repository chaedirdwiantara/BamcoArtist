import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  Gap,
  TabFilter,
  EmptyState,
  UserInfoCard,
  ProfileHeader,
  ModalConfirm,
  SuccessToast,
} from '../../components';
import {color, font} from '../../theme';
import Color from '../../theme/Color';
import {
  AlbumData,
  DataDetailMusician,
} from '../../interface/musician.interface';
import ImageModal from '../Detail/ImageModal';
import {ArrowLeftIcon} from '../../assets/icon';
import {Playlist} from '../../interface/playlist.interface';
import ListPlaylist from '../../screen/ListCard/ListPlaylist';
import {
  width,
  widthPercentage,
  heightPercentage,
  widthResponsive,
} from '../../utils';
import {ProfileFansResponseType} from '../../interface/profile.interface';
import {useBlockHook} from '../../hooks/use-block.hook';
import {blockUserRecorded} from '../../store/blockUser.store';
import BlockProfileUI from '../../components/molecule/BlockOnProfile';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

type profile = {
  fullname: string;
  username: string;
  bio: string;
  backgroundUri: string;
  avatarUri: string;
  totalFollowing: number;
  totalPoint: number;
  isBlock: boolean | undefined;
  blockIs: boolean | undefined;
  uuid: string | undefined;
};

interface ProfileContentProps {
  profile: profile;
  goToEditProfile: () => void;
  goToPlaylist: (id: number, name: string) => void;
  dataPlaylist?: Playlist[];
  onPressGoTo: (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => void;
  uuid?: string;
  dataAlbum?: AlbumData[];
  dataDetailMusician?: DataDetailMusician;
  selfProfile?: ProfileFansResponseType;
  ownProfile?: boolean;
  totalCountlikedSong?: number;
  playerVisible?: boolean;
  otherUserProfile?: boolean;
  onPressGoBack: () => void;
  setRefreshing: () => void;
}

export const OtherUserProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  goToEditProfile,
  goToPlaylist,
  onPressGoTo,
  dataPlaylist,
  selfProfile,
  totalCountlikedSong,
  ownProfile = false,
  onPressGoBack,
  setRefreshing,
}) => {
  const {t} = useTranslation();
  const {
    blockLoading,
    blockError,
    unblockResponse,
    setUnblockResponse,
    setUnblockUser,
  } = useBlockHook();
  const {uuidBlocked, setuuidBlocked} = blockUserRecorded();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [filter] = useState([
    {filterName: 'Profile.Tab.Playlist'},
    {filterName: 'Profile.Tab.TopMusician'},
    {filterName: 'Profile.Tab.Badge'},
  ]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string[]>([]);
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [toastUnblock, settoastUnblock] = useState<boolean>(false);

  const filterData = (item: string, index: number) => {
    setSelectedIndex(index);
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
  };

  const showImage = (uri: string) => {
    setModalVisible(!isModalVisible);
    setZoomImage([uri]);
  };

  //! BLOCK/UNBLOCK AREA
  useEffect(() => {
    if (unblockResponse === 'Success') {
      settoastUnblock(true);
      setRefreshing();
    }
  }, [unblockResponse]);

  const handleUnblock = () => {
    setModalConfirm(true);
  };

  const unblockModalOnPress = () => {
    setUnblockUser({uuid: profile.uuid});
    setModalConfirm(false);
  };

  const handleToastUnblock = () => {
    setuuidBlocked(uuidBlocked.filter(x => x !== profile.uuid));
    settoastUnblock(false);
  };
  //! END OF BLOCK/UNBLOCK AREA

  return (
    <View style={{flex: 1}}>
      {scrollEffect && (
        <View style={styles.containerLeftIcon}>
          <View style={styles.containerArrowName}>
            <TouchableOpacity onPress={onPressGoBack}>
              <ArrowLeftIcon
                stroke={Color.Neutral[10]}
                style={{marginLeft: widthPercentage(24)}}
              />
            </TouchableOpacity>
            <Gap width={widthPercentage(20)} />
            <Text style={styles.name}>{profile.fullname}</Text>
          </View>
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
          noEdit={!ownProfile}
          backIcon={!ownProfile}
          onPressImage={showImage}
        />
        <UserInfoCard
          profile={profile}
          type={ownProfile ? '' : 'self'}
          containerStyles={styles.infoCard}
          totalFollowing={profile.totalFollowing}
          onPress={() => onPressGoTo('Following')}
          selfProfile={selfProfile?.data}
          totalCountlikedSong={totalCountlikedSong}
          totalPoint={profile.totalPoint}
        />
        <View style={styles.containerContent}>
          {profile.isBlock ? (
            <BlockProfileUI
              title={`@${profile.fullname} ${t(
                'Block.BlockUI.isBlockedProfTitle',
              )}`}
              caption={`${t('Block.BlockUI.isBlockedProfCaption')} @${
                profile.fullname
              }`}
              buttonOnPress={handleUnblock}
            />
          ) : profile.blockIs ? (
            <BlockProfileUI
              title={`${t('Block.BlockUI.blockIsProfTitle')}`}
              caption={`${t('Block.BlockUI.blockIsProfCaption')} @${
                profile.fullname
              }`}
            />
          ) : (
            <>
              <TabFilter.Type1
                filterData={filter}
                onPress={filterData}
                selectedIndex={selectedIndex}
                translation={true}
              />
              {filter[selectedIndex].filterName === 'Profile.Tab.Playlist' ? (
                dataPlaylist !== undefined && dataPlaylist?.length > 0 ? (
                  <View>
                    <ListPlaylist
                      data={dataPlaylist === null ? [] : dataPlaylist}
                      onPress={goToPlaylist}
                      scrollable={false}
                    />
                  </View>
                ) : (
                  <EmptyState
                    text={t('Profile.Label.NoPlaylist') || ''}
                    containerStyle={{marginVertical: heightPercentage(30)}}
                  />
                )
              ) : filter[selectedIndex].filterName ===
                'Profile.Tab.TopMusician' ? (
                <EmptyState
                  text={t('Profile.Label.NoMusicianOther') || ''}
                  containerStyle={{marginVertical: heightPercentage(30)}}
                />
              ) : (
                <EmptyState
                  text={t('Profile.Label.NoBadgeOther') || ''}
                  containerStyle={{marginVertical: heightPercentage(30)}}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>

      <ImageModal
        toggleModal={() => setModalVisible(!isModalVisible)}
        modalVisible={isModalVisible}
        imageIdx={0}
        dataImage={zoomImage}
        type={'zoomProfile'}
      />

      {/* //? Unblock user modal */}
      {modalConfirm && (
        <ModalConfirm
          modalVisible={modalConfirm}
          title={`${t('Block.BlockUI.unBlockTitle')} @${profile.fullname} ?`}
          subtitle={`${t('Block.BlockUI.unBlockCaptionA')} @${
            profile.fullname
          } ${t('Block.BlockUI.unBlockCaptionB')} @${profile.fullname}`}
          yesText={`${t('Block.BlockUI.unblockButtonYes')}`}
          noText={`${t('Block.Modal.LeftButton')}`}
          onPressClose={() => setModalConfirm(false)}
          onPressOk={unblockModalOnPress}
          rightButtonStyle={styles.rightButtonStyle}
        />
      )}
      {/* //? When unblock succeed */}
      <SuccessToast
        toastVisible={toastUnblock}
        onBackPressed={handleToastUnblock}
        caption={`@${profile.fullname} ${t('Block.BlockUI.unblockSuccess')}`}
      />
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
  containerLeftIcon: {
    width: width,
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Dark[800],
    height: heightPercentage(85),
  },
  containerArrowName: {
    paddingTop: heightPercentage(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(16),
    lineHeight: heightPercentage(20),
    color: Color.Neutral[10],
  },
  topIos: {
    top: heightPercentage(15),
  },
  rightButtonStyle: {
    backgroundColor: color.Error.block,
    borderRadius: 4,
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(6),
  },
});
