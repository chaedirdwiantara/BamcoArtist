import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {mvs} from 'react-native-size-matters';
import {CameraIcon} from '../../assets/icon';
import {AvatarProfile, Button, Gap} from '../../components';
import {color, font} from '../../theme';
import {heightPercentage, width, widthResponsive} from '../../utils';
import initialname from '../../utils/initialname';
import Color from '../../theme/Color';

export interface ProfileHeaderProps {
  avatarUri?: string;
  backgroundUri?: string;
  fullname?: string;
  username?: string;
  bio?: string;
  type?: string;
  onPress?: (params: string) => void;
  iconPress?: (params: string) => void;
  isFollowed?: boolean;
  containerStyles?: ViewStyle;
  followOnPress?: () => void;
  unfollowOnPress?: () => void;
  donateOnPress?: () => void;
  onPressImage?: (uri: string) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = (
  props: ProfileHeaderProps,
) => {
  const {t} = useTranslation();
  const {
    avatarUri = '',
    backgroundUri = '',
    fullname = '',
    username,
    bio,
    type = '',
    isFollowed,
    containerStyles,
    followOnPress,
    unfollowOnPress,
    donateOnPress,
    onPressImage,
  } = props;

  const followOnPressed = () => {
    followOnPress?.();
  };

  const unFollowOnPressed = () => {
    unfollowOnPress?.();
  };

  const donate = () => {
    donateOnPress?.();
  };

  const avatarPress = avatarUri === '' || avatarUri === null;
  const backgroundPress = backgroundUri === '' || backgroundUri === null;

  return (
    <View style={[styles.root, containerStyles]}>
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
            <TouchableOpacity
              activeOpacity={avatarPress ? 1 : 0.5}
              onPress={() =>
                avatarPress ? null : onPressImage && onPressImage(avatarUri)
              }>
              <AvatarProfile
                initialName={initialname(fullname)}
                imgUri={avatarUri}
                type={type}
                showIcon={false}
                icon={<CameraIcon />}
              />
            </TouchableOpacity>
            <Gap height={12} />
            <Text style={styles.fullname}>{fullname}</Text>
            <Text style={styles.username}>{username}</Text>
            <Gap height={19} />
            {type === '' && (
              <View style={styles.containerFooter}>
                <Text style={styles.description}>{bio}</Text>
                <Gap height={16} />
                <View style={styles.buttonContainer}>
                  {isFollowed ? (
                    <>
                      <Button
                        type="border"
                        label={t('Musician.Label.Following')}
                        containerStyles={styles.btnContainerFollowed}
                        textStyles={{color: color.Pink.linear}}
                        onPress={unFollowOnPressed}
                      />
                      <Gap width={11} />
                      <Button
                        label={t('Musician.Label.Tip')}
                        containerStyles={styles.btnContainer2}
                        onPress={donate}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        label={t('Musician.Label.Follow')}
                        containerStyles={styles.btnContainer}
                        onPress={followOnPressed}
                      />
                      <Gap width={11} />
                      <Button
                        label={t('Musician.Label.Tip')}
                        containerStyles={styles.btnContainer2}
                        onPress={donate}
                      />
                    </>
                  )}
                </View>
              </View>
            )}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    height: heightPercentage(340),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullname: {
    color: Color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: 'bold',
    fontSize: mvs(18),
  },
  containerFooter: {},
  username: {
    fontSize: mvs(12),
    color: Color.Neutral[10],
    fontFamily: font.InterRegular,
  },
  description: {
    fontSize: mvs(12),
    color: Color.Neutral[10],
    fontFamily: font.InterRegular,
    maxWidth: width * 0.9,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    height: undefined,
    width: widthResponsive(100),
    aspectRatio: heightPercentage(100 / 32),
    backgroundColor: Color.Pink.linear,
  },
  btnContainer2: {
    height: undefined,
    width: widthResponsive(100),
    aspectRatio: heightPercentage(100 / 32),
    backgroundColor: Color.Success[400],
  },
  btnContainerFollowed: {
    height: undefined,
    width: widthResponsive(100),
    aspectRatio: heightPercentage(100 / 32),
    backgroundColor: 'transparent',
    borderColor: Color.Pink.linear,
  },
  editIcon: {
    position: 'absolute',
    top: heightPercentage(20),
    right: widthResponsive(20),
  },
  iconRight: {
    position: 'absolute',
    top: heightPercentage(20),
    right: widthResponsive(20),
  },
  settingIcon: {
    marginTop: Platform.OS === 'ios' ? heightPercentage(25) : 0,
  },
  initialName: {
    color: Color.Neutral[10],
  },
  bgChild: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
