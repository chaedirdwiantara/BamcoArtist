import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ArrowLeftIcon} from '../../../assets/icon';
import {
  Button,
  Gap,
  ModalConfirm,
  ReferralContent,
  SsuDivider,
  TopNavigation,
} from '../../../components';
import {color, font} from '../../../theme';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';

const Device = () => {
  const {t} = useTranslation();

  const [showScanner, setShowScanner] = useState<boolean>(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const handleScanButton = () => {
    // navigation.navigate('Scanner');
    setShowScanner(true);
  };

  // Camera
  const devices = useCameraDevices();
  const device = devices.back;

  // QRCode
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);
  const [refCode, setRefCode] = useState<string>();

  useEffect(() => {
    console.log('refCode', refCode);
  }, [refCode]);

  useEffect(() => {
    togleActiveState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodes]);

  const togleActiveState = async () => {
    if (barcodes && barcodes.length > 0) {
      //   setIsScanned(true);

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

  const OffScanner = () => {
    return (
      <View style={styles.imageContainer}>
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
        <Text style={styles.emptyStateTxt}>
          {t('Setting.QrCode.Device.EmptyStateLinked')}
        </Text>
      </View>
    );
  };

  const OnScanner = () => {
    return (
      <View style={styles.scannerContainer}>
        <Text style={styles.scannerCaption}>
          {'Open http://musician.thebeam.co to scan and linked the devices'}
        </Text>
        <Gap height={24} />
        {device !== undefined ? (
          <Camera
            style={{flex: 1}}
            device={device}
            isActive={true}
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
});
