import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  NativeModules,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {color} from '../theme';
import {storage} from '../hooks/use-storage.hook';
import PostListPublic from './ListCard/PostListPublic';
import {heightPercentage, widthResponsive} from '../utils';
import PostListMyPost from './ListCard/PostListMyPost';
import {
  FilterModal,
  GuestContent,
  ModalConfirm,
  TabFilter,
  TopNavigation,
} from '../components';
import {
  dataStatusPost,
  dropDownDataCategory,
  dropDownDataSort,
  dropDownSetAudience,
} from '../data/dropdown';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {usePlayerHook} from '../hooks/use-player.hook';
import {AddPostIcon, CancelCreatePostIcon} from '../assets/icon';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useSettingHook} from '../hooks/use-setting.hook';
import {profileStorage} from '../hooks/use-storage.hook';
import {useUploadImageHook} from '../hooks/use-uploadImage.hook';
import {useDataVideoForPost, useVideoStore} from '../store/video.store';
import {
  usePostVideo,
  useUploadVideo,
} from './ListCard/ListUtils/PostVideoFunction';
import {useFeedHook} from '../hooks/use-feed.hook';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

export const FeedScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isLogin = storage.getString('profile');
  const uuid = profileStorage()?.uuid;

  const isFocused = useIsFocused();
  const {isPlaying, visible, showPlayer, hidePlayer} = usePlayerHook();
  const {dataExclusiveContent, getExclusiveContent} = useSettingHook();
  const {
    dataVideo,
    uploadStatus,
    setUploadStatus,
    setDataVideo,
    setUploadVideo,
    getProgressUploadVideo,
  } = useUploadImageHook();
  const {dataCreatePost, createPostLoading, setCreatePost, setDataCreatePost} =
    useFeedHook();
  const {storedInputText, storedValueFilter, storedDataAudience} =
    useDataVideoForPost();
  const {uriVideo, allowToUpload, setUriVideo, setAllowToUpload} =
    useVideoStore();

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'Feed.MyPost'},
    {filterName: 'Feed.Public'},
  ]);
  const [allowToPost, setAllowToPost] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [offsetCategoryFilter, setOffsetCategoryFilter] = useState<{
    px: number;
    py: number;
  }>();
  const [isModalVisible, setModalVisible] = useState({
    filterModal: false,
    confirmModal: false,
  });
  const [progress, setProgress] = useState<number>();
  const [uploadProgress, setUploadProgress] = useState<number>();
  const [allowToRefresh, setAllowToRefresh] = useState<boolean>(false);
  const [getProgressUpload, setGetProgressUpload] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused]);

  const handleOnCloseModal = () => {
    if (selectedCategory) {
      if (
        dataExclusiveContent === null &&
        selectedCategory === 'Feed.Exclusive'
      ) {
        setModalVisible({filterModal: false, confirmModal: true});
      } else {
        setModalVisible({filterModal: false, confirmModal: false});
        setSelectedCategory(undefined);
        setUriVideo(null);
        setAllowToUpload(false);
        setDataVideo(undefined);
        setAllowToRefresh(false);
        setDataCreatePost(null);
        setAllowToPost(false);
        navigation.navigate('CreatePost', {audience: selectedCategory});
      }
    }
  };

  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  const handleFloatingIcon = () => {
    setModalVisible({filterModal: true, confirmModal: false});
    getExclusiveContent({uuid});
  };

  const handleConfirmModal = () => {
    setModalVisible({filterModal: false, confirmModal: false});
    setSelectedCategory(undefined);
    setDataCreatePost(null);
    navigation.navigate('ExclusiveContentSetting', {type: 'navToCreatePost'});
  };

  const handleMaybeLater = () => {
    setModalVisible({filterModal: false, confirmModal: false});
    setSelectedCategory(undefined);
  };

  //? 1. Upload Video area
  useUploadVideo(uriVideo, allowToUpload, setProgress, setUploadVideo);

  //? 2. Check if video is ready to stream or not
  useEffect(() => {
    if (dataVideo) {
      if (dataVideo.readyToStream === true) {
        setAllowToUpload(false);
        setProgress(undefined);
        setAllowToRefresh(true);
      } else {
        setGetProgressUpload(true);
      }
    }
  }, [dataVideo]);

  //? 3. Check if video is ready to stream till 1 min
  useEffect(() => {
    if (getProgressUpload) {
      let intervalRef = setInterval(() => {
        if (uploadStatus?.readyToStream === true) {
          setAllowToPost(true);
          setUploadStatus(undefined);
          setGetProgressUpload(false);
          clearInterval(intervalRef!);
        } else if (intervalRef! >= 60000) {
          setAllowToPost(false);
          setUploadStatus(undefined);
          setGetProgressUpload(false);
          clearInterval(intervalRef!);
          //TODO: set cancel uploading
        } else {
          getProgressUploadVideo({uid: dataVideo?.uid}, setUploadProgress);
        }
      }, 3000);

      return () => {
        clearInterval(intervalRef);
      };
    }
  }, [getProgressUpload, uploadStatus]);

  //? 4. post when get permission
  usePostVideo(
    dataVideo,
    uriVideo,
    setCreatePost,
    storedInputText,
    storedValueFilter,
    storedDataAudience,
    allowToPost,
  );

  //? 5. clear uriVideo after succeeded create the post
  useEffect(() => {
    if (dataCreatePost) {
      setAllowToPost(false);
      setUriVideo(null);
      setAllowToUpload(false);
      setProgress(undefined);
      setAllowToRefresh(true);
    }
  }, [dataCreatePost]);

  return (
    <View style={styles.root}>
      {isLogin ? (
        <View>
          <TopNavigation.Type2
            title={t('Feed.Title')}
            maxLengthTitle={20}
            itemStrokeColor={'white'}
          />
          <View style={styles.feedContainer}>
            <TabFilter.Type1
              filterData={filter}
              onPress={filterData}
              selectedIndex={selectedIndex}
              flatlistContainerStyle={{
                justifyContent: 'space-between',
              }}
              TouchableStyle={{width: widthPercentageToDP(45)}}
              translation={true}
            />
            {filter[selectedIndex].filterName === 'Feed.Public' ? (
              <PostListPublic
                dataRightDropdown={dropDownDataCategory}
                dataLeftDropdown={dropDownDataSort}
                videoUploadProgress={
                  progress && !allowToPost
                    ? progress / 1.33
                    : progress && allowToPost
                    ? progress
                    : 0
                }
                uriVideo={uriVideo?.path}
              />
            ) : (
              <PostListMyPost
                dataRightDropdown={dropDownDataCategory}
                dataLeftDropdown={dropDownDataSort}
                videoUploadProgress={
                  progress && !allowToPost
                    ? progress / 1.33
                    : progress && allowToPost
                    ? progress
                    : 0
                }
                uriVideo={uriVideo?.path}
                allowRefresh={allowToRefresh}
              />
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {height: visible ? widthResponsive(184) : widthResponsive(94)},
            ]}
            onPress={handleFloatingIcon}
            onLayout={event => {
              event.target.measure((x, y, width, height, pageX, pageY) => {
                setOffsetCategoryFilter({
                  px: pageX + width,
                  py: Platform.OS === 'android' ? pageY - barHeight : pageY,
                });
              });
            }}>
            {isModalVisible.filterModal ? (
              <CancelCreatePostIcon style={styles.floatingIcon} />
            ) : (
              <AddPostIcon style={styles.floatingIcon} />
            )}
          </TouchableOpacity>
          {offsetCategoryFilter !== undefined && (
            <FilterModal
              toggleModal={() =>
                setModalVisible({filterModal: false, confirmModal: false})
              }
              modalVisible={isModalVisible.filterModal}
              dataFilter={dropDownSetAudience}
              filterOnPress={setSelectedCategory}
              sendCategory={() => {}}
              translation={true}
              xPosition={offsetCategoryFilter?.px}
              yPosition={offsetCategoryFilter?.py}
              containerStyle={{
                top: !visible
                  ? offsetCategoryFilter?.py - widthResponsive(93)
                  : offsetCategoryFilter?.py - widthResponsive(47),
                left: offsetCategoryFilter?.px - widthResponsive(125),
                width: widthResponsive(125),
              }}
              textStyle={{fontSize: mvs(13)}}
              icon={true}
              buttonContainerStyle={{
                paddingVertical: widthResponsive(10),
              }}
              onModalHide={handleOnCloseModal}
            />
          )}
          <ModalConfirm
            modalVisible={isModalVisible.confirmModal}
            title={t('Modal.ExclusiveContentConfirm.Title') || ''}
            subtitle={t('Modal.ExclusiveContentConfirm.Body') || ''}
            yesText={t('Modal.ExclusiveContentConfirm.ButtonOk') || ''}
            noText={t('Modal.ExclusiveContentConfirm.ButtonCancel') || ''}
            onPressClose={handleMaybeLater}
            onPressOk={handleConfirmModal}
          />
        </View>
      ) : (
        <GuestContent />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  feedContainer: {
    marginTop: widthResponsive(3),
    paddingHorizontal: widthResponsive(24),
    width: '100%',
    height: '100%',
  },
  buttonStyle: {
    position: 'absolute',
    width: widthResponsive(50),
    justifyContent: 'center',
    alignItems: 'center',
    right: widthResponsive(24),
    bottom: widthResponsive(94),
  },
  floatingIcon: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});
