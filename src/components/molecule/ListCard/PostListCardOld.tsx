import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {color, font} from '../../../theme';
import {
  CommentIcon,
  LoveIcon,
  ShareIcon,
  DiagramIcon,
} from '../../../assets/icon';

interface ListProps extends TouchableOpacityProps {
  children: React.ReactNode;
  likeOnPress: () => void;
  shareOnPress: () => void;
  likePressed: boolean;
  likeCount: number;
  commentCount: number;
  containerStyles?: ViewStyle;
  disableComment?: boolean;
  shareCount?: number;
  viewCount?: number;
  commentOnPress?: () => void;
}

const PostListCardOld: React.FC<ListProps> = (props: ListProps) => {
  const {
    children,
    likeOnPress,
    shareOnPress,
    likePressed,
    likeCount,
    commentCount,
    containerStyles,
    disableComment = true,
    shareCount,
    viewCount,
    commentOnPress,
  } = props;
  return (
    <View style={[styles.topContainer, containerStyles]}>
      {/* BODY SECTION */}
      <View style={styles.bodyContainer}>{children}</View>
      <Gap height={12} />
      {/* BOTTOM SECTION */}
      <View style={styles.socialContainer}>
        {/* like section */}
        <View>
          <TouchableOpacity onPress={likeOnPress} style={styles.socialIcon}>
            <LoveIcon
              fill={likePressed ? color.Pink[100] : 'none'}
              stroke={likePressed ? 'none' : color.Dark[100]}
            />
            <Gap width={5.5} />
            <Text style={styles.regularText}>{likeCount ?? 0}</Text>
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
            <Text style={styles.regularText}>{commentCount ?? 0}</Text>
          </TouchableOpacity>
        </View>
        {/* token section */}
        <View>
          <TouchableOpacity onPress={shareOnPress} style={styles.socialIcon}>
            <ShareIcon fill={color.Dark[100]} />
            <Gap width={5.5} />
            <Text style={styles.regularText}>{shareCount ?? 0}</Text>
          </TouchableOpacity>
        </View>
        {/* share section */}
        <View>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.socialIcon}
            disabled>
            <DiagramIcon fill={color.Dark[100]} />
            <Gap width={5.5} />
            <Text style={styles.regularText}>{viewCount ?? 0}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostListCardOld;

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: undefined,
  },
  bodyContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  regularText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(12),
    color: color.Dark[100],
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
