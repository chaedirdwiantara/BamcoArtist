import {useBase, BaseActionType} from '../context/base.context';
import {ErrorProp} from '../interface/error.interface';

export const useBaseHook = () => {
  const {state, dispatch} = useBase();

  const setError = (error: ErrorProp) => {
    dispatch({
      type: BaseActionType.SET_ERROR,
      payload: error,
    });
  };

  const clearError = () => {
    dispatch({
      type: BaseActionType.CLEAR_ERROR,
    });
  };

  const setLoading = () => {
    dispatch({
      type: BaseActionType.SET_LOADING,
    });
  };

  const clearLoading = () => {
    dispatch({
      type: BaseActionType.CLEAR_LOADING,
    });
  };

  return {
    isLoading: state.isLoading,
    isError: state.isError,
    errorMsg: state.errorMsg,
    setError,
    clearError,
    setLoading,
    clearLoading,
  };
};
