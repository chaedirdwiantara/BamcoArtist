import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {color, typography} from '../../theme';
import {mvs} from 'react-native-size-matters';

export const ReferralCodeSetting: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    isValidReferral,
    errorMsg,
    applyReferralUser,
    dataProfile,
    getProfileUser,
  } = useProfileHook();

  // Refferal Content
  const [isScanFailed, setIsScanFailed] = useState<boolean>(false);
  const [refCode, setRefCode] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isScanSuccess, setIsScanSuccess] = useState<boolean>(false);
  const [isManualEnter, setIsManualEnter] = useState<boolean>(false);
  const [isScanned, setIsScanned] = useState(false);

  const onApplyReferral = (referralCode: string) => {
    applyReferralUser(referralCode);
  };

  useEffect(() => {
    getProfileUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      dataProfile?.data.referralFrom !== null &&
      dataProfile?.data.referralFrom !== undefined
    ) {
      setIsScanSuccess(true);
      setRefCode(dataProfile?.data.referralFrom);
    } else setIsScanSuccess(false);
  }, [dataProfile]);

  const handleSkipFailed = () => {
    setIsScanFailed(false);
    setIsScanning(true);
    setIsScanned(false);
    setRefCode('');
  };

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const filter = [
    {filterName: t('Setting.Referral.ReferFriend.Title')},
    {
      filterName:
        refCode !== ''
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
    <View style={styles.root}>
      {isScanFailed && !isScanSuccess ? (
        <View style={styles.backgroundFailed}>
          <View style={styles.containerFailed}>
            <Text style={[typography.Heading6, styles.titleStart]}>
              {t('Setting.ReferralQR.ScanFailed.Title')}
            </Text>
            <Text style={[typography.Body1, styles.titleStart]}>
              {t('Setting.ReferralQR.ScanFailed.Desc')}
            </Text>
            <TouchableOpacity onPress={handleSkipFailed}>
              <Text style={[typography.Body2, styles.titleEnd]}>
                {t('Setting.ReferralQR.ScanFailed.Btn')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        ''
      )}
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

      {dataProfile && (
        <>
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
              username={dataProfile.data.username}
              handleWebview={handleWebview}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 40,
              }}>
              <UseReferralContent
                onPress={onApplyReferral}
                isError={errorMsg !== ''}
                errorMsg={errorMsg}
                isValidRef={isValidReferral}
                isScanFailed={isScanFailed}
                setIsScanFailed={setIsScanFailed}
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
                referralFrom={dataProfile.data.referralFrom}
              />
            </View>
          )}
        </>
      )}
    </View>
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
