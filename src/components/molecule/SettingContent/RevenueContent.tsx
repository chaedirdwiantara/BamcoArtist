import React, {useState, FC} from 'react';
import {View, StyleSheet} from 'react-native';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {Button} from '../../atom';
import {TabFilter} from '../TabFilter';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {
  DataDropDownType,
  dropDownDataDonation,
  dropDownDataSubscription,
} from '../../../data/dropdown';
import {useTranslation} from 'react-i18next';
import ListTips from '../Revenue/ListTips';
import ListSubs from '../Revenue/ListSubs';

interface RevenueProps {
  onPressGoBack: () => void;
}

export const RevenueContent: FC<RevenueProps> = ({onPressGoBack}) => {
  const {t} = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter] = useState([
    {filterName: 'Setting.Tips.Tab.Donation'},
    {filterName: 'Setting.Tips.Tab.Subs'},
  ]);
  const filterData = (item: any, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Revenue.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
      />

      <TabFilter.Type1
        filterData={filter}
        onPress={filterData}
        selectedIndex={selectedIndex}
        TouchableStyle={{width: width * 0.45}}
        translation={true}
      />

      {filter[selectedIndex].filterName === 'Setting.Tips.Tab.Subs' ? (
        <ListSubs />
      ) : (
        <ListTips />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  containerTab: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentage(15),
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(6),
  },
  containerButtonCurrent: {
    width: widthPercentage(80),
    aspectRatio: heightPercentage(80 / 24),
  },
  containerButtonPast: {
    width: widthPercentage(80),
    aspectRatio: heightPercentage(80 / 24),
    marginLeft: widthPercentage(10),
  },
  dropdown: {
    width: widthPercentage(138),
    marginLeft: widthPercentage(-57),
  },
  emptyState: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginTop: heightPercentage(100),
  },
});
