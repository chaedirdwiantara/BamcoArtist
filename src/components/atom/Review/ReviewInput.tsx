import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SsuInput} from '../InputText/SsuInput';
import {heightPercentage, width, widthResponsive} from '../../../utils';
import {useTranslation} from 'react-i18next';
import Typography from '../../../theme/Typography';
import Color from '../../../theme/Color';

type ReviewInputType = {
  value?: string;
  onChange?: (newType: string) => void;
};

const ReviewInput: React.FC<ReviewInputType> = props => {
  const {t} = useTranslation();
  const {value, onChange} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{t('Review.Input')}</Text>
      <SsuInput.InputText
        value={value}
        onChangeText={(newText: string) => onChange?.(newText)}
        placeholder={`${t('Review.Placeholder')}...`}
        containerStyles={{
          backgroundColor: 'transparent',
          paddingHorizontal: widthResponsive(10),
          borderWidth: 1,
          borderColor: Color.Dark[300],
        }}
        inputStyles={styles.inputDesc}
        multiline={true}
        maxLength={200}
      />
    </View>
  );
};

export default ReviewInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: heightPercentage(20),
    paddingHorizontal: heightPercentage(20),
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
  subtitle: {
    ...Typography.Subtitle1,
    color: Color.Neutral[10],
    marginBottom: heightPercentage(12),
  },
  inputDesc: {
    width: width,
    aspectRatio: 3 / 1,
    textAlignVertical: 'top',
  },
});
