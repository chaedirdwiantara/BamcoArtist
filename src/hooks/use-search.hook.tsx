import {
  albumSearch,
  fansSearch,
  musicianSearch,
  playlistSearch,
  songSearch,
} from '../api/search.api';
import {SearchProps} from '../interface/search.interface';
import {searchEvent} from '../api/event.api';

export const useSearchHook = () => {
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
      console.log(response.data);
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
    getSearchFans,
    getSearchMusicians,
    getSearchAlbums,
    getSearchSongs,
    getSearchPlaylists,
    getSearchMerchs,
    getSearchEvents,
  };
};
