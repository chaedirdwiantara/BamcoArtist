import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {storage} from '../../../hooks/use-storage.hook';
import {EqualizerIcon} from '../../../assets/icon';
import {Gap} from '../../atom';
import {DropDownFilter} from '../V2';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import CountryCard from '../CountryCard/CountryCard';
import EmptyStateAnalytic from '../EmptyState/EmptyStateAnalytic';
import {DataDropDownType} from '../../../data/dropdown';
import {ListenerCountryData} from '../../../interface/analythic.interface';

interface ListenerCountryProps {
  compTitle: string;
  withInteraction: boolean;
  labelCaption: string;
  dataFilter?: DataDropDownType[];
  selectedMenu?: React.Dispatch<React.SetStateAction<DataDropDownType>>;
  setViewAll: React.Dispatch<React.SetStateAction<boolean>>;
  viewAll?: boolean;
  dataCountry: ListenerCountryData[] | undefined;
}

const ListenerCountry: FC<ListenerCountryProps> = (
  props: ListenerCountryProps,
) => {
  const {
    compTitle,
    withInteraction,
    labelCaption,
    dataFilter,
    selectedMenu,
    dataCountry,
    setViewAll,
    viewAll,
  } = props;
  const {t} = useTranslation();
  const lang = storage.getString('lang');

  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <EqualizerIcon />
        <Gap width={10} />
        <Text style={styles.title}>{compTitle}</Text>
      </View>
      {/* DROPDOWN AREA */}
      {withInteraction && (
        <View style={styles.topArea}>
          <View style={{width: 90, zIndex: 100}}>
            {labelCaption && dataFilter && selectedMenu && (
              <DropDownFilter
                labelCaption={labelCaption}
                dataFilter={dataFilter}
                selectedMenu={selectedMenu}
                leftPosition={
                  lang === 'en' ? widthResponsive(-85) : widthResponsive(-85)
                }
                topPosition={widthResponsive(20)}
                containerStyle={styles.dropdownContainer}
                textCustomStyle={{color: color.Neutral[10], fontSize: mvs(11)}}
                iconColor={color.Neutral[10]}
                dropdownStyle={styles.dropdown}
              />
            )}
          </View>
          <View>
            <TouchableOpacity onPress={() => setViewAll(!viewAll)}>
              <Text style={styles.link}>
                {!viewAll
                  ? t('Home.Tab.Analytic.Fans.TopFans.Link')
                  : t('Home.Tab.Analytic.Fans.TopFans.Hide')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!withInteraction && <Gap height={16} />}
      {/* BODY AREA */}
      {dataCountry && dataCountry?.length > 0 ? (
        <View>
          {dataCountry.map((item, index) => (
            <View
              style={{
                marginTop:
                  index !== 0 ? widthResponsive(12) : widthResponsive(20),
              }}
              key={index}>
              <View
                style={{
                  marginTop:
                    index !== 0 ? widthResponsive(17) : widthResponsive(18),
                }}>
                <CountryCard
                  countryId={item.country.id}
                  flagUri={item.country.image}
                  name={item.country.name}
                  value={item.totalStream}
                />
              </View>
            </View>
          ))}
        </View>
      ) : (
        <EmptyStateAnalytic
          caption={t('Home.Tab.Analytic.Album.Listener.EmptyState')}
        />
      )}
    </View>
  );
};

export default ListenerCountry;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(18),
    color: color.Neutral[10],
  },
  topArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: color.Dark[400],
    paddingHorizontal: widthResponsive(12),
    paddingVertical: widthResponsive(8),
    borderRadius: 4,
  },
  dropdown: {
    backgroundColor: color.Dark[800],
    borderWidth: 1,
    borderColor: color.Dark[400],
  },
  link: {
    fontFamily: font.InterRegular,
    fontSize: mvs(11),
    fontWeight: '500',
    color: color.Success[400],
    lineHeight: mvs(28),
  },
});
