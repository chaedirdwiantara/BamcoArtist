import SsuAPI from './baseMusician';
import SsuAPIPublic from './basePublic';
import SsuAPIGeneral from './baseRinjaniNew';
import {
  EmailPhoneProps,
  EmailPhoneVerifProps,
  EmailPhoneResponseType,
  ShippingResponseType,
  DataShippingProps,
  ExclusiveResponseType,
  DataExclusiveProps,
  ChangePasswordProps,
  ChangePasswordResponseType,
  VerifPasswordSetting,
  SendReportProps,
  SendReportResponseType,
  PreferenceProps,
  PreferenceResponseType,
  LanguageResponseType,
  ListReasonResponseType,
} from '../interface/setting.interface';
import {ParamsProps} from '../interface/base.interface';

export const updateEmail = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/account/change-email',
    method: 'POST',
    data: props,
  });

  return data;
};

export const updatePhoneNumber = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/account/change-phone',
    method: 'POST',
    data: props,
  });

  return data;
};

export const getVerifCode = async (
  props?: EmailPhoneVerifProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/account/getcode',
    method: 'POST',
    data: props,
  });

  return data;
};

export const setVerifCode = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/account/verif',
    method: 'POST',
    data: props,
  });

  return data;
};

export const verifPasswordSetting = async (
  props?: VerifPasswordSetting,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/account/verif-password',
    method: 'POST',
    data: props,
  });

  return data;
};

export const addPhoneNumber = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/account/add-phone',
    method: 'POST',
    data: props,
  });

  return data;
};

export const updatePassword = async (
  props?: ChangePasswordProps,
): Promise<ChangePasswordResponseType> => {
  const {data} = await SsuAPI().request<ChangePasswordResponseType>({
    url: '/profile/change-password',
    method: 'POST',
    data: props,
  });

  return data;
};

export const addEmail = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/account/add-email',
    method: 'POST',
    data: props,
  });

  return data;
};

export const getShipping = async (): Promise<ShippingResponseType> => {
  const {data} = await SsuAPI().request<ShippingResponseType>({
    url: '/shipping',
    method: 'GET',
  });

  return data;
};

export const updateShipping = async (
  props?: DataShippingProps,
): Promise<ShippingResponseType> => {
  const {data} = await SsuAPI().request<ShippingResponseType>({
    url: '/shipping/update',
    method: 'POST',
    data: props,
  });

  return data;
};

export const exclusiveContent = async (
  props?: ParamsProps,
): Promise<ExclusiveResponseType> => {
  const {data} = await SsuAPI().request<ExclusiveResponseType>({
    url: `/profile/${props?.uuid}/exclusive-content`,
    method: 'GET',
  });

  return data;
};

export const createExclusiveContent = async (
  props?: DataExclusiveProps,
): Promise<ExclusiveResponseType> => {
  const {data} = await SsuAPI().request<ExclusiveResponseType>({
    url: '/subscriptions/create',
    method: 'POST',
    data: props,
  });

  return data;
};

export const updateExclusiveContent = async (
  params?: ParamsProps,
  props?: DataExclusiveProps,
): Promise<ExclusiveResponseType> => {
  const {data} = await SsuAPI().request<ExclusiveResponseType>({
    url: `/subscriptions/${params?.id}`,
    method: 'PATCH',
    data: props,
  });

  return data;
};

export const sendReport = async (
  props?: SendReportProps,
): Promise<SendReportResponseType> => {
  const {data} = await SsuAPIGeneral().request<SendReportResponseType>({
    url: '/feedback',
    method: 'POST',
    data: props,
  });

  return data;
};

export const getListMood = async (
  props?: PreferenceProps,
): Promise<PreferenceResponseType> => {
  const {data} = await SsuAPI().request<PreferenceResponseType>({
    url: '/moods',
    method: 'GET',
    params: props,
  });

  return data;
};

export const getListGenre = async (
  props?: PreferenceProps,
): Promise<PreferenceResponseType> => {
  const {data} = await SsuAPI().request<PreferenceResponseType>({
    url: '/favorite-genres',
    method: 'GET',
    params: props,
  });

  return data;
};

export const getListExpectations = async (
  props?: PreferenceProps,
): Promise<PreferenceResponseType> => {
  const {data} = await SsuAPI().request<PreferenceResponseType>({
    url: '/expectations',
    method: 'GET',
    params: props,
  });

  return data;
};

export const setLanguageSettings = async (
  lang: string,
): Promise<LanguageResponseType> => {
  const {data} = await SsuAPI().request<LanguageResponseType>({
    url: '/account/add-language',
    method: 'POST',
    data: {
      language: lang,
    },
  });

  return data;
};

export const listMoodPublic = async (
  props?: PreferenceProps,
): Promise<PreferenceResponseType> => {
  const {data} = await SsuAPIPublic().request<PreferenceResponseType>({
    url: '/moods',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listGenrePublic = async (
  props?: PreferenceProps,
): Promise<PreferenceResponseType> => {
  const {data} = await SsuAPIPublic().request<PreferenceResponseType>({
    url: '/favorite-genres',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listReason = async (): Promise<ListReasonResponseType> => {
  const {data} = await SsuAPIPublic().request<ListReasonResponseType>({
    url: '/reasons-delete',
    method: 'GET',
  });

  return data;
};
