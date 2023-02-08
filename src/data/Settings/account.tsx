import {listYears} from '../../utils/listYears';

export interface PropsType {
  label: string;
  value: string;
}

export const dataState: PropsType[] = [
  {label: 'DKI Jakarta', value: 'DKI Jakarta'},
  {label: 'Jawa Barat', value: 'Jawa Barat'},
  {label: 'Jawa Timur', value: 'Jawa Timur'},
  {label: 'Jawa Tengah', value: 'Jawa Tengah'},
  {label: 'Banten', value: 'Banten'},
  {label: 'Bali', value: 'Bali'},
  {label: 'Aceh', value: 'Aceh'},
];

export const dataPostalCode: PropsType[] = [
  {label: '44186', value: '44186'},
  {label: '10110', value: '10110'},
  {label: '16110', value: '16110'},
  {label: '50111', value: '50111'},
  {label: '60111', value: '60111'},
  {label: '80111', value: '80111'},
  {label: '23111', value: '23111'},
];

export const dataCity: PropsType[] = [
  {label: 'Jakarta Pusat', value: 'jakarta_pusat'},
  {label: 'Denpasar', value: 'denpasar'},
  {label: 'Bandung', value: 'bandung'},
  {label: 'Serang', value: 'serang'},
  {label: 'Malang', value: 'malang'},
  {label: 'Pekalongan', value: 'pekalongan'},
  {label: 'Surabaya', value: 'surabaya'},
];

export const dataGender: PropsType[] = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Non-binary', value: 'non_binary'},
  {label: 'Trans', value: 'trans'},
  {
    label: 'My gender identity is not listed',
    value: 'my_gender_identity_is_not_listed',
  },
];

export const dataLocation: PropsType[] = [
  {label: 'Afganistan', value: 'afganistan'},
  {label: 'Argentina', value: 'argentina'},
  {label: 'Brazil', value: 'brazil'},
  {label: 'China', value: 'china'},
  {label: 'Denmark', value: 'denmark'},
  {label: 'Indonesia', value: 'indonesia'},
  {label: 'Singapore', value: 'singapore'},
];

export const dataYearsFrom: PropsType[] = listYears.map(val => ({
  label: val.toString(),
  value: val.toString(),
}));

export const dataYearsTo: PropsType[] = [
  {
    label: 'Present',
    value: 'present',
  },
  ...dataYearsFrom.slice(1, dataYearsFrom.length),
];
