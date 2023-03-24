export type UploadImageResponseType = {
  code: string;
  data: string;
  message: string;
  status: string;
};

export type UploadVideoDataResponseType = {
  coverImage: string;
  encodeDashUrl: string;
  encodeHlsUrl: string;
};

export type UploadVideoResponseType = {
  code: string;
  data: UploadVideoDataResponseType;
  message: string;
  status: string;
};
