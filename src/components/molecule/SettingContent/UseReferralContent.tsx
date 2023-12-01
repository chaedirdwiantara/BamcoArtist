import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ViewStyle,
  Linking,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
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
import {ModalConfirm} from '../Modal/ModalConfirm';

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
  isManualEnter: boolean;
  setIsManualEnter: (value: boolean) => void;
  isLoading: boolean;
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
  isManualEnter,
  setIsManualEnter,
  isLoading,
}) => {
  const {t} = useTranslation();
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const [showModalFailed, setShowModalFailed] = useState<boolean>(false);

  // Camera
  const device = useCameraDevice('back');

  // Camera Handler
  async function getPermission() {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    } else {
      setIsScanning(true);
      setIsManualEnter(false);
    }
  }

  useEffect(() => {
    if (!isLoading) {
      if (isValidRef) {
        setIsScanning(false);
        setIsScanSuccess(isValidRef);
      } else if (!isValidRef && isScanning) {
        setShowModalFailed(true);
        setIsScanned(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidRef, isScanned, isLoading]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0 && isScanned === false && codes[0].value) {
        const username = codes[0]?.value.split('=')[1];

        setRefCode(username);
        setIsScanned(true);
        // hit API when modal failed doesn't appear
        if (!showModalFailed && onPress) onPress(username);
      }
    },
  });

  const handleScanning = () => {
    getPermission();
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
          Keyboard.dismiss();
          onPress && onPress(refCode);
        }}>
        <SigninIcon stroke={Color.Neutral[10]} fill="white" />
      </TouchableOpacity>
    );
  };

  // if scan is succeed or have done a scan
  const successScan = isScanSuccess || referralFrom !== null;

  return (
    <View style={[styles.root]}>
      <View
        style={[
          styles.containerText,
          {marginBottom: successScan ? 0 : mvs(30)},
        ]}>
        <Text
          style={[Typography.Heading6, styles.title, {textAlign: 'center'}]}>
          {successScan ? t(titleActivated) : t(titleToScan)}
        </Text>
        <Text
          style={[
            styles.textSubtitle,
            {marginBottom: successScan ? 0 : mvs(24)},
          ]}>
          {successScan ? '' : t('Setting.ReferralQR.OnBoard.Subtitle')}
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
                codeScanner={codeScanner}
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
        {successScan ? (
          <>
            <ReferralActivated refCode={referralFrom || refCode} />
          </>
        ) : (
          ''
        )}
        {/* </View> */}
      </View>

      <ModalConfirm
        modalVisible={showModalFailed}
        oneButton={true}
        title={t('Setting.ReferralQR.ScanFailed.Title') || ''}
        subtitle={t('Setting.ReferralQR.ScanFailed.Desc')}
        yesText={t('General.Dismiss') || ''}
        onPressOk={() => setShowModalFailed(false)}
        subtitleStyles={{fontSize: mvs(13)}}
      />
    </View>
  );
};
