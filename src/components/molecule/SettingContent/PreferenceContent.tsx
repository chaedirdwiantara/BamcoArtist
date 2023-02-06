import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {ArrowLeftIcon, TickCircleIcon} from '../../../assets/icon';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {ProfileResponseType} from '../../../interface/profile.interface';
import {PreferenceList} from '../../../interface/setting.interface';
import {color, font} from '../../../theme';
import Color from '../../../theme/Color';
import {
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import formatValueName from '../../../utils/formatValueName';
import {Button, Gap, SsuToast} from '../../atom';
import {Dropdown} from '../DropDown';
import {dataProps} from '../DropDown/DropdownMulti';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {TopNavigation} from '../TopNavigation';

type PreferenceContent = {
  onPressGoBack: () => void;
  moods: PreferenceList[];
  genres: PreferenceList[];
  profile: ProfileResponseType | undefined;
};

const PreferenceContent = (props: PreferenceContent) => {
  const {onPressGoBack, genres, moods, profile} = props;
  const {updateProfilePreference, isLoading, errorMsg, successMsg} =
    useProfileHook();

  const [userMoods, setUserMoods] = useState<(number | undefined)[]>([]);
  const [userGenres, setUserGenres] = useState<(number | undefined)[]>([]);
  const [valueMoods, setValueMoods] = useState<(number | undefined)[]>([]);
  const [valueGenres, setValueGenres] = useState<(number | undefined)[]>([]);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

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
      const md = getValue(formatValueName(profile.data?.moods));
      const gr = getValue(formatValueName(profile.data?.favoriteGenres));
      setUserMoods(md);
      setUserGenres(gr);
    }
  }, [profile]);

  const compareArrays = (
    a: (number | undefined)[],
    b: (number | undefined)[],
  ) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  useEffect(() => {
    if (
      !compareArrays(valueGenres, userGenres) ||
      !compareArrays(valueMoods, userMoods)
    )
      setDisabledButton(false);
    else setDisabledButton(true);
  }, [valueMoods, valueGenres]);

  const onSave = async () => {
    await updateProfilePreference({
      moods: valueMoods as number[],
      favoriteGeneres: valueGenres as number[],
    });
  };

  useEffect(() => {
    if (!isLoading && (successMsg !== '' || errorMsg !== ''))
      setTimeout(() => {
        setVisibleModal(true);
      }, 500);
  }, [isLoading, successMsg, errorMsg]);

  return (
    <>
      <TopNavigation.Type1
        title="Preference"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />
      <Dropdown.Multi
        data={formatValueName(genres) ?? []}
        placeHolder={'Select Genre'}
        dropdownLabel={'Genre'}
        textTyped={(_newText: string) => null}
        containerStyles={{marginTop: heightPercentage(15)}}
        initialValue={userGenres}
        setValues={val => setValueGenres(val)}
      />
      <Gap height={10} />
      <Dropdown.Multi
        data={formatValueName(moods) ?? []}
        placeHolder={'Select Mood'}
        dropdownLabel={'Mood'}
        textTyped={(_newText: string) => null}
        containerStyles={{marginTop: heightPercentage(15)}}
        initialValue={userMoods}
        setValues={val => setValueMoods(val)}
      />
      <Gap height={40} />
      <Button
        label="Save"
        textStyles={{fontSize: mvs(14)}}
        onPress={onSave}
        disabled={disabledButton}
        containerStyles={disabledButton ? styles.buttonDisabled : styles.button}
      />
      <ModalLoading visible={isLoading} />
      <SsuToast
        modalVisible={visibleModal}
        onBackPressed={() => setVisibleModal(false)}
        children={
          <View
            style={[
              styles.modalContainer,
              successMsg !== '' && styles.successModal,
              errorMsg !== '' && styles.errorModal,
            ]}>
            {successMsg !== '' && (
              <>
                <TickCircleIcon
                  width={widthResponsive(30)}
                  height={heightPercentage(30)}
                  stroke={color.Neutral[10]}
                />
                <Gap width={widthResponsive(7)} />
                <Text style={[styles.modalText]}>{successMsg}</Text>
              </>
            )}
            {errorMsg !== '' && (
              <>
                <Text style={[styles.modalText]}>{errorMsg}</Text>
              </>
            )}
          </View>
        }
        modalStyle={{marginHorizontal: ms(24)}}
      />
    </>
  );
};

export default PreferenceContent;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
    backgroundColor: Color.Pink[200],
  },
  buttonDisabled: {
    width: '100%',
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
    backgroundColor: Color.Dark[50],
  },
  modalContainer: {
    flexDirection: 'row',
    paddingVertical: mvs(16),
    paddingHorizontal: ms(12),
    borderRadius: 4,
    height: mvs(48),
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: mvs(22),
  },
  modalText: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
    lineHeight: mvs(15),
  },
  successModal: {
    backgroundColor: color.Success[400],
  },
  errorModal: {
    backgroundColor: color.Error[400],
  },
});
