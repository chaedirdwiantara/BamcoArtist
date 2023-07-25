import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {SsuStatusBar} from '../components';
import Color from '../theme/Color';
import WebView from 'react-native-webview';
import {width} from '../utils';

export const TicketScreen: React.FC = () => {
  const ticketUrl =
    'https://m.bookyay.com/items/product?clause=product_5629499535000004';
  return (
    <SafeAreaView style={styles.root}>
      <SsuStatusBar type="black" />
      <WebView source={{uri: ticketUrl}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
});
