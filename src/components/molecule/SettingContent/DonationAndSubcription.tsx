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

interface DASProps {
  onPressGoBack: () => void;
}

export const DASContent: FC<DASProps> = ({onPressGoBack}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [changeTab, setChangeTab] = useState('current');
  const [filter] = useState([
    {filterName: 'Donation'},
    {filterName: 'Subscription'},
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
        title="Donation And Subcription"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
      />
      <TabFilter.Type1
        filterData={filter}
        onPress={filterData}
        selectedIndex={selectedIndex}
        TouchableStyle={{width: width * 0.45}}
      />

      <View style={styles.containerTab}>
        <View style={{flexDirection: 'row'}}>
          <Button
            type={changeTab === 'current' ? '' : 'border'}
            label="Current"
            textStyles={{fontSize: normalize(10)}}
            onPress={() => setChangeTab('current')}
            containerStyles={styles.containerButtonCurrent}
          />
          <Button
            type={changeTab === 'past' ? '' : 'border'}
            label="Past"
            textStyles={{fontSize: normalize(10)}}
            containerStyles={styles.containerButtonPast}
            onPress={() => setChangeTab('past')}
          />
        </View>
        <View style={{width: widthPercentage(80)}}>
          <Dropdown.Menu
            data={dropDownDataSubscription}
            placeHolder={'Duration'}
            selectedMenu={() => null}
            containerStyle={styles.dropdown}
          />
        </View>
      </View>

      {filter[selectedIndex].filterName === 'Subscription' ? (
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
          text="Seems like you aren’t rewarded any musician yet, try to donate your favorite musician"
          containerStyle={styles.emptyState}
        />
      )}

      <ModalConfirm
        modalVisible={isModalVisible}
        title="Unsubscribe"
        subtitle="Are you sure you want to unsubscribe Dialog Dini Hari?"
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
    marginHorizontal: widthPercentage(12),
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
