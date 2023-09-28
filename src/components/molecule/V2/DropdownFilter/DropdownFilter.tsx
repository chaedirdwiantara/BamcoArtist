import {
  Dimensions,
  NativeModules,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from '../../../atom';
import {widthResponsive} from '../../../../utils';
import FilterModal from './modalFilter';
import {DataDropDownType} from '../../../../data/dropdown';
import {ms, mvs} from 'react-native-size-matters';
import {color} from '../../../../theme';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;
const {height} = Dimensions.get('screen');

interface DropdownV2Props {
  selectedMenu: (data: DataDropDownType) => void;
  dataFilter: DataDropDownType[];
  iconContainerStyle?: ViewStyle;
  labelCaption: string;
  topPosition?: number;
  bottomPosition?: number;
  leftPosition: number;
  containerStyle?: ViewStyle;
  textCustomStyle?: TextStyle;
  compWitdth?: number;
  iconColor?: string;
  dropdownStyle?: ViewStyle;
  gapTextToIcon?: number;
  iconSize?: number;
}

const DropDownFilter: React.FC<DropdownV2Props> = (props: DropdownV2Props) => {
  const {
    selectedMenu,
    dataFilter,
    iconContainerStyle,
    labelCaption,
    topPosition = 0,
    bottomPosition = 0,
    leftPosition,
    containerStyle,
    textCustomStyle,
    compWitdth,
    iconColor,
    dropdownStyle,
    gapTextToIcon,
    iconSize,
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
                  ? setOffsetSortFilter({
                      px: px + width,
                      py: Platform.OS === 'android' ? py - barHeight : py,
                    })
                  : null;
              });
            }
      }>
      <Button
        label={labelCaption}
        type="border"
        containerStyles={styles.categoryContainerStyle}
        textStyles={{...styles.categoryTextStyle, ...textCustomStyle}}
        borderColor={'transparent'}
        typeOfButton={'withIcon'}
        onPress={() => setIsModalVisible(true)}
        iconColor={iconColor}
        iconSize={iconSize}
        gapTextToIcon={gapTextToIcon}
      />
      {offsetSortFilter !== undefined && (
        <FilterModal
          toggleModal={() => setIsModalVisible(false)}
          modalVisible={isModalVisible}
          dataFilter={dataFilter}
          selectedMenu={handleSelectedOnPress}
          sendCategory={() => {}}
          translation={true}
          xPosition={0}
          yPosition={offsetSortFilter?.py}
          containerStyle={{
            top:
              heightPercent > 45
                ? offsetSortFilter?.py + ms(2) + topPosition
                : offsetSortFilter?.py +
                  ms(2) -
                  (compHeight + dropDownHeight + 15) +
                  bottomPosition,
            left: compWitdth
              ? offsetSortFilter?.px - compWitdth + leftPosition
              : offsetSortFilter?.px - widthResponsive(117) + leftPosition,
            ...dropdownStyle,
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

export default DropDownFilter;

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: widthResponsive(13),
    marginBottom: widthResponsive(10),
  },
  iconContainer: {
    marginRight: widthResponsive(5),
    marginLeft: widthResponsive(6),
  },
  categoryContainerStyle: {
    width: undefined,
    aspectRatio: undefined,
    alignSelf: 'flex-end',
    marginRight: widthResponsive(-3),
  },
  categoryTextStyle: {
    fontSize: mvs(10),
    fontWeight: '500',
    color: color.Dark[50],
  },
});
