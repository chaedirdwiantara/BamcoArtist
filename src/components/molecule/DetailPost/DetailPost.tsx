import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {Avatar, Gap} from '../../atom';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  widthResponsive,
} from '../../../utils';
import {color, font} from '../../../theme';
import {
  CommentIcon,
  HornChatIcon,
  LoveIcon,
  ShareIcon,
} from '../../../assets/icon';
import CoinB from '../../../assets/icon/CoinB.icon';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';
import {DataDropDownType, dataUpdatePost} from '../../../data/dropdown';
import {
  dateFormatDayOnly,
  dateFormatMonthOnly,
} from '../../../utils/date-format';

interface ListProps extends TouchableOpacityProps {
  imgUri: string;
  musicianName: string;
  musicianId: string;
  postDate: string;
  children: React.ReactNode;
  likeOnPress: () => void;
  commentOnPress: () => void;
  tokenOnPress: () => void;
  shareOnPress: () => void;
  likePressed: boolean;
  likeCount: number;
  commentCount: number;
  containerStyles?: ViewStyle;
  category: string;
  toDetailOnPress: () => void;
  myPost: boolean;
  selectedMenu: (value: DataDropDownType) => void;
  idPost: string;
  selectedIdPost: (id: string) => void;
  postDate2: string;
  isPremium: boolean;
}

const DetailPost: React.FC<ListProps> = (props: ListProps) => {
  const {
    imgUri,
    musicianName,
    musicianId,
    postDate,
    children,
    likeOnPress,
    commentOnPress,
    tokenOnPress,
    shareOnPress,
    likePressed,
    likeCount,
    commentCount,
    containerStyles,
    category,
    toDetailOnPress,
    myPost,
    selectedMenu,
    idPost,
    selectedIdPost,
    postDate2,
    isPremium,
  } = props;
  return (
    <>
      <TouchableOpacity {...props}>
        <View style={[styles.topContainer, containerStyles]}>
          <View>
            <TouchableOpacity onPress={toDetailOnPress}>
              <Avatar imgUri={imgUri} size={widthResponsive(32)} />
            </TouchableOpacity>
            <Gap height={2} />
            <View style={{alignItems: 'center'}}>
              <Text
                style={[
                  styles.dateDay,
                  {fontSize: mvs(15), fontFamily: font.InterMedium},
                ]}>
                {dateFormatDayOnly(postDate2)}
              </Text>
              <Text style={[styles.dateDay, {fontSize: mvs(10)}]}>
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
                {musicianName}
              </Text>
              <View style={[styles.category]}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            </View>
            <Gap height={4} />
            <View style={styles.bottomSection}>
              <Text style={styles.songDesc}>{musicianId}</Text>
              <Text style={styles.regularText}>{postDate}</Text>
            </View>
            {/* BODY SECTION */}
            <View style={styles.bodyContainer}>{children}</View>
            {/* BOTTOM SECTION */}
            <View style={styles.bottomContainer}>
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
                    <Text style={[styles.regularText, {fontSize: ms(11)}]}>
                      {likeCount}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Gap width={15} />
                {/* comment section */}
                <View>
                  <TouchableOpacity
                    onPress={commentOnPress}
                    style={styles.socialIcon}>
                    <CommentIcon stroke={color.Dark[100]} />
                    <Gap width={5.5} />
                    <Text style={[styles.regularText, {fontSize: ms(11)}]}>
                      {commentCount}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Gap width={15} />
                {/* token section */}
                <View>
                  {!myPost ? (
                    <TouchableOpacity
                      onPress={tokenOnPress}
                      style={styles.socialIcon}>
                      <CoinB fill={color.Dark[100]} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={shareOnPress}>
                      <ShareIcon fill={color.Dark[100]} />
                    </TouchableOpacity>
                  )}
                </View>
                <Gap width={15} />

                {/* share section */}
                <View>
                  {!myPost ? (
                    <TouchableOpacity onPress={shareOnPress}>
                      <ShareIcon fill={color.Dark[100]} />
                    </TouchableOpacity>
                  ) : (
                    <DropdownMore
                      id={idPost}
                      selectedid={selectedIdPost}
                      selectedMenu={selectedMenu}
                      dataFilter={dataUpdatePost}
                      iconContainerStyle={{marginRight: widthResponsive(-2)}}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default DetailPost;

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  rankStyle: {
    fontSize: ms(10),
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
    fontSize: ms(13),
    lineHeight: mvs(15.73),
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: ms(10),
    lineHeight: mvs(12.1),
    color: color.Dark[50],
  },
  bodyContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: heightResponsive(8),
    marginBottom: heightResponsive(10),
  },
  category: {
    backgroundColor: color.Pink[100],
    paddingHorizontal: widthResponsive(4),
    height: heightPercentage(18),
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: ms(8),
    color: color.Neutral[10],
  },
  regularText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: ms(10),
    lineHeight: mvs(12.1),
    color: color.Dark[100],
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
