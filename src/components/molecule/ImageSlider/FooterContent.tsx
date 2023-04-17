import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import Color from '../../../theme/Color';
import {Button, ButtonGradient, Gap, Indicator} from '../../../components';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {PreferenceList} from '../../../interface/setting.interface';
import DescriptionBoarding from '../../atom/DescriptionBoarding/DescriptionBoarding';
import {DataOnboardType} from '../../../data/onboard';

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
    <View
      style={[
        styles.containerFooterContent,
        {
          height: type === 'Preference' ? '25%' : '35%',
        },
      ]}>
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
      <Gap height={heightPercentage(40)} />
      <Indicator
        activeIndex={activeIndexSlide}
        totalIndex={data.length}
        activeColor={activeColor}
        inActiveColor={inActiveColor}
      />
      {type === 'Preference' ? (
        <>
          <Gap height={heightPercentage(45)} />
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
                  textStyles={{color: Color.Success[400]}}
                  onPress={activeIndexSlide === 3 ? onPressGoTo : onPressBack}
                />
                <ButtonGradient
                  label={
                    activeIndexSlide === 3 ? t('Btn.Finish') : t('Btn.Next')
                  }
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
        </>
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
            label={t('Btn.Skip')}
            borderColor="transparent"
            textStyles={{color: Color.Success[400]}}
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
    bottom: heightPercentage(40),
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    flex: 1,
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
    borderColor: Color.Success[400],
  },
  btnFull: {
    width: '100%',
  },
});
