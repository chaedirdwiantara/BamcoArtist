import React, {FC, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {MusicianList} from '../../interface/musician.interface';
import {ListDataSearchMusician} from '../../interface/search.interface';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {EmptyStateSongMusician} from '../../components/molecule/EmptyState/EmptyStateSongMusician';
import ModalTipped from '../../components/molecule/Modal/ModalTipped';
import MusiciansListCard from '../../components/molecule/ListCard/MusiciansListCard';

interface TopTiperProps {
  dataTipper?: MusicianList[] | ListDataSearchMusician[];
  isLoading?: boolean;
}

const TopTiper: FC<TopTiperProps> = ({dataTipper, isLoading}) => {
  const {t} = useTranslation();
  const [listTipper, setListTipper] = useState(dataTipper);
  const [showTipped, setShowTipped] = useState<boolean>(false);

  useEffect(() => {
    if (dataTipper !== undefined) {
      setListTipper(dataTipper);
      console.log(dataTipper);
    }
  }, [dataTipper]);

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
                key={item.uuid}
                musicianNum={(index + 1).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
                musicianName={item.fullname}
                imgUri={item.imageProfileUrls[1]?.image || ''}
                containerStyles={{marginTop: mvs(18)}}
                activeMore={false}
                showCredit={true}
                creditCount={1000}
                onPressImage={() => setShowTipped(true)}
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
        tipper={listTipper?.[0]}
      />
    </>
  );
};

export default TopTiper;
