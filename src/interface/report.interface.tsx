export type ReportParamsProps = {
  reportType: 'post' | 'replies' | 'album' | 'song';
  reportTypeId: number | string; //? id album / id post / id reply(Comment)
  reporterUuid: string; //? uuid of the reporter
  reportedUuid: string; //? uuid of the being reported
  reportCategory: string; //? category of the report
  reportReason: string; //? reason of the report
};

export type ReportData = {
  reportType: 'post' | 'replies' | 'album' | 'song';
  reportTypeId: number | string;
  reporterUuid: string;
  reportCategory: string;
  reportReason: string;
};

export type ReportPostResponseType = {
  code: number;
  data: ReportData;
  message: string;
  status: number;
};
