import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import styles from './styles';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {Button, Gap, SsuDivider, SsuInput} from '../../atom';
import {CheckCircleIcon, CoinCIcon, GiftIcon} from '../../../assets/icon';
import ReferralQRImage from '../../../assets/image/ReferralQR.image';
import {widthResponsive} from '../../../utils';
import {useTranslation} from 'react-i18next';
import {color} from '../../../theme';
import {ms, mvs} from 'react-native-size-matters';
import ReferralQRSuccessImage from '../../../assets/image/ReferralQRSuccess.image';

interface ReferralContentProps {
  containerStyle?: ViewStyle;
  onPress?: (refCode: string) => void;
  onSkip?: () => void;
  isError: boolean;
  errorMsg: string;
  isValidRef: boolean | null;
}

interface ActivatedProps {
  refCode?: string;
}

const titleToScan = 'Setting.ReferralQR.OnBoard.Title';
const titleScanSuccess = 'Setting.ReferralQR.OnBoard.SuccessTitle';
const descriptionToScan = 'Setting.ReferralQR.OnBoard.Subtitle';
const descriptionScanSuccess = 'Setting.ReferralQR.OnBoard.SuccessDesc';
const dividerOnScan = 'Setting.ReferralQR.OnBoard.DividerOnScan';
const dividerOnManualEnter = 'Setting.ReferralQR.OnBoard.DividerOnManualEnter';
const referralAddedTitle = 'Setting.ReferralQR.OnBoard.ReferralAdded';
const friendReferral = 'Setting.ReferralQR.UseRefer.Text2';
const refCannotBeChanged = 'Setting.ReferralQR.UseRefer.Text3';

const ReferralActivated: React.FC<ActivatedProps> = ({refCode}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.containerActivated}>
      <View style={styles.containerReferralCode}>
        <Text style={[Typography.Subtitle2, styles.textFriendRef]}>
          {t(friendReferral)}
        </Text>
        <View style={styles.containerCode}>
          <CheckCircleIcon />
          <Text style={[Typography.Heading6, styles.refCode]}>{refCode}</Text>
        </View>
      </View>
      <Text style={[Typography.Overline, styles.note]}>
        {t(refCannotBeChanged)}
      </Text>
    </View>
  );
};

