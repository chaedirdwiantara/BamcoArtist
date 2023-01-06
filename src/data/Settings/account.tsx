export interface PropsType {
  label: string;
  value: string;
}

export const dataGender: PropsType[] = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Non-binary', value: 'Non-binary'},
  {label: 'Trans', value: 'Trans'},
  {
    label: 'My gender identity is not listed',
    value: 'My gender identity is not listed',
  },
];

export const dataLocation: PropsType[] = [
  {label: 'Afganistan', value: 'Afganistan'},
  {label: 'Argentina', value: 'Argentina'},
  {label: 'Brazil', value: 'Brazil'},
  {label: 'China', value: 'China'},
  {label: 'Denmark', value: 'Denmark'},
  {label: 'Indonesia', value: 'Indonesia'},
  {label: 'Singapore', value: 'Singapore'},
];
