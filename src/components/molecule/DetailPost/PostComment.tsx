import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Avatar, Gap} from '../../atom';
import {heightPercentage, widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {CommentIcon, LoveIcon} from '../../../assets/icon';
import {ms, mvs} from 'react-native-size-matters';
import {Dropdown} from '../DropDown';
import {dataUpdateComment} from '../../../data/dropdown';
import {DataDropDownType} from '../../../data/dropdown';

interface ListProps extends TouchableOpacityProps {
  imgUri: string;
  fullName: string;
  userName: string;
  postDate: string;
  artistPostId: string;
  commentCaption: string;
  likeOnPress: () => void;
  commentOnPress: () => void;
  likePressed: boolean;
  likeCount: number;
  commentCount: number;
  containerStyles?: ViewStyle;
  children?: React.ReactNode;
  toDetailOnPress?: () => void;
  selectedMenu: (value: DataDropDownType) => void;
  idComment: string;
  selectedIdComment: (idComment: string) => void;
  showEdit: boolean;
}

const PostComment: React.FC<ListProps> = (props: ListProps) => {
  const {
    imgUri,
    fullName,
    userName,
    postDate,
    artistPostId,
    commentCaption,
    likeOnPress,
    commentOnPress,
    likePressed,
    likeCount,
    commentCount,
    containerStyles,
    children,
    toDetailOnPress,
    selectedMenu,
    idComment,
    selectedIdComment,
    showEdit,
  } = props;
  return (
    <View style={[styles.root, containerStyles]}>
      <TouchableOpacity onPress={toDetailOnPress}>
        <Avatar imgUri={imgUri} size={widthResponsive(32)} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          marginLeft: widthResponsive(6),
        }}>
        <View style={[styles.topSection, {marginTop: showEdit ? ms(-7) : 0}]}>
          <Text style={styles.fullname} onPress={toDetailOnPress}>
            {fullName}
            <Text style={styles.regularText}> {userName}</Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: showEdit ? ms(-7) : 0,
            }}>
            <Text style={styles.postDateStyle}>{postDate}</Text>
            {showEdit ? (
              <Dropdown.More
                data={dataUpdateComment}
                idComment={idComment}
                selectedIdComment={selectedIdComment}
                selectedMenu={selectedMenu}
                iconFill={color.Dark[50]}
                containerStyle={{
                  width: widthResponsive(110),
                  marginLeft: widthResponsive(-97),
                  marginTop: Platform.OS === 'android' ? ms(-35) : ms(-10),
                }}
              />
            ) : null}
          </View>
        </View>
        <Gap height={2} />
        <View
          style={[styles.bottomSection, {marginTop: showEdit ? ms(-8) : 0}]}>
          <Text style={styles.reply}>
            {'replied to '}{' '}
            <Text style={[styles.reply, {color: color.Pink[100]}]}>
              {artistPostId}
            </Text>
          </Text>
        </View>
        <Gap height={7} />
        <View>
          <Text style={styles.commentCaption}>{commentCaption}</Text>
        </View>
        <Gap height={6} />
        {/* SOCIAL SECTION */}
        <View style={styles.bottomContainer}>
          <View style={styles.socialContainer}>
            {/* like section */}
            <View>
              <TouchableOpacity onPress={likeOnPress} style={styles.socialIcon}>
                <LoveIcon
                  fill={likePressed ? color.Pink[100] : 'none'}
                  stroke={likePressed ? 'none' : color.Dark[100]}
                />
                <Gap width={3} />
                <Text style={styles.regularText}>{likeCount}</Text>
              </TouchableOpacity>
            </View>
            <Gap width={15} />
            {/* comment section */}
            <View>
              <TouchableOpacity
                onPress={commentOnPress}
                style={styles.socialIcon}>
                <CommentIcon stroke={color.Dark[100]} />
                <Gap width={3} />
                <Text style={styles.regularText}>{commentCount}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* COMMENT LVL 2 SECTION */}
        {children}
      </View>
    </View>
  );
};

export default PostComment;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  topSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  fullname: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: ms(12),
    color: color.Neutral[10],
  },
  category: {
    backgroundColor: color.Pink[100],
    paddingHorizontal: widthResponsive(4),
    height: heightPercentage(16),
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postDateStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: ms(10),
    color: color.Dark[50],
  },
  regularText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: ms(10),
    color: color.Dark[50],
  },
  reply: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: ms(10),
  },
  commentCaption: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: ms(12),
    color: color.Neutral[10],
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
