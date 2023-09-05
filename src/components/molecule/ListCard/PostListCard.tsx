import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {
  CommentIcon,
  DiagramIcon,
  HornChatIcon,
  LoveIcon,
  ShareIcon,
  ThreeDotsHorizonIcon,
} from '../../../assets/icon';
import {
  DataDropDownType,
  dataUpdatePost,
  dataReportPost,
  dataReportPostProfile,
  dataReportAlreadyPostProfile,
  dataAlreadyReportPost,
  dataUpdatePostDisable,
} from '../../../data/dropdown';
import {
  dateFormat,
  dateFormatDayOnly,
  dateFormatMonthOnly,
} from '../../../utils/date-format';
import {Avatar, Gap} from '../../atom';
import {color, font} from '../../../theme';
import {ms, mvs} from 'react-native-size-matters';
import CoinB from '../../../assets/icon/CoinB.icon';
import {PostList} from '../../../interface/feed.interface';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';
import {profileStorage} from '../../../hooks/use-storage.hook';
import categoryNormalize from '../../../utils/categoryNormalize';
import {heightResponsive, widthResponsive} from '../../../utils';

interface ListProps extends TouchableOpacityProps {
  data: PostList;
  children: React.ReactNode;
  likeOnPress: () => void;
  tokenOnPress: () => void;
  shareOnPress: () => void;
  likePressed: boolean;
  likeCount: number;
  containerStyles?: ViewStyle;
  toDetailOnPress: () => void;
  selectedMenu: (value: DataDropDownType) => void;
  selectedIdPost: (idPost: string) => void;
  noNavigate?: boolean;
  disableComment?: boolean;
  commentOnPress?: () => void;
  showDropdown?: boolean;
  musicianUuid?: string;
  selectedUserUuid?: (uuid: string) => void;
  selectedUserName?: (name: string) => void;
  onProfile?: boolean;
  reportSent?: boolean;
}

