import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {color} from '../../../theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  heightPercentage,
  heightResponsive,
  widthPercentage,
  widthResponsive,
} from '../../../utils/dimensionFormat';

interface SheetProps {
  children?: React.ReactNode;
  topChild?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const SsuSheet: FC<SheetProps> = (props: SheetProps) => {
  const {children, topChild, containerStyle} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {topChild}
      <View style={[styles.childrenContainer, containerStyle]}>{children}</View>
    </View>
  );
};

export default SsuSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
  },
  childrenContainer: {
    alignItems: 'center',
    backgroundColor: color.Dark[800],
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthResponsive(48),
    paddingTop: heightResponsive(32),
    paddingBottom: heightResponsive(24),
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
});
