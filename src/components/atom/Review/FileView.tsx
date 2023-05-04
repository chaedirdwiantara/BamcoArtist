import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {heightPercentage, widthPercentage} from '../../../utils';
import {PlayIcon} from '../../../assets/icon';
import Color from '../../../theme/Color';

type FileViewType = {
  imageUri: string;
  video?: boolean;
};

const FileView: React.FC<FileViewType> = props => {
  const {imageUri, video = false} = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{uri: imageUri}} style={styles.image} />
      {video && (
        <View style={styles.iconContainer}>
          <PlayIcon stroke={Color.Neutral[10]} width={widthPercentage(24)} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FileView;

const styles = StyleSheet.create({
  container: {
    marginRight: widthPercentage(6),
  },
  image: {
    width: widthPercentage(48),
    height: heightPercentage(48),
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
