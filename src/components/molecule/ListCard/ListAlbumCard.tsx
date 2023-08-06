import React from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {SquareImage} from '../../atom';
import {color, font} from '../../../theme';
import {widthPercentage} from '../../../utils';

export interface ListAlbumCardProps {
  imgUri: string;
  title: string;
  year: string;
  albumType: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

const ListAlbumCard: React.FC<ListAlbumCardProps> = (
  props: ListAlbumCardProps,
) => {
  const {imgUri, title, year, albumType, onPress, containerStyle} = props;

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <SquareImage imgUri={imgUri} size={widthPercentage(96)} />
      <View style={styles.containerText}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.containerSubtitle}>
          <Text style={styles.subtitle}>{year}</Text>
          <Text style={[styles.subtitle, {marginHorizontal: ms(2)}]}>•</Text>
          <Text style={styles.subtitle}>{albumType}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListAlbumCard;

const styles = StyleSheet.create({
  containerText: {
    marginTop: mvs(7),
    width: widthPercentage(100),
  },
  title: {
    fontSize: mvs(12),
    fontFamily: font.InterMedium,
    color: color.Neutral[10],
    lineHeight: mvs(12),
    fontWeight: '600',
  },
  containerSubtitle: {
    flexDirection: 'row',
    marginTop: mvs(2),
  },
  subtitle: {
    fontSize: mvs(10),
    fontFamily: font.InterRegular,
    color: color.Dark[50],
  },
});
