import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, Linking} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import AnimatedLottieView from 'lottie-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {RootStackParams} from '../navigations';
import {storage} from '../hooks/use-storage.hook';
import {useVersionHook} from '../hooks/use-version.hook';
import {ModalUpdate} from '../components/molecule/Modal/ModalUpdate';

type SplashScrennProps = NativeStackScreenProps<
  RootStackParams,
  'SplashScreen'
>;

export const SplashScreen: React.FC<SplashScrennProps> = ({
  navigation,
}: SplashScrennProps) => {
  const {checkVersion} = useVersionHook();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [forceUpdate, setForceUpdate] = useState<boolean>(true);

  const onUpdate = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=co.beam.artist.android',
      );
    } else if (Platform.OS === 'ios') {
      const link =
        'itms-apps://apps.apple.com/us/app/beamco-for-artists/id6449465762';
      Linking.canOpenURL(link).then(
        supported => {
          supported && Linking.openURL(link);
        },
        err => console.log(err),
      );
    }
  };

  const onCancel = () => {
    setModalVisible(false);
    setTimeout(() => {
      navigation.replace(
        // BEAM-1436: Remove step wizard after sign up
        // storage.getBoolean('isPreference')
        //   ? 'Preference' :
        storage.getBoolean('isLogin') || storage.getBoolean('isGuest')
          ? 'MainTab'
          : storage.getBoolean('isDeleted')
          ? 'RecoverAccount'
          : storage.getBoolean('skipOnboard')
          ? 'SignInGuest'
          : 'Boarding',
      );
    }, 500);
  };

  useEffect(() => {
    const checkVersioning = async () => {
      try {
        const checkDataVersion = await checkVersion();
        return checkDataVersion;
      } catch (err) {
        console.log(err);
      }
    };

    checkVersioning()
      .then(res => {
        if (res) {
          if (res.showUpdate === false) {
            onCancel();
          } else {
            setModalVisible(res.showUpdate);
            setForceUpdate(res.forceUpdate);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.root}>
      <AnimatedLottieView
        source={require('../assets/animation/loading-beamco-musician.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <ModalUpdate
        modalVisible={modalVisible}
        onPressOk={onUpdate}
        onPressClose={onCancel}
        showMaybeLater={forceUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Dark[800],
    margin: 0,
  },
  lottie: {
    padding: 0,
    margin: 0,
    width: ms(300),
    height: mvs(300),
    aspectRatio: 1 / 1,
  },
});
