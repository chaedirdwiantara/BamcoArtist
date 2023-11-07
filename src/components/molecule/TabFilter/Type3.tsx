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
import {StepCopilot} from '../StepCopilot';
import {heightResponsive, widthResponsive} from '../../../utils';
import {
  listNameTabAnalytic,
  listNameTabSong,
  listTextTabAnalytic,
  listTextTabSong,
  orderTabAnalytic,
  orderTabSong,
} from '../../../data/home';

interface filterData {
  filterName: string;
}

interface TabFilterProps {
  filterData: Array<filterData>;
  onPress: (params: string, index: number, copilotName: string) => void;
  selectedIndex: number;
  containerStyle?: ViewStyle;
  flatlistContainerStyle?: ViewStyle;
  TouchableStyle?: ViewStyle;
  translation?: boolean;
  showCopilot?: boolean;
  tabType?: string;
}

interface ContentPropsType {
  item: filterData;
  index: number;
  onPress: (params: string, index: number) => void;
  selectedIndex: number;
  TouchableStyle?: ViewStyle;
  translation?: boolean;
  showCopilot?: boolean;
}

const SelectedColor = color.Pink[100];
const UnSelectedColor = color.Dark[50];

const Content: React.FC<ContentPropsType> = ({
  item,
  index,
  onPress,
  selectedIndex,
  TouchableStyle,
  translation,
}) => {
  const {t} = useTranslation();
  return (
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
  );
};

const Type3: React.FC<TabFilterProps> = ({
  filterData,
  onPress,
  selectedIndex,
  containerStyle,
  flatlistContainerStyle,
  TouchableStyle,
  translation,
  showCopilot,
  tabType,
}) => {
  const {t} = useTranslation();
  const newOnPress = (params: string, index: number, copilotName: string) => {
    onPress(params, index, copilotName);
  };

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
        renderItem={({item, index}) => {
          if (showCopilot) {
            // title of coachmark
            const listNameTab =
              tabType === 'song' ? listNameTabSong : listNameTabAnalytic;
            // subtitle of coachmark
            const listTextTab =
              tabType === 'song' ? listTextTabSong : listTextTabAnalytic;
            // order/step of coachmark
            const orderTabCoachmark =
              tabType === 'song' ? orderTabSong : orderTabAnalytic;

            return (
              <StepCopilot
                children={
                  <Content
                    item={item}
                    index={index}
                    onPress={(item, index) =>
                      newOnPress(item, index, listNameTab[index])
                    }
                    selectedIndex={selectedIndex}
                    TouchableStyle={TouchableStyle}
                    translation={translation}
                    showCopilot={showCopilot}
                  />
                }
                // have to calculate when it appears based on figma
                // ex: tab fans appear in step 6, so the order is 6
                order={orderTabCoachmark[index]}
                name={t(listNameTab[index])}
                text={t(listTextTab[index])}
              />
            );
          } else {
            return (
              <Content
                item={item}
                index={index}
                onPress={newOnPress}
                selectedIndex={selectedIndex}
                TouchableStyle={TouchableStyle}
                translation={translation}
                showCopilot={showCopilot}
              />
            );
          }
        }}
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
