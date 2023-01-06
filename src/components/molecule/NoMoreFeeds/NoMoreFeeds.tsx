import React from 'react';
import {Text, View, StyleSheet, ViewStyle, Dimensions} from 'react-native';
import {mvs} from 'react-native-size-matters';
import Color from '../../../theme/Color';
import {TickCircleIcon} from '../../../assets/icon';
import Typography from '../../../theme/Typography';

const {width} = Dimensions.get('window');

interface NoMoreFeedsProps {
  containerStyle?: ViewStyle;
}

export const NoMoreFeeds: React.FC<NoMoreFeedsProps> = ({containerStyle}) => {
  return (
    <View style={[styles.root, containerStyle]}>
      <TickCircleIcon />
      <Text style={[Typography.Subtitle1, styles.text]}>{'No more feeds'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mvs(30),
    borderWidth: mvs(1),
    borderColor: Color.Dark[500],
  },
  text: {
    color: Color.Success[500],
    paddingTop: mvs(10),
  },
});
