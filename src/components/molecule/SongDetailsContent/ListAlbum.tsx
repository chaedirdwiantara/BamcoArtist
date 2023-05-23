import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {SquareImage} from '../../atom';
import {DefaultImage} from '../../../assets/icon';
import {color, font, typography} from '../../../theme';
import {heightPercentage, widthPercentage} from '../../../utils';

interface ListAlbumProps {
  title: string;
  albumName: string;
  imgUri: string;
  createdOn: string;
  onPress: () => void;
  imgSize?: number;
}

export const ListAlbum: React.FC<ListAlbumProps> = ({
  title,
  imgUri,
  albumName,
  createdOn,
  onPress,
  imgSize = widthPercentage(96),
}) => {
  const {t} = useTranslation();
  return (
    <View>
      {title && (
        <Text style={[typography.Subtitle1, styles.titleContent]}>{title}</Text>
      )}
      <TouchableOpacity onPress={onPress}>
        {imgUri ? (
          <SquareImage imgUri={imgUri} size={imgSize} />
        ) : (
          <DefaultImage.PlaylistCover
            width={widthPercentage(96)}
            height={widthPercentage(96)}
          />
        )}
        <Text numberOfLines={1} style={styles.albumName}>
          {albumName}
        </Text>
        <Text style={styles.createdOn}>{`${createdOn} · ${t(
          'Musician.Label.Album',
        )}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContent: {
    color: color.Success[500],
    paddingVertical: heightPercentage(12),
  },
  albumName: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(13),
    lineHeight: heightPercentage(12),
    color: color.Neutral[10],
    paddingTop: heightPercentage(15),
  },
  createdOn: {
    fontFamily: font.InterMedium,
    fontSize: mvs(11),
    color: color.Dark[50],
    paddingTop: mvs(3),
  },
});
