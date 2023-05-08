import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {TopNavigation} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {heightPercentage, width, widthPercentage} from '../../utils';
import PromoItem from '../../components/atom/Promo/PromoItem';
import {dataPromo} from '../../data/Action/promo';

type PromoCodeProps = NativeStackScreenProps<RootStackParams, 'PromoCode'>;

export const PromoCode: React.FC<PromoCodeProps> = ({
  navigation,
}: PromoCodeProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Promo.Code.Title')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={Color.Neutral[10]}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, paddingHorizontal: widthPercentage(24)}}>
        {dataPromo.map(data => {
          return (
            <PromoItem
              title={data.title}
              end={data.end}
              onPress={() => navigation.navigate('PromoDetail', {id: data.id})}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PromoCode;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topContainer: {
    paddingVertical: heightPercentage(16),
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(24),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  bottomContainer: {
    justifyContent: 'space-between',
    backgroundColor: Color.Dark[700],
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(24),
  },
  button: {
    width: width * 0.35,
    aspectRatio: heightPercentage(120 / 40),
  },
  promo: {
    justifyContent: 'space-between',
    marginBottom: heightPercentage(16),
    borderColor: Color.Dark[500],
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
});
