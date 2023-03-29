import React from 'react';
import {Platform, StyleSheet, View, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {color} from '../../../theme';
import {TopNavigation} from '../../../components';
import {ArrowLeftIcon} from '../../../assets/icon';
import {RootStackParams} from '../../../navigations';
import {heightPercentage, widthPercentage} from '../../../utils';
import LoadingSpinner from '../../../components/atom/Loading/LoadingSpinner';

export interface ListItemProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onPressBack?: () => void;
  containerStyle?: ViewStyle;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  children,
  isLoading,
  onPressBack,
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
        leftIconAction={onPressBack ? onPressBack : onPressGoBack}
        containerStyles={{
          marginBottom: heightPercentage(10),
          paddingHorizontal: widthPercentage(15),
        }}
      />
      {Platform.OS === 'ios' && isLoading && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: heightPercentage(10),
  },
});
