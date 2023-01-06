import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeftIcon, LogOutIcon} from '../../../assets/icon';
import {menuSetting} from '../../../data/Settings/setting';

import {TopNavigation} from '../TopNavigation';
import {color, typography} from '../../../theme';
import {ModalCustom} from '../Modal/ModalCustom';
import Typography from '../../../theme/Typography';
import {MenuText} from '../../atom/MenuText/MenuText';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {useAuthHook} from '../../../hooks/use-auth.hook';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import * as FCMService from '../../../service/notification';
import {useFcmHook} from '../../../hooks/use-fcm.hook';

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
  const listMenu = menuSetting;
  const [isVisible, setIsVisible] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {onLogout} = useAuthHook();
  const {removeFcmToken} = useFcmHook();

  const onPress = (val: string) => {
    if (val === 'Send Report') {
      setIsVisible(true);
    } else if (val === 'Terms Conditions' || val === 'Privacy Policy') {
      const path = val === 'Terms Conditions' ? 'tos' : 'privacy-policy';
      handleWebview(val, `https://sunnysideup.io/marketplace/${path}`);
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
          setIsVisible(false);
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
          Need help?
        </Text>
        <ListReport
          title={'Report a bug'}
          subtitle={
            'Something in the app is broken or doesn’t work as expected'
          }
        />
        <ListReport
          title={'Suggest an improvement'}
          subtitle={'New ideas or desired enhancement for this app'}
        />
      </View>
    );
  };

  const onPressSignout = () => {
    onLogout();
    FCMService.getTokenFCM({
      onGetToken: token => {
        removeFcmToken(token);
      },
    });
    navigation.replace('SignInGuest');
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Settings"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {listMenu.map((val, i) => (
          <MenuText.RightIcon
            key={i}
            text={val}
            containerStyles={{marginTop: heightPercentage(12)}}
            onPress={() => onPress(val)}
          />
        ))}
        <View style={styles.containerText}>
          <Text style={[Typography.Button2, styles.textVersion]}>
            {'Version 1.0.0'}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.containerText}>
        <TouchableOpacity
          style={styles.containerSignout}
          onPress={onPressSignout}>
          <LogOutIcon />
          <Text style={[Typography.Button2, styles.textSignOut]}>
            {'Sign Out'}
          </Text>
        </TouchableOpacity>
      </View>

      <ModalCustom
        modalVisible={isVisible}
        children={children()}
        onPressClose={() => setIsVisible(false)}
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
  containerSignout: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: heightPercentage(25),
  },
  containerText: {
    width: width * 0.9,
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
