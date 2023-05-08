import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  width,
  widthPercentage,
  widthResponsive,
  heightPercentage,
} from '../../../utils';
import {color, typography} from '../../../theme';
import {ArrowLeftIcon} from '../../../assets/icon';
import {deleteAccount} from '../../../api/auth.api';
import {RootStackParams} from '../../../navigations';
import {useFcmHook} from '../../../hooks/use-fcm.hook';
import {useAuthHook} from '../../../hooks/use-auth.hook';
import * as FCMService from '../../../service/notification';
import {ModalConfirm, SsuInput, TopNavigation} from '../../../components';
import {ModalLoading} from '../../../components/molecule/ModalLoading/ModalLoading';

type InputDeletionProps = NativeStackScreenProps<
  RootStackParams,
  'InputDeletion'
>;

export const InputDeletionScreen: React.FC<InputDeletionProps> = ({
  navigation,
  route,
}: InputDeletionProps) => {
  const {t} = useTranslation();
  const {id, text} = route.params;
  const [state, setState] = useState({
    deleteReasonId: 1,
    deleteReasonText: '',
    password: '',
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const {onLogout} = useAuthHook();
  const {removeFcmToken} = useFcmHook();

  useEffect(() => {
    setState({...state, deleteReasonId: id});
  }, []);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const onPressDelete = async () => {
    InteractionManager.runAfterInteractions(() => setIsLoading(true));
    setIsError(false);
    setShowModal(false);
    try {
      const payload = {
        ...state,
        deleteReasonText: state.deleteReasonText
          ? state.deleteReasonText
          : text,
      };
      await deleteAccount(payload);
      await onLogout();
      FCMService.getTokenFCM({
        onGetToken: token => {
          removeFcmToken(token);
        },
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'SignInGuest', params: {showToastDelete: true}}],
      });
    } catch (error) {
      setIsError(true);
      setShowModal(false);
      setIsLoading(false);
    } finally {
      InteractionManager.runAfterInteractions(() => setIsLoading(false));
    }
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.DeleteAccount.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: heightPercentage(10),
          paddingHorizontal: widthResponsive(15),
        }}
      />

      <View style={styles.containerContent}>
        <Text style={[typography.Heading6, styles.title]}>{text}</Text>
        <SsuInput.InputLabel
          label={t('Setting.DeleteAccount.InputDeletion.ReasonInput') || ''}
          value={state.deleteReasonText}
          onChangeText={(newText: string) =>
            onChangeText('deleteReasonText', newText)
          }
          placeholder={
            t('Setting.DeleteAccount.InputDeletion.ReasonPlaceholder') || ''
          }
          containerStyles={styles.textArea}
          multiline
          numberOfLines={10}
          inputStyles={styles.inputDesc}
        />

        <SsuInput.InputLabel
          label={t('Setting.DeleteAccount.InputDeletion.PasswordInput') || ''}
          password
          value={state.password}
          onChangeText={(newText: string) => {
            onChangeText('password', newText);
            setIsError(false);
          }}
          placeholder={
            t('Setting.DeleteAccount.InputDeletion.PasswordInput') || ''
          }
          isError={isError}
          errorMsg={isError ? 'wrong password' : ''}
          containerStyles={{marginTop: heightPercentage(15)}}
        />

        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={[typography.Button2, styles.buttonText]}>
            {t('Setting.DeleteAccount.Title')}
          </Text>
        </TouchableOpacity>
      </View>

      <ModalConfirm
        modalVisible={showModal}
        title={t('Setting.DeleteAccount.Title') || ''}
        subtitle={t('Setting.DeleteAccount.Subtitle') || ''}
        onPressClose={() => setShowModal(false)}
        onPressOk={onPressDelete}
      />

      <ModalLoading visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  containerContent: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  title: {
    color: color.Neutral[10],
    marginVertical: heightPercentage(13),
  },
  textArea: {
    paddingHorizontal: 0,
    marginTop: heightPercentage(10),
  },
  inputDesc: {
    width: width * 0.9,
    aspectRatio: 2 / 1,
    textAlignVertical: 'top',
    paddingTop: widthPercentage(10),
  },
  buttonText: {
    color: color.Error[400],
    marginVertical: heightPercentage(40),
    alignSelf: 'center',
  },
});
