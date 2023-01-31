import React from 'react';
import {TouchableOpacity} from 'react-native';
import {CheckBoxIcon} from '../../../assets/icon';
import {CheckBoxProps} from '../../../interface/checkbox.interface';

const CheckBox: React.FC<CheckBoxProps> = ({
  handleOnPress,
  active,
  containerStyles,
  checkBoxStyles,
}) => {
  return (
    <TouchableOpacity onPress={handleOnPress} style={containerStyles}>
      <CheckBoxIcon active={active} style={checkBoxStyles} />
    </TouchableOpacity>
  );
};

export default CheckBox;
