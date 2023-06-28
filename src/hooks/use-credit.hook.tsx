import {useState} from 'react';
import {
  checkSubsEC,
  createDonation,
  getCredit,
  subsEC,
} from '../api/credit.api';
import {
  CreateDonationParams,
  SubsECParams,
} from '../interface/credit.interface';

export const useCreditHook = () => {
  const [creditCount, setCreditCount] = useState(0);
  const [alreadySubsEC, setAlreadySubsEC] = useState(false);

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

  const checkSubs = async (musicianID: string) => {
    try {
      const response = await checkSubsEC(musicianID);
      setAlreadySubsEC(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const subsNewEC = async (props: SubsECParams) => {
    try {
      const response = await subsEC(props);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    creditCount,
    getCreditCount,
    createNewDonation,
    checkSubs,
    alreadySubsEC,
    subsNewEC,
  };
};
