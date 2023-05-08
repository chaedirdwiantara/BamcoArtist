import React, {useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {color, typography} from '../../../theme';
import {TopNavigation} from '../../../components';
import {RootStackParams} from '../../../navigations';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {ArrowLeftIcon, ArrowRightIcon} from '../../../assets/icon';
import {MenuText} from '../../../components/atom/MenuText/MenuText';
import {widthResponsive, heightPercentage, width} from '../../../utils';

export const AboutDeletionScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {listReasonDelete, getListReasonDelete} = useSettingHook();

  useEffect(() => {
    getListReasonDelete();
  }, []);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToInputDeletion = (id: number, text: string) => {
    navigation.navigate('InputDeletion', {id, text});
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.DeleteAccount.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: heightPercentage(10),
          paddingHorizontal: widthResponsive(15),
        }}
      />

      <ScrollView
        style={styles.containerContent}
        showsHorizontalScrollIndicator={false}>
        <Text style={[typography.Heading6, styles.title]}>
          {t('Setting.DeleteAccount.About.TitleDeletion')}
        </Text>
        <Text style={[typography.Body2, styles.subtitle]}>
          {t('Setting.DeleteAccount.About.FirstParagraph')}
        </Text>
        <Text style={[typography.Body2, styles.subtitle]}>
          {t('Setting.DeleteAccount.About.SecondParagraph')}
        </Text>
        <Text style={[typography.Body2, styles.subtitle]}>
          {t('Setting.DeleteAccount.About.ThirdParagraph')}
        </Text>

        <Text style={[typography.Heading6, styles.title]}>
          {t('Setting.DeleteAccount.About.TitleReason')}
        </Text>
        <Text style={[typography.Body2, styles.subtitle]}>
          {t('Setting.DeleteAccount.About.FourthParagraph')}
        </Text>

        {listReasonDelete.map((val, i) => (
          <MenuText.RightIcon
            key={i}
            text={t(val.Name) || ''}
            containerStyles={{marginTop: heightPercentage(15)}}
            icon={<ArrowRightIcon stroke={color.Success[400]} />}
            onPress={() => goToInputDeletion(val.ID, val.Name)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  containerContent: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  title: {
    color: color.Neutral[10],
    marginVertical: heightPercentage(13),
  },
  subtitle: {
    color: color.Neutral[10],
    marginBottom: heightPercentage(10),
  },
});
