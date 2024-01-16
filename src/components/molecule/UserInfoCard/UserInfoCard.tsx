import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  heightPercentage,
  width,
  widthPercentage,
  kFormatter,
} from '../../../utils';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {InfoProfileType} from '../../../data/profile';
import {ProfileFansResponseData} from '../../../interface/profile.interface';
import {useTranslation} from 'react-i18next';
import {useDebounce} from '../../../utils/debounce';

interface UserInfoCardProps {
  profile?: any;
  type?: string;
  totalFollowing?: number;
  favSong?: number;
  point?: number;
  fans?: number;
  follower?: number;
  release?: number;
  playlist?: number;
  rank?: number;
  containerStyles?: ViewStyle;
  onPress: () => void;
  selfProfile?: ProfileFansResponseData;
  totalCountlikedSong?: number;
  followersCount?: number;
  totalPoint?: number;
}

type Props = {
  point: number;
  title: string;
  onPress: () => void;
};

const Item: FC<Props> = ({point, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.itemStyle} onPress={onPress}>
      <Text style={styles.pointStyle}>
        {isNaN(point) ? '-' : kFormatter(point, 1)}
      </Text>
      <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const UserInfoCard: FC<UserInfoCardProps> = (props: UserInfoCardProps) => {
  const {
    type = '',
    profile,
    containerStyles,
    totalFollowing,
    onPress,
    selfProfile,
    totalCountlikedSong,
    followersCount,
    totalPoint = 0,
  } = props;
  const {t} = useTranslation();
  const infoProfileArtist = [
    {
      point: profile?.totalFans ? profile.totalFans : 0,
      title: t('Musician.Label.Fans'),
    },
    {
      point: followersCount,
      title: t('Musician.Label.Followers'),
    },
    // {
    //   point: profile?.totalRelease ? profile.totalRelease : 0,
    //   title: t('Musician.Label.Releases'),
    // },
    // {
    //   point: profile?.totalPlaylist ? profile.totalPlaylist : 0,
    //   title: t('Musician.Label.Playlists'),
    // },
    // {
    //   point: profile?.rank ? profile.rank : 0,
    //   title: t('Musician.Label.Rank'),
    // },
  ];

  const infoProfileUser = [
    {
      point: selfProfile?.following ? selfProfile.following : totalFollowing,
      title: t('Profile.Label.Following'),
    },
    {
      point: 0,
      title: 'LINE',
    },
    // {
    //   point: totalCountlikedSong ? totalCountlikedSong : 0,
    //   title: t('Profile.Label.Liked'),
    // },
    // {
    //   point: 0,
    //   title: 'LINE',
    // },
    {
      point: selfProfile?.point.daily ? selfProfile.point.daily : totalPoint,
      title: t('Profile.Label.Point'),
    },
  ];

  const listItem: InfoProfileType[] =
    type === 'self' ? infoProfileUser : infoProfileArtist;

  return (
    <View style={[styles.root, containerStyles]}>
      {listItem.map((val, i) => {
        const canPress =
          val.title === t('Profile.Label.Following') ||
          val.title === t('Musician.Label.Followers');
        const newOnPress = () => {
          canPress ? onPress() : null;
        };

        if (val.title === 'LINE') {
          return <View key={i} style={styles.separator} />;
        } else {
          return (
            <View key={i} style={{width: type === 'self' ? '30%' : '20%'}}>
              <Item
                point={val.point}
                title={val.title}
                onPress={useDebounce(newOnPress)}
              />
            </View>
          );
        }
      })}
    </View>
  );
};

export {UserInfoCard};

const styles = StyleSheet.create({
  root: {
    width: width * 0.9,
    height: undefined,
    aspectRatio: widthPercentage(327 / 74),
    backgroundColor: Color.Dark[600],
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderRadius: 12,
  },
  separator: {
    width: mvs(1),
    height: heightPercentage(18),
    backgroundColor: '#D1D1D1',
  },
  itemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointStyle: {
    fontFamily: Font.InterSemiBold,
    fontSize: mvs(15),
    color: Color.Neutral[10],
  },
  titleStyle: {
    fontFamily: Font.InterMedium,
    fontSize: mvs(10),
    color: Color.Dark[50],
  },
});
