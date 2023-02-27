import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';
import {color, font} from '../../../../theme';
import {
  heightPercentage,
  heightResponsive,
  widthResponsive,
} from '../../../../utils';
import {DataDropDownType} from '../../../../data/dropdown';
import {ms, mvs} from 'react-native-size-matters';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';

export const {width} = Dimensions.get('screen');

interface ModalFilterProps {
  toggleModal: () => void;
  modalVisible: boolean;
  dataFilter: DataDropDownType[];
  filterOnPress: (label: string) => void;
  sendCategory: (value: string) => void;
  translation?: boolean;
  xPosition: number;
  yPosition: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const FilterModal: FC<ModalFilterProps> = (props: ModalFilterProps) => {
  const {t} = useTranslation();
  const {
    toggleModal,
    modalVisible,
    dataFilter,
    filterOnPress,
    sendCategory,
    translation,
    xPosition,
    yPosition,
    containerStyle,
    textStyle,
  } = props;

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
      <View
        style={[
          styles.container,
          {
            position: 'absolute',
            top: yPosition + 11,
            left: xPosition,
          },
          containerStyle,
        ]}>
        <FlatList
          data={dataFilter}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => filterButtonHandler(item)}>
              <Text style={[styles.textFilter, textStyle]}>
                {translation ? t(item.label) : item.label}
              </Text>
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
    backgroundColor: color.Dark[600],
    borderColor: color.Dark[600],
    alignItems: 'flex-start',
    borderRadius: 8,
    paddingVertical: 5,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingHorizontal: ms(12),
    paddingVertical: mvs(5),
    borderColor: color.Dark[600],
  },
  textFilter: {
    fontSize: mvs(10),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    color: color.Neutral[10],
  },
});
