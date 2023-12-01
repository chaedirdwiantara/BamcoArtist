import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  ReferAFriend,
  TabFilter,
  TopNavigation,
  UseReferralContent,
} from '../../components';
import Color from '../../theme/Color';
import {ArrowLeftIcon} from '../../assets/icon';
import {RootStackParams} from '../../navigations';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {heightPercentage, width, widthPercentage} from '../../utils';
import {color} from '../../theme';
import {mvs} from 'react-native-size-matters';
import {userProfile} from '../../store/userProfile.store';
import {KeyboardShift} from '../../components/molecule/KeyboardShift';

export const ReferralCodeSetting: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {isValidReferral, errorMsg, applyReferralUser, isLoading} =
    useProfileHook();

  const {profileStore} = userProfile();

  // Refferal Content
  const [refCode, setRefCode] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isScanSuccess, setIsScanSuccess] = useState<boolean>(false);
  const [isManualEnter, setIsManualEnter] = useState<boolean>(false);
  const [isScanned, setIsScanned] = useState(false);

  const onApplyReferral = (referralCode: string) => {
    applyReferralUser(referralCode);
  };

  useEffect(() => {
    if (
      profileStore?.data.referralFrom !== null &&
      profileStore?.data.referralFrom !== undefined
    ) {
      setIsScanSuccess(true);
      setRefCode(profileStore?.data.referralFrom);
    } else setIsScanSuccess(false);
  }, [profileStore]);

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const filter = [
    {filterName: t('Setting.Referral.ReferFriend.Title')},
    {
      filterName:
        !isScanning && refCode !== ''
          ? t('Setting.Referral.ReferUsed.Title')
          : t('Setting.Referral.UseRefer.Title'),
    },
  ];

  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const handleWebview = (title: string, url: string) => {
    navigation.navigate('Webview', {
      title: title,
      url: url,
    });
  };

  return (
    <KeyboardShift>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('Setting.Referral.Title')}
          leftIcon={<ArrowLeftIcon />}
          itemStrokeColor={Color.Neutral[10]}
          leftIconAction={onPressGoBack}
          containerStyles={{
            marginBottom: heightPercentage(15),
            paddingHorizontal: widthPercentage(10),
          }}
        />

        {profileStore && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View>
              <TabFilter.Type1
                filterData={filter}
                onPress={filterData}
                selectedIndex={selectedIndex}
                TouchableStyle={{width: width * 0.45}}
                translation={true}
              />

              {filter[selectedIndex].filterName ===
              t('Setting.Referral.ReferFriend.Title') ? (
                <ReferAFriend
                  username={profileStore.data.username}
                  handleWebview={handleWebview}
                />
              ) : (
                <ScrollView
                  decelerationRate="fast"
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled">
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      paddingTop: 40,
                    }}>
                    <UseReferralContent
                      isLoading={isLoading}
                      onPress={onApplyReferral}
                      isError={errorMsg !== ''}
                      errorMsg={errorMsg}
                      isValidRef={isValidReferral}
                      refCode={refCode}
                      setRefCode={setRefCode}
                      isScanning={isScanning}
                      setIsScanning={setIsScanning}
                      isScanSuccess={isScanSuccess}
                      setIsScanSuccess={setIsScanSuccess}
                      isScanned={isScanned}
                      setIsScanned={setIsScanned}
                      isManualEnter={isManualEnter}
                      setIsManualEnter={setIsManualEnter}
                      referralFrom={profileStore.data.referralFrom}
                    />
                  </View>
                </ScrollView>
              )}
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
  titleStart: {
    color: color.Neutral[10],
    marginVertical: mvs(10),
  },
  titleEnd: {
    textAlign: 'right',
    color: color.Neutral[10],
    marginVertical: mvs(10),
  },
  backgroundFailed: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 10,
    borderRadius: 4,
    padding: 16,
    gap: 16,
    alignItems: 'center',
  },
  containerFailed: {
    width: '90%',
    marginTop: 220,
    backgroundColor: color.Dark[800],
    padding: 24,
  },
});
