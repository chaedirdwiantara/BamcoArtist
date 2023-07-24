import {useState} from 'react';
import {
  songSearch,
  fansSearch,
  albumSearch,
  musicianSearch,
  playlistSearch,
  listFollowers,
  listFanss,
} from '../api/search.api';
import {
  SearchProps,
  ListDataSearchFans,
  ListDataSearchSongs,
  FollowersProps,
  ListDataFans,
} from '../interface/search.interface';
import {searchEvent} from '../api/event.api';

export const useSearchHook = () => {
  const [dataSearchSongs, setDataSearchSongs] = useState<ListDataSearchSongs[]>(
    [],
  );
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [dataFollowers, setDataFollowers] = useState<ListDataSearchFans[]>([]);

  const getSearchFans = async (props?: SearchProps) => {
    try {
      const response = await fansSearch(props);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchMusicians = async (props?: SearchProps) => {
    setSearchLoading(true);
    try {
      const response = await musicianSearch(props);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchSongs = async (props?: SearchProps) => {
    setSearchLoading(true);
    try {
      const response = await songSearch(props);
      setDataSearchSongs(response.data);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  };

  const getSearchAlbums = async (props?: SearchProps) => {
    try {
      const response = await albumSearch(props);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchPlaylists = async (props?: SearchProps) => {
    try {
      const response = await playlistSearch(props);
      return {
        data: response?.data,
        meta: response?.meta,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchMerchs = async (props?: SearchProps) => {
    try {
      const response = await searchEvent({
        type: 'merch',
        query: props?.keyword,
      });
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchEvents = async (props?: SearchProps) => {
    try {
      const response = await searchEvent({
        type: 'event',
        query: props?.keyword,
      });
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListFollowers = async (props: FollowersProps) => {
    setSearchLoading(true);
    try {
      const response = await listFollowers(props);
      setDataFollowers(response.data);
      return {
        data: response.data,
        meta: response.meta,
      };
    } catch (error) {
      setDataFollowers([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const getListMusiciansFans = async (props: FollowersProps) => {
    try {
      const response = await listFanss(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    searchLoading,
    dataFollowers,
    dataSearchSongs,
    getSearchFans,
    getSearchSongs,
    getSearchAlbums,
    getSearchMerchs,
    getSearchEvents,
    getListFollowers,
    getSearchMusicians,
    getSearchPlaylists,
    getListMusiciansFans,
  };
};
