import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import {SquareImage} from '../../atom';
import {color, font} from '../../../theme';
import {heightResponsive, normalize, widthResponsive} from '../../../utils';
import {DefaultImage} from '../../../assets/icon';
import Color from '../../../theme/Color';

interface ListProps {
  imgUri: string | null;
  onPressCard: () => void;
  musicTitle: string;
  singerName: string;
}

const PlaylistHomeCard: React.FC<ListProps> = ({
  imgUri,
  onPressCard,
  musicTitle,
  singerName,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressCard}>
      {imgUri ? (
        <SquareImage imgUri={imgUri} size={'100%'} />
      ) : (
        <DefaultImage.PlaylistHomeCover width={142} height={142} />
      )}

      <View style={styles.textContainer}>
        <View style={{height: '50%'}}>
          <Text style={styles.songTitle} numberOfLines={1}>
            {musicTitle}
          </Text>
        </View>
        <View style={{height: '50%'}}>
          <Text style={styles.songDesc} numberOfLines={1}>
            {singerName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistHomeCard;

const styles = StyleSheet.create({
  container: {
    width: widthResponsive(138),
    height: heightResponsive(205),
    borderColor: Color.Dark[400],
    borderWidth: mvs(0.5),
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: widthResponsive(16),
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
    padding: ms(8),
  },
  songTitle: {
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
    color: color.Dark[50],
  },
});
