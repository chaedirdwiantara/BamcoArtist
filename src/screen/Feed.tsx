import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  NativeModules,
  Text,
  SafeAreaView,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {color} from '../theme';
import {storage} from '../hooks/use-storage.hook';
import PostListPublic from './ListCard/PostListPublic';
import {
  heightPercentage,
  heightResponsive,
  widthPercentage,
  widthResponsive,
} from '../utils';
import PostListMyPost from './ListCard/PostListMyPost';
import {
  FilterModal,
  Gap,
  GuestContent,
  ModalConfirm,
  SsuToast,
  StepCopilot,
  SuccessToast,
  TabFilter,
  TopNavigation,
} from '../components';
import {
  dropDownDataCategory,
  dropDownDataSort,
  dropDownSetAudience,
} from '../data/dropdown';
import {usePlayerHook} from '../hooks/use-player.hook';
import {
  AddPostIcon,
  CancelCreatePostIcon,
  InfoCircleIcon,
} from '../assets/icon';
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
import PostListExclusive from './ListCard/PostListExclusive';
import {userProfile} from '../store/userProfile.store';
import {CopilotProvider, useCopilot} from 'react-native-copilot';
import {useCoachmarkHook} from '../hooks/use-coachmark.hook';
import {useCopilotStore} from '../store/copilot.store';
import {StepNumber, Tooltip} from '../components/molecule/TooltipGuideline';
import {useCreatePostStatus} from '../store/postState.store';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

