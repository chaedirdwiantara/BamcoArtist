import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Color from '../theme/Color';
import {RootStackParams} from '../navigations';
import {ExclusiveContent} from '../components';
import {useCreditHook} from '../hooks/use-credit.hook';

type ECProps = NativeStackScreenProps<RootStackParams, 'ExclusiveContent'>;

export const ExclusiveContentScreen = ({navigation, route}: ECProps) => {
  const onPressGoBack = () => {
    navigation.goBack();
  };

  const {creditCount, getCreditCount} = useCreditHook();

  useEffect(() => {
    getCreditCount();
  }, []);

  return (
    <View style={styles.root}>
      <ExclusiveContent
        data={route.params.data}
        onPressGoBack={onPressGoBack}
        credit={creditCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
