import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {widthResponsive} from '../../../utils';

interface ShowMoreAnalyticsProps {
  style?: ViewStyle;
  text?: string;
  onPress?: () => void;
}

const ShowMoreAnalytics: React.FC<ShowMoreAnalyticsProps> = ({
  style,
  text = 'Show More',
  onPress,
}) => {
  return (
    <LinearGradient
      colors={[
        'transparent',
        'rgba(15, 19, 25, 0.1)',
        'rgba(15, 19, 25, 0.4)',
        'rgba(15, 19, 25, 0.6)',
        'rgba(15, 19, 25, 0.8)',
        'rgba(15, 19, 25, 0.9)',
        color.Dark[800],
      ]}
      style={[styles.gradientContainer, style]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.centeredText}>{text}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ShowMoreAnalytics;

const styles = StyleSheet.create({
  gradientContainer: {
    width: '100%',
    height: 121,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    color: color.Success[400],
    fontSize: mvs(13),
    fontFamily: font.InterRegular,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: widthResponsive(30),
  },
});
