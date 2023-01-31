import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {Image} from 'react-native-image-crop-picker';

import {
  DataExclusiveProps,
  DataExclusiveResponse,
} from '../../../interface/setting.interface';
import {color, font, typography} from '../../../theme';
import {uploadImage} from '../../../api/uploadImage.api';
import {Button, ModalImagePicker, SsuInput} from '../../../components';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {PhotoPlaylist} from '../../../components/molecule/PlaylistContent/PhotoPlaylist';

interface CreateProps {
  data: DataExclusiveResponse | null;
  onPress: (props: DataExclusiveProps) => void;
}

export const CreateEC: React.FC<CreateProps> = ({data, onPress}) => {
  const priceWeekly = data?.pricingPlans.filter(
    val => val.durationUnit === 'weekly',
  )[0];
  const weekly = priceWeekly === undefined ? '' : priceWeekly?.price;

  const priceMonthly = data?.pricingPlans.filter(
    val => val.durationUnit === 'monthly',
  )[0];
  const monthly = priceMonthly === undefined ? '' : priceMonthly?.price;

  const priceYearly = data?.pricingPlans.filter(
    val => val.durationUnit === 'yearly',
  )[0];
  const yearly = priceYearly === undefined ? '' : priceYearly?.price;

  const [title, setTitle] = useState<string>(data?.title || '');
  const [description, setDescription] = useState<string>(
    data?.description || '',
  );
  const [price, setPrice] = useState({
    weekly: weekly,
    monthly: monthly,
    yearly: yearly,
  });
  const [coverImage, setCoverImage] = useState<string>(data?.coverImage || '');
  const [firstUri, setFirstUri] = useState<string | undefined>(
    data?.coverImage || undefined,
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const onChangePrice = (key: string, value: string) => {
    setPrice({
      ...price,
      [key]: value,
    });
  };

  const sendUri = async (val: Image) => {
    setFirstUri(val.path);
    try {
      const response = await uploadImage(val);
      setCoverImage(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetImage = () => {
    setFirstUri(undefined);
    setCoverImage('');
    setModalVisible(false);
  };

  const onPressSave = () => {
    let pricingPlans: {
      duration: number;
      durationUnit: string;
      price: number;
    }[] = [];
    const durationUnit: string[] = ['weekly', 'monthly', 'yearly'];

    durationUnit.map(item => {
      if (price[item] !== '') {
        pricingPlans.push({
          duration: 1,
          durationUnit: item,
          price: Number(price[item]),
        });
      }
    });

    const payload = {
      title,
      description,
      coverImage,
      pricingPlans,
    };
    onPress(payload);
  };

  const newColorTitle =
    title.length === 120 ? color.Error[400] : color.Neutral[10];
  const newColorDescription =
    description.length === 200 ? color.Error[400] : color.Neutral[10];

  return (
    <View>
      <Text
        style={[
          typography.Button2,
          {color: color.Neutral[50], marginVertical: heightPercentage(8)},
        ]}>
        Basic Information
      </Text>
      <View style={{marginBottom: heightPercentage(5)}}>
        <Text
          style={[
            typography.Caption,
            {color: color.Neutral[50], marginVertical: heightPercentage(7)},
          ]}>
          Exclusive Content Cover
        </Text>
        <PhotoPlaylist
          uri={firstUri}
          showIcon
          containerStyles={styles.cover}
          iconStyles={{width: widthPercentage(22), height: widthPercentage(22)}}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <View style={styles.containerInput}>
        <SsuInput.InputLabel
          label="Title"
          placeholder="Add Title"
          value={title}
          multiline
          maxLength={120}
          onChangeText={(newText: string) => setTitle(newText)}
          containerStyles={{marginTop: heightPercentage(15)}}
        />
        <Text
          style={[
            styles.length,
            {color: newColorTitle},
          ]}>{`${title.length}/120`}</Text>
      </View>

      <View style={styles.containerInput}>
        <SsuInput.InputLabel
          label="Description"
          placeholder="Add Description about your content"
          value={description}
          multiline
          maxLength={200}
          onChangeText={(newText: string) => setDescription(newText)}
          containerStyles={{marginTop: heightPercentage(15)}}
        />
        <Text
          style={[
            styles.length,
            {color: newColorDescription},
          ]}>{`${description.length}/200`}</Text>
      </View>

      <Text
        style={[
          typography.Button2,
          {color: color.Neutral[50], marginTop: heightPercentage(25)},
        ]}>
        Pricing Plan
      </Text>

      <SsuInput.InputLabel
        label="Weekly"
        placeholder="Input Price (In Credit)"
        value={price.weekly.toString()}
        multiline
        maxLength={200}
        onChangeText={(newText: string) => onChangePrice('weekly', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
        keyboardType="number-pad"
        // leftIcon={
        //   <CheckBox
        //     checkBoxStyles={{
        //       width: widthPercentage(18),
        //       height: widthPercentage(18),
        //     }}
        //     handleOnPress={() => null}
        //     active={true}
        //   />
        // }
        // inputStyles={{marginLeft: widthPercentage(22)}}
      />

      <SsuInput.InputLabel
        label="Monthly"
        placeholder="Input Price (In Credit)"
        value={price.monthly.toString()}
        multiline
        maxLength={200}
        onChangeText={(newText: string) => onChangePrice('monthly', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
        keyboardType="number-pad"
      />

      <SsuInput.InputLabel
        label="Yearly"
        placeholder="Input Price (In Credit)"
        value={price.yearly.toString()}
        multiline
        maxLength={200}
        onChangeText={(newText: string) => onChangePrice('yearly', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
        keyboardType="number-pad"
      />

      <Button
        label="Save"
        onPress={onPressSave}
        containerStyles={styles.button}
      />

      <ModalImagePicker
        title="Exclusive Content Cover"
        modalVisible={modalVisible}
        sendUri={sendUri}
        sendUriMultiple={() => {}}
        onDeleteImage={resetImage}
        onPressClose={() => setModalVisible(false)}
        hideMenuDelete={firstUri !== undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    width: widthPercentage(88),
    marginTop: 0,
    marginBottom: 0,
  },
  containerInput: {
    // width: '90%',
    // alignSelf: 'center',
  },
  title: {
    fontSize: mvs(13),
    color: color.Success[500],
    fontFamily: font.InterSemiBold,
    marginTop: heightPercentage(20),
  },
  length: {
    fontSize: mvs(12),
    marginTop: heightPercentage(5),
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    marginVertical: heightPercentage(25),
    backgroundColor: color.Pink[200],
    alignSelf: 'center',
  },
});
