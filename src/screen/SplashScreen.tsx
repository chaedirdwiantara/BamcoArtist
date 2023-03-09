import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import AnimatedLottieView from 'lottie-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {RootStackParams} from '../navigations';
import {storage} from '../hooks/use-storage.hook';
import {ModalUpdate} from '../components/molecule/Modal/ModalUpdate';

type SplashScrennProps = NativeStackScreenProps<
  RootStackParams,
  'SplashScreen'
>;

export const SplashScreen: React.FC<SplashScrennProps> = ({
  navigation,
}: SplashScrennProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onUpdate = () => {
    null;
  };

  const onCancel = () => {
    setModalVisible(false);
    setTimeout(() => {
      navigation.replace(
        storage.getBoolean('isLogin') || storage.getBoolean('isGuest')
          ? 'MainTab'
          : storage.getBoolean('skipOnboard')
          ? 'SignInGuest'
          : 'Boarding',
      );
    }, 500);
  };

  useEffect(() => {
    //TODO: wiring after endpoint ready
    // setTimeout(() => {
    //   setModalVisible(true);
    // }, 2000);

    setTimeout(() => {
      navigation.replace(
        storage.getBoolean('isLogin') || storage.getBoolean('isGuest')
          ? 'MainTab'
          : storage.getBoolean('skipOnboard')
          ? 'SignInGuest'
          : 'Boarding',
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.root}>
      <AnimatedLottieView
        source={require('../assets/animation/ssu-logo-loop.json')}
        autoPlay
        loop
        style={{
          padding: 0,
          margin: 0,
          width: ms(300),
          height: mvs(300),
          aspectRatio: 1 / 1,
        }}
      />
      <ModalUpdate
        modalVisible={modalVisible}
        onPressOk={onUpdate}
        onPressClose={onCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
    backgroundColor: Color.Dark[800],
    margin: 0,
  },
});
