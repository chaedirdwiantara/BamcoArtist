export type VersionInfoPropsType = {
  platform: string;
};

export type VersionInfoDetailType = {
  id: number | null;
  version: string | null;
  platform: string | null;
  minimumOs: string | null;
  apps: string | null;
  forceUpdate: boolean | null;
  startedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type VersionInfoResponseType = {
  code: string;
  data: VersionInfoDetailType;
  message: string;
  status: string;
};
