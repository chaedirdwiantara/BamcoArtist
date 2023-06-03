import {Animated} from 'react-native';
import create from 'zustand';

type ScrollState = {
  headerTranslateY: Animated.AnimatedInterpolation<number>;
  headerOpacity: Animated.AnimatedInterpolation<number>;
  compATranslateY: Animated.AnimatedInterpolation<number>;
  compBTranslateY: Animated.AnimatedInterpolation<number>;
};

export const useScrollStore = create<ScrollState>(set => ({
  headerTranslateY: new Animated.Value(0),
  headerOpacity: new Animated.Value(0),
  compATranslateY: new Animated.Value(0),
  compBTranslateY: new Animated.Value(0),
}));

type ReachTop = {
  compCReachedTop: boolean;
  setCompCReachedTop: (value: boolean) => void;
};

export const useReactTop = create<ReachTop>(set => ({
  compCReachedTop: false,
  setCompCReachedTop: (value: boolean) =>
    set(state =>
      state.compCReachedTop !== value ? {compCReachedTop: value} : {},
    ),
}));
