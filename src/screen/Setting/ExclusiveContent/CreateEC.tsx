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
import {
  Button,
  Dropdown,
  ModalImagePicker,
  SsuInput,
} from '../../../components';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {PhotoPlaylist} from '../../../components/molecule/PlaylistContent/PhotoPlaylist';
import {useTranslation} from 'react-i18next';

interface CreateProps {
  data: DataExclusiveResponse | null;
  onPress: (props: DataExclusiveProps) => void;
}

export const CreateEC: React.FC<CreateProps> = ({data, onPress}) => {
  const {t} = useTranslation();

  const [title, setTitle] = useState<string>(data?.title || '');
  const [description, setDescription] = useState<string>(
    data?.description || '',
  );
  const [coverImage, setCoverImage] = useState<string>(data?.coverImage || '');
  const [firstUri, setFirstUri] = useState<string | undefined>(
    data?.coverImage || undefined,
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [durationUnit, setDurationUnit] = useState<string>('');
  const [price, setPrice] = useState<string>(
    data?.pricingPlans[0].price?.toString() ?? '',
  );

  const initialDuration = data?.pricingPlans[0].durationUnit;
  const duration = [
    {
      label: t('ExclusiveContent.Weekly'),
      value: 'weekly',
    },
    {
      label: t('ExclusiveContent.Monthly'),
      value: 'monthly',
    },
    {
      label: t('ExclusiveContent.Yearly'),
      value: 'yearly',
    },
  ];

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
      durationInDays: number;
      durationUnit: string;
      price: number;
    }[] = [];

    pricingPlans.push({
      durationInDays:
        durationUnit === 'weekly' ? 7 : durationUnit === 'monthly' ? 30 : 365,
      durationUnit: durationUnit,
      price: Number(price),
    });

    const payload: DataExclusiveProps = {
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
        {t('Setting.Exclusive.Label.Basic')}
      </Text>
      <View style={{marginBottom: heightPercentage(5)}}>
        <Text
          style={[
            typography.Caption,
            {color: color.Neutral[50], marginVertical: heightPercentage(7)},
          ]}>
          {t('Setting.Exclusive.Label.Cover')}
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
          label={t('Setting.Exclusive.Label.Title') || ''}
          placeholder={t('Setting.Exclusive.Placeholder.Title') || ''}
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
          label={t('Setting.Exclusive.Label.Description') || ''}
          placeholder={t('Setting.Exclusive.Placeholder.Description') || ''}
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
        {t('Setting.Exclusive.Label.Pricing')}
      </Text>

      <SsuInput.InputLabel
        label={t('Setting.Exclusive.Label.Price') || ''}
        placeholder={t('Setting.Exclusive.Placeholder.Price') || ''}
        value={price}
        multiline
        maxLength={200}
        onChangeText={(value: string) => setPrice(value)}
        containerStyles={{marginTop: heightPercentage(15)}}
        keyboardType="number-pad"
      />

      <Dropdown.Input
        data={duration}
        initialValue={initialDuration ?? ''}
        dropdownLabel={t('Setting.Tips.Filter.Duration')}
        placeHolder={t('Setting.Exclusive.Placeholder.Duration')}
        textTyped={val => setDurationUnit(val.value)}
        containerStyles={{marginTop: heightPercentage(15)}}
      />

      {/* <SsuInput.InputLabel
        label={t('ExclusiveContent.Weekly') || ''}
        placeholder={t('Setting.Exclusive.Placeholder.Price') || ''}
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
        label={t('ExclusiveContent.Monthly') || ''}
        placeholder={t('Setting.Exclusive.Placeholder.Price') || ''}
        value={price.monthly.toString()}
        multiline
        maxLength={200}
        onChangeText={(newText: string) => onChangePrice('monthly', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
        keyboardType="number-pad"
      />

      <SsuInput.InputLabel
        label={t('ExclusiveContent.Yearly') || ''}
        placeholder={t('Setting.Exclusive.Placeholder.Price') || ''}
        value={price.yearly.toString()}
        multiline
        maxLength={200}
        onChangeText={(newText: string) => onChangePrice('yearly', newText)}
        containerStyles={{marginTop: heightPercentage(15)}}
        keyboardType="number-pad"
      /> */}

      <Button
        label={t('Btn.Save')}
        onPress={onPressSave}
        containerStyles={styles.button}
      />

      <ModalImagePicker
        title={t('Setting.Exclusive.Label.Cover') || ''}
        modalVisible={modalVisible}
        sendUri={sendUri}
        sendUriMultiple={() => {}}
        onDeleteImage={resetImage}
        onPressClose={() => setModalVisible(false)}
        showDeleteImage={firstUri !== undefined}
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
    alignSelf: 'center',
  },
});
