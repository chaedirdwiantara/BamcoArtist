import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../../utils';
import {mvs} from 'react-native-size-matters';
import {AvatarProfile} from '../..';
import {ButtonGradient, Gap} from '../../../atom';
import Typography from '../../../../theme/Typography';
import {
  ArrowLeftIcon,
  CameraIcon,
  GalleryEditIcon,
  SettingIcon,
  ShareIcon,
} from '../../../../assets/icon';
import {color, font} from '../../../../theme';
import initialname from '../../../../utils/initialname';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from '../../../atom/Loading/LoadingSpinner';
import QRCodeIcon from '../../../../assets/icon/QRCode.icon';

export interface ProfileHeaderProps {
  avatarUri?: string;
  backgroundUri?: string;
  fullname?: string;
  username?: string;
  bio?: string;
  type?: string;
  scrollEffect?: boolean;
  onPress?: () => void;
  iconPress: (params: string) => void;
  containerStyles?: ViewStyle;
  noEdit?: boolean;
  backIcon?: boolean;
  onPressImage?: (uri: string) => void;
  refreshing?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = (
  props: ProfileHeaderProps,
) => {
  const {
    avatarUri = '',
    backgroundUri = '',
    fullname = '',
    username,
    bio,
    type = '',
    onPress,
    iconPress,
    containerStyles,
    scrollEffect,
    noEdit,
    backIcon,
    onPressImage,
    refreshing,
  } = props;

  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const toMyQrCode = () => {
    navigation.navigate('MyQRCode', {uuid: ''});
  };

  const iconRight = () => {
    return (
      <View style={[styles.iconRight, {flex: 1, flexDirection: 'row'}]}>
        <TouchableOpacity onPress={() => iconPress('backgroundUri')}>
          {type === 'profile' ? (
            !scrollEffect && <SettingIcon style={styles.settingIcon} />
          ) : type === 'edit' ? (
            <GalleryEditIcon />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const iconLeft = () => {
    return (
      <TouchableOpacity onPress={toMyQrCode} style={styles.iconLeft}>
        <QRCodeIcon style={styles.settingIcon} />
      </TouchableOpacity>
    );
  };

  const avatarPress = type === 'edit' || avatarUri === '' || avatarUri === null;
  const backgroundPress =
    type === 'edit' || backgroundUri === '' || backgroundUri === null;

  const showLoading = Platform.OS === 'ios' && refreshing;
  const newHeight = showLoading ? heightPercentage(390) : heightPercentage(350);

  return (
    <View
      style={[styles.root, {height: newHeight, marginTop: 8}, containerStyles]}>
      <TouchableOpacity
        activeOpacity={backgroundPress ? 1 : 0.7}
        onPress={() =>
          backgroundPress ? null : onPressImage && onPressImage(backgroundUri)
        }>
        <ImageBackground
          source={{uri: backgroundUri}}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.bgChild}>
            {showLoading && <LoadingSpinner type={'profile'} />}
            <TouchableOpacity
              activeOpacity={avatarPress ? 1 : 0.5}
              onPress={() =>
                avatarPress ? null : onPressImage && onPressImage(avatarUri)
              }>
              <AvatarProfile
                initialName={initialname(fullname)}
                imgUri={avatarUri}
                type={type}
                showIcon={type === 'edit'}
                icon={<CameraIcon />}
                onPress={() => iconPress('avatarUri')}
              />
            </TouchableOpacity>
            <Text style={[Typography.Heading5, styles.fullname]}>
              {fullname}
            </Text>
            <Text style={styles.username}>{username}</Text>

            {type === 'profile' && (
              <View style={styles.containerFooter}>
                <Text style={styles.description}>{bio}</Text>
                {noEdit ? null : (
                  <ButtonGradient
                    label={t('Profile.Button.Edit')}
                    gradientStyles={styles.btnContainer}
                    onPress={() => {
                      onPress && onPress();
                    }}
                  />
                )}
              </View>
            )}

            {noEdit ? null : iconRight()}
            {backIcon && type === 'profile' ? iconLeft() : null}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    backgroundColor: color.Dark[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullname: {
    marginTop: heightPercentage(20),
    color: color.Neutral[10],
  },
  containerFooter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: normalize(12),
    lineHeight: mvs(20),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
  },
  description: {
    fontSize: normalize(12),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    maxWidth: width * 0.9,
    marginTop: heightPercentage(15),
    textAlign: 'center',
  },
  btnContainer: {
    width: undefined,
    height: undefined,
    aspectRatio: undefined,
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(10),
    marginVertical: heightPercentage(10),
  },
  editIcon: {
    position: 'absolute',
    top: heightPercentage(20),
    right: widthPercentage(20),
  },
  iconRight: {
    position: 'absolute',
    top: heightPercentage(20),
    right: widthPercentage(20),
  },
  iconLeft: {
    position: 'absolute',
    top: heightPercentage(20),
    left: widthPercentage(20),
  },
  shareIcon: {
    marginTop: widthResponsive(23),
    width: widthPercentage(24),
    height: widthPercentage(24),
  },
  settingIcon: {
    marginTop: heightPercentage(25),
    width: widthPercentage(26),
    height: widthPercentage(26),
  },
  initialName: {
    color: color.Neutral[10],
  },
  bgChild: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', //? control background gradient
  },
});
