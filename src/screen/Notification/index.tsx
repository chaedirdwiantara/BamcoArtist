import {StyleSheet, View} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import {NotificationCard, TopNavigation} from '../../components';
import {notifData} from '../../data/notification';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';

export const Notification = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Notification"
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={20}
        itemStrokeColor={color.Neutral[10]}
      />
      <NotificationCard data={notifData} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
});
