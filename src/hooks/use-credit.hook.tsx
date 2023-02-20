import {useState} from 'react';
import {getCredit} from '../api/credit.api';

export const useCreditHook = () => {
  const [creditCount, setCreditCount] = useState(0);

  const getCreditCount = async () => {
    try {
      const response = await getCredit();
      setCreditCount(response.data.credit);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    creditCount,
    getCreditCount,
  };
};
