import create from 'zustand';
import {ProfileResponseType} from '../interface/profile.interface';

interface UserProfileProps {
  profileStore: ProfileResponseType;
  setProfileStore: (value: ProfileResponseType) => void;
}

export const userProfile = create<UserProfileProps>(set => ({
  profileStore: {
    code: 0,
    // @ts-ignore TODO: NEED TO REFACTOR USE-PROFILE.hook
    data: null,
    message: '',
    status: 0,
  },
  setProfileStore: (value: ProfileResponseType) => set({profileStore: value}),
}));
