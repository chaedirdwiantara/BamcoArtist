import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Platform,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';

import {
  width,
  toCurrency,
  widthPercentage,
  heightPercentage,
} from '../../../utils';
import {
  dataCreditDropdown,
  DataDropDownNumberType,
} from '../../../data/dropdown';
import {Button} from '../../atom';
import {TabFilter} from '../TabFilter';
import ListTips from '../Revenue/ListTips';
import ListSubs from '../Revenue/ListSubs';
import {TopNavigation} from '../TopNavigation';
import {WithdrawalCard} from './WithdrawalCard';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {MyCreditInfoCard} from './MyCreditInfoCard';
import {EmptyState} from '../EmptyState/EmptyState';
import {color, font, typography} from '../../../theme';
import {useCreditHook} from '../../../hooks/use-credit.hook';
import {dateFormatSubscribe} from '../../../utils/date-format';
import {ArrowLeftIcon, TooltipIcon} from '../../../assets/icon';
import {useWithdrawHook} from '../../../hooks/use-withdraw.hook';
import {profileStorage, storage} from '../../../hooks/use-storage.hook';
import {ListWithdrawPropsType} from '../../../interface/withdraw.interface';

interface TopUpCreditProps {
  onPressGoBack: () => void;
  onPressWithdrawal: () => void;
  goToCredit: (type: number) => void;
}

