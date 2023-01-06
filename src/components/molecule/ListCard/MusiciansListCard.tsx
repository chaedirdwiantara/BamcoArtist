import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {Avatar, Gap} from '../../atom';
import {
  heightPercentage,
  normalize,
  toCurrency,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {color, font} from '../../../theme';
import {Dropdown} from '../DropDown';
import {DefaultAvatar} from '../../../assets/icon';

export interface ListProps {
  musicianNum?: number | string;
  onPressMore: (data: any) => void;
  musicianName: string;
  imgUri: string;
  point?: number | null;
  containerStyles?: ViewStyle;
  dataFilter?: {label: string; value: string}[];
  followerMode?: boolean;
  followersCount?: number;
  activeMore?: boolean;
}

const MusiciansListCard: React.FC<ListProps> = (props: ListProps) => {
  const {
    musicianNum,
    onPressMore,
    musicianName,
    imgUri,
    point,
    containerStyles,
    dataFilter,
    followersCount,
    followerMode,
    activeMore = true,
  } = props;

  // ? Dropdown Menu Example
  const dataMore = [
    {label: 'Follow', value: '1'},
    {label: 'Send Donation', value: '2'},
    {label: 'Go To Musician', value: '3'},
  ];

  const moreMenu = () => {
    return (
      <Dropdown.More
        data={dataFilter ? dataFilter : dataMore}
        selectedMenu={onPressMore}
        containerStyle={{
          width: widthResponsive(123),
          marginLeft: widthPercentage(-113),
          marginTop: heightPercentage(-8),
        }}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.rankStyle}>
        {musicianNum?.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </Text>
      {imgUri ? (
        <Avatar imgUri={imgUri} size={widthResponsive(44)} />
      ) : (
        <DefaultAvatar.MusicianIcon />
      )}
      <Gap width={8} />
      <View style={styles.textContainer}>
        <Text style={styles.musicianName} numberOfLines={1}>
          {musicianName}
        </Text>
        {followerMode && (
          <View>
            {followersCount !== 0 ? (
              <Text style={styles.followersCount} numberOfLines={1}>
                {`${toCurrency(followersCount, {
                  withFraction: false,
                })} Followers`}
              </Text>
            ) : (
              <Text style={styles.followersCount} numberOfLines={1}>
                0 Followers
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.rightContainer}>
        {point ? <Text style={styles.pointStyle}>{`${point} pts`}</Text> : null}
        {activeMore && moreMenu()}
      </View>
    </View>
  );
};

export default MusiciansListCard;

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
    marginRight: widthResponsive(15),
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointStyle: {
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: '#FF87DB',
    paddingRight: widthPercentage(7),
  },
  followersCount: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Dark[50],
  },
});
