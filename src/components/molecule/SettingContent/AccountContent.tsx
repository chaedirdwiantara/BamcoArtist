import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  InteractionManager,
} from 'react-native';
import * as yup from 'yup';
import {ms, mvs} from 'react-native-size-matters';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {Dropdown} from '../DropDown';
import {
  formatValueName,
  formatValueName2,
} from '../../../utils/formatValueName';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import Typography from '../../../theme/Typography';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {dataProps} from '../DropDown/DropdownMulti';
import {dataFavourites} from '../../../data/following';
import {color, font, typography} from '../../../theme';
import {DataDropDownType} from '../../../data/dropdown';
import {Button, Gap, SsuInput, SsuToast} from '../../atom';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {ProfileResponseType} from '../../../interface/profile.interface';
import {dataYearsFrom, dataYearsTo} from '../../../data/Settings/account';
import {ArrowLeftIcon, ErrorIcon, TickCircleIcon} from '../../../assets/icon';
import {useTranslation} from 'react-i18next';

interface AccountProps {
  profile: ProfileResponseType;
  onPressGoBack: () => void;
  dataAllCountry: DataDropDownType[];
  dataCitiesOfOrigin: DataDropDownType[];
  dataCitiesOfCountry: DataDropDownType[];
  setSelectedOrigin: (value: string) => void;
  setSelectedCountry: (value: string) => void;
  setInputType: (value: string) => void;
}

interface InputProps {
  username: string;
  fullname: string;
  genre: number[];
  labels: string;
  yearsActiveFrom: string;
  yearsActiveTo: string;
  originCountry: string;
  originCity: string;
  locationCountry: string;
  locationCity: string;
}

const validation = yup.object({
  username: yup
    .string()
    .required('Username can not be blank, set a username')
    .matches(
      /^.{2,29}[a-z0-9]$/,
      'Username should be between 3 to 30 alphanumeric characters',
    ),
  fullname: yup
    .string()
    .required('Full Name can not be blank, please input your Full Name')
    .matches(/^.{3,21}$/, 'Full Name should be between 3 to 21 characters'),
  labels: yup.string(),
  yearsActiveFrom: yup.string(),
  yearsActiveTo: yup.string(),
  originCountry: yup.string(),
  originCity: yup.string(),
  locationCountry: yup.string(),
  locationCity: yup.string(),
});

