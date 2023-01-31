import {useState} from 'react';
import {searchEvent} from '../api/event.api';
import {
  albumSearch,
  fansSearch,
  musicianSearch,
  playlistSearch,
  songSearch,
} from '../api/search.api';
import {
  ListDataSearchAlbums,
  ListDataSearchFans,
  ListDataSearchMusician,
  ListDataSearchPlaylist,
  ListDataSearchSongs,
  SearchProps,
} from '../interface/search.interface';

export const useSearchHook = () => {
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>('');
  const [dataSearchFans, setDataSearchFans] = useState<
    ListDataSearchFans[] | null
  >(null);
  const [dataSearchMusicians, setDataSearchMusicians] = useState<
    ListDataSearchMusician[] | null
  >(null);
  const [dataSearchSongs, setDataSearchSongs] = useState<
    ListDataSearchSongs[] | null
  >(null);
  const [dataSearchAlbums, setDataSearchAlbums] = useState<
    ListDataSearchAlbums[] | null
  >(null);
  const [dataSearchPlaylists, setDataSearchPlaylists] = useState<
    ListDataSearchPlaylist[] | null
  >(null);

  const getSearchFans = async (props?: SearchProps) => {
    setSearchLoading(true);
    try {
      const response = await fansSearch(props);
      setDataSearchFans(response.data);
    } catch (error) {
      console.log(error);
      setDataSearchFans(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const getSearchMusicians = async (props?: SearchProps) => {
    setSearchLoading(true);
    try {
      const response = await musicianSearch(props);
      setDataSearchMusicians(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  };

  const getSearchSongs = async (props?: SearchProps) => {
    setSearchLoading(true);
    try {
      const response = await songSearch(props);
      setDataSearchSongs(response.data);
    } catch (error) {
      console.log(error);
      setDataSearchSongs(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const getSearchAlbums = async (props?: SearchProps) => {
    setSearchLoading(true);
    try {
      const response = await albumSearch(props);
      setDataSearchAlbums(response.data);
    } catch (error) {
      console.log(error);
      setDataSearchAlbums(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const getSearchPlaylists = async (props?: SearchProps) => {
    setSearchLoading(true);
    try {
      const response = await playlistSearch(props);
      setDataSearchPlaylists(response.data);
    } catch (error) {
      console.log(error);
      setDataSearchPlaylists(null);
    } finally {
      setSearchLoading(false);
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
    searchLoading,
    dataSearchFans,
    dataSearchMusicians,
    dataSearchSongs,
    dataSearchAlbums,
    dataSearchPlaylists,
    getSearchFans,
    getSearchMusicians,
    getSearchAlbums,
    getSearchSongs,
    getSearchPlaylists,
    getSearchEvents,
    getSearchMerchs,
  };
};
