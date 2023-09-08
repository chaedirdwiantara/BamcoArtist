import {
  AddBankAccountResponseType,
  BankAccountPropsType,
} from '../interface/withdraw.interface';
import SsuAPI from './baseKrakatau';

export const addBankAccount = async (
  props: BankAccountPropsType,
): Promise<AddBankAccountResponseType> => {
  const {data} = await SsuAPI().request<AddBankAccountResponseType>({
    url: '/withdraw/bank',
    method: 'POST',
    data: props,
  });

  return data;
};

export const editBankAccount = async (
  props: BankAccountPropsType,
): Promise<AddBankAccountResponseType> => {
  const {data} = await SsuAPI().request<AddBankAccountResponseType>({
    url: `/withdraw/bank/${props.id}`,
    method: 'POST',
    data: props,
  });

  return data;
};
