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
import ListTips from '../TipsAndSubs/ListTips';
import ListSubs from '../TipsAndSubs/ListSubs';
import {DropDownFilter} from '../V2';

interface DASProps {
  onPressGoBack: () => void;
}

export const DASContent: FC<DASProps> = ({onPressGoBack}) => {
  const {t} = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [changeTab, setChangeTab] = useState<'current' | 'past'>('current');
  const [selectedFilterMenu, setSelectedFilterMenu] =
    useState<DataDropDownType>();
  const [filter] = useState([
    {filterName: 'Setting.Tips.Tab.Donation'},
    {filterName: 'Setting.Tips.Tab.Subs'},
  ]);
  const filterData = (item: any, index: number) => {
    setSelectedIndex(index);
    setChangeTab('current');
    setSelectedFilterMenu({label: 'Setting.Tips.Filter.All', value: ''});
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Tips.Title')}
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

      <View style={styles.containerTab}>
        <View style={{flexDirection: 'row'}}>
          <Button
            type={changeTab === 'current' ? '' : 'border'}
            label={t('Setting.Tips.Label.Current')}
            textStyles={{fontSize: normalize(10)}}
            onPress={() => setChangeTab('current')}
            containerStyles={[
              styles.containerButtonCurrent,
              {
                backgroundColor:
                  changeTab === 'current' ? Color.Pink.linear : 'transparent',
              },
            ]}
            borderColor={Color.Pink.linear}
          />
          <Button
            type={changeTab === 'past' ? '' : 'border'}
            label={t('Setting.Tips.Label.Past')}
            textStyles={{fontSize: normalize(10)}}
            containerStyles={[
              styles.containerButtonPast,
              {
                backgroundColor:
                  changeTab === 'past' ? Color.Pink.linear : 'transparent',
              },
            ]}
            onPress={() => setChangeTab('past')}
            borderColor={Color.Pink.linear}
          />
        </View>
        <View style={{width: widthPercentage(80)}}>
          <DropDownFilter
            labelCaption={
              selectedFilterMenu
                ? t(selectedFilterMenu.label)
                : t('Setting.Tips.Filter.Duration')
            }
            dataFilter={
              filter[selectedIndex].filterName === 'Setting.Tips.Tab.Subs'
                ? dropDownDataSubscription
                : dropDownDataDonation
            }
            selectedMenu={setSelectedFilterMenu}
            leftPosition={widthResponsive(-100)}
          />
        </View>
      </View>

      {filter[selectedIndex].filterName === 'Setting.Tips.Tab.Subs' ? (
        <ListSubs
          status={changeTab}
          duration={selectedFilterMenu?.value || ''}
        />
      ) : (
        <ListTips
          status={changeTab}
          duration={selectedFilterMenu?.value || ''}
        />
      )}

      <ModalConfirm
        modalVisible={isModalVisible}
        title={t('Setting.Tips.Menu.Subs.Unsubs') || ''}
        subtitle={t('Modal.Donation.Unsubs') || ''}
        onPressClose={() => setModalVisible(false)}
        onPressOk={() => setModalVisible(false)}
      />
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
