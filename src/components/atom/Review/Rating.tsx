import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Animated,
  Image,
} from 'react-native';
import {heightPercentage, widthPercentage} from '../../../utils';
import Typography from '../../../theme/Typography';
import {useTranslation} from 'react-i18next';
import Color from '../../../theme/Color';
import SsuDivider from '../Divider';

const Rating = () => {
  const {t} = useTranslation();
  const STAR_IMAGE = require('../../../assets/image/star.png');
  const STAR_SELECTED = require('../../../assets/image/star-selected.png');
  const starRatingOptions = [1, 2, 3, 4, 5];

  const [starRating, setStarRating] = useState<number>(0);

  const animatedButtonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 5,
      bounciness: 1,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 5,
      bounciness: 1,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{scale: animatedButtonScale}],
    marginRight: widthPercentage(10),
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>{t('Review.Rating')}</Text>
        <View style={styles.stars}>
          {starRatingOptions.map(option => (
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn()}
              onPressOut={() => handlePressOut()}
              onPress={() => setStarRating(option)}
              key={option}>
              <Animated.View style={animatedScaleStyle}>
                <Image
                  source={starRating >= option ? STAR_SELECTED : STAR_IMAGE}
                  style={styles.starImage}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
      <SsuDivider />
    </SafeAreaView>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: heightPercentage(20),
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
  starImage: {
    width: widthPercentage(30),
    height: heightPercentage(30),
  },
  subtitle: {
    ...Typography.Subtitle1,
    color: Color.Neutral[10],
    marginBottom: heightPercentage(12),
  },
});
