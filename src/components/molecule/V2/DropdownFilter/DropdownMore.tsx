import {
  Dimensions,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IconMore} from '../../../atom';
import {widthResponsive} from '../../../../utils';
import FilterModal from './modalFilter';
import {DataDropDownType} from '../../../../data/dropdown';
import {ms, mvs} from 'react-native-size-matters';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;
const {height} = Dimensions.get('screen');

interface DropdownV2Props {
  id?: string;
  selectedid?: (id: string) => void;
  selectedMenu: (data: DataDropDownType) => void;
  dataFilter: DataDropDownType[];
  iconContainerStyle?: ViewStyle;
  compWitdth?: number;
}

const DropdownMore: React.FC<DropdownV2Props> = (props: DropdownV2Props) => {
  const {
    id,
    selectedid,
    selectedMenu,
    dataFilter,
    iconContainerStyle,
    compWitdth,
  } = props;
  const [offsetSortFilter, setOffsetSortFilter] = useState<{
    px: number;
    py: number;
  }>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [menuSelected, setMenuSelected] = useState<DataDropDownType>();
  const [compHeight, setCompHeight] = useState(0);
  const [dropDownHeight, setDropdownHeight] = useState(0);
  const [heightPercent, setHeightPercent] = useState<number>(0);

  const handleOnClose = () => {
    if (menuSelected !== undefined) {
      selectedMenu?.(menuSelected);
      setMenuSelected(undefined);
      if (id !== undefined) {
        selectedid?.(id);
      }
    }
  };

  const handleSelectedOnPress = (data: DataDropDownType) => {
    setMenuSelected(data);
  };

  useEffect(() => {
    if (offsetSortFilter) {
      setHeightPercent(((height - offsetSortFilter?.py) * 100) / height);
      setCompHeight(dataFilter.length * widthResponsive(35));
    }
  }, [offsetSortFilter]);

  return (
    <View
      style={styles.dropdownContainer}
      onLayout={event => {
        event.target.measure(() => {});
      }}
      ref={
        !isModalVisible
          ? undefined
          : event => {
              event?.measure((fx, fy, width, height, px, py) => {
                let peye = Platform.OS === 'android' ? py - barHeight : py;
                offsetSortFilter?.py !== peye
                  ? (setOffsetSortFilter({
                      px: px + width,
                      py: Platform.OS === 'android' ? py - barHeight : py,
                    }),
                    setDropdownHeight(height))
                  : null;
              });
            }
      }>
      <TouchableOpacity
        style={[styles.iconContainer, iconContainerStyle]}
        onPress={() => setIsModalVisible(true)}>
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
            top:
              heightPercent > 30
                ? offsetSortFilter?.py + ms(2)
                : offsetSortFilter?.py +
                  ms(2) -
                  (compHeight + dropDownHeight + 15),
            left: compWitdth
              ? offsetSortFilter?.px - compWitdth
              : offsetSortFilter?.px - widthResponsive(117),
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
