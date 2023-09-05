import create from 'zustand';

interface BlockUserRecordProps {
  uuidBlocked: string[];
  setuuidBlocked: (value: string[]) => void;
}

export const blockUserRecorded = create<BlockUserRecordProps>(set => ({
  uuidBlocked: [],
  setuuidBlocked: (value: string[]) => set({uuidBlocked: value}),
}));
