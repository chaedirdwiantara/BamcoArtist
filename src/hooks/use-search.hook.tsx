import {
  albumSearch,
  fansSearch,
  musicianSearch,
  playlistSearch,
  songSearch,
} from '../api/search.api';
import {ListDataSearchSongs, SearchProps} from '../interface/search.interface';
import {searchEvent} from '../api/event.api';
import {useState} from 'react';

export const useSearchHook = () => {
  const [dataSearchSongs, setDataSearchSongs] = useState<ListDataSearchSongs[]>(
    [],
  );
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
    try {
      const response = await songSearch(props);
      setDataSearchSongs(response.data);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
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

  return {
    dataSearchSongs,
    getSearchFans,
    getSearchMusicians,
    getSearchAlbums,
    getSearchSongs,
    getSearchPlaylists,
    getSearchMerchs,
    getSearchEvents,
  };
};
