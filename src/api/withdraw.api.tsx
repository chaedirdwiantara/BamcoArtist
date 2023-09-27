import {ParamsProps} from '../interface/base.interface';
import {
  RemoveBankAccountResponseType,
  BankAccountPropsType,
  GetUserBankResponseType,
  VerifyBankPropsType,
  WithdrawRequestPropsType,
  VerifyWithdrawPropsType,
  GetListWithdrawResponseType,
} from '../interface/withdraw.interface';
import SsuAPI from './baseKrakatau';

export const userBank = async (
  props: ParamsProps,
): Promise<GetUserBankResponseType> => {
  const {data} = await SsuAPI().request<GetUserBankResponseType>({
    url: `/withdraw/bank-account/${props.uuid}`,
    method: 'GET',
  });

  return data;
};

export const addBankAccount = async (
  props: BankAccountPropsType,
): Promise<GetUserBankResponseType> => {
  const {data} = await SsuAPI().request<GetUserBankResponseType>({
    url: '/withdraw/bank',
    method: 'POST',
    data: props,
  });

  return data;
};

export const editBankAccount = async (
  props: BankAccountPropsType,
): Promise<GetUserBankResponseType> => {
  const {data} = await SsuAPI().request<GetUserBankResponseType>({
    url: `/withdraw/bank/${props.id}`,
    method: 'PUT',
    data: props,
  });

  return data;
};

export const removeBankAccount = async (
  props: ParamsProps,
): Promise<RemoveBankAccountResponseType> => {
  const {data} = await SsuAPI().request<RemoveBankAccountResponseType>({
    url: `/withdraw/bank-remove/${props.id}`,
    method: 'PUT',
  });

  return data;
};

export const verifyOtpBank = async (
  props: VerifyBankPropsType,
): Promise<RemoveBankAccountResponseType> => {
  const {data} = await SsuAPI().request<RemoveBankAccountResponseType>({
    url: `/withdraw/bank-Verify/${props.id}`,
    method: 'PUT',
    data: props,
  });

  return data;
};

export const verifyOtpWithdraw = async (
  props: VerifyWithdrawPropsType,
): Promise<RemoveBankAccountResponseType> => {
  const {data} = await SsuAPI().request<RemoveBankAccountResponseType>({
    url: `/withdraw/verify-otp/${props.id}`,
    method: 'PUT',
    data: props,
  });

  return data;
};

export const withdrawRequest = async (
  props: WithdrawRequestPropsType,
): Promise<GetUserBankResponseType> => {
  const {data} = await SsuAPI().request<GetUserBankResponseType>({
    url: '/withdraw/request',
    method: 'POST',
    data: props,
  });

  return data;
};

export const listWithdraw = async (
  props: ParamsProps,
): Promise<GetListWithdrawResponseType> => {
  const {data} = await SsuAPI().request<GetListWithdrawResponseType>({
    url: `/admin-panel/withdraw/list/${props.uuid}`,
    method: 'GET',
  });

  return data;
};
