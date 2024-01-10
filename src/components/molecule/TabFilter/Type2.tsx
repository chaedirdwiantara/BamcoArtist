import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {color, font} from '../../../theme';
import {normalize} from '../../../utils';
import {ms, mvs} from 'react-native-size-matters';

interface TabFilterProps {
  filterData: string[];
  onPress: (item: string, index: number) => void;
  selectedIndex: number;
}

const MainColor = color.Pink[200];
const SelectedColorTxt = color.Neutral[10];

const Type2: React.FC<TabFilterProps> = ({
  filterData,
  onPress,
  selectedIndex,
}) => {
  return (
    <View style={styles.tab}>
      <FlatList
        horizontal
        data={filterData}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.tabStyle,
              {
                backgroundColor:
                  selectedIndex == index ? MainColor : color.Dark[600],
              },
            ]}
            onPress={() => onPress(item, index)}>
            <Text style={styles.TextStyle}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Type2;

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabStyle: {
    marginRight: ms(6),
    paddingHorizontal: ms(12),
    paddingVertical: mvs(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: MainColor,
    borderRadius: 30,
  },
  TextStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: SelectedColorTxt,
  },
});
