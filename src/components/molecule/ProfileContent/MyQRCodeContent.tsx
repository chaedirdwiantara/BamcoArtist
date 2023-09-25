import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Button, Gap} from '../../atom';
import {AvatarProfile} from '../AvatarProfile/AvatarProfile';
import {mvs} from 'react-native-size-matters';
import {CameraIcon} from '../../../assets/icon';
import initialname from '../../../utils/initialname';
import Typography from '../../../theme/Typography';
import {color, font} from '../../../theme';
import Color from '../../../theme/Color';
import {usePlayerStore} from '../../../store/player.store';
import {useTranslation} from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';
import {widthPercentage} from '../../../utils';
import Clipboard from '@react-native-community/clipboard';
import {useShareHook} from '../../../hooks/use-share.hook';
import {useFeedHook} from '../../../hooks/use-feed.hook';
import SuccessToast from '../Toast/SuccessToast';
import {QrCode} from '../../../interface/qrcode.interface';

export interface MyQRCodeContentProps {
  profile: QrCode;
  onPressGoBack: () => void;
}

const subTitle = 'Setting.ReferralQR.ShareQR.Subtitle';
const btnShare = 'Setting.ReferralQR.ShareQR.BtnShare';
const btnBack = 'Setting.ReferralQR.ShareQR.BtnBack';

export const MyQRCodeContent: React.FC<MyQRCodeContentProps> = (
  props: MyQRCodeContentProps,
) => {
  const {profile, onPressGoBack} = props;

  const {t} = useTranslation();

  const {setWithoutBottomTab, show} = usePlayerStore();
  const {shareLink, getShareLink, successGetLink} = useShareHook();
  const {sendLogShare} = useFeedHook();

  const [toastVisible, setToastVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]),
  );

  // SHARE LINK
  useEffect(() => {
    if (successGetLink && Clipboard && Clipboard.setString) {
      Clipboard.setString(shareLink);
      sendLogShare({id: profile.uuid});
      setToastVisible(true);
    }
  }, [successGetLink]);

  const onPressCopy = () => {
    getShareLink({
      scheme: `/musician/${profile.uuid}`,
      image: profile.avatarUri,
      title: t('ShareLink.Profile.Title', {
        name: profile.fullname,
      }),
      description: t('ShareLink.Profile.Subtitle'),
    });
  };

  return (
    <View style={[styles.root, styles.container]}>
      <View style={styles.container}>
        <View
          style={{
            width: '70%',
          }}>
          <Text style={[Typography.Heading4, styles.title]}>
            {profile.username}
          </Text>
          <Text style={[styles.textSubtitle, {marginBottom: mvs(20)}]}>
            {t(subTitle)}
          </Text>
        </View>
        <View
          style={{
            marginBottom: -32,
            zIndex: 10,
          }}>
          <AvatarProfile
            initialName={initialname(profile.fullname)}
            imgUri={profile.avatarUri}
            type=""
            qrType="shareQR"
            showIcon={false}
            icon={<CameraIcon />}
          />
        </View>
        <View
          style={[
            styles.container,
            {
              width: 264,
              height: 264,
              backgroundColor: 'white',
              borderRadius: 32,
              borderWidth: 16,
              borderColor: '#2c3444',
            },
          ]}>
          {shareLink && (
            <QRCode value={shareLink} size={widthPercentage(180)} />
          )}
        </View>
        <Gap height={32} />
      </View>
      <View style={styles.container}>
        <Button
          label={t(btnShare)}
          textStyles={{fontSize: mvs(14)}}
          containerStyles={{width: '80%'}}
          onPress={onPressCopy}
        />
        <Gap height={16} />

        <Button
          label={t(btnBack)}
          type="border"
          textStyles={{fontSize: mvs(14), color: color.Success[400]}}
          containerStyles={{width: '80%'}}
          onPress={onPressGoBack}
        />
        {/* //? When copy link done */}
        <SuccessToast
          toastVisible={toastVisible}
          onBackPressed={() => setToastVisible(false)}
          caption={t('ShareLink.Profile.LinkCopied')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  container: {
    // paddingTop: heightPercentage(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: color.Neutral[10],
    marginVertical: mvs(10),
  },
  textSubtitle: {
    fontSize: mvs(12),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    lineHeight: mvs(14.5),
    color: '#788AA9',
    textAlign: 'center',
    // maxWidth: width * 0.8,
  },
});
