import React, {useState, FC} from 'react';
import {View, StyleSheet} from 'react-native';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {Button} from '../../atom';
import {Dropdown} from '../DropDown';
import {TabFilter} from '../TabFilter';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {DonateCardContent} from './DonateCard';
import {ArrowLeftIcon} from '../../../assets/icon';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {EmptyState} from '../EmptyState/EmptyState';
import {dropDownDataSubscription} from '../../../data/dropdown';
import {useTranslation} from 'react-i18next';

interface DASProps {
  onPressGoBack: () => void;
}

export const DASContent: FC<DASProps> = ({onPressGoBack}) => {
  const {t} = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [changeTab, setChangeTab] = useState('current');
  const [filter] = useState([
    {filterName: 'Setting.Tips.Tab.Donation'},
    {filterName: 'Setting.Tips.Tab.Subs'},
  ]);
  const filterData = (item: any, index: number) => {
    setSelectedIndex(index);
  };

  const onPressMore = (item: any) => {
    if (item.value === '2') setModalVisible(true);
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
            containerStyles={styles.containerButtonCurrent}
          />
          <Button
            type={changeTab === 'past' ? '' : 'border'}
            label={t('Setting.Tips.Label.Past')}
            textStyles={{fontSize: normalize(10)}}
            containerStyles={styles.containerButtonPast}
            onPress={() => setChangeTab('past')}
          />
        </View>
        <View style={{width: widthPercentage(80)}}>
          <Dropdown.Menu
            data={dropDownDataSubscription}
            placeHolder={t('Setting.Tips.Filter.Duration')}
            selectedMenu={() => null}
            containerStyle={styles.dropdown}
            translation={true}
          />
        </View>
      </View>

      {filter[selectedIndex].filterName === 'Setting.Tips.Tab.Subs' ? (
        <DonateCardContent
          avatarUri={
            'https://www.vantage.id/wp-content/uploads/2022/03/FOE32FCVQBgK565-1024x1024.jpg'
          }
          name={'Kelompok Penerbang Roket'}
          username={'@kelompok'}
          detail={['Ongoing', 'Dec 16, 2022', '1,200', 'Monthly']}
          onPressMore={onPressMore}
        />
      ) : (
        <EmptyState
          text={t('EmptyState.Donate') || ''}
          containerStyle={styles.emptyState}
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
