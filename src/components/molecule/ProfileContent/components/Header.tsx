import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../../utils';
import {mvs} from 'react-native-size-matters';
import {AvatarProfile} from '../..';
import {ButtonGradient} from '../../../atom';
import Typography from '../../../../theme/Typography';
import {
  CameraIcon,
  GalleryEditIcon,
  SettingIcon,
} from '../../../../assets/icon';
import {color, font} from '../../../../theme';
import initialname from '../../../../utils/initialname';

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
  } = props;

  const iconRight = () => {
    return (
      <TouchableOpacity
        onPress={() => iconPress('backgroundUri')}
        style={styles.iconRight}>
        {type === '' ? (
          !scrollEffect && <SettingIcon style={styles.settingIcon} />
        ) : (
          <GalleryEditIcon />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.root, containerStyles]}>
      <ImageBackground
        source={{uri: backgroundUri}}
        resizeMode="cover"
        style={styles.image}>
        <AvatarProfile
          initialName={initialname(fullname)}
          imgUri={avatarUri}
          type={type}
          showIcon={type === 'edit'}
          icon={<CameraIcon />}
          onPress={() => iconPress('avatarUri')}
        />
        <Text style={[Typography.Heading5, styles.fullname]}>{fullname}</Text>
        <Text style={styles.username}>{username}</Text>

        {type === '' && (
          <View style={styles.containerFooter}>
            <Text style={styles.description}>{bio}</Text>
            {noEdit ? null : (
              <ButtonGradient
                label={'Edit Profile'}
                gradientStyles={styles.btnContainer}
                onPress={() => {
                  onPress && onPress();
                }}
              />
            )}
          </View>
        )}

        {iconRight()}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    height: heightPercentage(350),
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
    height: undefined,
    width: widthPercentage(100),
    aspectRatio: heightPercentage(100 / 32),
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
  settingIcon: {
    marginTop: heightPercentage(25),
  },
  initialName: {
    color: color.Neutral[10],
  },
});
