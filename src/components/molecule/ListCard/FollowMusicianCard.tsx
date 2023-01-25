import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import {Avatar, Gap} from '../../atom';
import {color, font} from '../../../theme';
import {DefaultAvatar} from '../../../assets/icon';
import {normalize, widthResponsive} from '../../../utils';

interface ListProps {
  musicianNum?: number;
  musicianName: string;
  imgUri: string | null;
  followerCount: number;
  followOnPress: () => void;
  stateButton: boolean;
  containerStyles?: ViewStyle;
}

const FollowMusicianCard: React.FC<ListProps> = (props: ListProps) => {
  const {
    musicianNum,
    musicianName,
    imgUri,
    followerCount,
    followOnPress,
    stateButton,
    containerStyles,
  } = props;

  const follow = stateButton ? 'Following' : 'Follow';
  const [textFollow, setTextFollow] = useState(follow);
  const [countFollower, setCountFollower] = useState(followerCount);

  const onPressFollow = () => {
    const followers = stateButton ? countFollower - 1 : countFollower + 1;
    setTextFollow(stateButton ? 'Follow' : 'Following');
    setCountFollower(followers);
    followOnPress();
  };

  const followMenu = () => {
    return (
      <TouchableOpacity
        style={[
          styles.followButton,
          {
            backgroundColor:
              textFollow === 'Following' ? undefined : color.Pink[200],
          },
        ]}
        onPress={onPressFollow}>
        <Text style={styles.followText}>{textFollow}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyles]}>
      {musicianNum && (
        <Text style={styles.rankStyle}>
          {musicianNum?.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </Text>
      )}
      {imgUri === null || imgUri === '' ? (
        <DefaultAvatar.MusicianIcon />
      ) : (
        <Avatar imgUri={imgUri} size={widthResponsive(44)} />
      )}
      <Gap width={8} />
      <View style={styles.textContainer}>
        <Text style={styles.musicianName} numberOfLines={1}>
          {musicianName}
        </Text>

        <Text style={styles.followerCount} numberOfLines={1}>
          {countFollower} Followers
        </Text>
      </View>
      <View style={styles.rightContainer}>{followMenu()}</View>
    </View>
  );
};

export default FollowMusicianCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankStyle: {
    fontFamily: font.InterMedium,
    fontSize: normalize(10),
    fontWeight: '600',
    marginRight: widthResponsive(10),
    marginTop: ms(2),
    color: color.Dark[100],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  musicianName: {
    fontFamily: font.InterRegular,
    fontSize: normalize(14),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  followerCount: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Dark[50],
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followButton: {
    paddingVertical: widthResponsive(6),
    width: widthResponsive(68),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.Pink[200],
    borderRadius: 4,
  },
  followText: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Neutral[10],
  },
});
