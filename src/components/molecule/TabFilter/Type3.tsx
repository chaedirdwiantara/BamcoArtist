import React from 'react';
import {useTranslation} from 'react-i18next';
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
  translation?: boolean;
}

const SelectedColor = color.Pink[100];
const UnSelectedColor = color.Dark[50];

const Type3: React.FC<TabFilterProps> = ({
  filterData,
  onPress,
  selectedIndex,
  containerStyle,
  flatlistContainerStyle,
  TouchableStyle,
  translation,
}) => {
  const {t} = useTranslation();
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
            style={[styles.tabStyle, TouchableStyle]}
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
              {translation ? t(item.filterName) : item.filterName}
            </Text>
            <View
              style={{
                borderBottomWidth: selectedIndex == index ? 2 : 0,
                borderColor: SelectedColor,
                marginTop: heightResponsive(10),
                width: widthResponsive(36),
              }}></View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Type3;

const styles = StyleSheet.create({
  tab: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: widthResponsive(24),
  },
  containerFlatlist: {
    width: '100%',
  },
  tabStyle: {
    height: heightResponsive(40),
    paddingVertical: heightResponsive(8),
    justifyContent: 'center',
    borderColor: SelectedColor,
    marginRight: widthResponsive(24),
  },
  TextStyle: {
    fontWeight: '700',
    fontSize: mvs(13),
  },
});
