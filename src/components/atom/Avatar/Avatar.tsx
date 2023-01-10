import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';
import {ms} from 'react-native-size-matters';
import {DefaultAvatar} from '../../../assets/icon';

interface AvatarProps {
  imgUri?: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {imgUri, size = ms(32)} = props;

  return (
    <View>
      {imgUri ? (
        <FastImage
          source={{uri: imgUri}}
          style={[styles.root, {width: size}]}
          testID={'ssu-avatar'}
        />
      ) : (
        <DefaultAvatar.MusicianIcon
          style={styles.root}
          width={size}
          height={size}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 200,
  },
});
