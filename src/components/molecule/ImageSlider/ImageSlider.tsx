import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  ProfileResponseType,
  LastStepResponseType,
  GetStepResponseType,
} from '../../../interface/profile.interface';
import {SelectBox} from '../../../components';
import {FooterContent} from './FooterContent';
import {DataOnboardType} from '../../../data/onboard';
import {StepProfile} from '../StepWizard/StepProfile';
import {color, font, typography} from '../../../theme';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {UpdateProfilePropsType} from '../../../api/profile.api';
import {PreferenceList} from '../../../interface/setting.interface';
import {heightPercentage, width, widthPercentage} from '../../../utils';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface ImageSliderProps {
  type?: string;
  data: any;
  onPress: () => void;
  onUpdateProfile?: (props?: UpdateProfilePropsType) => void;
  isLoading: boolean;
  profile?: ProfileResponseType | undefined;
  genres?: PreferenceList[];
  setLastStepWizard?: (props: LastStepResponseType) => void;
  infoStep?: GetStepResponseType;
}

export interface Step3Props {
  imageProfileUrl: string;
  username: string;
  fullname: string;
  bio: string;
  favoriteGeneres: number[];
}

export interface Step3ErrorProps {
  imageProfileUrl: boolean;
  username: boolean;
  fullname: boolean;
  bio: boolean;
  favoriteGeneres: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  type,
  data,
  onPress,
  onUpdateProfile,
  profile,
  isLoading,
  setLastStepWizard,
  genres,
  infoStep,
}) => {
  const {t} = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedRole, setSelectedRole] = useState<number[]>([]);
  const [selectedExpectations, setSelectedExpectations] = useState<number[]>(
    [],
  );
  const [activeIndexSlide, setActiveIndexSlide] = useState<number>(0);
  const [stateProfile, setStateProfile] = useState<Step3Props>({
    imageProfileUrl: '',
    fullname: '',
    username: '',
    bio: '',
    favoriteGeneres: [],
  });
  const [errorProfile, setErrorProfile] = useState<Step3ErrorProps>({
    imageProfileUrl: false,
    fullname: false,
    username: false,
    bio: false,
    favoriteGeneres: false,
  });

  const dataArray = [
    {
      step: t('Preference.Step.Step1'),
      title: t('Preference.Title.Title1'),
      subtitle: t('Preference.Subtitle.Subtitle1'),
      list: data.role,
    },
    {
      step: t('Preference.Step.Step2'),
      title: t('Preference.Title.Title2'),
      subtitle: t('Preference.Subtitle.Subtitle2'),
      list: [],
    },
    {
      step: t('Preference.Step.Step3'),
      title: t('Preference.Title.Title3'),
      subtitle: t('Preference.Subtitle.Subtitle3'),
      list: [],
    },
    {
      step: t('Preference.Step.Step4'),
      title: t('Preference.Title.Title4'),
      subtitle: t('Preference.Subtitle.Subtitle4'),
      list: data.expectation,
    },
  ];

  useEffect(() => {
    if (profile) {
      setStateProfile({
        ...stateProfile,
        fullname: profile.data.fullname,
        username: profile.data.username,
      });
    }
  }, [profile]);

  useEffect(() => {
    if (infoStep) {
      const newIndex = infoStep.lastStep;
      setActiveIndexSlide(newIndex);
      scrollViewRef.current?.scrollTo({
        x: width * newIndex,
        y: 0,
        animated: true,
      });
    }
  }, [infoStep]);

  const handleNextSlide = async () => {
    if (activeIndexSlide !== 1 && onUpdateProfile) {
      onUpdateProfile({
        ...stateProfile,
        rolesInIndustry: selectedRole,
        expectations: selectedExpectations,
      });
    }
    const newIndex = activeIndexSlide + 1;
    setActiveIndexSlide(newIndex);
    setLastStepWizard && setLastStepWizard({lastStep: newIndex});
    scrollViewRef.current?.scrollTo({
      x: width * newIndex,
      y: 0,
      animated: true,
    });
  };

  const onPressBack = () => {
    const newIndex = activeIndexSlide - 1;
    setActiveIndexSlide(newIndex);
    scrollViewRef.current?.scrollTo({
      x: width * newIndex,
      y: 0,
      animated: true,
    });
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.ceil(offsetX / width);
    const totalPage = type === 'Preference' ? 4 : 3;
    page < totalPage
      ? setActiveIndexSlide(Math.ceil(offsetX / width))
      : onPress;
  };

  const lastOnPress = () => {
    onPress();
    if (onUpdateProfile) {
      onUpdateProfile({
        expectations: selectedExpectations,
      });
    }
    if (setLastStepWizard) {
      setLastStepWizard({lastStep: dataArray.length});
    }
  };

  const onPressNext =
    type === 'Preference'
      ? activeIndexSlide === dataArray.length - 1
        ? lastOnPress
        : handleNextSlide
      : activeIndexSlide === data.length - 1
      ? onPress
      : handleNextSlide;

  const heightContent =
    type === 'Preference'
      ? {
          height: '80%',
        }
      : {
          height: '65%',
        };

  return (
    <View style={styles.root}>
      {type === 'Preference' ? (
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled={true}
          snapToInterval={width}
          decelerationRate="fast"
          scrollEventThrottle={200}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.containerScrollView, heightContent]}
          scrollEnabled={false}>
          {dataArray.map((item, index) => {
            const selected = index === 0 ? selectedRole : selectedExpectations;
            const setSelected =
              index === 0 ? setSelectedRole : setSelectedExpectations;

            return (
              <View key={index}>
                <TouchableOpacity
                  style={styles.containerSkip}
                  onPress={onPress}>
                  <Text style={styles.textSkip}>{t('Btn.Skip')}</Text>
                </TouchableOpacity>
                <View style={styles.containerStep}>
                  <Text style={styles.textStep}>{item.step}</Text>
                  <Text style={[typography.Heading4, styles.title]}>
                    {item.title}
                  </Text>
                  <Text style={styles.textSubtitle}>{item.subtitle}</Text>
                  {index === 2 ? (
                    <StepProfile
                      genres={genres}
                      stateProfile={stateProfile}
                      setStateProfile={setStateProfile}
                      errorProfile={errorProfile}
                      setErrorProfile={setErrorProfile}
                    />
                  ) : (
                    <SelectBox
                      selected={selected}
                      setSelected={setSelected}
                      data={item.list}
                      type={index === 0 ? 'single' : 'multiple'}
                    />
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled={true}
          snapToInterval={width}
          decelerationRate="fast"
          scrollEventThrottle={200}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.containerScrollView, heightContent]}
          onScroll={handleScroll}>
          {data.map((item: DataOnboardType, index: number) => {
            return (
              <Image
                key={index}
                source={item.uri}
                style={styles.image}
                resizeMode={'cover'}
              />
            );
          })}
        </ScrollView>
      )}

      <FooterContent
        type={type}
        activeIndexSlide={activeIndexSlide}
        data={type === 'Preference' ? dataArray : data}
        onPressBack={onPressBack}
        onPressGoTo={onPress}
        onPressNext={onPressNext}
      />
      <ModalLoading visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScrollView: {
    height: '100%',
  },
  image: {
    width,
    height: Platform.OS === 'ios' ? '95%' : '85%',
  },
  title: {
    textAlign: 'center',
    color: color.Neutral[10],
    marginVertical: mvs(10),
  },
  containerStep: {
    paddingTop: heightPercentage(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSkip: {
    position: 'absolute',
    right: widthPercentage(30),
    zIndex: 1,
  },
  textSkip: {
    fontSize: mvs(14),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    lineHeight: mvs(17),
    color: color.Success[400],
  },
  textStep: {
    fontSize: mvs(12),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    lineHeight: mvs(14.5),
    color: color.Neutral[10],
    textAlign: 'center',
  },
  textSubtitle: {
    fontSize: mvs(12),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    lineHeight: mvs(14.5),
    color: '#788AA9',
    textAlign: 'center',
    maxWidth: width * 0.8,
    marginBottom: mvs(30),
  },
});