export const ReferralContent: React.FC<ReferralContentProps> = ({
  containerStyle,
  onPress,
  onSkip,
  isError,
  errorMsg,
  isValidRef,
}) => {
  const {t} = useTranslation();
  const [refCode, setRefCode] = useState<string>('');
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isScanSuccess, setIsScanSuccess] = useState<boolean>(false);
  const [isScanFailed, setIsScanFailed] = useState<boolean>(false);
  const [isManualEnter, setIsManualEnter] = useState<boolean>(false);

  // Camera
  const devices = useCameraDevices();
  const device = devices.back;

  // Camera Handler
  async function getPermission() {
    const permission = await Camera.requestCameraPermission();
    console.log(`camera permission status : ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }

  useEffect(() => {
    if (isScanning) {
      getPermission();
    }
  }, [isScanning]);

  useEffect(() => {
    if (isValidRef) {
      setIsScanSuccess(isValidRef);
    }
  }, [isValidRef]);

  // QRCode
  const [isScanned, setIsScanned] = useState(false);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);

  useEffect(() => {
    togleActiveState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodes]);

  useEffect(() => {
    console.log('refcode :', refCode);
    if (onPress && refCode !== '') {
      onPress(refCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refCode]);

  const togleActiveState = async () => {
    if (barcodes && barcodes.length > 0 && isScanned === false) {
      setIsScanned(true);

      barcodes.forEach(async scannedBarcode => {
        if (
          scannedBarcode.rawValue !== '' &&
          scannedBarcode.rawValue !== undefined
        ) {
          setRefCode(scannedBarcode.rawValue);
          console.log(
            '🚀 ~ file: ReferralContent.tsx:129 ~ togleActiveState ~ scannedBarcode:',
            scannedBarcode,
          );
          console.log('scanned barcode :', scannedBarcode.rawValue);
        }
      });
    }
  };

  const handleScanning = () => {
    setIsScanning(true);
    setIsManualEnter(false);
  };

  const handleManualEnter = () => {
    setIsManualEnter(true);
    setIsScanning(false);
  };

  const handleFocusInput = (input: string | null) => {
    setFocusInput(input);
  };

  const SubmitIconComp = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress && onPress(refCode);
        }}
        style={{padding: ms(4)}}>
        <CoinCIcon stroke={Color.Neutral[10]} fill="white" />
      </TouchableOpacity>
    );
  };

  if (device == null) {
    return <Text>Camera is not available</Text>;
  }

  return (
    <View style={[styles.root, containerStyle]}>
      <View style={{width: 5}}>
        <Button
          label={t('Btn.Skip')}
          type="border"
          borderColor="transparent"
          textStyles={{fontSize: mvs(14), color: color.Success[400]}}
          onPress={() => {
            onSkip && onSkip();
          }}
        />
      </View>
      <Text style={[Typography.Subtitle2, styles.preTitle]}>Step 2 of 4</Text>
      <View style={styles.containerText}>
        <Text style={[Typography.Heading4, styles.title]}>
          {isScanSuccess ? t(titleScanSuccess) : t(titleToScan)}
        </Text>
        <Text style={[Typography.Subtitle2, styles.description]}>
          {isScanSuccess ? t(descriptionScanSuccess) : t(descriptionToScan)}
        </Text>
      </View>
      {isScanning && !isScanSuccess ? (
        <>
          <View
            style={{
              width: 289,
              height: 289,
              backgroundColor: 'white',
            }}>
            <Camera
              style={{flex: 1}}
              device={device}
              isActive={true}
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
            />
          </View>
          <Gap height={32} />
        </>
      ) : isScanSuccess ? (
        <>
          <Gap height={8} />
          <ReferralQRSuccessImage />
          <Gap height={16} />
        </>
      ) : (
        <ReferralQRImage />
      )}

      {isManualEnter && !isScanSuccess ? (
        <View style={elStyles.container}>
          <SsuInput.InputText
            value={refCode}
            isError={isError}
            placeholder={t('Setting.Referral.Title') || ''}
            errorMsg={errorMsg}
            rightIcon={true}
            rightIconComponent={<SubmitIconComp />}
            leftIcon={<GiftIcon />}
            fontColor={Color.Neutral[10]}
            borderColor={Color.Pink.linear}
            onChangeText={(newText: string) => setRefCode(newText)}
            onFocus={() => {
              handleFocusInput('refcode');
            }}
            onBlur={() => {
              handleFocusInput(null);
            }}
            isFocus={focusInput === 'refcode'}
          />
          <Gap height={24} />
        </View>
      ) : (
        ''
      )}

      {isScanning || isManualEnter || isScanSuccess ? (
        <>
          <SsuDivider
            containerStyle={{paddingHorizontal: widthResponsive(48)}}
            text={
              t(
                isScanning && !isScanSuccess
                  ? dividerOnScan
                  : isManualEnter && !isScanSuccess
                  ? dividerOnManualEnter
                  : referralAddedTitle,
              ) || ''
            }
          />
          <Gap height={16} />
        </>
      ) : (
        ''
      )}

      <View style={elStyles.container}>
        {!isScanning && !isScanSuccess ? (
          <>
            <Button
              label="Scan Now"
              textStyles={{fontSize: mvs(14)}}
              containerStyles={{width: '100%'}}
              onPress={handleScanning}
            />
            <Gap height={16} />
          </>
        ) : (
          ''
        )}
        {!isManualEnter && !isScanSuccess ? (
          <>
            <Button
              label="Enter Manually"
              type="border"
              textStyles={{fontSize: mvs(14), color: color.Success[400]}}
              containerStyles={{width: '100%'}}
              onPress={handleManualEnter}
            />
            <Gap height={4} />
          </>
        ) : (
          ''
        )}
        <View style={elStyles.container}>
          {isScanSuccess ? (
            <>
              <ReferralActivated refCode={refCode} />
            </>
          ) : (
            ''
          )}
        </View>
      </View>
    </View>
  );
};

const elStyles = StyleSheet.create({
  container: {
    paddingHorizontal: widthResponsive(48),
  },
  endJustify: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  square: {
    width: 70,
    height: 50,
  },
});
