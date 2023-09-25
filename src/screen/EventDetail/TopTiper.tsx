import React, {FC, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {EmptyStateSongMusician} from '../../components/molecule/EmptyState/EmptyStateSongMusician';
import ModalTipped from '../../components/molecule/Modal/ModalTipped';
import MusiciansListCard from '../../components/molecule/ListCard/MusiciansListCard';
import {useEventHook} from '../../hooks/use-event.hook';
import {EventTopTipper} from '../../interface/event.interface';
import {profileStorage} from '../../hooks/use-storage.hook';

interface TopTiperProps {
  dataTipper?: EventTopTipper[];
  eventId: string;
  isLoading?: boolean;
}

const TopTiper: FC<TopTiperProps> = ({dataTipper, isLoading, eventId}) => {
  const {t} = useTranslation();
  const profile = profileStorage();

  const {useEventMusicianTipped} = useEventHook();
  const [listTipper, setListTipper] = useState(dataTipper);
  const [showTipped, setShowTipped] = useState<boolean>(false);
  const [tipper, setTipper] = useState<EventTopTipper>();

  const {
    data: dataTipped,
    refetch: refetchTipped,
    isLoading: isLoadingTipped,
    isRefetching: isRefetchingTipped,
  } = useEventMusicianTipped(tipper?.tipperUUID ?? '', eventId);

  useEffect(() => {
    if (dataTipper !== undefined) {
      setListTipper(dataTipper);
    }
  }, [dataTipper]);

  useEffect(() => {
    if (tipper !== undefined) {
      refetchTipped();
    }
  }, [tipper]);

  return (
    <>
      {listTipper && listTipper?.length > 0 ? (
        <ScrollView showsHorizontalScrollIndicator={false}>
          {isLoading && (
            <View
              style={{
                alignItems: 'center',
                paddingVertical: mvs(20),
              }}>
              <LoadingSpinner />
            </View>
          )}

          {listTipper?.map((item, index) => {
            return (
              <MusiciansListCard
                key={item.tipperUUID}
                musicianNum={(index + 1).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
                musicianName={
                  profile?.uuid === item.tipperUUID
                    ? 'You'
                    : item.tipperFullname
                }
                imgUri={item.tipperImage || ''}
                containerStyles={{marginTop: mvs(18)}}
                activeMore={false}
                showCredit={true}
                creditCount={item.totalDonation}
                onPressImage={() => {
                  setTipper(item);
                  setShowTipped(true);
                }}
                onPressMore={() => null}
              />
            );
          })}
        </ScrollView>
      ) : (
        <EmptyStateSongMusician
          title={t('Event.EmptyState.TopTipper.Title') || ''}
          text={t('Event.EmptyState.TopTipper.Subtitle')}
        />
      )}
      <ModalTipped
        modalVisible={showTipped}
        title={t('Event.Detail.TipDistribution')}
        secondTitle={t('Event.Detail.MusicianTipped')}
        onPressClose={() => setShowTipped(false)}
        tipper={tipper}
        musicianTipped={dataTipped?.data}
        isLoading={isLoadingTipped || isRefetchingTipped}
      />
    </>
  );
};

export default TopTiper;
