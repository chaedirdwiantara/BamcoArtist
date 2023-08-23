import SsuAPI from './baseRinjani';
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
  ListRoleResponseType,
  ListViolationsResponseType,
  RequestAppealResponseType,
  SendAppealPropsType,
  UpdateShippingResponseType,
} from '../interface/setting.interface';
import {ParamsProps} from '../interface/base.interface';

export const updateEmail = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/musician-app/account/change-email',
    method: 'POST',
    data: props,
  });

  return data;
};

export const updatePhoneNumber = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/musician-app/account/change-phone',
    method: 'POST',
    data: props,
  });

  return data;
};

export const getVerifCode = async (
  props?: EmailPhoneVerifProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/musician-app/account/getcode',
    method: 'POST',
    data: props,
  });

  return data;
};

export const setVerifCode = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/musician-app/account/verif',
    method: 'POST',
    data: props,
  });

  return data;
};

export const verifPasswordSetting = async (
  props?: VerifPasswordSetting,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/musician-app/account/verif-password',
    method: 'POST',
    data: props,
  });

  return data;
};

export const addPhoneNumber = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/musician-app/account/add-phone',
    method: 'POST',
    data: props,
  });

  return data;
};

export const updatePassword = async (
  props?: ChangePasswordProps,
): Promise<ChangePasswordResponseType> => {
  const {data} = await SsuAPI().request<ChangePasswordResponseType>({
    url: '/musician-app/profile/change-password',
    method: 'POST',
    data: props,
  });

  return data;
};

export const addEmail = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/musician-app/account/add-email',
    method: 'POST',
    data: props,
  });

  return data;
};

export const getShipping = async (): Promise<ShippingResponseType> => {
  const {data} = await SsuAPI().request<ShippingResponseType>({
    url: '/musician-app/shipping',
    method: 'GET',
  });

  return data;
};

export const createShipping = async (
  props: DataShippingProps,
): Promise<UpdateShippingResponseType> => {
  const {data} = await SsuAPI().request<UpdateShippingResponseType>({
    url: '/musician-app/shipping/create',
    method: 'POST',
    data: props,
  });

  return data;
};

export const updateShipping = async (
  props?: DataShippingProps,
): Promise<UpdateShippingResponseType> => {
  const {data} = await SsuAPI().request<UpdateShippingResponseType>({
    url: `/musician-app/shipping/update/${props?.bookyayShipmentID}`,
    method: 'PUT',
    data: props,
  });

  return data;
};

export const deleteShipping = async (
  props: DataShippingProps,
): Promise<UpdateShippingResponseType> => {
  const {data} = await SsuAPI().request<UpdateShippingResponseType>({
    url: `/musician-app/shipping/delete/${props?.bookyayShipmentID}`,
    method: 'DELETE',
  });

  return data;
};

export const exclusiveContent = async (
  props?: ParamsProps,
): Promise<ExclusiveResponseType> => {
  const {data} = await SsuAPI().request<ExclusiveResponseType>({
    url: `/musician-app/profile/${props?.uuid}/exclusive-content`,
    method: 'GET',
  });

  return data;
};

export const createExclusiveContent = async (
  props?: DataExclusiveProps,
): Promise<ExclusiveResponseType> => {
  const {data} = await SsuAPI().request<ExclusiveResponseType>({
    url: '/musician-app/subscriptions/create',
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
    url: `/musician-app/subscriptions/${params?.id}`,
    method: 'PATCH',
    data: props,
  });

  return data;
};

export const sendReport = async (
  props?: SendReportProps,
): Promise<SendReportResponseType> => {
  const {data} = await SsuAPI().request<SendReportResponseType>({
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
    url: '/musician-app/moods',
    method: 'GET',
    params: props,
  });

  return data;
};

export const getListGenre = async (
  props?: PreferenceProps,
): Promise<PreferenceResponseType> => {
  const {data} = await SsuAPI().request<PreferenceResponseType>({
    url: '/musician-app/favorite-genres',
    method: 'GET',
    params: props,
  });

  return data;
};

export const getListExpectations = async (
  props?: PreferenceProps,
): Promise<PreferenceResponseType> => {
  const {data} = await SsuAPI().request<PreferenceResponseType>({
    url: '/musician-app/expectations',
    method: 'GET',
    params: props,
  });

  return data;
};

export const setLanguageSettings = async (
  lang: string,
): Promise<LanguageResponseType> => {
  const {data} = await SsuAPI().request<LanguageResponseType>({
    url: '/musician-app/account/add-language',
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
  const {data} = await SsuAPI().request<PreferenceResponseType>({
    url: '/public/moods',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listGenrePublic = async (
  props?: PreferenceProps,
): Promise<PreferenceResponseType> => {
  const {data} = await SsuAPI().request<PreferenceResponseType>({
    url: '/public/favorite-genres',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listReason = async (): Promise<ListReasonResponseType> => {
  const {data} = await SsuAPI().request<ListReasonResponseType>({
    url: '/public/reasons-delete',
    method: 'GET',
  });

  return data;
};

export const getListRole = async (
  props?: PreferenceProps,
): Promise<ListRoleResponseType> => {
  const {data} = await SsuAPI().request<ListRoleResponseType>({
    url: '/musician-app/roles-in-industry',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listViolations = async (): Promise<ListViolationsResponseType> => {
  const {data} = await SsuAPI().request<ListViolationsResponseType>({
    url: '/violations',
    method: 'GET',
  });

  return data;
};

export const requestAppeal = async (
  props: SendAppealPropsType,
): Promise<RequestAppealResponseType> => {
  const {data} = await SsuAPI().request<RequestAppealResponseType>({
    url: '/violations/request-appeal',
    method: 'POST',
    data: props,
  });

  return data;
};
