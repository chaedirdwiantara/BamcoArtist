import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInputProps, View, ViewStyle} from 'react-native';
import {SearchIcon} from '../../../assets/icon';
import {color} from '../../../theme';
import {SsuInput} from '../InputText/SsuInput';

interface SearchProps extends TextInputProps {
  fontSize?: number;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  isError?: boolean;
  errorMsg?: string;
  password?: boolean;
  backgroundColor?: string;
  rightIcon?: boolean;
  reset?: () => void;
  containerStyle?: ViewStyle;
}

const SearchBar: React.FC<SearchProps> = props => {
  const {t} = useTranslation();
  const {onChangeText, value, rightIcon, reset, containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <SsuInput.InputText
        value={value}
        onChangeText={onChangeText}
        placeholder={t('Home.Topbar.Search.Title') || ''}
        leftIcon={<SearchIcon stroke={color.Dark[50]} />}
        backgroundColor={color.Dark[600]}
        rightIcon={rightIcon}
        reset={reset}
        {...props}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {},
});
