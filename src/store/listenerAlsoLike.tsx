import create from 'zustand';
import {ListenerLikesData} from '../interface/analythic.interface';

interface DataListenerAlsoLikes {
  storedListenerLikes: ListenerLikesData[] | undefined;
  setStoredListenerLikes: (value: ListenerLikesData[]) => void;
}

export const useListenerAlsoLikesStore = create<DataListenerAlsoLikes>(set => ({
  storedListenerLikes: undefined,
  setStoredListenerLikes: (value: ListenerLikesData[]) =>
    set({storedListenerLikes: value}),
}));
