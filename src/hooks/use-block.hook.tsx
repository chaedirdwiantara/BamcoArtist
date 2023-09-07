import {useState} from 'react';
import {blockUserEP, unBlockUserEP} from '../api/block.api';
import {ParamsProps} from '../interface/base.interface';
import {blockUserRecorded} from '../store/blockUser.store';

export const useBlockHook = () => {
  const [blockLoading, setBlockLoading] = useState<boolean>(false);
  const [blockResponse, setBlockResponse] = useState<string>();
  const [unblockResponse, setUnblockResponse] = useState<string>();
  const [blockError, setBlockError] = useState<boolean>();
  const {uuidBlocked, setuuidBlocked} = blockUserRecorded();

  const setBlockUser = async (props?: ParamsProps) => {
    setBlockLoading(true);
    try {
      const response = await blockUserEP(props);
      setBlockResponse(response.message);
      if (!uuidBlocked.includes(props?.uuid!)) {
        setuuidBlocked([...uuidBlocked, props?.uuid!]);
      }
    } catch (error) {
      setBlockError(true);
    } finally {
      setBlockLoading(false);
    }
  };

  const setUnblockUser = async (props?: ParamsProps) => {
    setBlockLoading(true);
    try {
      const response = await unBlockUserEP(props);
      setUnblockResponse(response.message);
      setuuidBlocked(uuidBlocked.filter(x => x !== props?.uuid));
    } catch (error) {
      setBlockError(true);
    } finally {
      setBlockLoading(false);
    }
  };

  return {
    blockLoading,
    blockResponse,
    unblockResponse,
    blockError,
    setBlockResponse,
    setUnblockResponse,
    setBlockUser,
    setUnblockUser,
  };
};
