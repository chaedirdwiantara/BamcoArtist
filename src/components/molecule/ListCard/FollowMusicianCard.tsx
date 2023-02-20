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
import {imageTypes} from '../../../interface/base.interface';
import {useTranslation} from 'react-i18next';

interface ListProps {
  musicianNum?: number;
  musicianName: string;
  imgUri: imageTypes[];
  followerCount: number;
  followOnPress: () => void;
  stateButton: boolean;
  containerStyles?: ViewStyle;
  toDetailOnPress: () => void;
}

const FollowMusicianCard: React.FC<ListProps> = (props: ListProps) => {
  const {t} = useTranslation();
  const {
    musicianNum,
    musicianName,
    imgUri,
    followerCount,
    followOnPress,
    stateButton,
    containerStyles,
    toDetailOnPress,
  } = props;

  const follow = stateButton
    ? t('Preference.Following')
    : t('Preference.Follow');
  const [textFollow, setTextFollow] = useState(follow);
  const [countFollower, setCountFollower] = useState(followerCount);

  const onPressFollow = () => {
    const followers = stateButton ? countFollower - 1 : countFollower + 1;
    setTextFollow(
      (stateButton ? t('Preference.Follow') : t('Preference.Following')) || '',
    );
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
              textFollow === t('Preference.Following')
                ? undefined
                : color.Pink[200],
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
      {imgUri === null || imgUri.length === 0 ? (
        <TouchableOpacity onPress={toDetailOnPress}>
          <DefaultAvatar.MusicianIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toDetailOnPress}>
          <Avatar imgUri={imgUri[0].image} size={widthResponsive(44)} />
        </TouchableOpacity>
      )}
      <Gap width={8} />
      <View style={styles.textContainer}>
        <Text
          style={styles.musicianName}
          numberOfLines={1}
          onPress={toDetailOnPress}>
          {musicianName}
        </Text>

        <Text style={styles.followerCount} numberOfLines={1}>
          {countFollower + ' ' + t('General.Followers')}
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
