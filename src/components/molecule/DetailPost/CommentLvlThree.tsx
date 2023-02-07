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
import {elipsisText, heightPercentage, widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {CommentIcon, LoveIcon} from '../../../assets/icon';
import {ms} from 'react-native-size-matters';
import {DataDropDownType, dataUpdateComment} from '../../../data/dropdown';
import {Dropdown} from '../DropDown';

interface ListProps extends TouchableOpacityProps {
  imgUriLvl3: string;
  userNameLvl3: string;
  userIdLvl3: string;
  postDateLvl3: string;
  userCommentedIdLvl3: string;
  commentCaptionLvl3: string;
  likeOnPressLvl3: () => void;
  commentOnPressLvl3: () => void;
  likePressedLvl3: boolean;
  likeCountLvl3: number;
  commentCountLvl3: number;
  containerStylesLvl3?: ViewStyle;
  toDetailOnPress?: () => void;
  selectedMenu: (value: DataDropDownType) => void;
  idComment: string;
  selectedIdComment: (idComment: string) => void;
  showEdit: boolean;
}

const CommentLvlThree: React.FC<ListProps> = (props: ListProps) => {
  const {
    imgUriLvl3,
    userNameLvl3,
    userIdLvl3,
    postDateLvl3,
    userCommentedIdLvl3,
    commentCaptionLvl3,
    likeOnPressLvl3,
    commentOnPressLvl3,
    likePressedLvl3,
    likeCountLvl3,
    commentCountLvl3,
    containerStylesLvl3,
    toDetailOnPress,
    selectedMenu,
    idComment,
    selectedIdComment,
    showEdit,
  } = props;
  return (
    <View style={[styles.root, containerStylesLvl3]}>
      <TouchableOpacity onPress={toDetailOnPress}>
        <Avatar imgUri={imgUriLvl3} size={widthResponsive(32)} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          marginLeft: widthResponsive(6),
        }}>
        <View style={[styles.topSection, {marginTop: showEdit ? ms(-7) : 0}]}>
          <Text style={styles.userName} onPress={toDetailOnPress}>
            {elipsisText(userNameLvl3, 21)}
            <Text style={styles.regularText}>
              {' '}
              {elipsisText(userIdLvl3, 10)}
            </Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: showEdit ? ms(-7) : 0,
            }}>
            <Text style={styles.postDateStyle}>{postDateLvl3}</Text>
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
              {userCommentedIdLvl3}
            </Text>
          </Text>
        </View>
        <Gap height={7} />
        <View>
          <Text style={styles.commentCaption}>{commentCaptionLvl3}</Text>
        </View>
        <Gap height={6} />
        {/* SOCIAL SECTION */}
        <View style={styles.bottomContainer}>
          <View style={styles.socialContainer}>
            {/* like section */}
            <View>
              <TouchableOpacity
                onPress={likeOnPressLvl3}
                style={styles.socialIcon}>
                <LoveIcon
                  fill={likePressedLvl3 ? color.Pink[100] : 'none'}
                  stroke={likePressedLvl3 ? 'none' : color.Dark[100]}
                />
                <Gap width={3} />
                <Text style={styles.regularText}>{likeCountLvl3}</Text>
              </TouchableOpacity>
            </View>
            <Gap width={15} />
            {/* comment section */}
            <View>
              <TouchableOpacity
                onPress={commentOnPressLvl3}
                style={styles.socialIcon}>
                <CommentIcon stroke={color.Dark[100]} />
                <Gap width={3} />
                <Text style={styles.regularText}>{commentCountLvl3}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommentLvlThree;

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
  userName: {
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
