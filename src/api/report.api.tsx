import {
  ReportParamsProps,
  ReportPostResponseType,
} from '../interface/report.interface';
import SsuAPI from './baseRinjani';

export const sendPostReport = async (
  props?: ReportParamsProps,
): Promise<ReportPostResponseType> => {
  const {data} = await SsuAPI().request<ReportPostResponseType>({
    url: '/violations/report',
    method: 'POST',
    data: props,
  });

  return data;
};
