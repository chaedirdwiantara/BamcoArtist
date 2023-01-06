import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {CommentInputModal, Dropdown, Gap, ListCard} from '../../components';
import {
  DataDropDownType,
  DropDownFilterType,
  DropDownSortType,
} from '../../data/dropdown';
import {PostListType} from '../../data/postlist';
import {color, font} from '../../theme';
import {
  elipsisText,
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {EmptyState} from '../../components/molecule/EmptyState/EmptyState';
import ListToFollowMusician from './ListToFollowMusician';
import ImageList from './ImageList';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {PostList} from '../../interface/feed.interface';
import {dateFormat} from '../../utils/date-format';
import {useProfileHook} from '../../hooks/use-profile.hook';

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  data: PostListType[];
}

const PostListPublic: FC<PostListProps> = (props: PostListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataRightDropdown, dataLeftDropdown, data} = props;

  const [inputCommentModal, setInputCommentModal] = useState<boolean>(false);
  const [musicianId, setMusicianId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [commentType, setCommentType] = useState<string>('');
  const [dataProfileImg, setDataProfileImg] = useState<string>('');
  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();

  const {
    feedIsLoading,
    feedIsError,
    feedMessage,
    dataPostList,
    getListDataPost,
    setLikePost,
    setUnlikePost,
    setCommentToPost,
  } = useFeedHook();

  const {dataProfile, getProfileUser} = useProfileHook();

  useEffect(() => {
    getProfileUser();
  }, []);

  useEffect(() => {
    dataProfile?.data.imageProfileUrl !== null &&
    dataProfile?.data.imageProfileUrl !== undefined
      ? setDataProfileImg(dataProfile?.data.imageProfileUrl)
      : '';
  }, [dataProfile]);

  useFocusEffect(
    useCallback(() => {
      getListDataPost();
    }, []),
  );

  const resultDataFilter = (dataResultFilter: DataDropDownType) => {
    getListDataPost({sortBy: dataResultFilter.label.toLowerCase()});
  };
  const resultDataCategory = (dataResultCategory: DataDropDownType) => {
    dataResultCategory.label === 'All'
      ? getListDataPost()
      : getListDataPost({category: dataResultCategory.value});
  };

  const cardOnPress = (data: PostList) => {
    navigation.navigate('PostDetail', data);
  };

  const likeOnPress = (id: string, isLiked: boolean) => {
    if (isLiked === true && selectedId === undefined) {
      setUnlikePost({id});
      setSelectedId([]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (!isLiked && selectedId === undefined) {
      setLikePost({id});
      setSelectedId([id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === true &&
      !selectedId?.includes(id) &&
      !recorder.includes(id)
    ) {
      setUnlikePost({id});
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === false &&
      !selectedId?.includes(id) &&
      !recorder.includes(id)
    ) {
      setLikePost({id});
      setSelectedId(selectedId ? [...selectedId, id] : [id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === true &&
      !selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
      setLikePost({id});
      setSelectedId(selectedId ? [...selectedId, id] : [id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === false &&
      !selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
      setLikePost({id});
      setSelectedId(selectedId ? [...selectedId, id] : [id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (isLiked === true && selectedId?.includes(id) && recorder.includes(id)) {
      setUnlikePost({id});
      setSelectedId(selectedId.filter((x: string) => x !== id));
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === false &&
      selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
      setUnlikePost({id});
      setSelectedId(selectedId.filter((x: string) => x !== id));
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
  };

  const commentOnPress = (id: string, username: string) => {
    setInputCommentModal(!inputCommentModal);
    setMusicianId(id);
    setUserName(username);
  };

  const handleReplyOnPress = () => {
    commentType.length > 0
      ? setCommentToPost({id: musicianId, content: {content: commentType}})
      : null;
    setInputCommentModal(false);
    setCommentType('');
  };

  const tokenOnPress = () => {
    console.log('token');
  };

  const shareOnPress = () => {
    console.log('share');
  };

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: heightPercentage(24),
        }}>
        <View
          style={{
            width: widthPercentage(70),
          }}>
          <Dropdown.Menu
            data={dataLeftDropdown}
            placeHolder={'Filter by'}
            selectedMenu={resultDataFilter}
            containerStyle={{
              width: widthPercentage(138),
            }}
          />
        </View>
        <View
          style={{
            width: widthPercentage(80),
          }}>
          <Dropdown.Menu
            data={dataRightDropdown}
            placeHolder={'Category'}
            selectedMenu={resultDataCategory}
            containerStyle={{
              width: widthPercentage(138),
              marginLeft: widthPercentage(-57),
            }}
          />
        </View>
      </View>
      {dataPostList !== null && dataPostList.length !== 0 ? (
        <FlatList
          data={dataPostList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom:
              Platform.OS === 'ios'
                ? heightPercentage(160)
                : heightPercentage(180),
          }}
          renderItem={({item}) => (
            <ListCard.PostList
              musicianName={item.musician.fullname}
              musicianId={`@${item.musician.username}`}
              imgUri={item.musician.imageProfileUrl}
              postDate={dateFormat(item.createdAt)}
              category={item.category}
              onPress={() => cardOnPress(item)}
              likeOnPress={() => likeOnPress(item.id, item.isLiked)}
              likePressed={
                selectedId === undefined
                  ? item.isLiked
                  : selectedId.includes(item.id) && recorder.includes(item.id)
                  ? true
                  : !selectedId.includes(item.id) && recorder.includes(item.id)
                  ? false
                  : !selectedId.includes(item.id) && !recorder.includes(item.id)
                  ? item.isLiked
                  : item.isLiked
              }
              likeCount={
                selectedId === undefined
                  ? item.likesCount
                  : selectedId.includes(item.id) &&
                    recorder.includes(item.id) &&
                    item.isLiked === true
                  ? item.likesCount
                  : selectedId.includes(item.id) &&
                    recorder.includes(item.id) &&
                    item.isLiked === false
                  ? item.likesCount + 1
                  : !selectedId.includes(item.id) &&
                    recorder.includes(item.id) &&
                    item.isLiked === true
                  ? item.likesCount - 1
                  : !selectedId.includes(item.id) &&
                    recorder.includes(item.id) &&
                    item.isLiked === false
                  ? item.likesCount
                  : item.likesCount
              }
              commentOnPress={() =>
                commentOnPress(item.id, item.musician.username)
              }
              tokenOnPress={tokenOnPress}
              shareOnPress={shareOnPress}
              containerStyles={{marginTop: mvs(16)}}
              commentCount={item.commentsCount}
              children={
                <View style={{width: '100%'}}>
                  <Text style={styles.childrenPostTitle}>
                    {elipsisText(item.caption, 600)}
                  </Text>
                  <Gap height={4} />
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <SafeAreaView style={{flex: 1}}>
                      <ImageList
                        imgData={item.image}
                        width={143}
                        height={69.5}
                        heightType2={142}
                        widthType2={289}
                        onPress={() => {}}
                      />
                    </SafeAreaView>
                  </View>
                </View>
              }
            />
          )}
        />
      ) : dataPostList?.length === 0 &&
        feedMessage === 'you not follow anyone' ? (
        <ListToFollowMusician />
      ) : dataPostList?.length === 0 &&
        feedMessage === 'musician not have post' ? (
        <EmptyState
          text={`Your following musician don't have any post, try to follow more musician`}
          containerStyle={{
            justifyContent: 'flex-start',
            paddingTop: heightPercentage(24),
          }}
        />
      ) : null}
      <CommentInputModal
        toggleModal={() => setInputCommentModal(!inputCommentModal)}
        modalVisible={inputCommentModal}
        name={userName}
        commentValue={commentType}
        onCommentChange={setCommentType}
        handleOnPress={handleReplyOnPress}
        userAvatarUri={dataProfileImg}
      />
    </>
  );
};

export default PostListPublic;

const styles = StyleSheet.create({
  childrenPostTitle: {
    flexShrink: 1,
    maxWidth: widthResponsive(288),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(13),
    lineHeight: mvs(20),
    color: color.Neutral[10],
  },
});
