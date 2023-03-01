import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {menuSetting} from '../../../data/Settings/setting';
import {ArrowLeftIcon, LogOutIcon} from '../../../assets/icon';

import {TopNavigation} from '../TopNavigation';
import {color, typography} from '../../../theme';
import {ModalCustom} from '../Modal/ModalCustom';
import Typography from '../../../theme/Typography';
import {MenuText} from '../../atom/MenuText/MenuText';
import {RootStackParams} from '../../../navigations';
import {useFcmHook} from '../../../hooks/use-fcm.hook';
import {useAuthHook} from '../../../hooks/use-auth.hook';
import * as FCMService from '../../../service/notification';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {height, heightPercentage, width, widthPercentage} from '../../../utils';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {useTranslation} from 'react-i18next';

interface SettingProps {
  onPressGoBack: () => void;
  onPressGoTo: (screenName: string, params?: any) => void;
  handleWebview: (title: string, url: string) => void;
}

export const SettingContent: React.FC<SettingProps> = ({
  onPressGoBack,
  onPressGoTo,
  handleWebview,
}) => {
  const {t} = useTranslation();
  const listMenu = menuSetting;
  const [isVisible, setIsVisible] = useState({
    modalReport: false,
    modalConfirm: false,
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {onLogout} = useAuthHook();
  const {removeFcmToken} = useFcmHook();

  const onPress = (val: string) => {
    if (val === 'Send Report') {
      setIsVisible({
        modalReport: true,
        modalConfirm: false,
      });
    } else if (val === 'Terms and Conditions' || val === 'Privacy Policy') {
      const path = val === 'Terms and Conditions' ? 'tos' : 'privacy-policy';
      handleWebview(val, `https://sunnysideup.io/marketplace/${path}`);
    } else if (val === 'Exclusive Content') {
      onPressGoTo('ExclusiveContentSetting');
    } else if (val === 'Preferences') {
      onPressGoTo('PreferenceSetting');
    } else {
      onPressGoTo(val.replace(/\s/g, ''));
    }
  };

  const ListReport = ({title, subtitle}: {title: string; subtitle: string}) => {
    return (
      <TouchableOpacity
        style={{marginTop: heightPercentage(10)}}
        onPress={() => {
          onPressGoTo('SendReport', {title});
          closeModal();
        }}>
        <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
          {title}
        </Text>
        <Text style={[typography.Body2, {color: color.Neutral[10]}]}>
          {subtitle}
        </Text>
      </TouchableOpacity>
    );
  };

  const children = () => {
    return (
      <View style={styles.card}>
        <Text style={[typography.Heading6, {color: color.Neutral[10]}]}>
          {t('Setting.Report.Modal.Title')}
        </Text>
        <ListReport
          title={t('Setting.Report.Modal.Bug')}
          subtitle={t('Setting.Report.Modal.TextBug')}
        />
        <ListReport
          title={t('Setting.Report.Modal.Suggest')}
          subtitle={t('Setting.Report.Modal.TextSuggest')}
        />
      </View>
    );
  };

  const closeModal = () => {
    setIsVisible({
      modalConfirm: false,
      modalReport: false,
    });
  };

  const onPressSignout = async () => {
    closeModal();
    await onLogout();
    FCMService.getTokenFCM({
      onGetToken: token => {
        removeFcmToken(token);
      },
    });
    navigation.reset({
      index: 0,
      routes: [{name: 'SignInGuest'}],
    });
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {listMenu.map((val, i) => (
          <MenuText.RightIcon
            key={i}
            text={t(val.text) || ''}
            containerStyles={{marginTop: heightPercentage(12)}}
            onPress={() => onPress(val.value)}
          />
        ))}
        <View style={styles.containerText}>
          <Text style={[Typography.Button2, styles.textVersion]}>
            {`${t('Setting.Version.Title')} 1.0.0`}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.containerSignOut}>
        <TouchableOpacity
          style={styles.signOut}
          onPress={() =>
            setIsVisible({
              modalConfirm: true,
              modalReport: false,
            })
          }>
          <LogOutIcon />
          <Text style={[Typography.Button2, styles.textSignOut]}>
            {t('Btn.SignOut')}
          </Text>
        </TouchableOpacity>
      </View>

      <ModalCustom
        modalVisible={isVisible.modalReport}
        children={children()}
        onPressClose={closeModal}
      />

      <ModalConfirm
        modalVisible={isVisible.modalConfirm}
        title={t('Btn.SignOut') || ''}
        subtitle={t('Modal.SignOut') || ''}
        onPressClose={closeModal}
        onPressOk={onPressSignout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  textVersion: {
    color: color.Neutral[10],
    paddingTop: heightPercentage(15),
    alignSelf: 'center',
  },
  textSignOut: {
    color: color.Neutral[10],
    paddingLeft: widthPercentage(15),
  },
  signOut: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: heightPercentage(25),
  },
  containerText: {
    width: width * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: heightPercentage(10),
  },
  containerSignOut: {
    width: width * 0.9,
    height: height * 0.1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  card: {
    width: width * 0.9,
    backgroundColor: color.Dark[900],
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(25),
  },
});
