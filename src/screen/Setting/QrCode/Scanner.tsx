import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {Gap, TopNavigation} from '../../../components';
import {color} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {ArrowLeftIcon} from '../../../assets/icon';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';

const Scanner = () => {
  const {t} = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  // Camera
  const devices = useCameraDevices();
  const device = devices.back;

  // QRCode
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);
  const [refCode, setRefCode] = useState<string>();

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
      <View style={styles.scannerContainer}>
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
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthResponsive(24),
  },
  scannerContainer: {
    width: 289,
    height: 289,
    backgroundColor: 'white',
  },
});
