import React, {createContext, useReducer, useContext} from 'react';
import {ErrorProp} from '../interface/error.interface';

export enum BaseActionType {
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING',
  CLEAR_LOADING = 'CLEAR_LOADING',
  CLEAR_ERROR = 'CLEAR_ERROR',
}

interface SetError {
  type: BaseActionType.SET_ERROR;
  payload: ErrorProp;
}

interface SetLoading {
  type: BaseActionType.SET_LOADING;
}

interface ClearLoading {
  type: BaseActionType.CLEAR_LOADING;
}

interface ClearError {
  type: BaseActionType.CLEAR_ERROR;
}

type Action = SetError | SetLoading | ClearLoading | ClearError;
type Dispatch = (action: Action) => void;
type BaseProviderProps = {children: React.ReactNode};
type State = {
  isError: boolean;
  isLoading: boolean;
  errorMsg: ErrorProp;
};

const initialState: State = {
  isError: false,
  isLoading: false,
  errorMsg: {
    title: '',
    message: '',
  },
};

function baseReducer(state: State, action: Action) {
  switch (action.type) {
    case BaseActionType.SET_ERROR:
      return {
        ...state,
        ...action.payload,
        isError: true,
        errorMsg: action.payload,
      };

    case BaseActionType.CLEAR_ERROR:
      return initialState;

    case BaseActionType.SET_LOADING:
      return {
        ...state,
        ...action,
        isLoading: true,
      };

    case BaseActionType.CLEAR_LOADING:
      return {
        ...state,
        ...action,
        isLoading: false,
      };

    default:
      return initialState;
  }
}

const BaseContext = createContext<
  {state: State; dispatch: Dispatch} | undefined
>(undefined);

export const useBase = () => {
  const context = useContext(BaseContext);

  if (context === undefined) {
    throw new Error('useBase must be used within a BaseProvider');
  }

  return context;
};

export const BaseProvider = ({children}: BaseProviderProps) => {
  const [state, dispatch] = useReducer(baseReducer, initialState);
  const value = {state, dispatch};
  return <BaseContext.Provider value={value}>{children}</BaseContext.Provider>;
};