export const AccountContent: React.FC<AccountProps> = ({
  profile,
  onPressGoBack,
  dataAllCountry,
  dataCitiesOfOrigin,
  dataCitiesOfCountry,
  setSelectedOrigin,
  setSelectedCountry,
  setInputType,
}) => {
  const {t} = useTranslation();
  const [userGenres, setUserGenres] = useState<(string | number | undefined)[]>(
    [],
  );
  const [valueGenres, setValueGenres] = useState<(number | undefined)[]>([]);
  const [members, setMembers] = useState<string[]>(
    profile?.data.members || [''],
  );
  const [type, setType] = useState(t('Btn.Edit'));
  const [changes, setChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const {updateProfilePreference, isError, isLoading, errorMsg, setIsError} =
    useProfileHook();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isValidating},
    getValues,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      username: profile?.data.username || '',
      fullname: profile?.data.fullname || '',
      labels: profile?.data.labels || '',
      yearsActiveFrom: profile?.data.yearsActiveFrom || '',
      yearsActiveTo: profile?.data.yearsActiveTo || '',
      originCountry: profile?.data.originCountry || '',
      originCity: profile?.data.originCity || '',
      locationCountry: profile?.data.locationCountry || '',
      locationCity: profile?.data.locationCity || '',
    },
  });

  const getValue = (data: dataProps[]) => {
    if (data) {
      return data?.map((item: dataProps) => {
        return item['value'];
      });
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (profile) {
      const gr = getValue(formatValueName2(profile?.data.favoriteGenres));
      setUserGenres(gr);
    }
  }, [profile]);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  useEffect(() => {
    if (isValid) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating, isValid]);

  const onPressSave = () => {
    if (type === t('Btn.Edit')) {
      setType(t('Btn.Save'));
    } else {
      changes ? setShowModal(true) : setType(t('Btn.Edit'));
    }
  };

  const onPressConfirm = async () => {
    await updateProfilePreference({
      username: getValues('username'),
      fullname: getValues('fullname'),
      labels: getValues('labels'),
      yearsActiveFrom: getValues('yearsActiveFrom'),
      yearsActiveTo: getValues('yearsActiveTo'),
      originCountry: getValues('originCountry'),
      originCity: getValues('originCity'),
      locationCountry: getValues('locationCountry'),
      locationCity: getValues('locationCity'),
      members: members,
      favoriteGeneres: valueGenres as number[],
    });

    setType(t('Btn.Edit'));
    setIsSubmit(true);
    setShowModal(false);
    setChanges(false);
  };

  const onPressAddMember = () => {
    if (type === t('Btn.Save')) {
      setMembers([...members, '']);
      setChanges(true);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      if (!isError && !isLoading) {
        InteractionManager.runAfterInteractions(() => setToastVisible(true));
      }
      setIsSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('Setting.Account.Title')}
          leftIcon={<ArrowLeftIcon />}
          itemStrokeColor={Color.Neutral[10]}
          leftIconAction={onPressGoBack}
          containerStyles={{marginBottom: heightPercentage(15)}}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Controller
            name="username"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Account.Label.Username') || ''}
                value={value}
                editable={type === t('Btn.Save')}
                onChangeText={text => {
                  onChange(text.toLowerCase());
                  setIsError(false);
                  setChanges(true);
                }}
                placeholder={t('Setting.Account.Placeholder.Username') || ''}
                isError={errors?.username ? true : false}
                errorMsg={errors?.username?.message}
                containerStyles={{marginTop: heightPercentage(15)}}
              />
            )}
          />

          <Controller
            name="fullname"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Account.Label.Fullname') || ''}
                value={value}
                editable={type === t('Btn.Save')}
                onChangeText={text => {
                  onChange(text);
                  setIsError(false);
                  setChanges(true);
                }}
                placeholder={t('Setting.Account.Placeholder.Fullname') || ''}
                isError={errors?.fullname ? true : false}
                errorMsg={errors?.fullname?.message}
                containerStyles={{marginTop: heightPercentage(15)}}
              />
            )}
          />

          <Dropdown.Multi
            data={formatValueName(dataFavourites[0]?.favorites) ?? []}
            placeHolder={t('Setting.Account.Placeholder.Genre') || ''}
            dropdownLabel={t('Setting.Account.Label.Genre') || ''}
            disable={type !== t('Btn.Save')}
            textTyped={(_newText: string) => null}
            containerStyles={{marginTop: heightPercentage(15)}}
            initialValue={userGenres}
            setValues={val => {
              setValueGenres(val);
              setChanges(true);
            }}
          />

          <Controller
            name="labels"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Account.Label.Label') || ''}
                value={value}
                editable={type === t('Btn.Save')}
                onChangeText={text => {
                  onChange(text);
                  setIsError(false);
                  setChanges(true);
                }}
                placeholder={t('Setting.Account.Placeholder.Label') || ''}
                isError={errors?.labels ? true : false}
                errorMsg={errors?.labels?.message}
                containerStyles={{marginTop: heightPercentage(15)}}
              />
            )}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Controller
              name="yearsActiveFrom"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  initialValue={value}
                  data={dataYearsFrom}
                  disable={type !== t('Btn.Save')}
                  placeHolder={t('Setting.Account.Placeholder.Active') || ''}
                  dropdownLabel={t('Musician.Label.Active') || ''}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(15),
                    width: '49%',
                  }}
                  isError={errors?.yearsActiveFrom ? true : false}
                  errorMsg={errors?.yearsActiveFrom?.message}
                />
              )}
            />

            <Controller
              name="yearsActiveTo"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  initialValue={value}
                  data={dataYearsTo}
                  placeHolder={t('Setting.Account.Placeholder.Active') || ''}
                  disable={type !== t('Btn.Save')}
                  dropdownLabel={''}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(15),
                    width: '49%',
                  }}
                  isError={errors?.yearsActiveTo ? true : false}
                  errorMsg={errors?.yearsActiveTo?.message}
                />
              )}
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Controller
              name="originCountry"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  type="location"
                  initialValue={value}
                  data={dataAllCountry}
                  placeHolder={t('Setting.Account.Placeholder.Country') || ''}
                  dropdownLabel={t('Setting.Account.Label.Origin') || ''}
                  disable={type !== t('Btn.Save')}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setSelectedOrigin(newText.value);
                    setInputType('origin');
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(15),
                    width: '49%',
                  }}
                  isError={errors?.originCountry ? true : false}
                  errorMsg={errors?.originCountry?.message}
                />
              )}
            />

            <Controller
              name="originCity"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  initialValue={value}
                  data={dataCitiesOfOrigin}
                  placeHolder={t('Setting.Account.Placeholder.City') || ''}
                  disable={type !== t('Btn.Save')}
                  showSearch={true}
                  dropdownLabel={''}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(15),
                    width: '49%',
                  }}
                  isError={errors?.originCity ? true : false}
                  errorMsg={errors?.originCity?.message}
                />
              )}
            />
          </View>

          {members.map((val, index) => (
            <SsuInput.InputLabel
              key={index}
              label={index === 0 ? t('Setting.Account.Label.Member') || '' : ''}
              value={val}
              editable={type === t('Btn.Save')}
              onChangeText={text => {
                let temp = [...members];
                temp[index] = text;
                setMembers(temp);
                setChanges(true);
              }}
              placeholder={t('Setting.Account.Placeholder.Member') || ''}
              containerStyles={{
                marginTop: index === 0 ? heightPercentage(15) : 0,
              }}
            />
          ))}
          <TouchableOpacity onPress={onPressAddMember}>
            <Text
              style={[
                Typography.Body4,
                {
                  color: color.Pink[2],
                  paddingTop: mvs(5),
                },
              ]}>
              + Add More
            </Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Controller
              name="locationCountry"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  type="location"
                  initialValue={value}
                  data={dataAllCountry}
                  placeHolder={t('Setting.Account.Placeholder.Country') || ''}
                  dropdownLabel={t('Setting.Account.Label.Location') || ''}
                  disable={type !== t('Btn.Save')}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setSelectedCountry(newText.value);
                    setInputType('location');
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(15),
                    width: '49%',
                  }}
                  isError={errors?.locationCountry ? true : false}
                  errorMsg={errors?.locationCountry?.message}
                />
              )}
            />

            <Controller
              name="locationCity"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  initialValue={value}
                  data={dataCitiesOfCountry}
                  showSearch={true}
                  placeHolder={t('Setting.Account.Placeholder.City') || ''}
                  disable={type !== t('Btn.Save')}
                  dropdownLabel={''}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(15),
                    width: '49%',
                  }}
                  isError={errors?.locationCity ? true : false}
                  errorMsg={errors?.locationCity?.message}
                />
              )}
            />
          </View>

          {isError ? (
            <View style={styles.containerErrorMsg}>
              <ErrorIcon fill={Color.Error[400]} />
              <Gap width={ms(4)} />
              <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
          ) : null}

          <Button
            label={type}
            onPress={onPressSave}
            containerStyles={
              disabledButton ? styles.buttonDisabled : styles.button
            }
            disabled={disabledButton}
          />

          <ModalConfirm
            modalVisible={showModal}
            title="Account"
            subtitle="Are you sure you want to update your account?"
            onPressClose={() => setShowModal(false)}
            onPressOk={handleSubmit(onPressConfirm)}
          />

          <SsuToast
            modalVisible={toastVisible}
            onBackPressed={() => setToastVisible(false)}
            children={
              <View style={[styles.modalContainer]}>
                <TickCircleIcon
                  width={widthResponsive(21)}
                  height={heightPercentage(20)}
                  stroke={Color.Neutral[10]}
                />
                <Gap width={widthResponsive(7)} />
                <Text
                  style={[
                    typography.Button2,
                    {
                      color: Color.Neutral[10],
                    },
                  ]}>
                  Your account have been updated!
                </Text>
              </View>
            }
            modalStyle={{marginHorizontal: widthResponsive(24)}}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    marginVertical: heightPercentage(25),
    alignSelf: 'center',
    backgroundColor: Color.Pink[200],
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: Color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  containerErrorMsg: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: mvs(4),
    alignItems: 'center',
  },
  errorMsg: {
    color: Color.Error[400],
    fontFamily: font.InterRegular,
    fontSize: normalize(10),
    lineHeight: mvs(12),
    maxWidth: '90%',
  },
  buttonDisabled: {
    width: '100%',
    aspectRatio: widthPercentage(327 / 36),
    marginVertical: heightPercentage(25),
    alignSelf: 'center',
    backgroundColor: Color.Dark[50],
  },
});
