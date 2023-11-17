import create from 'zustand';

interface CreatePostStatusProps {
  postSuccess: boolean;
  setPostSuccess: (value: boolean) => void;
}

export const useCreatePostStatus = create<CreatePostStatusProps>(set => ({
  postSuccess: false,
  setPostSuccess: (value: boolean) => set({postSuccess: value}),
}));
