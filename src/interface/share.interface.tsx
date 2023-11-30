export interface ShareLinkResponseType {
  code: number;
  data: ShareLinkDataResponse;
  message: string;
  status: number;
}

export interface ShareLinkDataResponse {
  id: number;
  scheme: string;
  short_link: string;
  title: string;
  description: string;
  image: string;
  CreatedAt: string | Date;
  UpdatedAt: string | Date;
  DeletedAt: string | Date | null;
}

export interface ShareLinkBodyReq {
  scheme: string;
  image: string;
  title: string;
  description: string;
}

export interface ShareMusicBodyReq {
  id: number;
  context: string;
}

export interface ShareMusicResponseType {
  code: number;
  data: null;
  message: string;
  status: number;
}
