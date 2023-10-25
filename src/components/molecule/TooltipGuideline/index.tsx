import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCopilot} from 'react-native-copilot';
import {ms, mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {color, font} from '../../../theme';
import {useCopilotStore} from '../../../store/copilot.store';
import {width} from '../../../utils';

export type Labels = Partial<
  Record<'skip' | 'previous' | 'next' | 'finish', string>
>;

export interface TooltipProps {
  labels: Labels;
}

export interface ButtonTextProps {
  label?: string;
  onPress: () => void;
}

export const StepNumber = () => {
  return <View />;
};

export const Tooltip = ({labels}: TooltipProps) => {
  const {goToNext, goToPrev, stop, currentStep, isFirstStep, isLastStep} =
    useCopilot();
  const {setCurrentStep, scrollRef, offsetSortFilter} = useCopilotStore();

  useEffect(() => {
    if (currentStep?.order !== undefined && currentStep.order > 2) {
      scrollRef.current?.scrollTo({
        x: 0,
        y: offsetSortFilter.py,
        animated: true,
      });
    }
  }, [currentStep]);

  const handleStop = () => {
    setCurrentStep(currentStep);
    stop();
  };
  const handleNext = () => {
    setCurrentStep(currentStep);
    goToNext();
  };

  const handlePrev = () => {
    setCurrentStep(currentStep);
    goToPrev();
  };

  const ButtonText = ({onPress, label}: ButtonTextProps) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.tooltipText}>{label}</Text>
    </TouchableOpacity>
  );

  const justifyContent =
    isFirstStep || isLastStep ? 'flex-end' : 'space-between';
  const isFeed = currentStep?.name === 'Feed';
  const isPost = currentStep?.name === 'Post';

  return (
    <View
      style={[
        styles.tooltipContainer,
        {width: isFeed ? width * 0.6 : undefined},
      ]}>
      {isPost || isFeed ? (
        <View>
          <Text
            style={[
              styles.tooltipTitle,
              {fontSize: 16, marginBottom: mvs(15)},
            ]}>
            {'There are two post'}
          </Text>
          <Text style={styles.tooltipTitle}>{'Public Content'}</Text>
          <Text style={styles.tooltipText}>
            {
              'When you post public content, it will visible for all of your followers'
            }
          </Text>
          <Gap height={mvs(15)} />
          <Text style={styles.tooltipTitle}>{'Exclusive Content'}</Text>
          <Text style={styles.tooltipText}>
            {
              'When you post for exclusive content it will only visible to the one who subscribed your content'
            }
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.tooltipTitle}>{currentStep?.name}</Text>
          <Text style={styles.tooltipText}>{currentStep?.text}</Text>
        </View>
      )}
      {isFeed ? (
        <View style={[styles.bottomBar, {justifyContent: 'flex-end'}]}>
          <ButtonText onPress={handleStop} label={labels.finish} />
        </View>
      ) : (
        <View style={[styles.bottomBar, {justifyContent}]}>
          {!isLastStep ? (
            <ButtonText onPress={handleStop} label={labels.skip} />
          ) : null}
          <View style={{flexDirection: 'row'}}>
            {!isFirstStep ? (
              <ButtonText onPress={handlePrev} label={labels.previous} />
            ) : null}
            <Gap width={ms(10)} />
            {!isLastStep ? (
              <ButtonText onPress={handleNext} label={labels.next} />
            ) : (
              <ButtonText onPress={handleStop} label={labels.finish} />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    flex: 1,
  },
  tooltipTitle: {
    color: color.Neutral[10],
    fontSize: mvs(14),
    fontWeight: '600',
    fontFamily: font.InterSemiBold,
    marginBottom: mvs(5),
  },
  tooltipText: {
    color: color.Neutral[10],
    fontSize: mvs(12),
    fontWeight: '500',
    fontFamily: font.InterRegular,
  },
  bottomBar: {
    marginVertical: mvs(15),
    flexDirection: 'row',
  },
});
