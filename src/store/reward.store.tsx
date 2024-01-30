import create from 'zustand';
import {DataMissionStoreProps} from '../interface/reward.interface';

interface ClaimableStatusProps {
  storedDataMission: DataMissionStoreProps[];
  storedBadgeTitle: string | null;
  setStoredDataMission: (storedDataMission: DataMissionStoreProps[]) => void;
  setStoredBadgeTitle: (storedBadgeTitle: string) => void;
}

export const dataMissionStore = create<ClaimableStatusProps>(set => ({
  storedDataMission: [],
  storedBadgeTitle: null,
  setStoredDataMission: (value: DataMissionStoreProps[]) =>
    set({storedDataMission: value}),
  setStoredBadgeTitle: (value: string) => set({storedBadgeTitle: value}),
}));
interface SlideIndexStatusProps {
  storedSlideIndex: number | undefined;
  setStoredSlideIndex: (value: number | undefined) => void;
}

export const slideIndexStore = create<SlideIndexStatusProps>(set => ({
  storedSlideIndex: undefined,
  setStoredSlideIndex: (value: number | undefined) =>
    set({storedSlideIndex: value}),
}));

type metaProps = {
  page: number;
  perPage: number;
};

interface TabRewardProps {
  metaReward: metaProps;
  setMetaReward: (value: metaProps) => void;
  allowUpdateMeta: boolean;
  setAllowUpdateMeta: (value: boolean) => void;
}

export const tabRewardStore = create<TabRewardProps>(set => ({
  metaReward: {
    page: 1,
    perPage: 10,
  },
  setMetaReward: (value: metaProps) => set({metaReward: value}),
  allowUpdateMeta: true,
  setAllowUpdateMeta: (value: boolean) => set({allowUpdateMeta: value}),
}));
