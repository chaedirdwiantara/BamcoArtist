import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ViewStyle,
} from 'react-native';
import {color} from '../../../theme';
import {GalleryAddIcon} from '../../../assets/icon';
import {heightResponsive, widthResponsive} from '../../../utils';

interface Props {
  uri: string | undefined;
  showIcon?: boolean;
  onPress?: () => void;
  containerStyles?: ViewStyle;
  iconStyles?: ViewStyle;
}

export const PhotoPlaylist: React.FC<Props> = ({
  uri,
  showIcon,
  onPress,
  containerStyles,
  iconStyles,
}) => {
  return (
    <TouchableOpacity
      style={[styles.root, containerStyles]}
      onPress={onPress}
      activeOpacity={showIcon ? 0 : 1}>
      <ImageBackground
        source={{uri: uri}}
        resizeMode="cover"
        imageStyle={{borderRadius: 8}}
        style={styles.image}>
        {showIcon && <GalleryAddIcon style={iconStyles} />}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: widthResponsive(148),
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.Success[400],
    marginTop: heightResponsive(36),
    marginBottom: heightResponsive(28),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
