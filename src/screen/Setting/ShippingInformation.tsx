import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {ShippingInformationContent} from '../../components';
import {useSettingHook} from '../../hooks/use-setting.hook';

export const ShippingInformationScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const {fetchData, dataShippingInfo, getShippingInfo} = useSettingHook();

  useEffect(() => {
    getShippingInfo();
  }, []);

  return (
    <View style={styles.root}>
      {!fetchData && (
        <ShippingInformationContent
          dataShipping={dataShippingInfo}
          onPressGoBack={onPressGoBack}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
