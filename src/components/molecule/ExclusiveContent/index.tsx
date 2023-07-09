import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
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
import Color from '../../../theme/Color';
import {useCreditHook} from '../../../hooks/use-credit.hook';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {ModalSuccessSubs} from '../Modal/ModalSuccessSubs';

interface ExclusiveProps {
  onPressGoBack: () => void;
  data?: DataExclusiveResponse;
  credit: number;
}

export const ExclusiveContent: React.FC<ExclusiveProps> = ({
  onPressGoBack,
  data,
  credit,
}) => {
  const {t} = useTranslation();
  const {subsNewEC} = useCreditHook();
  const [support, setSupport] = useState('');
  const [planList, setPlanList] = useState(listPlan);
  const [focusInput, setFocusInput] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<DataExclusiveResponse>();
  const [errorBalance, setErrorBalance] = useState<boolean>(false);
  const [disabledSendButton, setDisabledSendButton] = useState<boolean>(true);
  const [loadingSubs, setLoadingSubs] = useState<boolean>(false);
  const [successSubs, setSuccessSubs] = useState<boolean>(false);

  const onPressSelected = (plan: any) => {
    setSelectedPlan(plan);
    if (plan?.pricingPlans[0].price > credit) {
      setErrorBalance(true);
      setDisabledSendButton(true);
    } else {
      setErrorBalance(false);
      setDisabledSendButton(false);
    }
  };

  const onPressSave = async () => {
    setLoadingSubs(true);
    const form = {
      musicianUUID: data?.musician?.uuid || '',
      packageID: selectedPlan?.ID || '',
      packagePlanID: selectedPlan?.pricingPlans[0]?.ID || '',
    };

    const response = await subsNewEC(form);
    setLoadingSubs(false);
    if (response.code === 200) {
      setTimeout(() => {
        setSuccessSubs(true);
      }, 500);
    } else
      setTimeout(() => {
        setSuccessSubs(false);
      }, 500);
  };

  const onPressSuccess = () => {
    setSuccessSubs(false);
    onPressGoBack();
  };

  return (
    <>
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
                      isError={
                        credit ? credit < data?.pricingPlans[0].price : false
                      }
                      onPressSelected={() => onPressSelected(data)}
                      selected={selectedPlan?.ID === data?.ID}
                    />
                  ) : null,
                )}
              </View>
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

              <Button
                label={t('Btn.Purchase')}
                onPress={onPressSave}
                containerStyles={
                  disabledSendButton || errorBalance
                    ? styles.buttonDisabled
                    : styles.button
                }
                disabled={disabledSendButton || errorBalance}
              />
              <Button
                type="border"
                label={t('Btn.Cancel')}
                containerStyles={styles.btnCancel}
                textStyles={{color: Color.Pink.linear}}
                borderColor={Color.Pink.linear}
                onPress={onPressGoBack}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <ModalLoading visible={loadingSubs} />
      <ModalSuccessSubs
        modalVisible={successSubs}
        toggleModal={onPressSuccess}
      />
    </>
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
    backgroundColor: Color.Pink.linear,
  },
  buttonDisabled: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(25),
    backgroundColor: '#8794AD',
  },
  btnCancel: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(10),
  },
  containerContent: {
    alignItems: 'center',
    marginHorizontal: widthPercentage(12),
    paddingBottom: heightPercentage(30),
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(12),
  },
  containerInput: {
    width: width * 0.9,
    marginTop: heightPercentage(10),
  },
});
