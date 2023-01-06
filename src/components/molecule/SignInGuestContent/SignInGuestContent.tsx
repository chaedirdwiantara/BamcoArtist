import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {mvs} from 'react-native-size-matters';

import Color from '../../../theme/Color';
import {height, normalize, width} from '../../../utils';
import Typography from '../../../theme/Typography';
import {Button, ButtonGradient, LoginDescription} from '../../';

interface GuestProps {
  onPress: (screenName: 'Login' | 'Signup' | 'MainTab') => void;
}

export const SignInGuestContent: React.FC<GuestProps> = ({onPress}) => {
  return (
    <View style={styles.root}>
      <View style={styles.containerImage}>
        <ImageBackground
          source={require('../../../assets/background/signin-guest.png')}
          resizeMode="cover"
          style={styles.image}>
          <LoginDescription containerStyle={{paddingTop: height * 0.2}} />
        </ImageBackground>
      </View>
      <View style={styles.containerBottom}>
        <Text style={[Typography.Heading4, styles.title]}>
          {"Let's the fans grow with their musician"}
        </Text>
        <ButtonGradient
          label="Sign In"
          textStyles={{fontSize: normalize(14)}}
          onPress={() => onPress('Login')}
        />
        <Button
          type="border"
          label="Sign Up"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{marginVertical: mvs(6)}}
          onPress={() => onPress('Signup')}
        />
        <Button
          type="border"
          label="Explore As Guest"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: Color.Pink.linear}}
          onPress={() => onPress('MainTab')}
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
  containerImage: {
    width: width,
    height: height * 0.67,
  },
  image: {
    width,
    height: '100%',
  },
  containerBottom: {
    width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.35,
    backgroundColor: Color.Dark[800],
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  title: {
    maxWidth: '77%',
    textAlign: 'center',
    color: Color.Neutral[10],
    marginVertical: mvs(20),
  },
});
