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
