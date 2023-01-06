import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  InteractionManager,
} from 'react-native';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {Dropdown} from '../DropDown';
import Color from '../../../theme/Color';
import {Gap, SsuToast} from '../../atom';
import {TopNavigation} from '../TopNavigation';
import TopSong from '../../../screen/ListCard/TopSong';
import {color, font, typography} from '../../../theme';
import {dropDownHeaderAlbum} from '../../../data/dropdown';
import {PhotoPlaylist} from '../PlaylistContent/PhotoPlaylist';
import {ArrowLeftIcon, TickCircleIcon} from '../../../assets/icon';
import {
  SongTitlePlay,
  ListenersAndDonate,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
} from '../';

interface Props {
  onPressGoBack: () => void;
}

export const AlbumContent: React.FC<Props> = ({onPressGoBack}) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  useEffect(() => {
    modalSuccessDonate &&
      setTimeout(() => {
        setModalSuccessDonate(false);
      }, 3000);
  }, [modalSuccessDonate, trigger2ndModal]);

  const resultDataMore = (dataResult: any) => {
    if (dataResult.value === '2') {
      setModalShare(true);
    }
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title="Album"
        rightIcon={
          <Dropdown.More
            data={dropDownHeaderAlbum}
            selectedMenu={resultDataMore}
            containerStyle={styles.dropDownMore}
          />
        }
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        rightIconAction={() => null}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <ScrollView>
        <View style={{paddingHorizontal: widthPercentage(10)}}>
          <View style={{alignSelf: 'center'}}>
            <PhotoPlaylist uri="https://i.pinimg.com/originals/b3/51/66/b35166174c9bde2d0cc436150a983912.jpg" />
          </View>
          <SongTitlePlay
            title={'Smoke + Mirror'}
            totalSong={10}
            createdDate={'December 7, 2017'}
            createdBy={'Imagine Dragons'}
            avatarUri={
              'https://thisis-images.scdn.co/37i9dQZF1DZ06evO2YqUuI-large.jpg'
            }
          />
          <ListenersAndDonate
            totalListener={66900}
            onPress={() => setModalDonate(true)}
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.containerContent}>
          <View style={{marginBottom: heightPercentage(15)}}>
            <Text style={[typography.Subtitle1, {color: color.Success[500]}]}>
              Description
            </Text>
            <Text style={styles.description}>
              {
                "Born on the sofa of his childhood home, singer Lukas Forchhammer entered the world in unconventional surroundings. His parents' resided within the 84 acres of Christiania: an alternative, tightly knit community, formed in 1971 by squatters and artists in Cophenhagen. "
              }
            </Text>
          </View>

          <Text style={[typography.Subtitle1, {color: color.Success[500]}]}>
            Song List
          </Text>
          <View style={{marginBottom: heightPercentage(30)}}>
            <TopSong onPress={() => null} hideDropdownMore={true} />
          </View>
        </View>
      </ScrollView>

      <ModalDonate
        totalCoin={'120,000'}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onModalHide={() => setModalSuccessDonate(true)}
        onPressClose={() => setModalDonate(false)}
      />

      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
      />

      <ModalShare
        url={
          'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0'
        }
        modalVisible={modalShare}
        onPressClose={() => setModalShare(false)}
        titleModal={'Share Album'}
        imgUri={
          'https://i.pinimg.com/originals/b3/51/66/b35166174c9bde2d0cc436150a983912.jpg'
        }
        type={'Album'}
        titleSong={'Smoke + Mirror'}
        createdOn={'2019'}
        artist={'Imagine Dragons, The Wekeend'}
        onPressCopy={() =>
          InteractionManager.runAfterInteractions(() => setToastVisible(true))
        }
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthPercentage(21)}
              height={heightPercentage(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthPercentage(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              Link have been copied to clipboard!
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthPercentage(24)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  dropDownMore: {
    width: widthPercentage(123),
    marginLeft: widthPercentage(-113),
    marginTop: heightPercentage(-8),
  },
  separator: {
    width,
    height: 1,
    backgroundColor: color.Dark[500],
    marginTop: heightPercentage(15),
  },
  containerContent: {
    flex: 1,
    paddingHorizontal: widthPercentage(20),
    paddingTop: heightPercentage(15),
  },
  description: {
    fontSize: normalize(12),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    lineHeight: heightPercentage(16),
    paddingTop: heightPercentage(8),
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
