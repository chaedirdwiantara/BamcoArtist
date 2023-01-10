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
  ModalImagePicker,
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
import ImageList from './showImage';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {useUploadImageHook} from '../../hooks/use-uploadImage.hook';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

interface uriProps {
  assets: string[];
  path: string;
}

const CreatePost = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [inputText, setInputText] = useState<string>('');
  // const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState({
    modalFilter: false,
    modalImagePicker: false,
  });

  const {dataCreatePost, createPostLoading, setCreatePost} = useFeedHook();

  const {dataImage, setUploadImage} = useUploadImageHook();

  const [label, setLabel] = useState<string>();
  const [valueFilter, setValueFilter] = useState<string>();
  const [uri, setUri] = useState<uriProps[]>([]);
  const [dataAudience, setDataAudience] = useState<string>('');
  const [dataResponseImg, setDataResponseImg] = useState<string[]>([]);

  useEffect(() => {
    if (dataCreatePost !== null) {
      navigation.goBack();
    }
  }, [dataCreatePost]);

  useEffect(() => {
    dataImage?.data !== undefined
      ? setDataResponseImg([...dataResponseImg, dataImage?.data])
      : null;
  }, [dataImage]);

  useEffect(() => {
    uri.length !== 0 && dataResponseImg.length === uri.length
      ? setCreatePost({
          caption: inputText,
          category: valueFilter ? valueFilter : 'highlight',
          image: dataResponseImg,
          isPremium: dataAudience === 'Exclusive' ? true : false,
        })
      : null;
  }, [dataResponseImg]);

  const handlePostOnPress = () => {
    if (uri.length !== 0) {
      for (let i = 0; i < uri.length; i++) {
        return setUploadImage(uri[i]);
      }
    } else {
      return setCreatePost({
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Exclusive' ? true : false,
      });
    }
  };

  const resultDataAudience = (dataAudience: DataDropDownType) => {
    console.log(dataAudience, 'dataResultCategory');
    setDataAudience(dataAudience.label);
  };

  const sendUri = (val: {assets: string[]; path: string}) => {
    setUri([...uri, val]);
  };

  const resetImage = () => {
    setUri([]);
    closeModal();
  };

  const closeModal = () => {
    setModalVisible({
      modalFilter: false,
      modalImagePicker: false,
    });
  };

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
              onPress={() =>
                setModalVisible({
                  modalFilter: true,
                  modalImagePicker: false,
                })
              }
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
            <ImageList
              imgData={uri}
              disabled={false}
              width={162}
              height={79}
              // onPress={toggleModalOnPress}
            />
          </View>
        </View>
        <View style={styles.footerBody}>
          <View style={styles.iconsAndCategory}>
            <View style={styles.iconsContainer}>
              {/* <TouchableOpacity>
                <OpenCameraIcon />
              </TouchableOpacity>
              <Gap width={16} /> */}
              <TouchableOpacity
                onPress={() =>
                  setModalVisible({
                    modalFilter: false,
                    modalImagePicker: true,
                  })
                }>
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
                onPress={handlePostOnPress}
              />
            ) : (
              <ButtonGradient
                label={'Post'}
                gradientStyles={{
                  width: widthResponsive(100),
                  aspectRatio: heightResponsive(279 / 77),
                }}
                textStyles={{}}
                onPress={handlePostOnPress}
              />
            )}
          </View>
        </View>
      </View>
      <FilterModal
        toggleModal={() =>
          setModalVisible({
            modalFilter: !isModalVisible.modalFilter,
            modalImagePicker: false,
          })
        }
        modalVisible={isModalVisible.modalFilter}
        dataFilter={dropdownCategoryMusician}
        filterOnPress={setLabel}
        sendCategory={setValueFilter}
      />
      <ModalImagePicker
        title={'Upload media'}
        modalVisible={isModalVisible.modalImagePicker}
        sendUri={sendUri}
        onDeleteImage={resetImage}
        onPressClose={closeModal}
      />
      <ModalLoading visible={createPostLoading} />
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
