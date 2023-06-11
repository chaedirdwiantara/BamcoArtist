import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ViewStyle,
  Animated,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {heightResponsive, widthResponsive} from '../../../utils';
import {useScrollStore} from '../../../store/translateY.store';

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

const SelectedColor = color.Pink[200];
const UnSelectedColor = color.Dark[50];

const Type1: React.FC<TabFilterProps> = ({
  filterData,
  onPress,
  selectedIndex,
  containerStyle,
  flatlistContainerStyle,
  TouchableStyle,
  translation,
}) => {
  const {t} = useTranslation();
  const {compBTranslateY} = useScrollStore();

  return (
    <Animated.View
      style={[
        styles.tab,
        {
          transform: compBTranslateY
            ? [{translateY: compBTranslateY}]
            : undefined,
        },
        containerStyle,
      ]}>
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
              {translation ? t(item.filterName) : item.filterName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </Animated.View>
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
