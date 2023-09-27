import React from 'react';
import {mvs} from 'react-native-size-matters';

import {Button} from '../../atom';
import Color from '../../../theme/Color';
import {width} from '../VideoPlayer/FullScreenVideo';

interface ButtonProps {
  label: string;
}

export const ButtonStatus: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {label} = props;
  const backgroundColor =
    label === 'Rejected'
      ? Color.Error[900]
      : label === 'Success'
      ? Color.Success[400]
      : Color.Warning[900];

  return (
    <Button
      label={label}
      disabled={true}
      textStyles={{fontSize: mvs(11), fontWeight: '600'}}
      containerStyles={{
        width: width * 0.2,
        aspectRatio: mvs(64 / 20),
        borderRadius: 2,
        backgroundColor,
      }}
    />
  );
};
