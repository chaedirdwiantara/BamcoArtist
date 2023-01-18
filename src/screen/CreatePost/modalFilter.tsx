import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';
import {color, font} from '../../theme';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {DataDropDownType} from '../../data/dropdown';
import {ms, mvs} from 'react-native-size-matters';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export const {width} = Dimensions.get('screen');

interface ModalFilterProps {
  toggleModal: () => void;
  modalVisible: boolean;
  dataFilter: DataDropDownType[];
  filterOnPress: (label: string) => void;
  sendCategory: (value: string) => void;
}

const FilterModal: FC<ModalFilterProps> = (props: ModalFilterProps) => {
  const {toggleModal, modalVisible, dataFilter, filterOnPress, sendCategory} =
    props;

  const filterButtonHandler = (data: DataDropDownType) => {
    toggleModal();
    filterOnPress?.(data.label);
    sendCategory?.(data.value);
  };

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0}
      backdropColor={color.Dark[800]}
      onBackdropPress={toggleModal}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={{marginHorizontal: 0}}
      onBackButtonPress={toggleModal}>
      <View style={styles.container}>
        <FlatList
          data={dataFilter}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => filterButtonHandler(item)}>
              <Text style={styles.textFilter}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.Pink[100],
    borderColor: color.Pink[100],
    width: 150,
    alignItems: 'flex-start',
    position: 'absolute',
    top: heightPercentageToDP('13%'),
    marginLeft: widthResponsive(70),
  },
  textContainer: {
    backgroundColor: color.Pink[100],
    justifyContent: 'center',
    paddingHorizontal: ms(13),
    paddingVertical: mvs(6),
    borderColor: color.Pink[100],
  },
  textFilter: {
    fontSize: mvs(10),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    color: color.Neutral[10],
  },
});
