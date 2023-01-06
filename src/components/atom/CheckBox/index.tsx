import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {CheckBoxProps} from '../../../interface/checkbox.interface';
import {CheckBoxIcon} from '../../../assets/icon';

const CheckBox: React.FC<CheckBoxProps> = ({handleOnPress, active}) => {
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <CheckBoxIcon active={active} />
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
