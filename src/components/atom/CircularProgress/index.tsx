import * as React from 'react';
import {TextInput, Animated, View, StyleSheet} from 'react-native';
import {mvs} from 'react-native-size-matters';
import Svg, {G, Circle} from 'react-native-svg';
import {color, font} from '../../../theme';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const CircularProgress = ({
  percentage = 75,
  radius = mvs(24),
  strokeWidth = mvs(10),
  duration = 500,
  strokeColor = '#FF7ED8',
  max = 100,
}) => {
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue: number) => {
    return Animated.timing(animated, {
      delay: 500,
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    animation(percentage);
    animated.addListener(
      v => {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circumference - (circumference * maxPerc) / 100;
        if (inputRef?.current) {
          inputRef.current.setNativeProps({
            text: `${Math.round(v.value)}%`,
          });
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [max, percentage],
    );

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View style={{width: radius * 2, height: radius * 2}}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0%"
        style={[StyleSheet.absoluteFillObject, styles.text]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: font.InterRegular,
    color: color.Neutral[10],
    fontWeight: '600',
    textAlign: 'center',
    fontSize: mvs(9),
  },
});
