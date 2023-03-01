import React from 'react';
import {View, StyleSheet} from 'react-native';

import Color from '../../../theme/Color';
import {Button, ButtonGradient, Indicator} from '../../../components';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {PreferenceList} from '../../../interface/setting.interface';
import DescriptionBoarding from '../../atom/DescriptionBoarding/DescriptionBoarding';
import {DataOnboardType} from '../../../data/onboard';
import {useTranslation} from 'react-i18next';

interface FooterContentProps {
  type?: string;
  activeIndexSlide: number;
  data:
    | {title: string; subtitle: string; list: PreferenceList[]}[]
    | DataOnboardType[];
  onPressBack?: () => void;
  onPressGoTo?: () => void;
  onPressNext: () => void;
  selectedData: number[][];
}

export const FooterContent: React.FC<FooterContentProps> = ({
  type,
  activeIndexSlide,
  data,
  onPressBack,
  onPressGoTo,
  onPressNext,
  selectedData,
}) => {
  const {t} = useTranslation();
  const activeColor =
    type === 'Preference' ? Color.Dark[100] : Color.Success[400];
  const inActiveColor =
    type === 'Preference' ? Color.Dark[300] : Color.Success[700];

  return (
    <View style={styles.containerFooterContent}>
      {type !== 'Preference' &&
        data.map((item, index) => {
          if (index === activeIndexSlide && 'uri' in item) {
            return (
              <DescriptionBoarding
                key={index}
                title={t(item.title) || ''}
                subtitle={t(item.subtitle as string) || ''}
              />
            );
          }
        })}
      <Indicator
        activeIndex={activeIndexSlide}
        totalIndex={data.length}
        activeColor={activeColor}
        inActiveColor={inActiveColor}
      />
      {type === 'Preference' ? (
        <View style={styles.footer}>
          {activeIndexSlide === 0 ? (
            <ButtonGradient
              label={t('Btn.Next')}
              onPress={onPressNext}
              gradientStyles={styles.btnFull}
              disabled={selectedData[0].length === 0}
            />
          ) : (
            <>
              <Button
                type="border"
                label={activeIndexSlide === 3 ? t('Btn.Skip') : t('Btn.Back')}
                containerStyles={styles.btnContainer}
                textStyles={{color: Color.Pink.linear}}
                onPress={activeIndexSlide === 3 ? onPressGoTo : onPressBack}
              />
              <ButtonGradient
                label={activeIndexSlide === 3 ? t('Btn.Finish') : t('Btn.Next')}
                onPress={onPressNext}
                gradientStyles={styles.btnContainer}
                disabled={
                  activeIndexSlide < 3
                    ? selectedData[activeIndexSlide].length === 0
                    : false
                }
              />
            </>
          )}
        </View>
      ) : (
        <View>
          <ButtonGradient
            label={t('Btn.Next')}
            onPress={onPressNext}
            containerStyles={
              (styles.btnContainer, {paddingTop: heightPercentage(20)})
            }
          />
          <Button
            type="border"
            label={t('Btn.Finish')}
            borderColor="transparent"
            textStyles={{color: Color.Pink.linear}}
            onPress={onPressGoTo}
            containerStyles={styles.btnContainer}
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
    aspectRatio: heightPercentage(155 / 46),
  },
  btnFull: {
    width: '100%',
  },
});
