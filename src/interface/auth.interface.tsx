import {RegistrationType} from './profile.interface';

export interface RegisterPropsType {
  fullname: string;
  email?: string;
  password?: string;
  registrationType: RegistrationType;
  image?: string;
  phoneNumber?: string;
  externalUserID?: string;
}

export interface AuthType {
  id: number;
  uuid: string;
  username: string;
  email: string;
  fullname: string;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  bookyayToken: string;
  bookyayOrganizerToken: string;
}
export interface RegisterResponseType {
  code: number;
  data: AuthType;
  message: string;
  status: number;
}

export interface LoginPropsType {
  username: string;
  password: string;
}

export interface LoginPhonePropsType {
  phoneNumber: string;
}

export interface LoginResponseType {
  code: number;
  data: {
    id: number;
    uuid: string;
    username: string;
    email: string;
    fullname: string;
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
    lastLoginAt: string | null;
    deletedAt: string | null;
    bookyayToken: string;
    bookyayOrganizerToken: string;
  };
  message: string;
  status: number;
}

export interface UsernameAvailabilityResponseType {
  code: number;
  data: boolean;
  message: string;
  status: number;
}

export interface ConfirmEmailOTPRegisterResponseType {
  code: number;
  data: {
    id: number;
    uuid: string;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
    lastLoginAt: string | null;
    bookyayToken: string;
    bookyayOrganizerToken: string;
  };
  message: string;
  status: number;
}

export interface ConfirmSmsOTPLoginResponseType {
  code: number;
  data: {
    deletedAt: null;
    lastLoginAt: null;
    uuid: string;
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
  };
  message: string;
  status: number;
}

export interface ResendOTPResponseType {
  code: number;
  data: string;
  message: string;
  status: number;
}

export interface DeleteAccountPropsType {
  deleteReasonId: number;
  deleteReasonText: string;
  password: string;
}

export interface DeleteAccountResponseType {
  code: number;
  data: string;
  message: string;
  status: number;
}

export interface RestoreAccountResponseType {
  code: number;
  data: string;
  message: string;
  status: number;
}

export interface RefreshTokenResponseType {
  code: number;
  data: {
    uuid: string;
    images: string;
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
    lastLoginAt: string | null;
    deletedAt: string | null;
    fcmToken: string | null;
    bookyayToken: string;
    bookyayOrganizerToken: string;
  };
  message: string;
  status: number;
}

export interface DecodeTokenType {
  UUID: string;
  admin: boolean;
  exp: number;
  extra: string;
  platform: string;
}

export interface TokenBookyayDecodeType {
  id: string;
  oid: string;
  sid: string;
  cc: string;
  isTest: boolean;
  iat: number;
  exp: number;
  iss: string;
}
