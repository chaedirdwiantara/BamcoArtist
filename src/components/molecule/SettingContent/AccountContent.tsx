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
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import DatePicker from 'react-native-date-picker';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';

import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CloseCircleIcon,
  ErrorIcon,
  TickCircleIcon,
} from '../../../assets/icon';
import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {Dropdown} from '../DropDown';
import {
  dataGender,
  dataYearsFrom,
  dataYearsTo,
} from '../../../data/Settings/account';
import Color from '../../../theme/Color';
import {
  ListRoleType,
  PreferenceList,
} from '../../../interface/setting.interface';
import {TopNavigation} from '../TopNavigation';
import Typography from '../../../theme/Typography';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {dataProps} from '../DropDown/DropdownMulti';
import {MenuText} from '../../atom/MenuText/MenuText';
import {color, font, typography} from '../../../theme';
import {DataDropDownType} from '../../../data/dropdown';
import {dateFormatBirth} from '../../../utils/date-format';
import {Button, Gap, SsuInput, SsuToast} from '../../atom';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {formatValueName2} from '../../../utils/formatValueName';
import {profileStorage, storage} from '../../../hooks/use-storage.hook';
import {ProfileResponseData} from '../../../interface/profile.interface';
import {ListCountryType} from '../../../interface/location.interface';

interface AccountProps {
  profile: ProfileResponseData;
  onPressGoBack: () => void;
  dataAllCountry: ListCountryType[];
  dataCitiesOfCountry: DataDropDownType[];
  setSelectedCountry: (value: number) => void;
  moods: PreferenceList[];
  genres: PreferenceList[];
  roles: ListRoleType[];
  fromScreen: string;
}

interface InputProps {
  username: string;
  fullname: string;
  genre: number[];
  labels: string;
  yearsActiveFrom: string;
  yearsActiveTo: string;
  locationCountry: number;
  locationCity: string;
  typeOfMusician: number;
  gender: string;
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
  locationCountry: yup.number(),
  locationCity: yup.string(),
  typeOfMusician: yup.number(),
  gender: yup.string(),
});