const PostListCard: React.FC<ListProps> = (props: ListProps) => {
  const {
    data,
    children,
    likeOnPress,
    tokenOnPress,
    shareOnPress,
    likePressed,
    likeCount,
    containerStyles,
    toDetailOnPress,
    selectedMenu,
    selectedIdPost,
    noNavigate,
    disableComment = true,
    commentOnPress,
    showDropdown,
    musicianUuid,
    selectedUserUuid,
    selectedUserName,
    onProfile,
    reportSent,
  } = props;

  const myUuid = profileStorage()?.uuid;

  const fullName = data?.musician.fullname;
  const userName = `@${data?.musician.username}`;
  const imgUri =
    data?.musician.imageProfileUrls.length !== 0
      ? data?.musician.imageProfileUrls[0]?.image
      : '';
  const postDate = data?.timeAgo ? data?.timeAgo : dateFormat(data?.createdAt);
  const postDate2 = data?.createdAt;
  const category = categoryNormalize(data?.category);
  const commentCount = data?.commentsCount;
  const myPost = data?.musician.uuid === myUuid;
  const idPost = data?.id;
  const isPremium = data?.isPremiumPost;
  const viewCount = data?.viewsCount;
  const shareCount = data?.shareCount;
  const dataMyFilter = !data?.isVoted ? dataUpdatePost : dataUpdatePostDisable;
  const dataReport =
    onProfile && !reportSent
      ? dataReportPostProfile
      : onProfile && reportSent
      ? dataReportAlreadyPostProfile
      : !onProfile && reportSent
      ? dataAlreadyReportPost
      : dataReportPost;

  const leftPosition =
    onProfile && !myPost ? widthResponsive(55) : widthResponsive(27);
  return (
    <TouchableOpacity {...props}>
      <View style={[styles.topContainer, containerStyles]}>
        <View>
          {noNavigate ? (
            <Avatar imgUri={imgUri} size={widthResponsive(33)} />
          ) : (
            <TouchableOpacity onPress={toDetailOnPress}>
              <Avatar imgUri={imgUri} size={widthResponsive(33)} />
            </TouchableOpacity>
          )}
          <Gap height={5} />
          <View style={{alignItems: 'center'}}>
            <Text
              style={[
                styles.dateDay,
                {fontSize: mvs(15), fontFamily: font.InterMedium},
              ]}>
              {dateFormatDayOnly(postDate2)}
            </Text>
            <Gap height={4} />
            <Text
              style={[
                styles.dateDay,
                {fontSize: mvs(10), color: color.Dark[50]},
              ]}>
              {dateFormatMonthOnly(postDate2)}
            </Text>
          </View>
        </View>

        <HornChatIcon
          fill={isPremium ? color.RedVelvet[100] : color.DarkBlue[100]}
          style={{marginTop: widthResponsive(3)}}
        />
        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor: isPremium
                ? color.RedVelvet[100]
                : color.DarkBlue[100],
            },
          ]}>
          <View style={styles.topSection}>
            <Text style={styles.songTitle} onPress={toDetailOnPress}>
              {fullName}
            </Text>
            {showDropdown ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={[styles.category]}>
                  <Text style={styles.categoryText}>{category}</Text>
                </View>
                <DropdownMore
                  id={idPost}
                  uuid={musicianUuid}
                  userName={fullName}
                  selectedid={selectedIdPost}
                  selectedMenu={selectedMenu}
                  selectedUserUuid={selectedUserUuid}
                  selectedUserName={selectedUserName}
                  dataFilter={myPost ? dataMyFilter : dataReport}
                  iconChildren={<ThreeDotsHorizonIcon />}
                  containerStyle={{marginTop: 0, marginBottom: 0}}
                  iconContainerStyle={{
                    marginRight: 0,
                  }}
                  topPosition={widthResponsive(-33)}
                  leftPosition={leftPosition}
                />
              </View>
            ) : (
              <View style={[styles.category]}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            )}
          </View>
          <Gap height={4} />
          <View style={styles.bottomSection}>
            <Text style={styles.songDesc}>{userName}</Text>
            <Text style={[styles.songDesc, {color: color.Dark[100]}]}>
              {postDate}
            </Text>
          </View>
          {/* BODY SECTION */}
          <View style={styles.bodyContainer}>{children}</View>
          {/* BOTTOM SECTION */}
          <View
            style={[
              styles.bottomContainer,
              {
                marginTop: !myPost ? 4 : 2,
                marginBottom: 10,
              },
            ]}>
            <View style={styles.socialContainer}>
              {/* like section */}
              <View>
                <TouchableOpacity
                  onPress={likeOnPress}
                  style={styles.socialIcon}>
                  <LoveIcon
                    fill={likePressed ? color.Pink[100] : 'none'}
                    stroke={likePressed ? 'none' : color.Dark[100]}
                  />
                  <Gap width={5.5} />
                  <Text style={styles.regularText}>{likeCount}</Text>
                </TouchableOpacity>
              </View>
              {/* comment section */}
              <View>
                <TouchableOpacity
                  disabled={disableComment}
                  onPress={commentOnPress}
                  style={styles.socialIcon}>
                  <CommentIcon stroke={color.Dark[100]} />
                  <Gap width={5.5} />
                  <Text style={styles.regularText}>{commentCount}</Text>
                </TouchableOpacity>
              </View>
              {/* token section */}
              <View>
                {!myPost ? (
                  <TouchableOpacity onPress={tokenOnPress}>
                    <CoinB fill={color.Dark[100]} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={shareOnPress}
                    style={styles.socialIcon}>
                    <ShareIcon fill={color.Dark[100]} />
                    <Gap width={5.5} />
                    <Text style={styles.regularText}>{shareCount ?? 0}</Text>
                  </TouchableOpacity>
                )}
              </View>
              {/* share section */}
              <View>
                {!myPost ? (
                  <TouchableOpacity
                    onPress={shareOnPress}
                    style={styles.socialIcon}>
                    <ShareIcon fill={color.Dark[100]} />
                    <Gap width={5.5} />
                    <Text style={styles.regularText}>{shareCount ?? 0}</Text>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => {}}
                      disabled
                      style={styles.socialIcon}>
                      <DiagramIcon fill={color.Dark[100]} />
                      <Gap width={5.5} />
                      <Text style={styles.regularText}>{viewCount ?? 0}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {/* view section */}
              {!myPost ? (
                <View>
                  <TouchableOpacity
                    onPress={() => {}}
                    disabled
                    style={styles.socialIcon}>
                    <DiagramIcon fill={color.Dark[100]} />
                    <Gap width={5.5} />
                    <Text style={styles.regularText}>{viewCount ?? 0}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostListCard;

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: widthResponsive(24),
    borderBottomColor: color.Dark[500],
  },
  rankStyle: {
    fontSize: mvs(10),
    fontWeight: '600',
    lineHeight: mvs(12),
    marginRight: ms(10),
    color: color.Neutral[10],
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  songTitle: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(13),
    lineHeight: mvs(15.73),
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(10),
    color: color.Dark[50],
  },
  bodyContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: widthResponsive(8),
    marginBottom: heightResponsive(10),
  },
  category: {
    backgroundColor: color.Pink[100],
    paddingHorizontal: widthResponsive(4),
    height: heightResponsive(16),
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(8),
    color: color.Neutral[10],
  },
  regularText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(12),
    color: color.Dark[100],
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    paddingBottom: heightResponsive(2),
    paddingHorizontal: widthResponsive(10),
    paddingVertical: widthResponsive(12),
    borderRadius: 4,
  },
  dateDay: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
  },
});
