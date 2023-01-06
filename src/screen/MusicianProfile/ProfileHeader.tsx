import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';

import {mvs} from 'react-native-size-matters';
import {CameraIcon, GalleryEditIcon, SettingIcon} from '../../assets/icon';
import {AvatarProfile, Button, ButtonGradient, Gap} from '../../components';
import {color, font} from '../../theme';
import Typography from '../../theme/Typography';
import {heightPercentage, normalize, width, widthResponsive} from '../../utils';
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
    isFollowed,
    containerStyles,
  } = props;

  const viewMoreOnPress = (params: string) => {
    onPress?.(params);
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
          // onPress={() => iconPress('avatarUri')}
        />
        <Text style={[Typography.Heading5, styles.fullname]}>{fullname}</Text>
        <Text style={styles.username}>{username}</Text>

        {type === '' && (
          <View style={styles.containerFooter}>
            <Text style={styles.description}>{bio}</Text>
            <View style={{flexDirection: 'row'}}>
              {isFollowed ? (
                <>
                  <ButtonGradient
                    label={'Unfollow'}
                    gradientStyles={styles.btnContainer}
                    onPress={() => {}}
                  />
                  <Gap width={11} />
                  <Button
                    label={'Donate'}
                    containerStyles={styles.btnContainer2}
                  />
                </>
              ) : (
                <>
                  <ButtonGradient
                    label={'Follow'}
                    gradientStyles={styles.btnContainer}
                    onPress={() => {}}
                  />
                  <Gap width={11} />
                  <Button
                    label={'Donate'}
                    containerStyles={styles.btnContainer2}
                  />
                </>
              )}
            </View>
          </View>
        )}
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
    width: widthResponsive(100),
    aspectRatio: heightPercentage(100 / 32),
    marginVertical: heightPercentage(10),
  },
  btnContainer2: {
    height: undefined,
    width: widthResponsive(100),
    aspectRatio: heightPercentage(100 / 32),
    marginVertical: heightPercentage(10),
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
});
