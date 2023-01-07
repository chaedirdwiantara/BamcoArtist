import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {color, font} from '../../theme';
import {
  Avatar,
  Button,
  ButtonGradient,
  Gap,
  SsuInput,
  TopNavigation,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {heightResponsive, widthResponsive} from '../../utils';
import {ms, mvs} from 'react-native-size-matters';

const CreatePost = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [inputText, setInputText] = useState<string>('');

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
            <ButtonGradient
              label={'Select Category'}
              onPress={() => {}}
              gradientStyles={{
                borderRadius: 10,
                width: widthResponsive(91),
                aspectRatio: heightResponsive(279 / 77),
              }}
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
          <View></View>
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
    paddingHorizontal: widthResponsive(24),
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
  },
});
