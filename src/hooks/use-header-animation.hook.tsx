import {useRef} from 'react';
import {Animated} from 'react-native';
import {useScrollStore} from '../store/translateY.store';

const HEADER_HEIGHT = 60;
const SCROLL_DISTANCE = 100;

const COMPONENT_C_HEIGHT = 60;

const COMP_A_SCROLL_DISTANCE = HEADER_HEIGHT;
const COMP_B_SCROLL_DISTANCE = HEADER_HEIGHT;
const COMP_C_SCROLL_DISTANCE = HEADER_HEIGHT + COMPONENT_C_HEIGHT;

export const useHeaderAnimation = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const clampedScrollY = useRef(
    Animated.diffClamp(scrollY, 0, SCROLL_DISTANCE),
  ).current;

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );

  const clampedScrollYCompA = useRef(
    Animated.diffClamp(scrollY, 0, COMP_A_SCROLL_DISTANCE),
  ).current;

  const clampedScrollYCompB = useRef(
    Animated.diffClamp(scrollY, 0, COMP_B_SCROLL_DISTANCE),
  ).current;

  const clampedScrollYCompC = useRef(
    Animated.diffClamp(scrollY, 0, COMP_C_SCROLL_DISTANCE),
  ).current;

  const compATranslateY = clampedScrollYCompA.interpolate({
    inputRange: [0, COMP_A_SCROLL_DISTANCE],
    outputRange: [0, -COMP_A_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const compBTranslateY = clampedScrollYCompB.interpolate({
    inputRange: [0, COMP_B_SCROLL_DISTANCE],
    outputRange: [0, -COMP_B_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const compCTranslateY = clampedScrollYCompC.interpolate({
    inputRange: [0, COMP_C_SCROLL_DISTANCE],
    outputRange: [0, -COMP_C_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const headerOpacity = clampedScrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Update Zustand store
  useScrollStore.setState({
    compATranslateY,
    compBTranslateY,
    headerOpacity,
  });

  return {
    handleScroll,
    headerOpacity,
    compCTranslateY,
  };
};
