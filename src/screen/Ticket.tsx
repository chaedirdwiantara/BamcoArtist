import WebView from 'react-native-webview';
import {useTranslation} from 'react-i18next';
import React, {useCallback, useState} from 'react';
import {StyleSheet, SafeAreaView, Linking} from 'react-native';

import {width} from '../utils';
import Color from '../theme/Color';
import {SsuStatusBar} from '../components';
import {dateFormat} from '../utils/date-format';
import {useFocusEffect} from '@react-navigation/native';
import {getBookyayToken} from '../service/refreshBookyayToken';
import {ModalInfo} from '../components/molecule/Modal/ModalInfo';
import {profileStorage, storage} from '../hooks/use-storage.hook';
import {ModalLoading} from '../components/molecule/ModalLoading/ModalLoading';

export const TicketScreen: React.FC = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [showModalInfo, setShowModalInfo] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const token = async () => {
        setLoading(true);
        await getBookyayToken();
        setLoading(false);
      };

      token();

      // use settimeout because loading must appear first
      setTimeout(() => {
        // does not show a modal if it has exceeded the expiration date
        const getExpDateModal = storage.getString('expDateTicket');
        const showModal = getExpDateModal !== dateFormat(new Date());
        setShowModalInfo(showModal);
      }, 2000);
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const token = async () => {
        setLoading(true);
        await getBookyayToken();
        setLoading(false);
      };

      token();
    }, []),
  );

  const bookyayToken = profileStorage()?.bookyayToken;
  const bookyayOrganizerToken = profileStorage()?.bookyayOrganizerToken;
  const ticketUrl = `https://m.bookyay.com/items/event?clause=event_2000012&token=${bookyayToken}`;
  // const ticketUrl = `https://m.bookyay.com/items/event?clause=event_1000031&token=${bookyayToken}`;
  // const ticketUrl = `https://uat.yeah-yeah.com/items/product?clause=product_5629499535000004&token=${bookyayToken}`;

  // go to web admin bookyay and auto login to the current account
  const openAdminBookyay = () => {
    return Linking.openURL(
      `https://admin.bookyay.com/?token=${bookyayOrganizerToken}`,
    );
  };

  const closeModal = () => {
    setShowModalInfo(false);
    // if checkbox is checked, modal info will not appear for 1 day
    if (isChecked) {
      const date = dateFormat(new Date());
      storage.set('expDateTicket', date);
      setIsChecked(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <SsuStatusBar type="black" />
      <ModalLoading visible={loading} />
      {!loading && (
        <>
          <WebView source={{uri: ticketUrl}} />
          <ModalInfo
            title={t('Modal.ModalInfo.TitleTicket')}
            subtitle1={t('Modal.ModalInfo.Subtitle1Ticket')}
            url={'https://admin.bookyay.com/'}
            openLink={openAdminBookyay}
            subtitle2={t('Modal.ModalInfo.Subtitle2Ticket')}
            showCheckBox={true}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            visible={showModalInfo}
            onPressClose={closeModal}
          />
        </>
      )}
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
