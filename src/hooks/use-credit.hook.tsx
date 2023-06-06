import {useState} from 'react';
import {createDonation, getCredit} from '../api/credit.api';
import {CreateDonationParams} from '../interface/credit.interface';

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

  const createNewDonation = async (props: CreateDonationParams) => {
    try {
      const response = await createDonation(props);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    creditCount,
    getCreditCount,
    createNewDonation,
  };
};
