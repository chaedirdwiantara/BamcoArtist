import React from 'react';
import {LayoutRectangle, NativeMethods, ScrollView, View} from 'react-native';
import create from 'zustand';

interface OffsetPropsType {
  px: number;
  py: number;
}

interface Step {
  name: string;
  order: number;
  visible: boolean;
  wrapperRef: React.RefObject<NativeMethods>;
  measure: () => Promise<LayoutRectangle>;
  text: string;
}

type ScrollState = {
  scrollRef: React.MutableRefObject<ScrollView | null>;
  setScrollRef: (by: React.MutableRefObject<ScrollView | null>) => void;
  offsetSortFilter: OffsetPropsType;
  setOffsetSortFilter: (by: OffsetPropsType) => void;
  uploadRef: React.MutableRefObject<View | null>;
  currentStep: Step | undefined;
  setCurrentStep: (by: Step | undefined) => void;
};

export const useCopilotStore = create<ScrollState>(set => ({
  scrollRef: React.createRef(),
  setScrollRef: by => set(state => ({scrollRef: by})),
  offsetSortFilter: {px: 0, py: 0},
  setOffsetSortFilter: by => set(state => ({offsetSortFilter: by})),
  uploadRef: React.createRef(),
  currentStep: undefined,
  setCurrentStep: by => set(state => ({currentStep: by})),
}));
