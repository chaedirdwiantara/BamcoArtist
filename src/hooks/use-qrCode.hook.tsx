import {useState} from 'react';
import {ParamsProps} from '../interface/base.interface';
import {createLinkedDataApi, linkedDevicesApi} from '../api/qrCode.api';
import {LinkedDevicesData} from '../interface/qrcode.interface';

export const useQrCodeHook = () => {
  const [linking, setLinking] = useState(false);
  const [linkedDone, setLinkedDone] = useState(false);
  const [linkedFailed, setLinkedFailed] = useState(false);
  const [gettingListDevices, setGettingListDevices] = useState(false);
  const [linkedDevicesData, setLinkedDevicesData] =
    useState<LinkedDevicesData[]>();
  const [errorGetDevices, setErrorGetDevices] = useState(false);

  const setLinkData = async (props?: ParamsProps) => {
    setLinking(true);
    try {
      const response = await createLinkedDataApi(props);
      setLinkedDone(true);
    } catch (error) {
      console.log(error);
      setLinkedFailed(true);
    } finally {
      setLinking(false);
    }
  };

  const getLinkedDevices = async (props?: ParamsProps) => {
    setGettingListDevices(true);
    try {
      const response = await linkedDevicesApi(props);
      setLinkedDevicesData(response.data);
    } catch (error) {
      console.log(error);
      setErrorGetDevices(true);
    } finally {
      setGettingListDevices(false);
    }
  };

  return {
    linking,
    linkedDone,
    linkedFailed,
    gettingListDevices,
    linkedDevicesData,
    errorGetDevices,
    setLinkedDevicesData,
    setLinkedDone,
    setLinkData,
    getLinkedDevices,
  };
};
