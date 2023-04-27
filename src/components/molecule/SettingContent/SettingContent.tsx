import React, {useState} from 'react';
import {
  View,
  Text,
  Linking,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import DeviceInfo from 'react-native-device-info';
import {useNavigation} from '@react-navigation/native';

import {TopNavigation} from '../TopNavigation';
import {color, typography} from '../../../theme';
import {ModalCustom} from '../Modal/ModalCustom';
import Typography from '../../../theme/Typography';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {RootStackParams} from '../../../navigations';
import {MenuText} from '../../atom/MenuText/MenuText';
import {useFcmHook} from '../../../hooks/use-fcm.hook';
import {useAuthHook} from '../../../hooks/use-auth.hook';
import {menuSetting} from '../../../data/Settings/setting';
import * as FCMService from '../../../service/notification';
import {ArrowLeftIcon, LogOutIcon} from '../../../assets/icon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {height, heightPercentage, width, widthPercentage} from '../../../utils';

interface SettingProps {
  onPressGoBack: () => void;
  onPressGoTo: (screenName: string, params?: any) => void;
}

export const SettingContent: React.FC<SettingProps> = ({
  onPressGoBack,
  onPressGoTo,
}) => {
  const listMenu = menuSetting;
  const version = DeviceInfo.getVersion();
  const [isVisible, setIsVisible] = useState({
    modalReport: false,
    modalConfirm: false,
  });
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {onLogout} = useAuthHook();
  const {removeFcmToken} = useFcmHook();

  const onPress = (val: string) => {
    if (val === 'Helps') {
      setIsVisible({
        modalReport: true,
        modalConfirm: false,
      });
    } else {
      onPressGoTo(val.replace(/\s/g, ''));
    }
  };

  const MailTo = () => {
    return Linking.openURL(
      'mailto:inquiry@sunnysideup.io?subject=Need Help About Application',
    );
  };

  const ListReport = ({title, subtitle}: {title: string; subtitle: string}) => {
    return (
      <TouchableOpacity
        style={{marginTop: heightPercentage(10)}}
        onPress={() => {
          title === t('Setting.Report.Modal.Help')
            ? MailTo()
            : onPressGoTo('SendReport', {title});
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
        <ListReport
          title={t('Setting.Report.Modal.Help')}
          subtitle={t('Setting.Report.Modal.TextHelp')}
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
            containerStyles={{marginTop: heightPercentage(15)}}
            onPress={() => onPress(val.value)}
          />
        ))}
        <View style={styles.containerText}>
          <Text style={[Typography.Button2, styles.textVersion]}>
            {`${t('Setting.Version.Title')} ${version}`}
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
    fontSize: mvs(13),
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
