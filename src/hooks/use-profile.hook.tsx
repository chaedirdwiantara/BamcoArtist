import axios from 'axios';
import {useState} from 'react';
import {
  addPhotos,
  countLikedSong,
  getOtherUserProfile,
  getProfile,
  removePhotos,
  updateProfile,
  UpdateProfilePropsType,
} from '../api/profile.api';
import {applyReferral} from '../api/referral.api';
import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';
import {
  CollectPhotosProps,
  DataCountLiked,
  ProfileFansResponseType,
  ProfileResponseType,
} from '../interface/profile.interface';

export const useProfileHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isValidReferral, setIsValidReferral] = useState<boolean | null>(null);
  const [dataProfile, setDataProfile] = useState<ProfileResponseType>();
  const [dataUserCheck, setDataUserCheck] = useState<'Musician' | 'Fans' | ''>(
    '',
  );
  const [dataFansProfile, setDataFansProfile] =
    useState<ProfileFansResponseType>();
  const [dataCountLiked, setCountLiked] = useState<DataCountLiked>();

  const getProfileUser = async () => {
    setIsLoading(true);
    try {
      const response = await getProfile();
      console.log(response);
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
    try {
      await updateProfile(props);
    } catch (error) {
      console.log(error);
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

  const removeCollectPhotos = async (props?: CollectPhotosProps) => {
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

  return {
    isLoading,
    errorMsg,
    isValidReferral,
    dataProfile,
    dataFansProfile,
    dataUserCheck,
    dataCountLiked,
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
  };
};
