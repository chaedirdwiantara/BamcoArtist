import axios from 'axios';
import {useState} from 'react';
import {
  addEmail,
  addPhoneNumber,
  exclusiveContent,
  getListExpectations,
  getListGenre,
  getListMood,
  getShipping,
  getVerifCode,
  setVerifCode,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  verifPasswordSetting,
} from '../api/setting.api';
import {
  ChangePasswordProps,
  DataExclusiveResponse,
  DataShippingProps,
  EmailPhoneProps,
  EmailPhoneVerifProps,
  ListAllPreference,
  PreferenceList,
  VerifPasswordSetting,
} from '../interface/setting.interface';
import {storage} from './use-storage.hook';
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
  const [listMood, setListMood] = useState<PreferenceList[]>([]);
  const [listGenre, setListGenre] = useState<PreferenceList[]>([]);
  const [listExpectation, setListExpectation] = useState<PreferenceList[]>([]);
  const [listPreference, setListPreference] = useState<ListAllPreference>({
    mood: [],
    genre: [],
    expectation: [],
  });

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

  const verificationPasswordSetting = async (props?: VerifPasswordSetting) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      const resp = await verifPasswordSetting(props);
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

  const addNewEmail = async (props?: EmailPhoneProps) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const resp = await addEmail(props);
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

  const changeEmail = async (props?: EmailPhoneProps) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const resp = await updateEmail(props);
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
      if (resp.code !== 200) {
        setIsError(true);
        setErrorMsg(resp.message as string);
      } else {
        storage.set('profile', JSON.stringify(resp.data));
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

  const getListPreference = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const genre = await getListGenre();
      const mood = await getListMood();
      const expectation = await getListExpectations();

      setListMood(mood.data);
      setListGenre(genre.data);
      setListExpectation(expectation.data);

      setListPreference({
        mood: mood.data,
        genre: genre.data,
        expectation: expectation.data,
      });
    } catch (error) {
      console.log({error});
      setListMood([]);
      setListGenre([]);
      setListExpectation([]);
      setListPreference({
        mood: [],
        genre: [],
        expectation: [],
      });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getListMoodGenre = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const genre = await getListGenre();
      const mood = await getListMood();

      setListMood(mood.data);
      setListGenre(genre.data);

      setListPreference({
        mood: mood.data,
        genre: genre.data,
        expectation: [],
      });
    } catch (error) {
      console.log({error});
      setListMood([]);
      setListGenre([]);
      setListExpectation([]);
      setListPreference({
        mood: [],
        genre: [],
        expectation: [],
      });
      setIsError(true);
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
    listGenre,
    listMood,
    listExpectation,
    listPreference,
    changeEmail,
    changePhoneNumber,
    getVerificationCode,
    setVerificationCode,
    verificationPasswordSetting,
    setIsError,
    changePassword,
    addNewPhoneNumber,
    getShippingInfo,
    getExclusiveContent,
    addNewEmail,
    getListPreference,
    getListMoodGenre,
  };
};
