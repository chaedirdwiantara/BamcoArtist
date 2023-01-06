import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import {SquareImage} from '../../atom';
import {color, font, typography} from '../../../theme';
import {DefaultImage} from '../../../assets/icon';

interface ListAlbumProps {
  title?: string;
  albumName: string;
  imgUri: string;
  imgSize?: number;
  createdOn: string;
  onPress: () => void;
}

export const ListAlbum: React.FC<ListAlbumProps> = ({
  title,
  albumName,
  imgSize = widthPercentage(96),
  createdOn,
  onPress,
  imgUri = 'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {title && (
        <Text style={[typography.Subtitle1, styles.titleContent]}>{title}</Text>
      )}
      {imgUri ? (
        <SquareImage imgUri={imgUri} size={imgSize} />
      ) : (
        <DefaultImage.PlaylistCover width={96} height={96} />
      )}
      <Text style={styles.albumName}>{albumName}</Text>
      <Text style={styles.createdOn}>{`${createdOn} · Album`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleContent: {
    color: color.Success[500],
    paddingVertical: heightPercentage(12),
  },
  albumName: {
    fontFamily: font.InterSemiBold,
    fontSize: normalize(12),
    lineHeight: heightPercentage(12),
    color: color.Neutral[10],
    paddingTop: heightPercentage(10),
  },
  createdOn: {
    fontFamily: font.InterMedium,
    fontSize: normalize(10),
    color: color.Dark[50],
  },
});
