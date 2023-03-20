import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {color} from '../../../theme';
import {ArrowLeftIcon} from '../../../assets/icon';
import {RootStackParams} from '../../../navigations';
import {TopNavigation} from '../../../components';
import {heightPercentage, widthPercentage} from '../../../utils';

export interface ListItemProps {
  title: string;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  children,
  containerStyle,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.root, containerStyle]}>
      <TopNavigation.Type1
        title={title}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: heightPercentage(10),
          paddingHorizontal: widthPercentage(15),
        }}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
});
