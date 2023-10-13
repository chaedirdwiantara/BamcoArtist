import React from 'react';
import {mvs} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {widthPercentage} from '../../../utils';
import {color, typography} from '../../../theme';

interface AvatarProps {
  imgUri: string;
  initialName?: string;
  type?: string;
  qrType?: string;
  size?: number;
  username?: string;
  showIcon?: boolean;
  activeOpacity?: number;
  onPress?: () => void;
  icon?: React.ReactNode;
  backgroundColor?: string;
  showBorder?: boolean;
  borderColor?: string;
}

export const AvatarProfile: React.FC<AvatarProps> = (props: AvatarProps) => {
  const {
    initialName,
    imgUri,
    size = widthPercentage(64),
    type,
    qrType,
    showIcon,
    icon,
    activeOpacity,
    backgroundColor,
    showBorder,
    borderColor,
    onPress,
  } = props;

  const initial = imgUri === '' || imgUri === null || imgUri === undefined;

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
          {
            width: size,
            backgroundColor: backgroundColor
              ? backgroundColor
              : color.Success[400],
            borderWidth: showBorder ? mvs(2) : 0,
            borderColor,
          },
        ]}>
        {type !== 'edit' ? (
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
            style={[
              styles.root,
              {
                width: size,
                borderColor: borderColor ? borderColor : '#F37070',
                borderWidth: showBorder ? mvs(2) : qrType === 'shareQR' ? 3 : 0,
                borderRadius: 10000,
              },
            ]}
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
