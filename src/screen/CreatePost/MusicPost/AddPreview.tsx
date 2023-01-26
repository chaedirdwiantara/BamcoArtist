import {StyleSheet, View} from 'react-native';
import React from 'react';
import {color} from '../../../theme';
import {TopNavigation} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';

const AddPreview = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.container}>
      <TopNavigation.Type1
        title="Add Preview"
        maxLengthTitle={20}
        itemStrokeColor={'white'}
        leftIconAction={navigation.goBack}
      />
      <View></View>
    </View>
  );
};

export default AddPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
});
