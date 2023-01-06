import React, {createContext, useReducer, useContext} from 'react';
import {ErrorProp} from '../interface/error.interface';
import {ProfileResponseType} from '../interface/profile.interface';

export enum ProfileActionType {
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING',
  CLEAR_LOADING = 'CLEAR_LOADING',
  CLEAR_ERROR = 'CLEAR_ERROR',
  SET_DATA = 'SET_DATA',
}

interface SetError {
  type: ProfileActionType.SET_ERROR;
  payload: ErrorProp;
}

interface SetLoading {
  type: ProfileActionType.SET_LOADING;
}

interface ClearLoading {
  type: ProfileActionType.CLEAR_LOADING;
}

interface ClearError {
  type: ProfileActionType.CLEAR_ERROR;
}

interface SetData {
  type: ProfileActionType.SET_DATA;
  payload: ProfileResponseType;
}

type Action = SetError | SetLoading | ClearLoading | ClearError | SetData;
type Dispatch = (action: Action) => void;
type ProfileProviderProps = {children: React.ReactNode};
type State = {
  isError: boolean;
  isLoading: boolean;
  errorMsg: ErrorProp;
  data: ProfileResponseType | null;
};

const initialState: State = {
  isError: false,
  isLoading: false,
  errorMsg: {
    title: '',
    message: '',
  },
  data: null,
};

function profileReducer(state: State, action: Action) {
  switch (action.type) {
    case ProfileActionType.SET_ERROR:
      return {
        ...state,
        ...action.payload,
        isError: true,
        errorMsg: action.payload,
      };

    case ProfileActionType.CLEAR_ERROR:
      return initialState;

    case ProfileActionType.SET_LOADING:
      return {
        ...state,
        ...action,
        isLoading: true,
      };

    case ProfileActionType.CLEAR_LOADING:
      return {
        ...state,
        ...action,
        isLoading: false,
      };

    case ProfileActionType.SET_DATA:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    default:
      return initialState;
  }
}

const ProfileContext = createContext<
  {state: State; dispatch: Dispatch} | undefined
>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
};

export const ProfileProvider = ({children}: ProfileProviderProps) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const value = {state, dispatch};
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
