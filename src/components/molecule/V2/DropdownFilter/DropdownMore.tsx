import {
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {IconMore} from '../../../atom';
import {widthResponsive} from '../../../../utils';
import FilterModal from './modalFilter';
import {DataDropDownType, dataUpdateComment} from '../../../../data/dropdown';
import {ms, mvs} from 'react-native-size-matters';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

interface DropdownV2Props {
  id: string;
  selectedid?: (id: string) => void;
  selectedMenu: (data: DataDropDownType) => void;
  dataFilter: DataDropDownType[];
}

const DropdownMore: React.FC<DropdownV2Props> = (props: DropdownV2Props) => {
  const {id, selectedid, selectedMenu, dataFilter} = props;
  const [offsetSortFilter, setOffsetSortFilter] = useState<{
    px: number;
    py: number;
  }>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [menuSelected, setMenuSelected] = useState<DataDropDownType>();

  const handleOnClose = () => {
    if (menuSelected !== undefined) {
      selectedMenu?.(menuSelected);
      selectedid?.(id);
      setMenuSelected(undefined);
    }
  };

  const handleSelectedOnPress = (data: DataDropDownType) => {
    setMenuSelected(data);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setIsModalVisible(true)}
        onLayout={event => {
          event.target.measure((x, y, width, height, pageX, pageY) => {
            setOffsetSortFilter({
              px: pageX + width,
              py: Platform.OS === 'android' ? pageY - barHeight : pageY,
            });
          });
        }}>
        <IconMore />
      </TouchableOpacity>
      {offsetSortFilter !== undefined && (
        <FilterModal
          toggleModal={() => setIsModalVisible(false)}
          modalVisible={isModalVisible}
          dataFilter={dataFilter}
          selectedMenu={handleSelectedOnPress}
          sendCategory={() => {}}
          translation={true}
          xPosition={offsetSortFilter?.px}
          yPosition={offsetSortFilter?.py}
          containerStyle={{
            top: offsetSortFilter?.py + ms(2),
            left: offsetSortFilter?.px - widthResponsive(117),
          }}
          textStyle={{fontSize: mvs(12)}}
          buttonContainerStyle={{
            marginVertical: mvs(4),
            marginHorizontal: ms(4),
          }}
          onModalHide={handleOnClose}
        />
      )}
    </View>
  );
};

export default DropdownMore;

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 7,
    marginBottom: 9,
  },
  iconContainer: {
    marginRight: widthResponsive(5),
    marginLeft: widthResponsive(6),
  },
});
