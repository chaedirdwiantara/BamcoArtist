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
  dataCitiesOfCountry: DataDropDownType[];
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
    .strict(true)
    .trim('Full name cannot include leading and trailing spaces')
    .matches(/^.{3,50}$/, 'Fullname allowed 3 to 50 character'),
  labels: yup.string(),
  yearsActiveFrom: yup.string(),
  yearsActiveTo: yup.string(),
  locationCountry: yup.string(),
  locationCity: yup.string(),
});

export const AccountContent: React.FC<AccountProps> = ({
  profile,
  onPressGoBack,
  dataAllCountry,
  dataCitiesOfCountry,
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
  const [changes, setChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const {updateProfilePreference, isError, isLoading, errorMsg, setIsError} =
    useProfileHook();

  const {
    control,
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
    changes ? setShowModal(true) : onPressConfirm();
  };

  const onPressConfirm = async () => {
    await updateProfilePreference({
      username: getValues('username'),
      fullname: getValues('fullname'),
      labels: getValues('labels'),
      yearsActiveFrom: getValues('yearsActiveFrom'),
      yearsActiveTo: getValues('yearsActiveTo'),
      locationCountry: getValues('locationCountry'),
      locationCity: getValues('locationCity'),
      members: members,
      favoriteGeneres: valueGenres as number[],
    });

    setIsSubmit(true);
    setShowModal(false);
    setChanges(false);
  };

  const onPressAddMember = () => {
    setMembers([...members, '']);
    setChanges(true);
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
          containerStyles={{
            marginBottom: heightPercentage(15),
            paddingHorizontal: widthResponsive(15),
          }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: widthResponsive(20),
          }}>
          <Controller
            name="username"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label={t('Setting.Account.Label.Username') || ''}
                value={value}
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: heightPercentage(10),
            }}>
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

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Controller
              name="yearsActiveFrom"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  initialValue={value}
                  data={dataYearsFrom}
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
                  dropdownLabel={''}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(14),
                    width: '49%',
                  }}
                  isError={errors?.yearsActiveTo ? true : false}
                  errorMsg={errors?.yearsActiveTo?.message}
                />
              )}
            />
          </View>

          {members.map((val, index) => (
            <SsuInput.InputLabel
              key={index}
              label={index === 0 ? t('Setting.Account.Label.Member') || '' : ''}
              value={val}
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
                  paddingTop: mvs(7),
                  fontSize: mvs(11),
                },
              ]}>
              + Add More
            </Text>
          </TouchableOpacity>

          {isError ? (
            <View style={styles.containerErrorMsg}>
              <ErrorIcon fill={Color.Error[400]} />
              <Gap width={ms(4)} />
              <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
          ) : null}

          <Button
            label={t('Btn.Save') || ''}
            onPress={onPressSave}
            textStyles={{fontSize: mvs(15)}}
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
            onPressOk={onPressConfirm}
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
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 38),
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
