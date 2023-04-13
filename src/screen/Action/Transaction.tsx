import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TopNavigation} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import {useTranslation} from 'react-i18next';
import {heightPercentage, widthPercentage} from '../../utils';
import Typography from '../../theme/Typography';
import MerchTransaction from '../../components/molecule/Transaction/Merch';
import ConcertTransaction from '../../components/molecule/Transaction/Concert';

type TransactionProps = NativeStackScreenProps<RootStackParams, 'Transaction'>;

export const Transaction: React.FC<TransactionProps> = ({
  navigation,
}: TransactionProps) => {
  const {t} = useTranslation();
  const [tabActive, setTabActive] = useState<number>(1);

  const tabs = [
    {
      id: 0,
      title: t('Event.Concert.Title'),
    },
    {
      id: 1,
      title: t('Event.Merch.Title'),
    },
  ];

  const handleChangeTab = (tabId: number) => {
    setTabActive(tabId);
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Transaction.Title')}
        leftIconAction={() => navigation.goBack()}
        maxLengthTitle={40}
        itemStrokeColor={Color.Neutral[10]}
      />
      <View style={[styles.topContainer]}>
        {tabs.map((tab, index) => {
          return (
            <>
              <TouchableOpacity onPress={() => handleChangeTab(tab.id)}>
                <Text
                  style={[
                    Typography.Subtitle2,
                    {
                      color:
                        tabActive === tab.id
                          ? Color.Pink.linear
                          : Color.Neutral[10],
                    },
                  ]}>
                  {tab.title}
                </Text>
              </TouchableOpacity>
              {index + 1 < tabs.length && <View style={styles.tabSpacer} />}
            </>
          );
        })}
      </View>

      {tabActive === 0 ? <ConcertTransaction /> : <MerchTransaction />}
    </View>
  );
};

export default Transaction;

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
    flexDirection: 'row',
    paddingVertical: heightPercentage(16),
    paddingHorizontal: widthPercentage(24),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  tabSpacer: {
    borderWidth: 1,
    borderColor: Color.Neutral[10],
    marginHorizontal: widthPercentage(10),
  },
});
