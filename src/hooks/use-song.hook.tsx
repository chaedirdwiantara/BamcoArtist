import {useState} from 'react';
import {detailSong, listSong} from '../api/song.api';
import {PostPropsTypeA} from '../interface/feed.interface';
import {DataDetailSong, SongList} from '../interface/song.interface';

export const useSongHook = () => {
  const [isLoadingSong, setIsLoadingSong] = useState(false);
  const [isErrorSong, setIsErrorSong] = useState(false);
  const [dataSong, setDataSong] = useState<SongList[]>([]);
  const [dataDetailSong, setDataDetailSong] = useState<DataDetailSong | null>(
    null,
  );

  const getListDataSong = async () => {
    try {
      const response = await listSong();
      setDataSong(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorSong(true);
      setDataSong([]);
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

  return {
    isLoadingSong,
    isErrorSong,
    dataSong,
    dataDetailSong,
    getListDataSong,
    getDetailSong,
  };
};
