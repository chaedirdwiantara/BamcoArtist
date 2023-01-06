import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings, LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  checkUsername,
  confirmEmailOtpRegister,
  confirmSmsOtpLogin,
  loginSso,
  loginUser,
  registerUser,
  resendOtpEmail,
  resendOtpSms,
  loginPhoneNumber,
} from '../api/auth.api';
import {
  LoginPhonePropsType,
  LoginPropsType,
  RegisterPropsType,
  RegisterResponseType,
} from '../interface/auth.interface';
import axios from 'axios';
import {storage} from '../hooks/use-storage.hook';
import {deleteTokenFCM} from '../service/notification';
import {RegistrationType} from '../interface/profile.interface';

export const useAuthHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  const [errorData, setErrorData] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isValidUsername, setIsValidUsername] = useState<boolean | null>(null);
  const [authResult, setAuthResult] = useState<RegisterResponseType | null>(
    null,
  );
  const [loginResult, setLoginResult] = useState<null | 'preference' | 'home'>(
    null,
  );
  const [isOtpValid, setIsOtpValid] = useState<boolean | null>(null);
  const [ssoRegistered, setSsoRegistered] = useState<boolean | null>(null);
  const [ssoError, setSsoError] = useState<boolean>(false);
  const [ssoErrorMsg, setSsoErrorMsg] = useState<string>('');
  const [ssoEmail, setSsoEmail] = useState<string>('');
  const [ssoType, setSsoType] = useState<RegistrationType>();
  const [ssoId, setSsoId] = useState<string>('');

  const onRegisterUser = async (props: RegisterPropsType) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await registerUser(props);
      if (response.code === 200) {
        setAuthResult(response);
      } else {
        setIsError(true);
        setErrorMsg(response.message);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMsg(error.response?.data?.message);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginUser = async (
    props: LoginPropsType | LoginPhonePropsType,
    type: string,
  ) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      let response;
      if (type === 'email') {
        response = await loginUser(props);
      } else {
        response = await loginPhoneNumber(props);
      }

      if (response.code === 200 || response.code === 401) {
        if (response.data.accessToken) {
          storage.set('profile', JSON.stringify(response.data));
          if (response.data.lastLoginAt === null) {
            setLoginResult('preference');
          } else {
            setLoginResult('home');
          }
        }
      } else if (response.code !== 1010) {
        setIsError(true);
        setErrorMsg(response.message);
      }
    } catch (error) {
      setIsError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        if (error.response?.data?.data?.email) {
          setErrorData(error.response?.data?.data?.email);
        } else if (error.response?.data?.data?.phoneNumber) {
          setErrorData(error.response?.data?.data?.phoneNumber);
        }
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginGoogle = async () => {
    setIsError(false);
    setErrorMsg('');
    GoogleSignin.configure();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setIsLoading(true);
      const response = await loginSso(userInfo.user.email, 'google');
      if (response.code === 1003) {
        setSsoEmail(userInfo.user.email ?? '');
        setSsoId(userInfo.user.id);
        setSsoType('google');
        setSsoRegistered(false);
      } else if (response.code === 200) {
        setSsoRegistered(true);
        if (response.data.accessToken) {
          storage.set('profile', JSON.stringify(response.data));
          if (response.data.lastLoginAt === null) {
            setLoginResult('preference');
          } else {
            setLoginResult('home');
          }
        }
      } else {
        setSsoError(true);
        setSsoErrorMsg(response.message);
      }
    } catch (error) {
      setSsoError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setSsoErrorMsg(error.response?.data?.message);
      } else if (error instanceof Error) {
        setSsoErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginFacebook = async () => {
    setIsError(false);
    setErrorMsg('');
    Settings.setAppID('687852656020966');
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(res => {
        console.log(res);
        if (!res.isCancelled) {
          AccessToken.getCurrentAccessToken().then(_token => {
            // console.log(token);
            // TODO: get email from FB graphapi after apps is live
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onLoginApple = async () => {
    setIsError(false);
    setSsoRegistered(null);
    setSsoEmail('');
    setErrorMsg('');
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const response = await loginSso(appleAuthRequestResponse.user, 'apple');
        if (response.code === 1003) {
          setSsoEmail(appleAuthRequestResponse.email ?? '');
          setSsoId(appleAuthRequestResponse.user);
          setSsoType('apple');
          setSsoRegistered(false);
        } else if (response.code === 200) {
          setSsoRegistered(true);
          if (response.data.accessToken) {
            storage.set('profile', JSON.stringify(response.data));
            if (response.data.lastLoginAt === null) {
              setLoginResult('preference');
            } else {
              setLoginResult('home');
            }
          }
        } else {
          setSsoError(true);
          setSsoErrorMsg(response.message);
        }
      }
    } catch (error) {
      setSsoError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setSsoErrorMsg(error.response?.data?.message);
      } else if (error instanceof Error) {
        setSsoErrorMsg(error.message);
      }
    }
  };

  const checkUsernameAvailability = async (username: string) => {
    setIsError(false);
    setErrorMsg('');
    try {
      const response = await checkUsername(username);
      setIsValidUsername(response.data);
    } catch (error) {
      setIsError(true);
      setIsValidUsername(false);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMsg(error.response?.data?.message);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    }
  };

  const confirmEmailOtp = async (email: string, code: string) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await confirmEmailOtpRegister(email, code);
      if (response.status === 1) {
        if (response.data.lastLoginAt === null) {
          setLoginResult('preference');
        } else {
          setLoginResult('home');
        }
        storage.set('profile', JSON.stringify(response.data));
        setIsOtpValid(true);
        setIsError(false);
      } else if (response.status === 0) {
        setIsOtpValid(false);
        setIsError(true);
        setErrorMsg(response.message);
      }
    } catch (error) {
      setIsError(true);
      setIsOtpValid(false);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSmsOtp = async (
    phoneNumber: string,
    code: string,
    context: string,
  ) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await confirmSmsOtpLogin(phoneNumber, code, context);
      if (response.code === 200) {
        storage.set('profile', JSON.stringify(response.data));
        if (response.data.lastLoginAt === null) {
          setLoginResult('preference');
        } else {
          setLoginResult('home');
        }
        setIsOtpValid(true);
      } else {
        setIsOtpValid(false);
        setIsError(true);
        setErrorMsg(response.message);
      }
    } catch (error) {
      setIsError(true);
      setIsOtpValid(false);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtpEmail = async (email: string) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      await resendOtpEmail(email);
    } catch (error) {
      setIsError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtpSms = async (phoneNumber: string) => {
    setIsError(false);
    setErrorMsg('');
    setIsLoading(true);
    try {
      await resendOtpSms(phoneNumber);
    } catch (error) {
      setIsError(true);
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status >= 400
      ) {
        setErrorMsg(error.response?.data?.message);
        setErrorCode(error.response?.data?.code);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      storage.clearAll();
      await deleteTokenFCM();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    isLoading,
    isError,
    authResult,
    loginResult,
    errorMsg,
    errorCode,
    errorData,
    isValidUsername,
    isOtpValid,
    onRegisterUser,
    onLoginUser,
    onLoginGoogle,
    onLoginFacebook,
    onLoginApple,
    checkUsernameAvailability,
    confirmEmailOtp,
    confirmSmsOtp,
    sendOtpEmail,
    sendOtpSms,
    onLogout,
    ssoRegistered,
    ssoEmail,
    ssoError,
    ssoErrorMsg,
    setSsoError,
    ssoType,
    ssoId,
  };
};
