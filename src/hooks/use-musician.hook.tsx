import {useState} from 'react';
import {
  detailMusician,
  followMusician,
  getAlbumById,
  listMusician,
  unfollowMusician,
} from '../api/musician.api';
import {
  AlbumData,
  DataDetailMusician,
  FollowMusicianPropsType,
  MusicianList,
  paramsTypeUuid,
} from '../interface/musician.interface';
import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';

export const useMusicianHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataMusician, setDataMusician] = useState<MusicianList[]>([]);
  const [dataAlbum, setDataAlbum] = useState<AlbumData[]>([]);
  const [dataDetailMusician, setDataDetailMusician] =
    useState<DataDetailMusician>();
  const [dataFollow, setDataFollow] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const getListDataMusician = async (props?: ParamsProps) => {
    try {
      const response = await listMusician(props);
      setDataMusician(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setDataMusician([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getDetailMusician = async (props?: PostPropsTypeA) => {
    setIsLoading(true);
    try {
      const response = await detailMusician(props);
      setDataDetailMusician(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setDataDetailMusician(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const getAlbum = async (props?: paramsTypeUuid) => {
    setIsLoading(true);
    try {
      const response = await getAlbumById(props);
      setDataAlbum(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setDataAlbum([]);
    } finally {
      setIsLoading(false);
    }
  };

  const setFollowMusician = async (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
    notTriggeredGetList?: boolean | undefined,
  ) => {
    setIsLoading(true);
    try {
      const response = await followMusician(props);
      setDataFollow(response.data);
      !notTriggeredGetList && getListDataMusician(params);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setDataFollow(null);
      setDataMusician([]);
    } finally {
      setIsLoading(false);
    }
  };

  const setUnfollowMusician = async (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
    notTriggeredGetList?: boolean | undefined,
  ) => {
    setIsLoading(true);
    try {
      const response = await unfollowMusician(props);
      setDataFollow(response.data);
      !notTriggeredGetList && getListDataMusician(params);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setDataFollow(null);
      setDataMusician([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    dataMusician,
    dataFollow,
    dataDetailMusician,
    dataAlbum,
    getListDataMusician,
    setFollowMusician,
    setUnfollowMusician,
    getDetailMusician,
    getAlbum,
  };
};
