import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, font} from '../../theme';
import {
  Avatar,
  Button,
  ButtonGradient,
  ButtonGradientwithIcon,
  Dropdown,
  Gap,
  SsuInput,
  TopNavigation,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {heightResponsive, widthResponsive} from '../../utils';
import {ms, mvs} from 'react-native-size-matters';
import {ImportPhotoIcon, OpenCameraIcon} from '../../assets/icon';
import {
  DataDropDownType,
  dropdownCategoryMusician,
  dropDownSetAudience,
} from '../../data/dropdown';
import FilterModal from './modalFilter';

const CreatePost = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [inputText, setInputText] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [label, setLabel] = useState<string>();

  const resultDataCategory = (dataResultCategory: DataDropDownType) => {
    console.log(dataResultCategory, 'dataResultCategory');
  };

  const resultDataAudience = (dataAudience: DataDropDownType) => {
    console.log(dataAudience, 'dataResultCategory');
  };

  useEffect(() => {
    console.log(label, 'label');
  }, [label]);

  return (
    <View style={styles.container}>
      <TopNavigation.Type1
        title="Create Post"
        maxLengthTitle={20}
        itemStrokeColor={'white'}
        leftIconAction={navigation.goBack}
      />
      <View style={styles.mainContainer}>
        <View style={styles.topBody}>
          <View style={styles.userCategory}>
            <Avatar />
            <Gap width={12} />
            <ButtonGradientwithIcon
              label={label ? label : 'Select Category'}
              onPress={() => setModalVisible(true)}
              gradientStyles={{}}
              textStyles={{
                fontFamily: font.InterRegular,
                fontWeight: '500',
                fontSize: mvs(10),
              }}
            />
          </View>
          <View style={{}}>
            <SsuInput.InputText
              value={inputText}
              onChangeText={(newText: string) => setInputText(newText)}
              placeholder={'Write Something...'}
              containerStyles={{
                width: widthResponsive(290),
                backgroundColor: 'transparent',
                paddingLeft: 0,
              }}
              multiline={true}
              maxLength={400}
            />
          </View>
        </View>
        <View style={styles.footerBody}>
          <View style={styles.iconsAndCategory}>
            <View style={styles.iconsContainer}>
              <TouchableOpacity>
                <OpenCameraIcon />
              </TouchableOpacity>
              <Gap width={16} />
              <TouchableOpacity>
                <ImportPhotoIcon />
              </TouchableOpacity>
            </View>
            <View style={styles.dropdownContainer}>
              <Dropdown.Menu
                data={dropDownSetAudience}
                placeHolder={'Set Audience'}
                selectedMenu={resultDataAudience}
                containerStyle={{
                  width: widthResponsive(138),
                  marginLeft: widthResponsive(-57),
                }}
                placeHolderStyles={styles.placeHolderStyle}
              />
            </View>
          </View>
          <View style={styles.textCounter}>
            <Text
              style={[
                styles.footerText,
                {
                  color:
                    inputText.length === 400
                      ? color.Error[400]
                      : color.Neutral[10],
                },
              ]}>
              {inputText.length}/400
            </Text>
            {inputText.length === 0 ? (
              <Button
                label={'Post'}
                containerStyles={{
                  width: widthResponsive(100),
                  aspectRatio: heightResponsive(279 / 77),
                  backgroundColor: color.Dark[50],
                }}
                textStyles={{}}
              />
            ) : (
              <ButtonGradient
                label={'Post'}
                gradientStyles={{
                  width: widthResponsive(100),
                  aspectRatio: heightResponsive(279 / 77),
                }}
                textStyles={{}}
                onPress={() => {}}
              />
            )}
          </View>
        </View>
      </View>
      <FilterModal
        toggleModal={() => setModalVisible(!isModalVisible)}
        modalVisible={isModalVisible}
        dataFilter={dropdownCategoryMusician}
        filterOnPress={setLabel}
      />
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBody: {
    paddingTop: widthResponsive(16),
    paddingHorizontal: widthResponsive(24),
  },
  footerBody: {
    paddingBottom: widthResponsive(16),
  },
  userCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(13),
  },
  textCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthResponsive(24),
  },
  iconsAndCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: ms(1),
    borderBottomWidth: 1,
    borderColor: color.Dark[50],
    paddingHorizontal: widthResponsive(24),
    paddingVertical: widthResponsive(8),
    marginBottom: heightResponsive(12),
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: widthResponsive(95),
  },
  placeHolderStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(12),
  },
});
