import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mvs} from 'react-native-size-matters';
import {WebView} from 'react-native-webview';
import {RootStackParams} from '../navigations';
import {ArrowLeftIcon} from '../assets/icon';
import Color from '../theme/Color';
import Font from '../theme/Font';
import {normalize} from '../utils';

const {width} = Dimensions.get('screen');

type WebviewProps = NativeStackScreenProps<RootStackParams, 'Webview'>;

export const WebviewPage: React.FC<WebviewProps> = ({
  navigation,
  route,
}: WebviewProps) => {
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.arrowLeftIcon}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.title}>{route.params.title}</Text>
      </View>
      <WebView source={{uri: route.params.url}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: width,
    backgroundColor: Color.Dark[800],
  },
  header: {
    backgroundColor: Color.Dark[800],
    width: width,
    height: undefined,
    aspectRatio: 375 / 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  arrowLeftIcon: {
    position: 'absolute',
    left: mvs(24),
    top: '30%',
  },
  title: {
    fontFamily: Font.InterRegular,
    color: Color.Neutral[10],
    fontSize: normalize(16),
    fontWeight: '600',
    lineHeight: mvs(20),
    textAlign: 'center',
  },
});
