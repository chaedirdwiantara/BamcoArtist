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
import {ProgressCard} from '../components/molecule/ListCard/ProgressCard';
import {ModalLoading} from '../components/molecule/ModalLoading/ModalLoading';

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
  const [completed, setCompleted] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<boolean>(false);
  const [uncompleteList, setUncompleteList] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
      getProfileProgress();
    }, []),
  );

  useEffect(() => {
    // all required input = done, if unchecked list is empty.
    if (profileProgress) {
      const list = profileProgress.uncompleteList.profileAndAccountInformation;
      setCompleted(list.length === 0);
      setUncompleteList(list);
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

  const onPressGoTo = (isCompleted: boolean) => {
    if (isCompleted) {
      null;
    } else {
      if (dataProfile) {
        navigation.navigate('EditProfile', {data: dataProfile?.data});
      }
    }
  };

  const children = () => {
    const uncompleteSubtitle =
      uncompleteList.length > 0
        ? t('ProfileProgress.SubtitleTooltip')
        : t('ProfileProgress.SubtitleTooltipFinish');

    return (
      <View style={styles.card}>
        <Text
          style={[
            typography.Heading6,
            {color: color.Neutral[10], fontWeight: '600'},
          ]}>
          {t('ProfileProgress.Tab.ProfileAccountInformation')}
        </Text>
        <Text style={styles.subtitleModal}>{uncompleteSubtitle}</Text>
        {uncompleteList.length > 0 &&
          uncompleteList.map((val, index) => {
            return (
              <View style={styles.containerItem} key={index}>
                <Text style={styles.listItem}>{index + 1 + '. '}</Text>
                <Text style={styles.listItem}>{val}</Text>
                <Gap width={ms(7)} />
                <InfoCircle2Icon />
              </View>
            );
          })}
        <View style={styles.dismissContainer}>
          <TouchableOpacity onPress={() => setModalInfo(false)}>
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
          text={t('ProfileProgress.Tab.ProfileAccountInformation') ?? '-'}
          containerStyles={{marginTop: mvs(10)}}
          icon={iconRight(completed)}
          tooltip={<TooltipIcon style={{marginLeft: ms(5)}} />}
          activeOpacity={completed ? 1 : 0}
          onPress={() => onPressGoTo(completed)}
          onPressTooltip={() => setModalInfo(true)}
        />
      </View>
      <ModalLoading visible={isLoading} />
      <ModalCustom
        modalVisible={modalInfo}
        children={children()}
        onPressClose={() => setModalInfo(false)}
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
    marginTop: mvs(10),
    marginBottom: mvs(5),
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
