import {useState} from 'react';
import {ParamsProps} from '../interface/base.interface';
import {
  createLinkedDataApi,
  linkedDevicesApi,
  logoutDeviceApi,
} from '../api/qrCode.api';
import {LinkedDevicesData} from '../interface/qrcode.interface';

export const useQrCodeHook = () => {
  const [linking, setLinking] = useState(false);
  const [linkedDone, setLinkedDone] = useState(false);
  const [linkedFailed, setLinkedFailed] = useState(false);
  const [gettingListDevices, setGettingListDevices] = useState(false);
  const [linkedDevicesData, setLinkedDevicesData] =
    useState<LinkedDevicesData[]>();
  const [errorGetDevices, setErrorGetDevices] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [loggedOutSuccess, setLoggedOutSuccess] = useState(false);
  const [errorLoggingOut, setErrorLoggingOut] = useState(false);

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

  const setLogoutDevice = async (props?: ParamsProps) => {
    setLoggingOut(true);
    try {
      const response = await logoutDeviceApi(props);
      setLoggedOutSuccess(true);
    } catch (error) {
      console.log(error);
      setErrorLoggingOut(true);
    } finally {
      setLoggingOut(false);
    }
  };

  return {
    linking,
    linkedDone,
    linkedFailed,
    gettingListDevices,
    linkedDevicesData,
    errorGetDevices,
    loggedOutSuccess,
    loggingOut,
    errorLoggingOut,
    setLinkedDevicesData,
    setLinkedDone,
    setLinkData,
    getLinkedDevices,
    setLogoutDevice,
  };
};
