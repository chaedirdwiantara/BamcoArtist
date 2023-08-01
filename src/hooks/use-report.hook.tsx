import {useState} from 'react';
import {sendPostReport} from '../api/report.api';
import {ReportParamsProps} from '../interface/report.interface';

export const useReportHook = () => {
  const [reportIsLoading, setReportIsLoading] = useState(true);
  const [dataReport, setDataReport] = useState<boolean>(false);
  const [reportIsError, setReportIsError] = useState<boolean>(false);
  const [reportMessage, setReportMessage] = useState<string>('');
  const setPostReport = async (props?: ReportParamsProps) => {
    setReportIsLoading(true);
    setReportIsError(false);
    try {
      const response = await sendPostReport(props);
      setDataReport(true);
      setReportMessage(response.message);
    } catch (error) {
      setReportIsError(true);
    } finally {
      setReportIsLoading(false);
    }
  };

  return {
    reportIsLoading,
    dataReport,
    reportIsError,
    reportMessage,
    setPostReport,
    setDataReport,
  };
};