const FeedScreenCopilot: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isLogin = storage.getString('profile');
  const uuid = profileStorage()?.uuid;
  const {profileStore} = userProfile();
  const {postSuccess, setPostSuccess} = useCreatePostStatus();

  const {visible} = usePlayerHook();
  const {dataExclusiveContent, getExclusiveContent} = useSettingHook();
  const {
    dataVideo,
    uploadStatus,
    isErrorVideo,
    setUploadStatus,
    setDataVideo,
    setUploadVideo,
    getProgressUploadVideo,
    setIsErrorVideo,
  } = useUploadImageHook();
  const {
    dataCreatePost,
    createPostError,
    createPostLoading,
    dataUpdatePost,
    setCreatePost,
    setUpdatePost,
    setDataCreatePost,
    setCreatePostError,
    setDataUpdatePost,
  } = useFeedHook();
  const {
    storedInputText,
    storedValueFilter,
    storedDataAudience,
    storedIdForUpdate,
  } = useDataVideoForPost();
  const {
    uriVideo,
    allowToUpload,
    allowToUpdate,
    setUriVideo,
    setAllowToUpload,
    setAllowToUpdate,
  } = useVideoStore();

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'Feed.Public'},
    {filterName: 'Feed.Exclusive'},
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
    isBanned: false,
  });
  const [progress, setProgress] = useState<number>();
  const [uploadProgress, setUploadProgress] = useState<number>();
  const [totalProgress, setTotalProgress] = useState<number>();
  const [allowToRefresh, setAllowToRefresh] = useState<boolean>(false);
  const [getProgressUpload, setGetProgressUpload] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>(
    `Your post couldn't be uploaded. Try Again`,
  );
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [showCoachmark, setShowCoachmark] = useState<boolean>(true);

  // ? HANDLE CREATE POST CHOICE
  useEffect(() => {
    if (selectedCategory) {
      if (
        dataExclusiveContent === null &&
        selectedCategory === 'Feed.Exclusive'
      ) {
        setModalVisible({
          filterModal: false,
          confirmModal: true,
          isBanned: false,
        });
      } else {
        setModalVisible({
          filterModal: false,
          confirmModal: false,
          isBanned: false,
        });
        setSelectedCategory(undefined);
        setUriVideo(null);
        setAllowToUpload(false);
        setAllowToUpdate(false);
        setDataVideo(undefined);
        setAllowToRefresh(false);
        setDataCreatePost(null);
        setAllowToPost(false);
        navigation.navigate('CreatePost', {audience: selectedCategory});
      }
    }
  }, [selectedCategory]);

  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  const handleFloatingIcon = () => {
    if (profileStore.data.isBanned) {
      setModalVisible({
        filterModal: false,
        confirmModal: false,
        isBanned: true,
      });
    } else {
      setModalVisible({
        filterModal: true,
        confirmModal: false,
        isBanned: false,
      });
      getExclusiveContent({uuid});
    }
  };

  const handleConfirmModal = () => {
    setModalVisible({filterModal: false, confirmModal: false, isBanned: false});
    setSelectedCategory(undefined);
    setDataCreatePost(null);
    navigation.navigate('ExclusiveContentSetting', {type: 'navToCreatePost'});
  };

  const handleMaybeLater = () => {
    setModalVisible({filterModal: false, confirmModal: false, isBanned: false});
    setSelectedCategory(undefined);
  };

  //? 1. Upload Video area
  useUploadVideo(
    uriVideo,
    allowToUpload,
    allowToUpdate,
    setProgress,
    setUploadVideo,
  );

  //* set to total upload video progress
  useEffect(() => {
    if (progress) {
      setTotalProgress(progress / 1.33);
    }
  }, [progress]);

  //? 2. Check if video is ready to stream or not
  useEffect(() => {
    if (dataVideo) {
      if (dataVideo.readyToStream === true) {
        setAllowToUpload(false);
        setAllowToUpdate(false);
        setProgress(undefined);
        setAllowToRefresh(true);
      } else {
        setGetProgressUpload(true);
      }
    }
  }, [dataVideo]);

  //! When Failed to upload video
  useEffect(() => {
    if (isErrorVideo) {
      setUriVideo(null);
      setAllowToUpload(false);
      setAllowToUpdate(false);
      setGetProgressUpload(false);
      setAllowToPost(false);
      setProgress(undefined);
      setTotalProgress(undefined);
      setAllowToRefresh(false);
      setToastVisible(true); //show toast
      setIsErrorVideo(false);
    }
  }, [isErrorVideo]);

  //? 3. Check if video is ready to stream till 1 min
  useEffect(() => {
    if (getProgressUpload) {
      let startTime = Date.now();
      let intervalRef = setInterval(() => {
        if (uploadStatus?.readyToStream === true) {
          setAllowToPost(true);
          setUploadStatus(undefined);
          setGetProgressUpload(false);
          clearInterval(intervalRef!);
        } else if (Date.now() - startTime! >= 60000) {
          setAllowToPost(false);
          setUploadStatus(undefined);
          setGetProgressUpload(false);
          clearInterval(intervalRef!);
          setToastVisible(true);
        } else {
          getProgressUploadVideo({uid: dataVideo?.uid}, setUploadProgress);
          if (totalProgress) {
            setTotalProgress(totalProgress + 0.1); // +0.1 every time this called
          }
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
    storedIdForUpdate,
    allowToUpdate,
    setUpdatePost,
  );

  //? 5. clear uriVideo after succeeded create the post
  useEffect(() => {
    if (dataCreatePost) {
      setAllowToPost(false);
      setUriVideo(null);
      setAllowToUpload(false);
      setProgress(undefined);
      setTotalProgress(undefined);
      setAllowToRefresh(true);
      setPostSuccess(true);
    }
  }, [dataCreatePost]);

  useEffect(() => {
    if (dataUpdatePost) {
      setAllowToPost(false);
      setUriVideo(null);
      setAllowToUpdate(false);
      setProgress(undefined);
      setTotalProgress(undefined);
      setAllowToRefresh(true);
    }
  }, [dataUpdatePost]);

  //! When Failed to Post video
  useEffect(() => {
    if (createPostError) {
      setUriVideo(null);
      setAllowToUpload(false);
      setGetProgressUpload(false);
      setAllowToPost(false);
      setProgress(undefined);
      setTotalProgress(undefined);
      setAllowToRefresh(false);
      setToastVisible(true); //show toast
      setIsErrorVideo(false);
      setCreatePostError(false);
    }
  }, [createPostError]);

  const handleCloseBanModal = () => {
    setModalVisible({filterModal: false, confirmModal: false, isBanned: false});
  };

  const handleOkBanModal = () => {
    setModalVisible({filterModal: false, confirmModal: false, isBanned: false});
    navigation.navigate('Setting');
  };

  // COACHMARK START
  const {start} = useCopilot();
  const {useCoachmark} = useCoachmarkHook();
  const {data: dataCoachmark} = useCoachmark();
  const {setTutorialId} = useCopilotStore();

  useEffect(() => {
    // Check status coachmark feed
    // tutorial id feed = 6, check postman
    const hideCoachmark =
      dataCoachmark?.data &&
      dataCoachmark?.data.filter(
        (val: {TutorialID: number}) => val.TutorialID === 6,
      )[0]?.IsFinished;

    const timeout = setTimeout(() => {
      if (!hideCoachmark && showCoachmark) {
        start('Feed', null);
        setTutorialId(6);
        setShowCoachmark(false);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [start, dataCoachmark]);

  return (
    <SafeAreaView style={styles.root}>
      {isLogin ? (
        <View>
          <TopNavigation.Type2Animated
            title={t('Feed.Title')}
            maxLengthTitle={20}
            itemStrokeColor={'white'}
            containerStyle={{
              position: 'absolute',
              paddingTop:
                Platform.OS === 'ios' ? 0 : heightResponsive(barHeight + 15),
              zIndex: 4,
              backgroundColor: color.Dark[800],
            }}
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
              containerStyle={{
                backgroundColor: color.Dark[800],
                zIndex: 3,
                position: 'absolute',
                top:
                  Platform.OS === 'ios'
                    ? heightResponsive(40)
                    : heightResponsive(barHeight + 60),
                left: widthResponsive(24),
              }}
              animation
            />
            {filter[selectedIndex].filterName === 'Feed.Public' ? (
              <PostListPublic
                dataRightDropdown={dropDownDataCategory}
                dataLeftDropdown={dropDownDataSort}
                videoUploadProgress={
                  totalProgress && !allowToPost
                    ? totalProgress
                    : totalProgress && allowToPost
                    ? 1
                    : 0
                }
                uriVideo={uriVideo?.path}
              />
            ) : (
              <PostListExclusive
                dataRightDropdown={dropDownDataCategory}
                dataLeftDropdown={dropDownDataSort}
                videoUploadProgress={
                  totalProgress && !allowToPost
                    ? totalProgress / 1.33
                    : totalProgress && allowToPost
                    ? 1
                    : 0
                }
                uriVideo={uriVideo?.path}
              />
            )}
          </View>
          <StepCopilot
            children={
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    height: visible
                      ? widthResponsive(100)
                      : widthResponsive(50),
                  },
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
            }
            order={30}
            name="Feed"
            text=""
          />
          {offsetCategoryFilter !== undefined && (
            <FilterModal
              toggleModal={() =>
                setModalVisible({
                  filterModal: false,
                  confirmModal: false,
                  isBanned: false,
                })
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
                  ? offsetCategoryFilter?.py -
                    widthResponsive(Platform.OS === 'android' ? 106 : 100)
                  : offsetCategoryFilter?.py - widthResponsive(47),
                left: offsetCategoryFilter?.px - widthResponsive(125),
                width: widthResponsive(125),
              }}
              textStyle={{fontSize: mvs(13)}}
              icon={true}
              buttonContainerStyle={{
                paddingVertical: widthResponsive(10),
              }}
              // onModalHide={handleOnCloseModal}
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
          <SsuToast
            modalVisible={toastVisible}
            onBackPressed={() => setToastVisible(false)}
            modalOnHide={() => {
              // TODO: do something?
            }}
            children={
              <View style={[styles.modalContainer]}>
                <InfoCircleIcon />
                <Gap width={4} />
                <Text style={[styles.textStyle]} numberOfLines={2}>
                  {toastText}
                </Text>
              </View>
            }
          />

          {/* //? Banned user modal */}
          <ModalConfirm
            modalVisible={isModalVisible.isBanned}
            title={`${t('Setting.PreventInteraction.Title')}`}
            subtitle={`${t('Setting.PreventInteraction.Subtitle')}`}
            yesText={`${t('Btn.Send')}`}
            noText={`${t('Btn.Cancel')}`}
            onPressClose={handleCloseBanModal}
            onPressOk={handleOkBanModal}
            textNavigate={`${t('Setting.PreventInteraction.TextNavigate')}`}
            textOnPress={handleOkBanModal}
          />
          {/* //? Success create post */}
          <SuccessToast
            toastVisible={postSuccess}
            onBackPressed={() => setPostSuccess(false)}
            caption={`${t('Post.Create.Success')}`}
          />
        </View>
      ) : (
        <GuestContent />
      )}
    </SafeAreaView>
  );
};

const FeedScreen: React.FC = () => {
  return (
    <CopilotProvider
      stepNumberComponent={StepNumber}
      tooltipComponent={Tooltip}
      tooltipStyle={{
        backgroundColor: color.DarkBlue[100],
      }}
      arrowColor={color.DarkBlue[100]}>
      <FeedScreenCopilot />
    </CopilotProvider>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    zIndex: 2,
  },
  feedContainer: {
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
    bottom: widthResponsive(20),
  },
  floatingIcon: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Error[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
