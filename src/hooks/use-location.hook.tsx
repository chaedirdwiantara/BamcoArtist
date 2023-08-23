import {useState} from 'react';
import {
  getAllCountry,
  getCity,
  getCityOfCountry,
  getState,
} from '../api/location.api';
import {
  formatValueName2,
  formatValueNameCity,
  formatValueNameCountry,
  formatValueNameState,
} from '../utils/formatValueName';
import {DataStateProps, ListCountryType} from '../interface/location.interface';
import {DataDropDownType} from '../data/dropdown';
import {ParamsProps} from '../interface/base.interface';

export const useLocationHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataAllCountry, setDataAllCountry] = useState<ListCountryType[]>([]);
  const [dataStateInCountry, setDataStateInCountry] =
    useState<DataDropDownType[]>();
  const [dataCitiesInState, setDataCitiesInState] =
    useState<DataDropDownType[]>();
  const [dataCitiesOfCountry, setDataCitiesOfCountry] = useState<
    DataDropDownType[]
  >([]);
  const [isError, setIsError] = useState(false);

  const getDataAllCountry = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCountry({
        perPage: 300,
        order: 'asc',
      });
      const newResp = formatValueName2(response.data);
      setDataAllCountry(newResp);
    } catch (error) {
      setIsError(true);
      setDataAllCountry([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getDataAllCountryShipping = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCountry({
        perPage: 300,
        order: 'asc',
      });
      const newResp = formatValueNameCountry(response.data);
      setDataAllCountry(newResp);
    } catch (error) {
      setIsError(true);
      setDataAllCountry([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStateInCountry = async (props: DataStateProps) => {
    setIsLoading(true);
    try {
      const response = await getState(props);
      let newResp = formatValueNameState(response.data.states);
      newResp.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
      setDataStateInCountry(newResp);
    } catch (error) {
      setIsError(true);
      setDataStateInCountry([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getCitiesInState = async (props: DataStateProps) => {
    setIsLoading(true);
    try {
      const response = await getCity(props);
      let newResp = formatValueNameCity(response.data);
      newResp.sort((a, b) =>
        a.value > b.value ? 1 : b.value > a.value ? -1 : 0,
      );
      setDataCitiesInState(newResp);
    } catch (error) {
      setIsError(true);
      setDataCitiesInState([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getCitiesOfCountry = async (props: ParamsProps) => {
    setIsLoading(true);
    try {
      const response = await getCityOfCountry(props);
      const newResp = formatValueNameState(response.data);
      setDataCitiesOfCountry(newResp);
    } catch (error) {
      setIsError(true);
      setDataCitiesOfCountry([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    dataAllCountry,
    dataStateInCountry,
    dataCitiesInState,
    dataCitiesOfCountry,
    getDataAllCountry,
    getStateInCountry,
    getCitiesInState,
    getCitiesOfCountry,
    getDataAllCountryShipping,
  };
};
