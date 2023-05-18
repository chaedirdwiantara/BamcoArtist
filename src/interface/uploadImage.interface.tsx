export type UploadImageResponseType = {
  code: string;
  data: string;
  message: string;
  status: string;
};

export type UploadVideoDataResponseType = {
  uid: string;
  coverImage: string;
  encodeDashUrl: string;
  encodeHlsUrl: string;
  readyToStream: boolean;
};

export type ProgressUploadDataResponseType = {
  uid: string;
  readyToStream: boolean;
};

export type UploadVideoResponseType = {
  code: string;
  data: UploadVideoDataResponseType;
  message: string;
  status: string;
};

export type ProgressUploadVideoResponseType = {
  code: string;
  data: ProgressUploadDataResponseType;
  message: string;
  status: string;
};
