import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {heightResponsive, widthResponsive} from '../../../utils';

interface filterData {
  filterName: string;
}

interface TabFilterProps {
  filterData: Array<filterData>;
  onPress: (params: string, index: number) => void;
  selectedIndex: number;
  containerStyle?: ViewStyle;
  flatlistContainerStyle?: ViewStyle;
  TouchableStyle?: ViewStyle;
}

const SelectedColor = color.Pink[100];
const UnSelectedColor = color.Dark[50];

const Type1: React.FC<TabFilterProps> = ({
  filterData,
  onPress,
  selectedIndex,
  containerStyle,
  flatlistContainerStyle,
  TouchableStyle,
}) => {
  return (
    <View style={[styles.tab, containerStyle]}>
      <FlatList
        horizontal
        data={filterData}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.containerFlatlist,
          flatlistContainerStyle,
        ]}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.tabStyle,
              {borderBottomWidth: selectedIndex == index ? 2 : 0},
              TouchableStyle,
            ]}
            onPress={() => onPress(item.filterName, index)}>
            <Text
              style={[
                styles.TextStyle,
                selectedIndex === index
                  ? {
                      fontFamily: font.InterBold,
                      fontWeight: '700',
                      color: SelectedColor,
                    }
                  : {
                      fontFamily: font.InterMedium,
                      fontWeight: '500',
                      color: UnSelectedColor,
                    },
              ]}>
              {item.filterName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Type1;

const styles = StyleSheet.create({
  tab: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerFlatlist: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  tabStyle: {
    height: heightResponsive(40),
    paddingVertical: heightResponsive(8),
    paddingHorizontal: widthResponsive(13),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: SelectedColor,
  },
  TextStyle: {
    fontWeight: '700',
    fontSize: mvs(13),
  },
});
