import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import MusiciansListCard from '../ListCard/MusiciansListCard';
import Modal from 'react-native-modal';
import {Gap} from '../../atom';
import Color from '../../../theme/Color';
import {heightResponsive, width, widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import Font from '../../../theme/Font';
import {useTranslation} from 'react-i18next';
import {
  EventMusicianTipped,
  EventTopTipper,
} from '../../../interface/event.interface';
import LoadingSpinner from '../../atom/Loading/LoadingSpinner';

interface ModalTippedProps {
  title: string;
  secondTitle: string;
  modalVisible: boolean;
  onPressClose: () => void;
  tipper?: EventTopTipper;
  musicianTipped?: EventMusicianTipped[];
  isLoading: boolean;
}

export const ModalTipped: React.FC<ModalTippedProps> = (
  props: ModalTippedProps,
) => {
  const {
    title,
    secondTitle,
    modalVisible,
    tipper,
    musicianTipped,
    onPressClose,
    isLoading,
  } = props;
  const {t} = useTranslation();
  return (
    <>
      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View style={styles.root}>
            <View style={styles.card}>
              <Text style={styles.title}>{title}</Text>
              <View>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <MusiciansListCard
                    key={tipper?.tipperUUID}
                    musicianName={tipper?.tipperFullname ?? ''}
                    imgUri={tipper?.tipperImage || ''}
                    containerStyles={{marginTop: mvs(18)}}
                    activeMore={false}
                    showCredit={true}
                    creditCount={tipper?.totalDonation}
                    onPressImage={() => null}
                    onPressMore={() => null}
                  />
                )}
              </View>
              <Gap height={heightResponsive(20)} />
              <Text style={styles.secondTitle}>{secondTitle}</Text>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {musicianTipped?.map((v: EventMusicianTipped, _i: number) => {
                    return (
                      <MusiciansListCard
                        key={v?.musicianUUID}
                        musicianName={v?.musicianFullname ?? ''}
                        imgUri={v?.musicianImage || ''}
                        containerStyles={{marginTop: mvs(18)}}
                        activeMore={false}
                        showCredit={true}
                        creditCount={v?.totalDonation}
                        onPressImage={() => null}
                        onPressMore={() => null}
                      />
                    );
                  })}
                </>
              )}

              <View style={styles.containerButton}>
                <TouchableOpacity onPress={onPressClose}>
                  <Text style={styles.option}>{t('General.Dismiss')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default ModalTipped;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9,
    backgroundColor: Color.Dark[800],
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: widthResponsive(20),
    paddingVertical: widthResponsive(15),
  },
  title: {
    fontSize: mvs(16),
    color: Color.Neutral[10],
    fontFamily: Font.InterSemiBold,
  },
  secondTitle: {
    fontSize: mvs(14),
    color: Color.Neutral[10],
    fontFamily: Font.InterSemiBold,
  },
  subtitle: {
    fontSize: mvs(10),
    color: Color.Neutral[50],
    fontWeight: '400',
    fontFamily: Font.InterRegular,
  },
  category: {
    fontSize: mvs(15),
    color: Color.Neutral[10],
    fontWeight: '400',
    fontFamily: Font.InterRegular,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  containerButtonNextPage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerButtonLeft: {
    flexDirection: 'row',
  },
  option: {
    fontSize: mvs(14),
    paddingHorizontal: widthResponsive(12),
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: widthResponsive(12),
  },
  reportContainer: {
    borderWidth: 1,
    borderColor: Color.Dark[300],
    borderBottomWidth: 1,
    borderBottomColor: Color.Dark[300],
    backgroundColor: Color.Dark[900],
    paddingVertical: widthResponsive(9),
    paddingHorizontal: widthResponsive(7),
  },
  customIconStyle: {
    marginLeft: widthResponsive(-2),
    marginRight: widthResponsive(-2.8),
    marginBottom: widthResponsive(-1),
  },
});
