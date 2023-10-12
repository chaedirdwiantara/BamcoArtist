export interface QrCode {
  uuid: string;
  fullname: string;
  username: string;
  avatarUri: string;
}

export interface CreateLinkDataResponseType {
  code: number;
  data: string;
  message: string;
  status: number;
}

export interface LinkedDevicesData {
  deviceName: string | null;
  isUsed: boolean;
  lastActiveAt: string;
  qrCode: string;
}
export interface GetLinkedDevicesResponseType {
  code: number;
  data: LinkedDevicesData[];
  message: string;
  status: number;
}

export interface SetLogOutResponseType {
  code: number;
  data: string;
  message: string;
  status: number;
}
