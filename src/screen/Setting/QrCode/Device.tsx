import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ArrowLeftIcon} from '../../../assets/icon';
import {
  Button,
  Gap,
  LinkedDevicesCard,
  SsuDivider,
  TopNavigation,
} from '../../../components';
import {color, font} from '../../../theme';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {heightResponsive, widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import {useQrCodeHook} from '../../../hooks/use-qrCode.hook';
import {userProfile} from '../../../store/userProfile.store';
import LoadingSpinner from '../../../components/atom/Loading/LoadingSpinner';
import {LinkedDevicesData} from '../../../interface/qrcode.interface';

const Device = () => {
  const {t} = useTranslation();
  const {profileStore} = userProfile();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    linking,
    linkedDone,
    linkedFailed,
    loggedOutSuccess,
    linkedDevicesData,
    setLinkedDone,
    setLinkData,
    getLinkedDevices,
    setLogoutDevice,
  } = useQrCodeHook();
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);

  // Camera
  const devices = useCameraDevices();
  const device = devices.back;

  const [refCode, setRefCode] = useState<string>();
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [linkedDevicesState, setLinkedDevicesState] =
    useState<LinkedDevicesData[]>();
  const [linkedDeviceChoosen, setLinkedDeviceChoosen] = useState<{
    qrCode: string;
    index: number;
  }>();

  // ? getting linked devices when accessing this screen
  useFocusEffect(
    useCallback(() => {
      getLinkedDevices({uuid: profileStore.data.uuid});
    }, []),
  );

  // ? linking data when get qr value
  useEffect(() => {
    if (refCode) {
      setLinkData({
        uuid: profileStore.data.uuid,
        QRCode: refCode,
        deviceName: refCode.split('=')[1] ?? 'Unknown Device',
      });
    }
  }, [refCode]);

  // ? hide camera when successfully linking data
  useEffect(() => {
    if (linkedDone) {
      setShowScanner(false);
      const timer = setTimeout(() => {
        getLinkedDevices({
          uuid: profileStore.data.uuid,
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [linkedDone]);

  useEffect(() => {
    togleActiveState();
  }, [barcodes]);

  const togleActiveState = async () => {
    if (barcodes && barcodes.length > 0) {
      barcodes.forEach(async scannedBarcode => {
        if (
          scannedBarcode.rawValue !== '' &&
          scannedBarcode.rawValue !== undefined
        ) {
          setRefCode(scannedBarcode.rawValue);
        }
      });
    }
  };

  // ? set linked devices to linked devices useState
  useEffect(() => {
    if (linkedDevicesData) {
      setLinkedDevicesState(linkedDevicesData);
    }
  }, [linkedDevicesData]);

  // ? filter choosen logout when logout succeeded
  useEffect(() => {
    if (loggedOutSuccess) {
      const device = linkedDevicesState?.filter(
        x => !linkedDeviceChoosen?.qrCode.includes(x.qrCode),
      );
      setLinkedDevicesState(device);
    }
  }, [loggedOutSuccess]);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const handleScanButton = () => {
    setLinkedDone(false);
    setShowScanner(true);
  };

  const handleLogout = (qrCode: string, index: number) => {
    setLogoutDevice({QRCode: qrCode});
    setLinkedDeviceChoosen({qrCode, index});
  };

  const OffScanner = () => {
    return (
      <View style={styles.imageContainer}>
        {linking && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner />
          </View>
        )}
        <Image
          style={styles.image}
          source={require('../../../assets/image/LinkDevices.png')}
        />
        <Gap height={24} />
        <Text style={styles.caption}>{t('Setting.QrCode.Device.Caption')}</Text>
        <Gap height={24} />
        <Button
          label={t('Setting.QrCode.Device.Button')}
          containerStyles={styles.buttonStyle}
          onPress={handleScanButton}
        />
        <Gap height={24} />
        <Text style={styles.linkedTitle}>
          {t('Setting.QrCode.Device.LinkedTitle')}
        </Text>
        <SsuDivider />
        <Gap height={24} />
        {/* EMPTY STATE TEXT */}
        <ScrollView
          scrollEnabled={true}
          style={{width: '100%', height: heightResponsive(245)}}
          showsVerticalScrollIndicator={false}>
          {linkedDevicesState ? (
            linkedDevicesState?.map((val, i) => (
              <LinkedDevicesCard
                data={val}
                index={i}
                onPress={() => handleLogout(val.qrCode, i)}
              />
            ))
          ) : (
            <Text style={styles.emptyStateTxt}>
              {t('Setting.QrCode.Device.EmptyStateLinked')}
            </Text>
          )}
        </ScrollView>
        <Gap height={35} />
        <View style={styles.deviceInfoContainer}>
          <Text style={styles.deviceInfo}>
            {t('Setting.QrCode.Device.Tips')}
          </Text>
        </View>
      </View>
    );
  };

  const OnScanner = () => {
    return (
      <View style={styles.scannerContainer}>
        <Text style={styles.scannerCaption}>
          {t('Setting.QrCode.Device.onScannerCaption', {
            link: 'http://musician.thebeam.co',
          })}
        </Text>
        <Gap height={24} />
        {device !== undefined ? (
          <Camera
            style={{flex: 1}}
            device={device}
            isActive={showScanner}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
        ) : (
          ''
        )}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.QrCode.Device.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthResponsive(12)}}
      />
      <Gap height={32} />
      <View style={styles.childContainer}>
        {!showScanner ? OffScanner() : OnScanner()}
      </View>
    </View>
  );
};

export default Device;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  childContainer: {
    alignItems: 'center',
    paddingHorizontal: widthResponsive(24),
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: widthResponsive(205),
    height: widthResponsive(170),
    resizeMode: 'cover',
  },
  caption: {
    fontFamily: font.InterRegular,
    textAlign: 'center',
    fontSize: mvs(12),
    fontWeight: '500',
    color: color.Neutral[110],
    maxWidth: '75%',
  },
  buttonStyle: {
    width: '100%',
    aspectRatio: widthResponsive(279 / 40),
  },
  linkedTitle: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '500',
    color: color.Neutral[10],
    alignSelf: 'flex-start',
    marginBottom: widthResponsive(8),
  },
  emptyStateTxt: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
    color: color.Neutral[110],
    alignSelf: 'flex-start',
  },
  scannerContainer: {
    width: widthResponsive(289),
    height: widthResponsive(289),
  },
  scannerCaption: {
    fontFamily: font.InterRegular,
    fontSize: mvs(14),
    fontWeight: '600',
    color: color.Neutral[10],
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: widthResponsive(20),
  },
  deviceInfoContainer: {
    position: 'absolute',
    bottom: 0,
  },
  deviceInfo: {
    fontFamily: font.InterRegular,
    color: color.Pink[200],
    fontWeight: '500',
    fontSize: mvs(12),
  },
});
