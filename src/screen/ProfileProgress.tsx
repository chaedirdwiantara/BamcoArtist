import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  TooltipIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  InfoCircle2Icon,
  CheckCircle2Icon,
} from '../assets/icon';
import {width, widthPercentage} from '../utils';
import {color, font, typography} from '../theme';
import {RootStackParams} from '../navigations';
import {useProfileHook} from '../hooks/use-profile.hook';
import {MenuText} from '../components/atom/MenuText/MenuText';
import {Gap, ModalCustom, TopNavigation} from '../components';
import {listRequiredAccount, listRequiredProfile} from '../data/home';
import {ProgressCard} from '../components/molecule/ListCard/ProgressCard';
import {ModalLoading} from '../components/molecule/ModalLoading/ModalLoading';

interface CompletedType {
  account: boolean;
  profile: boolean;
}

interface UncompleteListType {
  account: string[];
  profile: string[];
}

export const ProfileProgressScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    isLoading,
    dataProfile,
    profileProgress,
    getProfileUser,
    getProfileProgress,
  } = useProfileHook();
  const [completed, setCompleted] = useState<CompletedType>({
    account: false,
    profile: false,
  });
  const [modalInfo, setModalInfo] = useState({
    show: false,
    type: 'account',
  });
  const [uncompleteList, setUncompleteList] = useState<UncompleteListType>({
    account: [],
    profile: [],
  });

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
      getProfileProgress();
    }, []),
  );

  useEffect(() => {
    // all required input = done, if unchecked list is empty.
    if (profileProgress) {
      setCompleted({
        account: profileProgress.uncompleteList.accountInformation.length === 0,
        profile: profileProgress.uncompleteList.profileInformation.length === 0,
      });
      setUncompleteList({
        account: profileProgress.uncompleteList.accountInformation,
        profile: profileProgress.uncompleteList.profileInformation,
      });
    }
  }, [profileProgress]);

  const goBack = () => {
    navigation.goBack();
  };

  const iconRight = (isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle2Icon stroke="#FF7ED8" />;
    } else {
      return <ArrowRightIcon stroke={color.Success[400]} />;
    }
  };

  const onPressGoTo = (
    screenName: 'AccountInformation' | 'EditProfile',
    isCompleted: boolean,
  ) => {
    if (isCompleted) {
      null;
    } else {
      if (dataProfile) {
        if (screenName === 'AccountInformation') {
          navigation.navigate(screenName, {
            data: dataProfile?.data,
            fromScreen: 'progress',
          });
        } else {
          navigation.navigate(screenName, {data: dataProfile?.data});
        }
      }
    }
  };

  const children = (type: string) => {
    const content =
      type === 'account' ? listRequiredAccount : listRequiredProfile;
    const title =
      type === 'account'
        ? t('ProfileProgress.Tab.AccountInformation')
        : t('ProfileProgress.Tab.ProfileInformation');
    const uncompleteListTemp =
      type === 'account'
        ? uncompleteList.account.filter(val => val !== 'Expectation')
        : uncompleteList.profile;
    const uncompleteSubtitle =
      uncompleteListTemp.length > 0
        ? t('ProfileProgress.SubtitleTooltip')
        : t('ProfileProgress.SubtitleTooltipFinish');

    return (
      <View style={styles.card}>
        <Text style={[typography.Heading6, {color: color.Neutral[10]}]}>
          {title}
        </Text>
        <Text style={styles.subtitleModal}>{uncompleteSubtitle}</Text>
        {uncompleteListTemp.length > 0 &&
          content.map(val => {
            const unFilled =
              uncompleteListTemp.filter(item => item === t(val)).length > 0;
            const index = uncompleteListTemp.indexOf(t(val));

            if (unFilled) {
              return (
                <View style={styles.containerItem} key={index}>
                  <Text style={styles.listItem}>{index + 1 + '. '}</Text>
                  <Text style={styles.listItem}>{t(val)}</Text>
                  <Gap width={ms(7)} />
                  <InfoCircle2Icon />
                </View>
              );
            }
          })}
        <View style={styles.dismissContainer}>
          <TouchableOpacity
            onPress={() =>
              setModalInfo({
                show: false,
                type: 'account',
              })
            }>
            <Text style={styles.option}>{t('Btn.Dismiss')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('ProfileProgress.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={goBack}
        containerStyles={{
          marginBottom: mvs(25),
          paddingHorizontal: widthPercentage(15),
        }}
      />

      <ProgressCard percentage={profileProgress?.stepProgress} />
      <View style={styles.containerContent}>
        <Text style={styles.title}>{t('ProfileProgress.Title2')}</Text>
        <MenuText.RightIcon
          text={t('ProfileProgress.Tab.AccountInformation') ?? '-'}
          containerStyles={{marginTop: mvs(10)}}
          icon={iconRight(completed.account)}
          tooltip={<TooltipIcon style={{marginLeft: ms(5)}} />}
          activeOpacity={completed.account ? 1 : 0}
          onPress={() => onPressGoTo('AccountInformation', completed.account)}
          onPressTooltip={() =>
            setModalInfo({
              show: true,
              type: 'account',
            })
          }
        />
        <MenuText.RightIcon
          text={t('ProfileProgress.Tab.ProfileInformation') ?? '-'}
          containerStyles={{marginTop: mvs(10)}}
          icon={iconRight(completed.profile)}
          tooltip={<TooltipIcon style={{marginLeft: ms(5)}} />}
          activeOpacity={completed.profile ? 1 : 0}
          onPress={() => onPressGoTo('EditProfile', completed.profile)}
          onPressTooltip={() =>
            setModalInfo({
              show: true,
              type: 'profile',
            })
          }
        />
      </View>
      <ModalLoading visible={isLoading} />
      <ModalCustom
        modalVisible={modalInfo.show}
        children={children(modalInfo.type)}
        onPressClose={() =>
          setModalInfo({
            ...modalInfo,
            show: false,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  title: {
    fontSize: mvs(18),
    fontFamily: font.InterRegular,
    fontWeight: '600',
    color: color.Neutral[10],
    marginBottom: mvs(10),
  },
  containerContent: {
    alignSelf: 'center',
    marginTop: mvs(30),
  },
  card: {
    width: width * 0.9,
    backgroundColor: color.Dark[900],
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: widthPercentage(20),
    paddingVertical: mvs(25),
  },
  subtitleModal: {
    fontSize: mvs(13),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    lineHeight: mvs(16),
    color: color.Neutral[10],
    marginVertical: mvs(10),
  },
  uncompleteList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    fontSize: mvs(13),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    lineHeight: mvs(16),
    color: color.Neutral[10],
  },
  dismissContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: mvs(25),
  },
  option: {
    fontSize: mvs(13),
    paddingHorizontal: widthPercentage(12),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mvs(10),
  },
});
