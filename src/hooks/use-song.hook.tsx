import {useState} from 'react';
import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';
import {detailAlbum, detailSong, listSong, listTopSong} from '../api/song.api';
import {
  DataDetailAlbum,
  DataDetailSong,
  SongList,
} from '../interface/song.interface';

export const useSongHook = () => {
  const [isLoadingSong, setIsLoadingSong] = useState(false);
  const [albumLoading, setAlbumLoading] = useState(false);
  const [isErrorSong, setIsErrorSong] = useState(false);
  const [dataSong, setDataSong] = useState<SongList[]>([]);
  const [dataTopSong, setDataTopSong] = useState<SongList[]>([]);
  const [dataDetailSong, setDataDetailSong] = useState<DataDetailSong | null>(
    null,
  );
  const [dataDetailAlbum, setDataDetailAlbum] =
    useState<DataDetailAlbum | null>(null);

  const getListDataSong = async (props?: ParamsProps) => {
    try {
      const response = await listSong(props);
      setDataSong(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorSong(true);
      setDataSong([]);
    } finally {
      setIsLoadingSong(false);
    }
  };

  const getListDataTopSong = async () => {
    try {
      const response = await listTopSong();
      setDataTopSong(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorSong(true);
      setDataTopSong([]);
    } finally {
      setIsLoadingSong(false);
    }
  };

  const getDetailSong = async (props?: PostPropsTypeA) => {
    setIsLoadingSong(true);
    try {
      const response = await detailSong(props);
      setDataDetailSong(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorSong(true);
      setDataDetailSong(null);
    } finally {
      setIsLoadingSong(false);
    }
  };

  const getDetailAlbum = async (props?: PostPropsTypeA) => {
    setAlbumLoading(true);
    try {
      const response = await detailAlbum(props);
      setDataDetailAlbum(response.data);
    } catch (error) {
      console.log(error);
      setDataDetailAlbum(null);
    } finally {
      setAlbumLoading(false);
    }
  };

  return {
    isLoadingSong,
    isErrorSong,
    dataSong,
    dataTopSong,
    dataDetailSong,
    albumLoading,
    dataDetailAlbum,
    getListDataSong,
    getListDataTopSong,
    getDetailSong,
    getDetailAlbum,
    setDataDetailAlbum,
  };
};
