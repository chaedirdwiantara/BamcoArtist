import React from 'react';
import {View, StyleSheet} from 'react-native';

import Color from '../../../theme/Color';
import {Button, ButtonGradient, Indicator} from '../../../components';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {PreferenceList} from '../../../interface/setting.interface';

interface FooterContentProps {
  type?: string;
  activeIndexSlide: number;
  data: {title: string; list: PreferenceList[]}[];
  onPressGoTo?: () => void;
  onPressNext: () => void;
}

export const FooterContent: React.FC<FooterContentProps> = ({
  type,
  activeIndexSlide,
  data,
  onPressGoTo,
  onPressNext,
}) => {
  const activeColor =
    type === 'Preference' ? Color.Dark[100] : Color.Success[400];
  const inActiveColor =
    type === 'Preference' ? Color.Dark[300] : Color.Success[700];

  return (
    <View style={styles.containerFooterContent}>
      <Indicator
        activeIndex={activeIndexSlide}
        totalIndex={data.length}
        activeColor={activeColor}
        inActiveColor={inActiveColor}
      />
      {type === 'Preference' ? (
        <View style={styles.footer}>
          <Button
            type="border"
            label="Skip"
            containerStyles={styles.btnContainer}
            textStyles={{color: Color.Pink.linear}}
            onPress={onPressGoTo}
          />
          <ButtonGradient
            label={activeIndexSlide === 3 ? 'Finish' : 'Next'}
            onPress={onPressNext}
            gradientStyles={styles.btnContainer}
          />
        </View>
      ) : (
        <View>
          <ButtonGradient
            label="Next"
            onPress={onPressNext}
            containerStyles={{paddingTop: heightPercentage(20)}}
          />
          <Button
            type="border"
            label="Skip"
            borderColor="transparent"
            textStyles={{color: Color.Pink.linear}}
            onPress={onPressGoTo}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerFooterContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height: '40%',
  },
  footer: {
    width: widthPercentage(327),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightPercentage(40),
  },
  btnContainer: {
    width: widthPercentage(155),
    aspectRatio: heightPercentage(155 / 44),
  },
});
