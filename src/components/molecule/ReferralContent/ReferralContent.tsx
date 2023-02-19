import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ViewStyle,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './styles';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {Button, ButtonGradient, SsuInput} from '../../atom';
import {CheckCircleIcon, GiftIcon} from '../../../assets/icon';
import ReferralImage from '../../../assets/image/Referral.image';
import {heightPercentage, widthPercentage} from '../../../utils';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');

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

const title1 = 'Setting.Referral.OnBoard.Title';
const title2 = 'Setting.Referral.OnBoard.Actived';
const description1 = 'Setting.Referral.OnBoard.Subtitle';
const description2 = 'Setting.Referral.OnBoard.Success';
const friendReferral = 'Setting.Referral.UseRefer.Text2';
const refCannotBeChanged = 'Setting.Referral.UseRefer.Text3';

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
  const [type, setType] = useState<string>('input');
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const emptyString = refCode === '';

  useEffect(() => {
    if (isValidRef === true) {
      setType('');
    }
  }, [isValidRef]);

  const handleFocusInput = (input: string | null) => {
    setFocusInput(input);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.root, containerStyle]}>
        <ReferralImage />

        <View style={styles.containerText}>
          <Text style={[Typography.Heading4, styles.title]}>
            {type === 'input' ? t(title1) : t(title2)}
          </Text>
          <Text style={[Typography.Subtitle2, styles.description]}>
            {type === 'input' ? t(description1) : t(description2)}
          </Text>
        </View>

        {type === 'input' ? (
          <View style={styles.containerInput}>
            <SsuInput.InputText
              value={refCode}
              isError={isError}
              placeholder={t('Setting.Referral.Title') || ''}
              errorMsg={errorMsg}
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
          </View>
        ) : (
          <ReferralActivated refCode={refCode} />
        )}

        {type === 'input' ? (
          <View style={styles.footer}>
            <Button
              type="border"
              label={t('Btn.MaybeLater')}
              containerStyles={styles.btnContainer}
              textStyles={{color: Color.Pink.linear}}
              onPress={onSkip}
            />
            <Button
              label={t('Btn.Submit')}
              disabled={emptyString}
              containerStyles={{
                width: widthPercentage(155),
                aspectRatio: heightPercentage(155 / 40),
                backgroundColor: emptyString
                  ? Color.Dark[50]
                  : Color.Pink.linear,
              }}
              onPress={() => {
                onPress && onPress(refCode);
              }}
            />
          </View>
        ) : (
          <ButtonGradient
            label={t('Btn.GoToHome')}
            onPress={() => {
              onSkip && onSkip();
            }}
            gradientStyles={{width: width * 0.9}}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
