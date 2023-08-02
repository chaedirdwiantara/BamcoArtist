import create from 'zustand';

interface FeedReportRecordProps {
  idReported: string[];
  setIdReported: (value: string[]) => void;
}

export const feedReportRecorded = create<FeedReportRecordProps>(set => ({
  idReported: [],
  setIdReported: (value: string[]) => set({idReported: value}),
}));
