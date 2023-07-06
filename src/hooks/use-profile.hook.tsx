import axios from 'axios';
import {useState} from 'react';
import {
  addPhotos,
  countLikedSong,
  deleteProfile,
  getLastStep,
  getOtherUserProfile,
  getProfile,
  getProfileCompletion,
  getTotalCount,
  removePhotos,
  setLastStep,
  updateProfile,
  UpdateProfilePropsType,
} from '../api/profile.api';
import {applyReferral} from '../api/referral.api';
import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';
import {
  CollectPhotoRemoveProps,
  CollectPhotosProps,
  DataCountLiked,
  DataTotalCountPropsType,
  GetStepResponseType,
  LastStepResponseType,
  ProfileFansResponseType,
  ProfileProgressResponseType,
  ProfileResponseType,
} from '../interface/profile.interface';

export const useProfileHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isValidReferral, setIsValidReferral] = useState<boolean | null>(null);
  const [dataProfile, setDataProfile] = useState<ProfileResponseType>();
  const [dataUserCheck, setDataUserCheck] = useState<'Musician' | 'Fans' | ''>(
    '',
  );
  const [dataFansProfile, setDataFansProfile] =
    useState<ProfileFansResponseType>();
  const [dataCountLiked, setCountLiked] = useState<DataCountLiked>();
  const [dataCountProfile, setDataCountProfile] =
    useState<DataTotalCountPropsType>();
  const [infoStep, setInfoStep] = useState<GetStepResponseType>();
  const [profileProgress, setProfileProgress] =
    useState<ProfileProgressResponseType>();

  const getProfileUser = async () => {
    setIsLoading(true);
    try {
      const response = await getProfile();
      setDataProfile(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOtherProfileUser = async (props?: PostPropsTypeA) => {
    setIsLoading(true);
    try {
      const response = await getOtherUserProfile(props);
      setDataFansProfile(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCheckUser = async (props?: PostPropsTypeA) => {
    setIsLoading(true);
    try {
      const response = await getOtherUserProfile(props);
      response.data === null
        ? setDataUserCheck('Musician')
        : setDataUserCheck('Fans');
    } catch (error) {
      setDataUserCheck('');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfileUser = async (
    props?: UpdateProfilePropsType,
    trigger?: boolean,
  ) => {
    setIsLoading(true);
    try {
      await updateProfile(props);
      if (trigger) {
        const response = await getProfile();
        setDataProfile(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfilePreference = async (props?: UpdateProfilePropsType) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      const resp = await updateProfile(props);
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

  const applyReferralUser = async (refCode: string) => {
    try {
      setIsLoading(true);
      const response = await applyReferral(refCode);
      if (response.code === 200) {
        setIsValidReferral(true);
      } else {
        setIsValidReferral(false);
        setErrorMsg(response.message);
      }
    } catch (error) {
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

  const addCollectPhotos = async (props?: CollectPhotosProps) => {
    try {
      await addPhotos(props);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeCollectPhotos = async (props?: CollectPhotoRemoveProps) => {
    try {
      await removePhotos(props);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserCountLikedSong = async (props?: ParamsProps) => {
    setIsLoading(true);
    try {
      const response = await countLikedSong(props);
      setCountLiked(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteValueProfile = async (props?: ParamsProps) => {
    setIsLoading(true);
    try {
      await deleteProfile(props);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalCountProfile = async (props: ParamsProps) => {
    try {
      const response = await getTotalCount(props);
      setDataCountProfile(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProfileProgress = async () => {
    setIsLoading(true);
    try {
      const response = await getProfileCompletion();
      setProfileProgress(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLastStepWizard = async () => {
    setIsLoading(true);
    try {
      const response = await getLastStep();
      setInfoStep(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLastStepWizard = async (props: LastStepResponseType) => {
    try {
      await setLastStep(props);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    errorMsg,
    successMsg,
    isValidReferral,
    dataProfile,
    dataFansProfile,
    dataUserCheck,
    dataCountLiked,
    dataCountProfile,
    infoStep,
    profileProgress,
    setIsError,
    setDataUserCheck,
    getProfileUser,
    updateProfileUser,
    applyReferralUser,
    updateProfilePreference,
    getOtherProfileUser,
    addCollectPhotos,
    removeCollectPhotos,
    getCheckUser,
    getUserCountLikedSong,
    deleteValueProfile,
    getTotalCountProfile,
    setLastStepWizard,
    getLastStepWizard,
    getProfileProgress,
  };
};
