import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
import {RootStackParams} from '../../../navigations';
import QRCode from 'react-native-qrcode-svg';
import {widthPercentage} from '../../../utils';

export interface MyQRCodeContentzProps {
  avatar: string;
  fullname: string;
  username: string;
  onPressGoBack: () => void;
}

export const MyQRCodeContent: React.FC<MyQRCodeContentzProps> = (
  props: MyQRCodeContentzProps,
) => {
  const {avatar, fullname, username, onPressGoBack} = props;

  const {t} = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {setWithoutBottomTab, show} = usePlayerStore();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  return (
    <View style={[styles.root, styles.container]}>
      <View style={styles.container}>
        <View
          style={{
            width: '70%',
          }}>
          <Text style={[Typography.Heading4, styles.title]}>{username}</Text>
          <Text style={[styles.textSubtitle, {marginBottom: mvs(20)}]}>
            Share this QR code to let others know the Beamco profile
          </Text>
        </View>
        <View style={{marginBottom: -32, zIndex: 10}}>
          <AvatarProfile
            initialName={initialname(fullname)}
            imgUri={avatar}
            type=""
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
              borderColor: '#617594',
            },
          ]}>
          <QRCode value="HITCS200" size={widthPercentage(200)} />
        </View>
        <Gap height={32} />
      </View>
      <View style={styles.container}>
        <Button
          label="Share QR Code"
          textStyles={{fontSize: mvs(14)}}
          containerStyles={{width: '80%'}}
          // onPress={handleScanning}
        />
        <Gap height={16} />

        <Button
          label="Back"
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
