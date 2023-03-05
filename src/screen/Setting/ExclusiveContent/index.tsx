import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {
  heightPercentage,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {
  ArrowLeftIcon,
  CloseCircleIcon,
  TickCircleIcon,
} from '../../../assets/icon';
import {
  createExclusiveContent,
  updateExclusiveContent,
} from '../../../api/setting.api';
import {EditEC} from './EditEC';
import {CreateEC} from './CreateEC';
import {color, typography} from '../../../theme';
import {RootStackParams} from '../../../navigations';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {profileStorage} from '../../../hooks/use-storage.hook';
import {TopNavigation, SsuToast, Gap} from '../../../components';
import {DataExclusiveProps} from '../../../interface/setting.interface';
import {useTranslation} from 'react-i18next';

type ExclusiveContentSettingProps = NativeStackScreenProps<
  RootStackParams,
  'ExclusiveContentSetting'
>;

export const ExclusiveContentSetting: React.FC<
  ExclusiveContentSettingProps
> = ({route}: ExclusiveContentSettingProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const statusType = route.params?.type;

  const {fetchData, dataExclusiveContent, getExclusiveContent} =
    useSettingHook();

  const [mode, setMode] = useState<string>('edit');
  const [toastText, setToastText] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastError, setToastError] = useState<boolean>(false);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  const fetchExclusiveContent = () => {
    const uuid = profileStorage()?.uuid;
    getExclusiveContent({uuid});
  };

  useEffect(() => {
    fetchExclusiveContent();
  }, []);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onPressCreate = async (props: DataExclusiveProps) => {
    try {
      if (mode === 'update') {
        await updateExclusiveContent({id: dataExclusiveContent?.ID}, props);
        setToastText('Your exclusive content have been updated!');
      } else {
        await createExclusiveContent(props);
        setToastText('Your exclusive content have been saved!');
      }
      setToastVisible(true);
      setToastError(false);
      setMode('edit');
      fetchExclusiveContent();
    } catch (error) {
      console.log(error);
      mode === 'update'
        ? setToastText('Your exclusive content failed to update')
        : setToastText('Your exclusive content failed to save');
      setToastVisible(true);
      setToastError(true);
    }
  };

  // * navigate to create post when user navigated into this screen and finished setup the content
  useEffect(() => {
    if (statusType === 'navToCreatePost' && dataExclusiveContent !== null) {
      navigation.navigate('CreatePost', {audience: 'Feed.Exclusive'});
    }
  }, [statusType, dataExclusiveContent]);

  const toastBg = toastError ? color.Error[400] : color.Success[400];

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('Setting.Exclusive.Title')}
          leftIcon={<ArrowLeftIcon />}
          itemStrokeColor={color.Neutral[10]}
          leftIconAction={onPressGoBack}
          containerStyles={{marginBottom: heightPercentage(15)}}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {fetchData ? null : dataExclusiveContent && mode === 'edit' ? (
            <EditEC
              data={dataExclusiveContent}
              onPress={() => setMode('update')}
            />
          ) : (
            <CreateEC data={dataExclusiveContent} onPress={onPressCreate} />
          )}
        </ScrollView>
      </View>

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer, {backgroundColor: toastBg}]}>
            {toastError ? (
              <CloseCircleIcon
                width={widthResponsive(21)}
                height={heightPercentage(20)}
                stroke={color.Neutral[10]}
              />
            ) : (
              <TickCircleIcon
                width={widthResponsive(21)}
                height={heightPercentage(20)}
                stroke={color.Neutral[10]}
              />
            )}
            <Gap width={widthResponsive(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              {toastText}
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthResponsive(24)}}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  textStyle: {
    color: color.Neutral[10],
    fontSize: mvs(13),
    maxWidth: width * 0.8,
  },
});
