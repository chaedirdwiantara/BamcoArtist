import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  Platform,
  ImageBackground,
} from 'react-native';

import {mvs} from 'react-native-size-matters';
import {CameraIcon} from '../../assets/icon';
import {AvatarProfile, Button, ButtonGradient, Gap} from '../../components';
import {color, font} from '../../theme';
import {heightPercentage, width, widthResponsive} from '../../utils';
import initialname from '../../utils/initialname';

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
    onPress,
    iconPress,
    isFollowed,
    containerStyles,
    followOnPress,
    unfollowOnPress,
    donateOnPress,
  } = props;

  const viewMoreOnPress = (params: string) => {
    onPress?.(params);
  };

  const followOnPressed = () => {
    followOnPress?.();
  };

  const unFollowOnPressed = () => {
    unfollowOnPress?.();
  };

  const donate = () => {
    donateOnPress?.();
  };

  return (
    <View style={[styles.root, containerStyles]}>
      <ImageBackground
        source={{uri: backgroundUri}}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.bgChild}>
          <AvatarProfile
            initialName={initialname(fullname)}
            imgUri={avatarUri}
            type={type}
            showIcon={type === 'edit'}
            icon={<CameraIcon />}
            // onPress={() => iconPress('avatarUri')}
          />
          <Gap height={12} />
          <Text style={styles.fullname}>{fullname}</Text>
          <Text style={styles.username}>{username}</Text>
          <Gap height={19} />
          {type === '' && (
            <View style={styles.containerFooter}>
              <Text style={styles.description}>{bio}</Text>
              <Gap height={16} />
              <View style={{flexDirection: 'row'}}>
                {isFollowed ? (
                  <>
                    <ButtonGradient
                      label={t('Preference.Following')}
                      gradientStyles={styles.btnContainer}
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
                    <ButtonGradient
                      label={t('Preference.Follow')}
                      gradientStyles={styles.btnContainer}
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
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: 'bold',
    fontSize: mvs(18),
  },
  containerFooter: {},
  username: {
    fontSize: mvs(12),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
  },
  description: {
    fontSize: mvs(12),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    maxWidth: width * 0.9,
    textAlign: 'center',
  },
  btnContainer: {
    height: undefined,
    width: widthResponsive(100),
    aspectRatio: heightPercentage(100 / 32),
  },
  btnContainer2: {
    height: undefined,
    width: widthResponsive(100),
    aspectRatio: heightPercentage(100 / 32),
    backgroundColor: color.Success[400],
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
    color: color.Neutral[10],
  },
  bgChild: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
