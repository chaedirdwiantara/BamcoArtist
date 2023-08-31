import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentage, widthResponsive} from '../../../../utils';
import {PressedRadioIcon, RadioButtonIcon} from '../../../../assets/icon';

interface ChoiceProps {
  choiceOnPress: () => void;
  selected: boolean;
}

const ChoiceIconAppeal: FC<ChoiceProps> = (props: ChoiceProps) => {
  const {choiceOnPress, selected} = props;
  return (
    <TouchableOpacity
      style={styles.choiceContainer}
      onPress={() => choiceOnPress()}>
      {selected ? (
        <PressedRadioIcon style={styles.customIconStyle} />
      ) : (
        <RadioButtonIcon
          width={widthPercentage(24)}
          height={widthPercentage(24)}
        />
      )}
    </TouchableOpacity>
  );
};

export default ChoiceIconAppeal;

const styles = StyleSheet.create({
  choiceContainer: {
    flexDirection: 'row',
    marginBottom: widthResponsive(12),
  },
  customIconStyle: {
    marginLeft: widthResponsive(-2),
    marginRight: widthResponsive(-2.8),
    marginBottom: widthResponsive(-1),
    width: widthPercentage(29),
    height: widthPercentage(29),
  },
});
