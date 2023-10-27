import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';

import {Gap} from '../../atom';
import {width} from '../../../utils';
import {color, font} from '../../../theme';
import {ModalInfo} from '../Modal/ModalInfo';
import {UploadIcon} from '../../../assets/icon';

export const UploadMusicSection = () => {
  const {t} = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <UploadIcon />
          <Gap width={ms(10)} />
          <Text style={styles.title}>{t('Home.UploadMusic.Title')}</Text>
        </View>
        <TouchableOpacity
          style={styles.containerView}
          onPress={() => setShowModal(true)}>
          <Text style={styles.view}>{t('Home.UploadMusic.View')}</Text>
        </TouchableOpacity>
      </View>

      <ModalInfo
        title={t('Home.UploadMusic.ModalInfo.Title')}
        subtitle1={t('Home.UploadMusic.ModalInfo.Subtitle1')}
        url={'https://artists.thebeam.co'}
        subtitle2={t('Home.UploadMusic.ModalInfo.Subtitle2')}
        visible={showModal}
        onPressClose={() => setShowModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    borderWidth: 1,
    borderColor: '#456696',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: mvs(20),
    paddingHorizontal: ms(15),
  },
  containerTitle: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerView: {
    width: '25%',
    alignItems: 'flex-end',
  },
  title: {
    color: color.Neutral[10],
    fontWeight: '600',
    fontFamily: font.InterBold,
    fontSize: mvs(16),
  },
  view: {
    color: color.Green[200],
    fontWeight: '500',
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
  },
  card: {
    width: width * 0.9,
    backgroundColor: color.Dark[900],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: ms(20),
    paddingVertical: mvs(30),
  },
  containerBtn: {
    width: '100%',
    backgroundColor: color.Success[400],
  },
  modalTitle: {
    color: color.Neutral[10],
    fontFamily: font.InterBold,
    fontSize: mvs(16),
    marginTop: mvs(15),
  },
  modalSubtitle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    marginTop: mvs(10),
    marginBottom: mvs(20),
  },
});
