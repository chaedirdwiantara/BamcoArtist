import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import {
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {Dropdown} from '../DropDown';
import {color, font} from '../../../theme';
import {Gap, SquareImage} from '../../atom';
import {DefaultImage, SoundIcon} from '../../../assets/icon';

interface ListProps {
  imgUri: string | null;
  onPressMore?: (data: any) => void;
  onPressCard?: () => void;
  musicNum?: number | string;
  musicTitle: string;
  singerName: string;
  containerStyles?: ViewStyle;
  dataFilter?: {label: string; value: string}[];
  rightIcon?: boolean;
  rightIconComponent?: React.ReactNode;
  onPressIcon?: (data: any) => void;
  type?: string;
  played?: boolean;
  hideDropdownMore?: boolean;
}

const MusicListCard: React.FC<ListProps> = ({
  imgUri,
  onPressMore,
  onPressIcon,
  onPressCard,
  musicNum,
  musicTitle,
  singerName,
  containerStyles,
  dataFilter,
  rightIcon,
  rightIconComponent,
  played,
  hideDropdownMore = false,
}) => {
  // ? Dropdown Menu Example
  const dataMore = [
    {label: 'Add to Playlist', value: '1'},
    {label: 'Send Donation', value: '2'},
    {label: 'Add to Queue', value: '3'},
    {label: 'Share Music', value: '4'},
    {label: 'Show Credits', value: '5'},
  ];

  const titleColor = played ? color.Success[400] : color.Neutral[10];

  return (
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      onPress={onPressCard}>
      {played && (
        <SoundIcon
          style={{
            width: widthResponsive(30),
            paddingRight: widthPercentage(15),
          }}
        />
      )}
      {musicNum && !played && (
        <Text style={styles.rankStyle}>
          {musicNum.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </Text>
      )}
      {imgUri ? (
        <SquareImage imgUri={imgUri} size={44} />
      ) : (
        <DefaultImage.SongCover width={44} height={44} />
      )}

      <View style={styles.textContainer}>
        <Text style={[styles.songTitle, {color: titleColor}]} numberOfLines={1}>
          {musicTitle}
        </Text>
        <Gap height={2} />
        <Text style={styles.songDesc} numberOfLines={1}>
          {singerName}
        </Text>
      </View>
      {rightIcon ? (
        <TouchableOpacity onPress={onPressIcon}>
          {rightIconComponent}
        </TouchableOpacity>
      ) : (
        !hideDropdownMore && (
          <Dropdown.More
            data={dataFilter ? dataFilter : dataMore}
            selectedMenu={(data: any) => {
              onPressMore && onPressMore(data);
            }}
            containerStyle={{
              width: widthPercentage(120),
              marginLeft: widthPercentage(-110),
              marginTop: heightPercentage(-8),
            }}
          />
        )
      )}
    </TouchableOpacity>
  );
};

export default MusicListCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankStyle: {
    fontFamily: font.InterMedium,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    width: widthResponsive(30),
    color: color.Dark[100],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: ms(12),
  },
  songTitle: {
    fontFamily: font.InterRegular,
    fontSize: normalize(14),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: color.Dark[100],
  },
  likeButton: {
    justifyContent: 'center',
    marginRight: ms(5),
  },
  dotsButton: {
    justifyContent: 'center',
  },
});
