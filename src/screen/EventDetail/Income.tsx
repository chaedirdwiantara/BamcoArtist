import React, {FC} from 'react';
import {ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {heightResponsive} from '../../utils';
import {useEventHook} from '../../hooks/use-event.hook';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import MusiciansListCard from '../../components/molecule/ListCard/MusiciansListCard';
import {EmptyStateSongMusician} from '../../components/molecule/EmptyState/EmptyStateSongMusician';

interface IncomeProps {
  eventId: string;
}

const Income: FC<IncomeProps> = ({eventId}) => {
  const {t} = useTranslation();
  const {useEventIncome} = useEventHook();
  const {data: dataIncome, isLoading: isLoadingIncome} =
    useEventIncome(eventId);

  return (
    <>
      {dataIncome?.data && dataIncome?.data?.length > 0 ? (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{paddingBottom: heightResponsive(40)}}>
          {dataIncome.data?.map((item, index) => {
            return (
              <MusiciansListCard
                key={item.UUID}
                musicianNum={(index + 1).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
                musicianName={item.fullname}
                imgUri={item.image || ''}
                containerStyles={{marginTop: mvs(18)}}
                activeMore={false}
                showCredit={true}
                creditCount={item.totalBeam}
                onPressImage={() => null}
                onPressMore={() => null}
              />
            );
          })}
          {isLoadingIncome && (
            <View
              style={{
                alignItems: 'center',
                paddingVertical: mvs(20),
              }}>
              <LoadingSpinner />
            </View>
          )}
        </ScrollView>
      ) : (
        <EmptyStateSongMusician
          title={t('Event.EmptyState.Income.Title') || ''}
          text={t('Event.EmptyState.Income.Subtitle')}
        />
      )}
    </>
  );
};

export default Income;
