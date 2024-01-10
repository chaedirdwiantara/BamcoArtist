import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  Animated,
  View,
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
  animation?: boolean;
}

const SelectedColor = color.Pink[200];
const UnSelectedColor = color.Dark[50];

const Type4: React.FC<TabFilterProps> = ({
  filterData,
  onPress,
  selectedIndex,
  containerStyle,
  TouchableStyle,
  translation,
  animation,
}) => {
  const {t} = useTranslation();
  const {compBTranslateY} = useScrollStore();
  return (
    <Animated.View
      style={[
        styles.tab,
        {
          transform:
            animation && compBTranslateY
              ? [{translateY: compBTranslateY}]
              : undefined,
        },
        containerStyle,
      ]}>
      <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
        {filterData.map((item, index) => {
          return (
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
          );
        })}
      </View>
    </Animated.View>
  );
};

export default Type4;

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
    flex: 1,
  },
  TextStyle: {
    fontWeight: '700',
    fontSize: mvs(13),
  },
});
