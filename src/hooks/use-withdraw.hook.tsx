import axios from 'axios';
import {useState} from 'react';
import {ParamsProps} from '../interface/base.interface';
import {
  userBank,
  addBankAccount,
  editBankAccount,
  verifyOtpBank,
  verifyOtpWithdraw,
  listWithdraw,
} from '../api/withdraw.api';
import {
  VerifyBankPropsType,
  BankAccountPropsType,
  VerifyWithdrawPropsType,
} from '../interface/withdraw.interface';

export const useWithdrawHook = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [errorCode, setErrorCode] = useState<number>(0);
  const [isOtpValid, setIsOtpValid] = useState<boolean | null>(null);
  const [dataBankUser, setDataBankUser] = useState<BankAccountPropsType>();

  const getUserBankAccount = async (props: ParamsProps) => {
    try {
      const response = await userBank(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const setAddBankAccount = async (props: BankAccountPropsType) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      await addBankAccount(props);
    } catch (error) {
      console.log(error);
      setIsError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setEditBankAccount = async (props: BankAccountPropsType) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      await editBankAccount(props);
    } catch (error) {
      console.log(error);
      setIsError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const confirmOtpBank = async (props: VerifyBankPropsType) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      await verifyOtpBank(props);
      setIsOtpValid(true);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsOtpValid(false);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const confirmOtpWithdraw = async (props: VerifyWithdrawPropsType) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      await verifyOtpWithdraw(props);
      setIsOtpValid(true);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsOtpValid(false);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getListWithdraw = async (props: ParamsProps) => {
    try {
      const response = await listWithdraw(props);
      return {
        data: response?.data,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    isError,
    errorMsg,
    errorCode,
    isOtpValid,
    dataBankUser,
    setDataBankUser,
    setAddBankAccount,
    setEditBankAccount,
    getUserBankAccount,
    confirmOtpBank,
    confirmOtpWithdraw,
    getListWithdraw,
  };
};
