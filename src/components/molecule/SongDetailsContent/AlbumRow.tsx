import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {Gap, SquareImage} from '../../atom';
import {DefaultImage, LoveIcon, PlayIcon3} from '../../../assets/icon';
import {color, font, typography} from '../../../theme';
import {
  heightPercentage,
  widthPercentage,
  widthResponsive,
} from '../../../utils';

interface AlbumRowProps {
  title: string;
  imgUri: string;
  createdOn: string;
  onPress: () => void;
  streamCount?: string | number;
  LikeCount?: string | number;
  imgSize?: number;
  albumTitle?: string;
}

export const AlbumRow: React.FC<AlbumRowProps> = ({
  title,
  imgUri,
  createdOn,
  onPress,
  streamCount,
  LikeCount,
  albumTitle,
  imgSize = widthPercentage(96),
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {imgUri ? (
          <SquareImage imgUri={imgUri} size={imgSize} />
        ) : (
          <DefaultImage.PlaylistCover
            width={widthPercentage(96)}
            height={widthPercentage(96)}
          />
        )}
      </TouchableOpacity>
      <Gap width={12} />
      <View style={styles.detailContainer}>
        <View>
          <Text style={[typography.Heading6, styles.titleContent]}>
            {title}
          </Text>

          <Text style={styles.createdOn}>{`${
            albumTitle ?? t('Musician.Label.Album')
          } · ${createdOn}`}</Text>
        </View>
        <View style={styles.desc}>
          {LikeCount && (
            <View style={styles.engageContainer}>
              <LoveIcon
                width={16}
                height={16}
                fill={color.Pink[100]}
                stroke="transparent"
              />
              <Gap width={4} />
              <Text style={styles.createdOn}>{LikeCount} Liked</Text>
            </View>
          )}
          {LikeCount && <Gap width={20} />}
          {streamCount && (
            <View style={styles.engageContainer}>
              <PlayIcon3 width={16} height={16} />
              <Gap width={4} />
              <Text style={styles.createdOn}>{streamCount} Stream</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  titleContent: {
    color: color.Neutral[10],
  },
  albumName: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(13),
    lineHeight: heightPercentage(12),
    color: color.Neutral[10],
    paddingTop: heightPercentage(15),
  },
  detailContainer: {
    justifyContent: 'space-between',
  },
  createdOn: {
    fontFamily: font.InterMedium,
    fontSize: mvs(11),
    color: color.Dark[50],
  },
  desc: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: widthResponsive(4),
  },
  engageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