export const TopUpCreditContent: React.FC<TopUpCreditProps> = ({
  onPressGoBack,
  onPressWithdrawal,
  goToCredit,
}) => {
  const {t} = useTranslation();
  const {creditCount, getCreditCount} = useCreditHook();
  const {getListWithdraw} = useWithdrawHook();
  const {
    data: dataWithdraw,
    status: statusWithdraw,
    refetch: refetchWithdraw,
  } = useQuery({
    queryKey: ['list-withdraw'],
    queryFn: () => getListWithdraw({uuid: profileStorage()?.uuid}),
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [listWithdrawal, setListWithdrawal] = useState<ListWithdrawPropsType[]>(
    [],
  );
  const [filter] = useState([
    {filterName: 'Setting.Tips.Tab.Donation'},
    {filterName: 'Setting.Tips.Tab.Subs'},
    {filterName: 'TopUp.Filter.Withdrawal'},
  ]);
  const [touchEnd, setTouchEnd] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showModalTopupInfo, setShowModalTopupInfo] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      refetchWithdraw();
      getCreditCount();
    }, []),
  );

  // save withdraw to local state
  useFocusEffect(
    useCallback(() => {
      if (statusWithdraw === 'success' && dataWithdraw?.data) {
        setListWithdrawal(dataWithdraw?.data);
        // if back from request withdraw, tab active must be on Withdrawal tab
        const index = storage.getNumber('withdrawIndex') || 0;
        setSelectedIndex(index);

        // remove index after shown
        setTimeout(() => {
          storage.delete('withdrawIndex');
        }, 1000);
      }
    }, [statusWithdraw, dataWithdraw]),
  );

  const filterData = (item: any, index: number) => {
    setSelectedIndex(index);
  };

  const onPressOpenWithdrawal = (index: number) => {
    // add new prop to open withdraw card
    let newList = [...listWithdrawal];
    newList[index].isOpen = !newList[index].isOpen;
    setListWithdrawal(newList);
  };

  const resultDataDropdown = (selectedMenu: DataDropDownNumberType) => {
    const value = selectedMenu.value;
    goToCredit(value);
  };

  useEffect(() => {
    if (touchEnd) setTouchEnd(false);
  }, [touchEnd]);

  useEffect(() => {
    if (isRefreshing) setIsRefreshing(false);
  }, [isRefreshing]);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const subtitleModal =
    Platform.OS === 'ios'
      ? 'Modal.TopupInfo.SubtitleIos'
      : 'Modal.TopupInfo.SubtitleAndroid';

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        type="user detail"
        title={t('TopUp.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        dropdownData={dataCreditDropdown}
        resultDataDropdown={resultDataDropdown}
        dropdownStyle={{marginRight: 0}}
        leftPositionDropdown={widthPercentage(-20)}
      />

      <ScrollView
        contentContainerStyle={styles.containerScrollView}
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setTouchEnd(true);
          }
        }}
        scrollEventThrottle={100}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => setIsRefreshing(true)}
            onLayout={e => console.log(e.nativeEvent)}
            tintColor="transparent"
            colors={['transparent']}
            style={{backgroundColor: 'transparent'}}
          />
        }>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{textAlign: 'center'}}>
            <Text style={[typography.Subtitle1, styles.text]}>
              {t('TopUp.Subtitle1')}
            </Text>
            <TouchableOpacity onPress={() => setShowModalTopupInfo(true)}>
              <TooltipIcon stroke={color.Pink[2]} style={styles.tooltipStyle} />
            </TouchableOpacity>
          </Text>
          <Text style={[typography.Caption, styles.text]}>
            {t('TopUp.Subtitle2')}
          </Text>
          <Text style={[typography.Caption, styles.text]}>
            {t('TopUp.Subtitle3')}
          </Text>
        </View>

        <MyCreditInfoCard
          creditCount={Number(creditCount)}
          title1={t('TopUp.MyCoin')}
          title2={t('TopUp.Estimation')}
        />

        <Button
          label={t('TopUp.ButtonWithdraw')}
          textStyles={{fontSize: mvs(13), fontFamily: font.InterMedium}}
          containerStyles={styles.btnContainer}
          onPress={onPressWithdrawal}
        />

        <TabFilter.Type1
          filterData={filter}
          onPress={filterData}
          selectedIndex={selectedIndex}
          TouchableStyle={{width: width * 0.3}}
          translation={true}
        />

        {filter[selectedIndex].filterName === 'Setting.Tips.Tab.Donation' ? (
          <ListTips touchEnd={touchEnd} isRefreshing={isRefreshing} />
        ) : filter[selectedIndex].filterName === 'Setting.Tips.Tab.Subs' ? (
          <ListSubs touchEnd={touchEnd} isRefreshing={isRefreshing} />
        ) : (
          <>
            {listWithdrawal.length > 0 ? (
              <View style={styles.containerContent}>
                {listWithdrawal.map((val, i) => (
                  <WithdrawalCard
                    key={i}
                    transactionAmount={toCurrency(val.amount, {
                      withFraction: false,
                    })}
                    conversionAmount={val.amountConversion}
                    idMusician={val.toBankNumber}
                    date={dateFormatSubscribe(val.requestDate)}
                    status={val.status}
                    notes={val.notes}
                    isOpen={val.isOpen}
                    onPress={() => onPressOpenWithdrawal(i)}
                  />
                ))}
              </View>
            ) : (
              <EmptyState
                text={t('TopUp.EmptyState.Withdrawal') || ''}
                hideIcon={true}
                containerStyle={styles.containerEmpty}
                textStyle={styles.emptyText}
              />
            )}
          </>
        )}
      </ScrollView>

      <ModalConfirm
        modalVisible={showModalTopupInfo}
        oneButton={true}
        title={t('Modal.TopupInfo.Title') || ''}
        subtitle={t(subtitleModal) || ''}
        yesText={t('General.Dismiss') || ''}
        onPressOk={() => setShowModalTopupInfo(false)}
        subtitleStyles={{fontSize: mvs(13)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
  text: {
    color: color.Neutral[10],
    textAlign: 'center',
    marginTop: heightPercentage(20),
    width: width * 0.9,
  },
  containerListPrice: {
    width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: heightPercentage(20),
  },
  padding: {
    paddingHorizontal: widthPercentage(5),
    paddingVertical: heightPercentage(5),
  },
  containerScrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentage(10),
    marginBottom: heightPercentage(20),
  },
  containerContent: {
    marginTop: heightPercentage(10),
    marginBottom: heightPercentage(40),
  },
  btnContainer: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: mvs(5),
    marginBottom: mvs(15),
  },
  containerEmpty: {
    alignSelf: 'center',
    marginTop: mvs(80),
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(16),
  },
  tooltipStyle: {
    position: 'absolute',
    top: mvs(-15),
    marginLeft: widthPercentage(10),
    width: widthPercentage(17),
    height: widthPercentage(17),
  },
});
