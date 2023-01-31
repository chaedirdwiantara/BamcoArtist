import axios from 'axios';
import {useState} from 'react';
import {
  addPhoneNumber,
  exclusiveContent,
  getShipping,
  getVerifCode,
  setVerifCode,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  verifPasswordPhone,
} from '../api/setting.api';
import {
  ChangePasswordProps,
  DataExclusiveResponse,
  DataShippingProps,
  EmailPhoneProps,
  EmailPhoneVerifProps,
  VerifPasswordPhone,
} from '../interface/setting.interface';
import {ParamsProps} from '../interface/base.interface';

export const useSettingHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [fetchData, setFetchData] = useState(true);
  const [dataShippingInfo, setDataShippingInfo] =
    useState<DataShippingProps | null>(null);
  const [dataExclusiveContent, setDataExclusiveContent] =
    useState<DataExclusiveResponse | null>(null);

  const changeEmail = async (props?: EmailPhoneProps) => {
    setIsLoading(true);
    setIsError(false);
    try {
      await updateEmail(props);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getVerificationCode = async (props?: EmailPhoneVerifProps) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      const resp = await getVerifCode(props);
      if (resp.code !== 200) {
        setIsError(true);
        setErrorMsg(resp.message as string);
      }
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

  const setVerificationCode = async (props?: EmailPhoneProps) => {
    setIsLoading(true);
    setIsError(false);
    try {
      await setVerifCode(props);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const verificationPasswordPhone = async (props?: VerifPasswordPhone) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      const resp = await verifPasswordPhone(props);
      if (resp.code !== 200) {
        setIsError(true);
        setErrorMsg(resp.message as string);
      }
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

  const addNewPhoneNumber = async (props?: EmailPhoneProps) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const resp = await addPhoneNumber(props);
      console.log({resp});
      if (resp.code !== 200) {
        setIsError(true);
        setErrorMsg(resp.message as string);
      } else {
        setSuccessMsg(resp.message as string);
      }
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

  const changePhoneNumber = async (props?: EmailPhoneProps) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const resp = await updatePhoneNumber(props);
      console.log({resp});
      if (resp.code !== 200) {
        setIsError(true);
        setErrorMsg(resp.message as string);
      } else {
        setSuccessMsg(resp.data as string);
      }
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

  const changePassword = async (props?: ChangePasswordProps) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const resp = await updatePassword(props);
      console.log({resp});
      if (resp.code !== 200) {
        setIsError(true);
        setErrorMsg(resp.message as string);
      } else {
        setSuccessMsg(resp.data as string);
      }
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

  const getShippingInfo = async () => {
    setIsLoading(true);
    try {
      const response = await getShipping();
      setDataShippingInfo(response.data);
      setFetchData(false);
    } catch (error) {
      setIsError(true);
      setDataShippingInfo(null);
      setFetchData(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getExclusiveContent = async (props?: ParamsProps) => {
    setIsLoading(true);
    try {
      const response = await exclusiveContent(props);
      setDataExclusiveContent(response.data);
      setFetchData(false);
    } catch (error) {
      setIsError(true);
      setDataExclusiveContent(null);
      setFetchData(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    errorMsg,
    successMsg,
    dataShippingInfo,
    fetchData,
    dataExclusiveContent,
    changeEmail,
    changePhoneNumber,
    getVerificationCode,
    setVerificationCode,
    verificationPasswordPhone,
    setIsError,
    changePassword,
    addNewPhoneNumber,
    getShippingInfo,
    getExclusiveContent,
  };
};
