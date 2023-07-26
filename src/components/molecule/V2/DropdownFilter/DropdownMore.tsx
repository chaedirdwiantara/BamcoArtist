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
  uuid?: string;
  selectedid?: (id: string) => void;
  selectedUserUuid?: (uuid: string) => void;
  selectedMenu: (data: DataDropDownType) => void;
  dataFilter: DataDropDownType[];
  containerStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  compWitdth?: number;
  iconChildren?: React.ReactNode;
  topPosition?: number;
  leftPosition?: number;
}

const DropdownMore: React.FC<DropdownV2Props> = (props: DropdownV2Props) => {
  const {
    id,
    uuid,
    selectedid,
    selectedMenu,
    selectedUserUuid,
    dataFilter,
    containerStyle,
    iconContainerStyle,
    compWitdth,
    iconChildren,
    topPosition = 0,
    leftPosition = 0,
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
    if (menuSelected) {
      selectedMenu?.(menuSelected);
      setMenuSelected(undefined);
      if (id) {
        selectedid?.(id);
      }
      if (uuid) {
        selectedUserUuid?.(uuid);
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
      style={[styles.dropdownContainer, containerStyle]}
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
        {iconChildren ?? <IconMore />}
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
                ? offsetSortFilter?.py + ms(2) + topPosition
                : offsetSortFilter?.py +
                  ms(2) -
                  (compHeight + dropDownHeight + 15) +
                  topPosition,
            left: compWitdth
              ? offsetSortFilter?.px - compWitdth + leftPosition
              : offsetSortFilter?.px - widthResponsive(117) + leftPosition,
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
