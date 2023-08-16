import React, {useCallback, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {SsuStatusBar, TopNavigation} from '../../components';
import Color from '../../theme/Color';
import WebView from 'react-native-webview';
import {width, widthPercentage} from '../../utils';
import {profileStorage} from '../../hooks/use-storage.hook';
import {useFocusEffect} from '@react-navigation/native';
import {getBookyayToken} from '../../service/refreshBookyayToken';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {RootStackParams} from '../../navigations';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {ArrowLeftIcon} from '../../assets/icon';

type ConcertDetailProps = NativeStackScreenProps<
  RootStackParams,
  'ConcertDetail'
>;

export const ConcertDetail: React.FC<ConcertDetailProps> = ({
  route,
  navigation,
}: ConcertDetailProps) => {
  const data = route.params;
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      getBookyayToken();
      setLoading(false);
    }, []),
  );

  const bookyayToken = profileStorage()?.bookyayToken;

  const merchantUrl = `https://uat.yeah-yeah.com/events/${data.id}/?token=${bookyayToken}`;

  return (
    <>
      <TopNavigation.Type1
        title={t('Event.Concert.Detail')}
        maxLengthTitle={20}
        itemStrokeColor={'white'}
        leftIcon={<ArrowLeftIcon />}
        leftIconAction={() => navigation.goBack()}
        containerStyles={{
          paddingHorizontal: widthPercentage(20),
          backgroundColor: Color.Dark[800],
        }}
      />
      <SafeAreaView style={styles.root}>
        <SsuStatusBar type="black" />
        <ModalLoading visible={loading} />

        {!loading && <WebView source={{uri: merchantUrl}} />}
      </SafeAreaView>
    </>
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
