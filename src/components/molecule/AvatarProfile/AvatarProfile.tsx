import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {widthPercentage} from '../../../utils';
import {color, typography} from '../../../theme';

interface AvatarProps {
  imgUri: string;
  initialName?: string;
  type?: string;
  size?: number;
  username?: string;
  showIcon?: boolean;
  activeOpacity?: number;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export const AvatarProfile: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {
    initialName,
    imgUri,
    size = widthPercentage(64),
    type,
    showIcon,
    icon,
    activeOpacity,
    onPress,
  } = props;

  const initial = imgUri === '' || imgUri === null;

  const PressableIcon = () => {
    return (
      <TouchableOpacity
        style={[styles.icon, {width: size}]}
        activeOpacity={activeOpacity}
        onPress={onPress}>
        {icon}
      </TouchableOpacity>
    );
  };

  const InitialComp = () => {
    return (
      <View
        style={[
          styles.root,
          {width: size, backgroundColor: color.Success[400]},
        ]}>
        {type === '' ? (
          <Text style={[typography.Heading4, styles.name]}>{initialName}</Text>
        ) : (
          <TouchableOpacity
            style={[styles.icon, {width: size}]}
            activeOpacity={activeOpacity}
            onPress={onPress}>
            {icon}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View>
      {initial ? (
        <InitialComp />
      ) : (
        <>
          {showIcon && <PressableIcon />}
          <FastImage
            source={{uri: imgUri}}
            style={[styles.root, {width: size}]}
            testID={'ssu-avatar'}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: color.Neutral[10],
  },
  icon: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
