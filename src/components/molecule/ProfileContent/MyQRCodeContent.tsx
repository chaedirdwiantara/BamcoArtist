import React, {useCallback} from 'react';
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

export interface MyQRCodeContentProps {
  type: string;
  profile: any;
  onPressGoBack: () => void;
}

const subTitle = 'Setting.ReferralQR.ShareQR.Subtitle';
const btnShare = 'Setting.ReferralQR.ShareQR.BtnShare';
const btnBack = 'Setting.ReferralQR.ShareQR.BtnBack';

export const MyQRCodeContent: React.FC<MyQRCodeContentProps> = (
  props: MyQRCodeContentProps,
) => {
  const {type, profile, onPressGoBack} = props;

  const {t} = useTranslation();

  const {setWithoutBottomTab, show} = usePlayerStore();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]),
  );

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
            imgUri={
              type === 'profile'
                ? profile.avatarUri
                : profile.imageProfileUrls.length !== 0
                ? profile.imageProfileUrls[1]?.image
                : ''
            }
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
          <QRCode value={profile.username} size={widthPercentage(180)} />
        </View>
        <Gap height={32} />
      </View>
      <View style={styles.container}>
        <Button
          label={t(btnShare)}
          textStyles={{fontSize: mvs(14)}}
          containerStyles={{width: '80%'}}
          // onPress={handleScanning}
        />
        <Gap height={16} />

        <Button
          label={t(btnBack)}
          type="border"
          textStyles={{fontSize: mvs(14), color: color.Success[400]}}
          containerStyles={{width: '80%'}}
          onPress={onPressGoBack}
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
