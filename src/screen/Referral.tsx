import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import {ReferralContent} from '../components';
import Color from '../theme/Color';
import {useProfileHook} from '../hooks/use-profile.hook';

export const ReferralScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {isValidReferral, errorMsg, applyReferralUser} = useProfileHook();

  useEffect(() => {
    if (isValidReferral) {
      gotoMainTab;
    }
  }, [isValidReferral]);

  const gotoMainTab = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTab'}],
    });
  };

  const onApplyReferral = (refCode: string) => {
    applyReferralUser(refCode);
  };

  return (
    <View style={styles.root}>
      <ReferralContent
        onPress={onApplyReferral}
        isError={errorMsg !== ''}
        errorMsg={errorMsg}
        onSkip={gotoMainTab}
        isValidRef={isValidReferral}
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
  },
});