export const AccountContent: React.FC<AccountProps> = ({
  profile,
  onPressGoBack,
  dataAllCountry,
  dataCitiesOfCountry,
  setSelectedCountry,
  genres,
  moods,
  roles,
  fromScreen,
}) => {
  const {t} = useTranslation();
  const member = profile.members?.length > 0 ? profile.members : [''];
  const [members, setMembers] = useState<string[]>(member);
  const [changes, setChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [valueGenres, setValueGenres] = useState<(number | undefined)[]>([]);
  const [valueMoodsPreference, setValueMoodsPreference] = useState<
    (number | undefined)[]
  >([]);
  const [valueGenresPreference, setValueGenresPreference] = useState<
    (number | undefined)[]
  >([]);
  const [valueTypeOfMusician, setValueTypeOfMusician] = useState<
    (number | undefined)[]
  >([]);
  const [birthdate, setBirthDate] = useState<string>('');
  const [openPickerBirth, setOpenPickerBirth] = useState<boolean>(false);
  const {updateProfilePreference, isError, isLoading, errorMsg, setIsError} =
    useProfileHook();

  const {
    control,
    formState: {errors, isValid, isValidating},
    getValues,
    setError,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      username: profile.username || '',
      fullname: profile.fullname || '',
      labels: profile.labels || '',
      yearsActiveFrom: profile.yearsActiveFrom || '',
      yearsActiveTo: profile.yearsActiveTo || '',
      locationCountry: profile.locationCountry?.id || 0,
      locationCity: profile.locationCity || '',
      typeOfMusician:
        profile.rolesInIndustry.length > 0 ? profile.rolesInIndustry[0].id : -1,
      gender: profile.gender || '',
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
      const gr = getValue(formatValueName2(profile.genres));
      const md = getValue(formatValueName2(profile.moods));
      const fvgr = getValue(formatValueName2(profile.favoriteGenres));
      const musicianType =
        profile.rolesInIndustry.length > 0 ? profile.rolesInIndustry[0].id : -1;
      setValueGenres(gr);
      setValueMoodsPreference(md);
      setValueGenresPreference(fvgr);
      setValueTypeOfMusician([musicianType]);
      setBirthDate(profile.birthdate);
    }
  }, [profile]);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  useEffect(() => {
    if (
      isValid &&
      valueGenres.length > 0 &&
      valueTypeOfMusician.length > 0 &&
      getValues('yearsActiveFrom') &&
      getValues('yearsActiveTo') &&
      getValues('locationCountry') &&
      getValues('locationCity')
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating, isValid, valueGenres, valueTypeOfMusician, changes]);

  const onPressSave = () => {
    changes ? setShowModal(true) : onPressConfirm();
  };

  const onPressConfirm = async () => {
    setShowModal(false);
    try {
      await updateProfilePreference({
        username: getValues('username'),
        fullname: getValues('fullname'),
        labels: getValues('labels'),
        yearsActiveFrom: getValues('yearsActiveFrom'),
        yearsActiveTo: getValues('yearsActiveTo'),
        locationCountry: getValues('locationCountry'),
        locationCity: getValues('locationCity'),
        gender: getValues('gender'),
        birthdate,
        members: members.filter(val => val !== ''),
        genres: valueGenres as number[],
        moods: valueMoodsPreference as number[],
        favoriteGeneres: valueGenresPreference as number[],
        rolesInIndustry: valueTypeOfMusician as number[],
      });

      storage.set(
        'profile',
        JSON.stringify({...profileStorage(), fullname: getValues('fullname')}),
      );
      storage.set('fetchingProfile', true);
      setIsSubmit(true);
      setChanges(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onPressAddMember = () => {
    if (members[members.length - 1] !== '') {
      setMembers([...members, '']);
      setChanges(true);
    }
  };

  const addMemberOnChange = (text: string, index: number) => {
    let temp = [...members];
    temp[index] = text;
    setMembers(temp);
    setChanges(true);
  };

  const removeMember = (index: number) => {
    if (members.length === 1) {
      setMembers(['']);
    } else {
      let temp = [...members];
      temp.splice(index, 1);
      setMembers(temp);
    }
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

  useEffect(() => {
    if (getValues('username').length < 3 || getValues('username').length > 30) {
      setError('username', {
        type: 'value',
        message: 'Username should be between 3 to 30 alphanumeric characters',
      });
    }
  }, []);

  const soloRole = valueTypeOfMusician[0] !== 3 && valueTypeOfMusician[0] !== 8;

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
            marginBottom: heightPercentage(10),
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
                editable={fromScreen !== 'progress'}
                inputStyles={{
                  color: fromScreen !== 'progress' ? '#fff' : 'gray',
                }}
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
                editable={fromScreen !== 'progress'}
                inputStyles={{
                  color: fromScreen !== 'progress' ? '#fff' : 'gray',
                }}
              />
            )}
          />

          <Dropdown.Multi
            data={formatValueName2(genres) ?? []}
            isRequired={true}
            placeHolder={t('Setting.Account.Placeholder.Genre') || ''}
            dropdownLabel={t('Setting.Account.Label.Genre') || ''}
            textTyped={(_newText: string) => null}
            containerStyles={{marginTop: mvs(15), marginBottom: mvs(5)}}
            initialValue={valueGenres}
            setValues={val => {
              setValueGenres(val);
              setChanges(true);
            }}
          />

          <View style={styles.containerBirth}>
            <Text style={[typography.Overline, {color: Color.Neutral[50]}]}>
              {t('Setting.Account.Label.DateOfBirth')}
            </Text>
            {fromScreen === 'progress' && (
              <Text style={[typography.Overline, {color: Color.Pink[200]}]}>
                {' *' + t('General.Required')}
              </Text>
            )}
          </View>
          <MenuText.RightIcon
            text={birthdate === '' ? 'YYYY-MM-DD' : birthdate}
            containerStyles={{marginTop: mvs(10), marginLeft: ms(4)}}
            icon={
              <ChevronDownIcon
                stroke="#7c7b7c"
                style={{
                  width: widthPercentage(16),
                  height: widthPercentage(16),
                  marginRight: ms(5),
                }}
              />
            }
            onPress={() => setOpenPickerBirth(true)}
          />

          <DatePicker
            modal
            open={openPickerBirth}
            date={birthdate === '' ? new Date() : new Date(birthdate)}
            mode="date"
            theme="dark"
            textColor={Color.Pink[200]}
            onConfirm={date => {
              setOpenPickerBirth(false);
              setBirthDate(dateFormatBirth(date));
            }}
            onCancel={() => {
              setOpenPickerBirth(false);
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

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Controller
              name="yearsActiveFrom"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  initialValue={value}
                  isRequired={true}
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: heightPercentage(4),
            }}>
            <Controller
              name="locationCountry"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  type="location"
                  isRequired={true}
                  initialValue={value}
                  data={dataAllCountry}
                  placeHolder={t('Setting.Account.Placeholder.Country') || ''}
                  dropdownLabel={t('Setting.Account.Label.Location') || ''}
                  textTyped={(newText: {label: string; value: number}) => {
                    onChange(newText.value);
                    setSelectedCountry(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{
                    marginTop: heightPercentage(16),
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

          <Controller
            name="typeOfMusician"
            control={control}
            render={({field: {onChange, value}}) => (
              <Dropdown.Input
                initialValue={value}
                isRequired={true}
                data={formatValueName2(roles) ?? []}
                placeHolder={t('Setting.Account.Label.TypeOfMusician') || ''}
                dropdownLabel={t('Setting.Account.Label.TypeOfMusician') || ''}
                textTyped={(newText: {label: string; value: number}) => {
                  onChange(newText.value);
                  setChanges(true);
                  setValueTypeOfMusician([newText.value]);
                }}
                containerStyles={{
                  marginTop: heightPercentage(15),
                }}
                isError={errors?.typeOfMusician ? true : false}
                errorMsg={errors?.typeOfMusician?.message}
              />
            )}
          />

          {soloRole && (
            <Controller
              name="gender"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Input
                  initialValue={value}
                  data={dataGender}
                  isRequired={true}
                  placeHolder={t('Setting.Account.Placeholder.Gender')}
                  dropdownLabel={t('Setting.Account.Label.Gender')}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setChanges(true);
                  }}
                  containerStyles={{marginTop: heightPercentage(15)}}
                  isError={errors?.gender ? true : false}
                  errorMsg={errors?.gender?.message}
                />
              )}
            />
          )}

          {valueTypeOfMusician[0] === 3 &&
            members.map((val, index) => (
              <SsuInput.InputLabel
                key={index}
                label={
                  index === 0 ? t('Setting.Account.Label.Member') || '' : ''
                }
                value={val}
                onChangeText={text => addMemberOnChange(text, index)}
                placeholder={t('Setting.Account.Placeholder.Member') || ''}
                containerStyles={{
                  marginTop: index === 0 ? heightPercentage(15) : 0,
                }}
                rightIcon={
                  <TouchableOpacity onPress={() => removeMember(index)}>
                    <CloseCircleIcon
                      style={{
                        width: widthPercentage(22),
                        height: widthPercentage(22),
                      }}
                    />
                  </TouchableOpacity>
                }
              />
            ))}

          {valueTypeOfMusician[0] === 3 && (
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
          )}

          <Dropdown.Multi
            data={formatValueName2(genres) ?? []}
            placeHolder={t('Setting.Preference.Placeholder.Genre')}
            dropdownLabel={t('Setting.Preference.Label.GenrePreference')}
            textTyped={(_newText: string) => null}
            containerStyles={{marginTop: mvs(20), marginBottom: mvs(5)}}
            initialValue={valueGenresPreference}
            setValues={val => {
              setValueGenresPreference(val);
              setChanges(true);
            }}
          />

          <Dropdown.Multi
            data={formatValueName2(moods) ?? []}
            placeHolder={t('Setting.Preference.Placeholder.Mood')}
            dropdownLabel={t('Setting.Preference.Label.MoodPreference')}
            textTyped={(_newText: string) => null}
            containerStyles={{marginTop: mvs(15), marginBottom: mvs(5)}}
            initialValue={valueMoodsPreference}
            setValues={val => {
              setValueMoodsPreference(val);
              setChanges(true);
            }}
          />

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
            textStyles={{fontSize: mvs(13)}}
            containerStyles={
              disabledButton ? styles.buttonDisabled : styles.button
            }
            disabled={disabledButton}
          />

          <ModalConfirm
            modalVisible={showModal}
            title={t('Setting.Account.Title') || ''}
            subtitle={t('Setting.Account.Confirm') || ''}
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
  containerBirth: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentage(15),
  },
  titleBirthDate: {
    color: Color.Error[400],
    fontFamily: font.InterRegular,
    fontSize: normalize(10),
    lineHeight: mvs(12),
  },
});
