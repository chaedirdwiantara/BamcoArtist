import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import {SquareImage} from '../../atom';
import {color, font} from '../../../theme';
import {normalize, widthResponsive} from '../../../utils';
import {DefaultImage, LockIcon, PublicIcon} from '../../../assets/icon';

interface ListProps {
  imgUri: string | null;
  onPressCard: () => void;
  musicNum?: number | string;
  musicTitle: string;
  singerName: string;
  isPublic: boolean;
  containerStyles?: ViewStyle;
}

const PlaylistCard: React.FC<ListProps> = ({
  imgUri,
  onPressCard,
  musicNum,
  musicTitle,
  singerName,
  isPublic,
  containerStyles,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      onPress={onPressCard}>
      {musicNum && (
        <Text style={styles.rankStyle}>
          {musicNum.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </Text>
      )}

      {imgUri ? (
        <SquareImage imgUri={imgUri} size={widthResponsive(44)} />
      ) : (
        <DefaultImage.PlaylistCover
          width={widthResponsive(44)}
          height={widthResponsive(44)}
        />
      )}

      <View style={styles.textContainer}>
        <View style={{height: '50%'}}>
          <Text style={styles.songTitle} numberOfLines={1}>
            {musicTitle}
          </Text>
        </View>
        <View style={{height: '42%'}}>
          <Text style={styles.songDesc} numberOfLines={1}>
            {singerName}
          </Text>
        </View>
      </View>

      {isPublic ? <PublicIcon /> : <LockIcon />}
    </TouchableOpacity>
  );
};

export default PlaylistCard;

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
    fontSize: Platform.OS === 'ios' ? mvs(15) : mvs(14),
    fontFamily: font.InterMedium,
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterMedium,
    fontSize: mvs(12),
    color: color.Dark[50],
  },
});
