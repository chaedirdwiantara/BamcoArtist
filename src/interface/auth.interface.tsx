import {RegistrationType} from './profile.interface';

export interface RegisterPropsType {
  fullname: string;
  email?: string;
  password: string;
  registrationType: RegistrationType;
  image?: string;
  phoneNumber?: string;
  externalUserID?: string;
}

export interface RegisterResponseType {
  code: number;
  data: {
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
  };
  message: string;
  status: number;
}

export interface LoginPropsType {
  user: string;
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
  };
  message: string;
  status: number;
}

export interface ConfirmSmsOTPLoginResponseType {
  code: number;
  data: {
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
