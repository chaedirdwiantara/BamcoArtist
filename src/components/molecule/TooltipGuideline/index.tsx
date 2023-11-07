import React from 'react';
import {useTranslation} from 'react-i18next';
import {useCopilot} from 'react-native-copilot';
import {ms, mvs} from 'react-native-size-matters';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Gap} from '../../atom';
import {width} from '../../../utils';
import {color, font} from '../../../theme';
import {useCopilotStore} from '../../../store/copilot.store';
import {useCoachmarkHook} from '../../../hooks/use-coachmark.hook';

export interface ButtonTextProps {
  label?: string;
  onPress: () => void;
}

export const StepNumber = () => {
  return <View />;
};

export const Tooltip = () => {
  const {t} = useTranslation();
  const {tutorialId, initialName, setCopilotName} = useCopilotStore();
  const {pushCoachmarkProgress} = useCoachmarkHook();
  const {goToNext, goToPrev, stop, currentStep, isFirstStep, isLastStep} =
    useCopilot();

  const handleStop = (type: string) => {
    stop();
    setCopilotName('');
    if (type === 'finish') {
      const payload = {
        tutorialId,
        orderingName: t(initialName),
        isFinished: true,
      };
      pushCoachmarkProgress(payload);
    }
  };
  const handleNext = () => {
    goToNext();
    setCopilotName('');
  };

  const handlePrev = () => {
    goToPrev();
    setCopilotName('');
  };

  const ButtonText = ({onPress, label}: ButtonTextProps) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.tooltipText}>{label}</Text>
    </TouchableOpacity>
  );

  // last step in each section
  // see last order name in step copilot based on figma
  const lastOrderNum = [12, 15, 18, 24, 29, 32];
  // 100 is random number that is not included in the copilot
  const lastStep = lastOrderNum.includes(currentStep?.order || 100);

  // the opposite of the last order
  const firstOrderNum = [13, 16, 19, 25, 31];
  const firstStep = firstOrderNum.includes(currentStep?.order || 100);

  const isFeed = currentStep?.name === 'Feed';
  const justifyContent =
    isFirstStep || firstStep || isLastStep || lastStep
      ? 'flex-end'
      : 'space-between';

  return (
    <View
      style={[
        styles.tooltipContainer,
        {width: isFeed ? width * 0.6 : undefined},
      ]}>
      {isFeed ? (
        <View>
          <Text
            style={[
              styles.tooltipTitle,
              {fontSize: mvs(16), marginBottom: mvs(15)},
            ]}>
            {t('Coachmark.TwoPost')}
          </Text>
          <Text style={styles.tooltipTitle}>
            {t('Coachmark.PublicContent')}
          </Text>
          <Text style={styles.tooltipText}>
            {t('Coachmark.SubtitlePublicContent')}
          </Text>
          <Gap height={mvs(15)} />
          <Text style={styles.tooltipTitle}>
            {t('Coachmark.ExclusiveContent')}
          </Text>
          <Text style={styles.tooltipText}>
            {t('Coachmark.SubtitleExclusiveContent')}
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
          <ButtonText
            onPress={() => handleStop('finish')}
            label={t('Coachmark.Finish') || ''}
          />
        </View>
      ) : (
        <View style={[styles.bottomBar, {justifyContent}]}>
          {!isLastStep && !lastStep ? (
            <ButtonText
              onPress={() => handleStop('skip')}
              label={t('Coachmark.Skip') || ''}
            />
          ) : null}
          <View style={{flexDirection: 'row'}}>
            {!isFirstStep && !firstStep ? (
              <ButtonText
                onPress={handlePrev}
                label={t('Coachmark.Previous') || ''}
              />
            ) : null}
            <Gap width={ms(10)} />
            {!isLastStep && !lastStep ? (
              <ButtonText
                onPress={handleNext}
                label={t('Coachmark.Next') || ''}
              />
            ) : (
              <ButtonText
                onPress={() => handleStop('finish')}
                label={t('Coachmark.Finish') || ''}
              />
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
    marginBottom: mvs(10),
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
