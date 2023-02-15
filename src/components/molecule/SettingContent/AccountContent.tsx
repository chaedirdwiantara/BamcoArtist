import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
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
import {dataProps} from '../DropDown/DropdownMulti';
import {dataFavourites} from '../../../data/following';
import {color, font, typography} from '../../../theme';
import {Button, Gap, SsuInput, SsuToast} from '../../atom';
import {DataDropDownType} from '../../../data/dropdown';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {dataYearsFrom, dataYearsTo} from '../../../data/Settings/account';
import {ProfileResponseType} from '../../../interface/profile.interface';
import {ArrowLeftIcon, ErrorIcon, TickCircleIcon} from '../../../assets/icon';

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
  const [userGenres, setUserGenres] = useState<(string | number | undefined)[]>(
    [],
  );
  const [valueGenres, setValueGenres] = useState<(number | undefined)[]>([]);
  const [members, setMembers] = useState<string[]>(
    profile?.data.members || [''],
  );

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

  const onPressSave = async () => {
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

    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
      if (!isError && !isLoading) {
        setToastVisible(true);
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
          title="Account"
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
                label="Username"
                value={value}
                onChangeText={text => {
                  onChange(text.toLowerCase());
                  setIsError(false);
                }}
                placeholder={'Add Username'}
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
                label="Musician Name"
                value={value}
                onChangeText={text => {
                  onChange(text);
                  setIsError(false);
                }}
                placeholder={'Add Musician Name'}
                isError={errors?.fullname ? true : false}
                errorMsg={errors?.fullname?.message}
                containerStyles={{marginTop: heightPercentage(15)}}
              />
            )}
          />

          <Dropdown.Multi
            data={formatValueName(dataFavourites[0]?.favorites) ?? []}
            placeHolder={'Select Genre'}
            dropdownLabel={'Genre'}
            textTyped={(_newText: string) => null}
            containerStyles={{marginTop: heightPercentage(15)}}
            initialValue={userGenres}
            setValues={val => setValueGenres(val)}
          />

          <Controller
            name="labels"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputLabel
                label="Label"
                value={value}
                onChangeText={text => {
                  onChange(text);
                  setIsError(false);
                }}
                placeholder={'Add Label Name'}
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
                  placeHolder={'Select Years'}
                  dropdownLabel={'Years Active'}
                  textTyped={(newText: {label: string; value: string}) =>
                    onChange(newText.value)
                  }
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
                  placeHolder={'Select Years'}
                  dropdownLabel={''}
                  textTyped={(newText: {label: string; value: string}) =>
                    onChange(newText.value)
                  }
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
                  placeHolder={'Select Country'}
                  dropdownLabel={'Origin'}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setSelectedOrigin(newText.value);
                    setInputType('origin');
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
                  placeHolder={'Select City'}
                  showSearch={true}
                  dropdownLabel={''}
                  textTyped={(newText: {label: string; value: string}) =>
                    onChange(newText.value)
                  }
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
              label={index === 0 ? 'Member' : ''}
              value={val}
              onChangeText={text => {
                let temp = [...members];
                temp[index] = text;
                setMembers(temp);
              }}
              placeholder={'Add Member'}
              containerStyles={{
                marginTop: index === 0 ? heightPercentage(15) : 0,
              }}
            />
          ))}
          <TouchableOpacity onPress={() => setMembers([...members, ''])}>
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
                  placeHolder={'Select Country'}
                  dropdownLabel={'Location'}
                  textTyped={(newText: {label: string; value: string}) => {
                    onChange(newText.value);
                    setSelectedCountry(newText.value);
                    setInputType('location');
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
                  placeHolder={'Select City'}
                  dropdownLabel={''}
                  textTyped={(newText: {label: string; value: string}) =>
                    onChange(newText.value)
                  }
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
            label="Edit"
            onPress={handleSubmit(onPressSave)}
            containerStyles={
              disabledButton ? styles.buttonDisabled : styles.button
            }
            disabled={disabledButton}
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
