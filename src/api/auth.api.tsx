import {
  ConfirmEmailOTPRegisterResponseType,
  ConfirmSmsOTPLoginResponseType,
  LoginPhonePropsType,
  LoginPropsType,
  LoginResponseType,
  RegisterPropsType,
  RegisterResponseType,
  ResendOTPResponseType,
  UsernameAvailabilityResponseType,
} from '../interface/auth.interface';
import {RegistrationType} from '../interface/profile.interface';
import SsuAPI from './baseMusician';

export const registerUser = async (
  registerProps: RegisterPropsType,
): Promise<RegisterResponseType> => {
  const {data} = await SsuAPI().request<RegisterResponseType>({
    url: '/register',
    method: 'POST',
    data: registerProps,
  });

  return data;
};

export const loginUser = async (
  loginProps: LoginPropsType | LoginPhonePropsType,
): Promise<LoginResponseType> => {
  const {data} = await SsuAPI().request<LoginResponseType>({
    url: '/login',
    method: 'POST',
    data: loginProps,
  });

  return data;
};

export const loginSso = async (
  user: string,
  registrationType: RegistrationType,
): Promise<LoginResponseType> => {
  const {data} = await SsuAPI().request<LoginResponseType>({
    url: '/login-sso',
    method: 'POST',
    data: {
      user: user,
      registrationType: registrationType,
    },
  });
  return data;
};

export const loginPhoneNumber = async (
  loginProps: LoginPropsType | LoginPhonePropsType,
): Promise<LoginResponseType> => {
  const {data} = await SsuAPI().request<LoginResponseType>({
    url: '/login-phone-number',
    method: 'POST',
    data: loginProps,
  });

  return data;
};

export const checkUsername = async (
  username: string,
): Promise<UsernameAvailabilityResponseType> => {
  const {data} = await SsuAPI().request<UsernameAvailabilityResponseType>({
    url: '/username-availability',
    method: 'POST',
    data: {
      username: username,
    },
  });

  return data;
};

export const confirmEmailOtpRegister = async (
  email: string,
  code: string,
): Promise<ConfirmEmailOTPRegisterResponseType> => {
  const {data} = await SsuAPI().request<ConfirmEmailOTPRegisterResponseType>({
    url: '/confirm-otp/email/register',
    method: 'POST',
    data: {
      email: email,
      code: code,
      context: 'register',
    },
  });

  return data;
};

export const confirmSmsOtpLogin = async (
  phoneNumber: string,
  code: string,
  context: string,
): Promise<ConfirmSmsOTPLoginResponseType> => {
  const {data} = await SsuAPI().request<ConfirmSmsOTPLoginResponseType>({
    url: '/confirm-otp/sms',
    method: 'POST',
    data: {
      phoneNumber: phoneNumber,
      code: code,
      context: context,
    },
  });

  return data;
};

export const resendOtpEmail = async (
  email: string,
): Promise<ResendOTPResponseType> => {
  const {data} = await SsuAPI().request<ResendOTPResponseType>({
    url: '/resend-otp/email',
    method: 'POST',
    data: {
      email: email,
    },
  });
  return data;
};

export const resendOtpSms = async (
  phoneNumber: string,
): Promise<ResendOTPResponseType> => {
  const {data} = await SsuAPI().request<ResendOTPResponseType>({
    url: '/resend-otp/sms',
    method: 'POST',
    data: {
      phoneNumber: phoneNumber,
    },
  });

  return data;
};

export const forgotPasswordEmail = async (
  email: string,
): Promise<ResendOTPResponseType> => {
  const {data} = await SsuAPI().request<ResendOTPResponseType>({
    url: '/forgot-password',
    method: 'POST',
    data: {
      identifier: email,
    },
  });

  return data;
};

export const confirmEmailOtpForgotPassword = async (
  email: string,
  code: string,
): Promise<ConfirmEmailOTPRegisterResponseType> => {
  const {data} = await SsuAPI().request<ConfirmEmailOTPRegisterResponseType>({
    url: '/confirm-otp/email/register',
    method: 'POST',
    data: {
      email: email,
      code: code,
      context: 'forgotPassword',
    },
  });

  return data;
};

export const changePassword = async (
  email: string,
  code: string,
  password: string,
): Promise<LoginResponseType> => {
  const {data} = await SsuAPI().request<LoginResponseType>({
    url: '/confirm-change-password',
    method: 'POST',
    data: {
      identifier: email,
      code: code,
      newPassword: password,
    },
  });

  return data;
};
