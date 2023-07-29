export type ReportListData = {};

export type ListBannerResponseType = {
  code: number;
  data: ReportListData;
  message: string;
  status: number;
};

export type ReportPostRequestBody = {
  reportType: 'post' | 'replies' | 'album' | 'song';
  reportTypeId: number | string; //? id album / id post / id reply(Comment)
  reporterUuid: string; //? uuid of the reporter
  reportCategory: string; //? category of the report
  reportReason: string; //? reason of the report
};
