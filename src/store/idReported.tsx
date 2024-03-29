import create from 'zustand';

interface FeedReportRecordProps {
  idReported: string[];
  setIdReported: (value: string[]) => void;
}

export const feedReportRecorded = create<FeedReportRecordProps>(set => ({
  idReported: [],
  setIdReported: (value: string[]) => set({idReported: value}),
}));

interface MediaReportRecordProps {
  idReported: string[];
  setIdReported: (value: string[]) => void;
}

export const mediaReportRecorded = create<MediaReportRecordProps>(set => ({
  idReported: [],
  setIdReported: (value: string[]) => set({idReported: value}),
}));
