import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {
  CommentIcon,
  DiagramIcon,
  LoveIcon,
  ShareIcon,
} from '../../../../assets/icon';
import {Gap} from '../../../atom';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import CoinB from '../../../../assets/icon/CoinB.icon';
import {heightResponsive, widthResponsive} from '../../../../utils';

interface PostCard {
  musicianName: string;
  musicianId: string;
  postDate: string;
  likeCount: number;
  commentCount: number;
  category: string;
  isPremium: boolean;
  viewCount: number;
  shareCount: number;
  children: React.ReactNode;
  containerStyles?: ViewStyle;
}

const PostCard: React.FC<PostCard> = (props: PostCard) => {
  const {
    musicianName,
    musicianId,
    postDate,
    likeCount,
    commentCount,
    category,
    isPremium,
    viewCount,
    shareCount,
    children,
    containerStyles,
  } = props;

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: isPremium
            ? color.RedVelvet[100]
            : color.DarkBlue[100],
        },
        containerStyles,
      ]}>
      <View style={styles.topSection}>
        <Text style={styles.musicianName}>{musicianName}</Text>
        <View style={styles.category}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
      <Gap height={4} />
      <View style={styles.bottomSection}>
        <Text style={styles.musicianDesc}>{musicianId}</Text>
        <Text style={[styles.musicianDesc, {color: color.Dark[100]}]}>
          {postDate}
        </Text>
      </View>
      {/* BODY SECTION */}
      <View style={styles.bodyContainer}>{children}</View>
      {/* BOTTOM SECTION */}
      <View style={styles.bottomContainer}>
        <View style={styles.socialContainer}>
          {/* like section */}
          <View style={styles.socialIcon}>
            <LoveIcon fill={'none'} stroke={color.Dark[100]} />
            <Gap width={5.5} />
            <Text style={styles.regularText}>{likeCount}</Text>
          </View>
          {/* comment section */}
          <View style={styles.socialIcon}>
            <CommentIcon stroke={color.Dark[100]} />
            <Gap width={5.5} />
            <Text style={styles.regularText}>{commentCount}</Text>
          </View>
          {/* token section */}
          <View style={styles.socialIcon}>
            <CoinB fill={color.Dark[100]} />
          </View>
          {/* share section */}
          <View style={styles.socialIcon}>
            <ShareIcon fill={color.Dark[100]} />
            <Gap width={5.5} />
            <Text style={styles.regularText}>{shareCount ?? 0}</Text>
          </View>
          {/* view section */}
          <View style={styles.socialIcon}>
            <DiagramIcon fill={color.Dark[100]} />
            <Gap width={5.5} />
            <Text style={styles.regularText}>{viewCount ?? 0}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  cardContainer: {
    paddingBottom: heightResponsive(2),
    paddingHorizontal: widthResponsive(10),
    paddingVertical: widthResponsive(12),
    borderRadius: 4,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  musicianName: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(13),
    lineHeight: mvs(15.73),
    color: color.Neutral[10],
  },
  musicianDesc: {
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
    marginTop: 2,
    marginBottom: 10,
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
});
