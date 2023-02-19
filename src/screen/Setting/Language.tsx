import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {ArrowLeftIcon} from '../../assets/icon';
import {Dropdown, ModalConfirm, TopNavigation} from '../../components';
import {dataLanguage} from '../../data/Settings/language';
import {heightPercentage, widthPercentage} from '../../utils';
import {useTranslation} from 'react-i18next';
import {storage} from '../../hooks/use-storage.hook';

export const LanguageScreen: React.FC = () => {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [showModal, setShowModal] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (language !== i18n.language) {
      setShowModal(true);
    }
  }, [language]);

  const handleCancelConfirm = () => {
    setShowModal(false);
    setLanguage(i18n.language);
  };

  const onChangeLanguage = () => {
    setShowModal(false);
    i18n.changeLanguage(language);
    storage.set('lang', language);
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Language.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />
      <Dropdown.Input
        data={dataLanguage}
        initialValue={language}
        placeHolder={t('Setting.Language.Placeholder')}
        dropdownLabel={t('Setting.Language.Title')}
        textTyped={(newText: PropsType) => setLanguage(newText.value)}
        containerStyles={{marginTop: heightPercentage(15)}}
      />
      <ModalConfirm
        modalVisible={showModal}
        title={t('Setting.Language.Modal.Title') || ''}
        subtitle={t('Setting.Language.Modal.Subtitle') || ''}
        onPressClose={handleCancelConfirm}
        onPressOk={onChangeLanguage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
});
