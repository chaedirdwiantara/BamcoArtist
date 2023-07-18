import React, {useEffect, useState} from 'react';
import {Text, View, ViewStyle, Linking, TouchableOpacity} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {Button, Gap, SsuDivider, SsuInput} from '../../atom';
import {CheckCircleIcon, GiftIcon} from '../../../assets/icon';
import ReferralQRImage from '../../../assets/image/ReferralQR.image';
import {widthResponsive} from '../../../utils';
import {useTranslation} from 'react-i18next';
import {color} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import SigninIcon from '../../../assets/icon/Signin.icon';
import styles from '../ReferralContent/styles';

interface UseReferralContentProps {
  containerStyle?: ViewStyle;
  onPress?: (refCode: string) => void;
  onSkip?: () => void;
  isError: boolean;
  errorMsg: string;
  isValidRef: boolean | null;
  referralFrom: string | null;
  refCode: string;
  setRefCode: (value: string) => void;
  isScanning: boolean;
  setIsScanning: (value: boolean) => void;
  isScanSuccess: boolean;
  setIsScanSuccess: (value: boolean) => void;
  isScanned: boolean;
  setIsScanned: (value: boolean) => void;
  isScanFailed: boolean;
  setIsScanFailed: (value: boolean) => void;
  isManualEnter: boolean;
  setIsManualEnter: (value: boolean) => void;
}

interface ActivatedProps {
  refCode?: string;
}

const titleActivated = 'Setting.ReferralQR.OnBoard.Activated';
const titleToScan = 'Setting.ReferralQR.OnBoard.Title';
const dividerOnScan = 'Setting.ReferralQR.OnBoard.DividerOnScan';
const dividerOnManualEnter = 'Setting.ReferralQR.OnBoard.DividerOnManualEnter';
const referralAddedTitle = 'Setting.ReferralQR.OnBoard.ReferralAdded';
const BtnScan = 'Setting.ReferralQR.OnBoard.BtnScan';
const BtnManual = 'Setting.ReferralQR.OnBoard.BtnManual';
const friendReferral = 'Setting.ReferralQR.UseRefer.Text2';
const refCannotBeChanged = 'Setting.ReferralQR.UseRefer.Text3';

export const ReferralActivated: React.FC<ActivatedProps> = ({refCode}) => {
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

export const UseReferralContent: React.FC<UseReferralContentProps> = ({
  containerStyle,
  onPress,
  isError,
  errorMsg,
  isValidRef,
  refCode,
  setRefCode,
  referralFrom,
  isScanning,
  setIsScanning,
  isScanSuccess,
  setIsScanSuccess,
  isScanned,
  setIsScanned,
  isScanFailed,
  setIsScanFailed,
  isManualEnter,
  setIsManualEnter,
}) => {
  const {t} = useTranslation();
  const [focusInput, setFocusInput] = useState<string | null>(null);

  // Camera
  const devices = useCameraDevices();
  const device = devices.back;

  // Camera Handler
  async function getPermission() {
    const permission = await Camera.requestCameraPermission();

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
    } else if (!isValidRef && isScanning) {
      setIsScanFailed(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidRef]);

  // QRCode
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);

  useEffect(() => {
    togleActiveState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodes]);

  useEffect(() => {
    if (onPress && isScanning) {
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
        }}>
        <SigninIcon stroke={Color.Neutral[10]} fill="white" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.root]}>
      <View style={styles.containerText}>
        <Text
          style={[Typography.Heading6, styles.title, {textAlign: 'center'}]}>
          {referralFrom !== null ? t(titleActivated) : t(titleToScan)}
        </Text>
        <Text
          style={[
            styles.textSubtitle,
            {marginBottom: referralFrom === null ? mvs(24) : 0},
          ]}>
          {referralFrom === null
            ? t('Setting.ReferralQR.OnBoard.Subtitle')
            : ''}
        </Text>
      </View>
      {isScanning && !isScanSuccess ? (
        <>
          <View style={styles.cameraContainer}>
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
          <Gap height={32} />
        </>
      ) : isScanSuccess ? (
        ''
      ) : (
        <>
          <ReferralQRImage />
          <Gap height={32} />
        </>
      )}

      {isManualEnter && !isScanSuccess ? (
        <View style={styles.container}>
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

      {(isScanning || isManualEnter) && !isScanSuccess ? (
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

      <View style={styles.container}>
        {!isScanning && !isScanSuccess ? (
          <>
            <Button
              label={t(BtnScan)}
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
              label={t(BtnManual)}
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
        {/* <View style={styles.container}> */}
        {isScanSuccess || referralFrom !== null ? (
          <>
            <ReferralActivated refCode={referralFrom || refCode} />
          </>
        ) : (
          ''
        )}
        {/* </View> */}
      </View>
    </View>
  );
};
