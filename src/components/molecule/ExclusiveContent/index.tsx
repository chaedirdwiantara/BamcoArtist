import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {Button, SsuInput} from '../../atom';
import {PlanCard} from './PlanCard';
import {color, typography} from '../../../theme';
import {ContentCard} from './ContentCard';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon, CoinInput} from '../../../assets/icon';
import {listPlan} from '../../../data/exclusiveContent';
import {
  heightPercentage,
  kFormatter,
  width,
  widthPercentage,
} from '../../../utils';
import {useTranslation} from 'react-i18next';
import {DataExclusiveResponse} from '../../../interface/setting.interface';

interface ExclusiveProps {
  onPressGoBack: () => void;
  data: DataExclusiveResponse;
}

export const ExclusiveContent: React.FC<ExclusiveProps> = ({
  onPressGoBack,
  data,
}) => {
  const {t} = useTranslation();
  const [support, setSupport] = useState('');
  const [planList, setPlanList] = useState(listPlan);
  const [focusInput, setFocusInput] = useState(false);

  const onPressSelected = (index: number) => {
    let newList = [...planList];
    // all radio selected => false
    newList = newList.map(v => ({...v, selected: false}));
    // change selected value
    newList[index].selected = true;
    setPlanList(newList);
  };

  const onPressSave = () => {};

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('ExclusiveContent.Title')}
          leftIcon={<ArrowLeftIcon />}
          itemStrokeColor={color.Neutral[10]}
          leftIconAction={onPressGoBack}
          containerStyles={{
            marginBottom: heightPercentage(15),
            paddingHorizontal: widthPercentage(12),
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerContent}>
            <View>
              <Text style={[typography.Subtitle1, styles.title]}>
                {t('ExclusiveContent.Content')}
              </Text>
              <ContentCard
                imgUri={data?.coverImage}
                title={data?.title || ''}
                subtitle={data?.description || ''}
              />
            </View>

            <View>
              <Text style={[typography.Subtitle1, styles.titlePlan]}>
                {t('ExclusiveContent.Choose')}
              </Text>
              {planList.map((val, i) =>
                val.id === data?.pricingPlans[0].durationUnit ? (
                  <PlanCard
                    key={i}
                    title={val.title}
                    subtitle={val.subtitle}
                    coin={kFormatter(data?.pricingPlans[0].price) + '/'}
                    time={val.time}
                    isError={val.selected}
                    onPressSelected={() => onPressSelected(i)}
                    selected={val.selected}
                  />
                ) : null,
              )}
            </View>

            <View>
              <Text style={[typography.Subtitle1, styles.titlePlan]}>
                {t('ExclusiveContent.Support')}
              </Text>

              <Text style={[typography.Overline, styles.label]}>
                {t('ExclusiveContent.Optional')}
              </Text>

              <SsuInput.InputText
                value={support}
                leftIcon={<CoinInput />}
                onChangeText={(newText: string) => setSupport(newText)}
                placeholder={t('ExclusiveContent.InputBonus') || ''}
                fontColor={color.Neutral[10]}
                borderColor={color.Pink.linear}
                onFocus={() => {
                  setFocusInput(true);
                }}
                onBlur={() => {
                  setFocusInput(false);
                }}
                containerStyles={styles.containerInput}
                isFocus={focusInput}
                keyboardType={'number-pad'}
                isError={false}
                errorMsg={t('ExclusiveContent.ErrorCoinBonus') || ''}
              />
            </View>

            <Button
              label={t('Btn.Purchase')}
              onPress={onPressSave}
              containerStyles={styles.button}
            />
            <Button
              type="border"
              label={t('Btn.Cancel')}
              containerStyles={styles.btnCancel}
              textStyles={{color: color.Success[400]}}
              onPress={onPressSave}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    color: color.Neutral[10],
    marginBottom: heightPercentage(10),
  },
  titlePlan: {
    color: color.Neutral[10],
    marginTop: heightPercentage(20),
  },
  label: {
    color: color.Neutral[10],
    marginTop: heightPercentage(10),
  },
  button: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(25),
  },
  btnCancel: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(10),
  },
  containerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: widthPercentage(12),
  },
  containerInput: {
    width: width * 0.9,
    marginTop: heightPercentage(10),
  },
});
