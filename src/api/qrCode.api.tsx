import SsuAPI from './baseRinjani';
import {ParamsProps} from '../interface/base.interface';
import {
  CreateLinkDataResponseType,
  GetLinkedDevicesResponseType,
} from '../interface/qrcode.interface';

export const createLinkedDataApi = async (
  props?: ParamsProps,
): Promise<CreateLinkDataResponseType> => {
  const {data} = await SsuAPI().request<CreateLinkDataResponseType>({
    url: `/musician-app/create/qr-code`,
    method: 'POST',
    data: props,
  });

  return data;
};

export const linkedDevicesApi = async (
  props?: ParamsProps,
): Promise<GetLinkedDevicesResponseType> => {
  const {data} = await SsuAPI().request<GetLinkedDevicesResponseType>({
    url: `/musician-app/qr-code/${props?.uuid}/linked-device`,
    method: 'GET',
  });

  return data;
};
