export type RegistrationType =
  | 'email'
  | 'facebook'
  | 'google'
  | 'apple'
  | 'phoneNumber';

export type FavGenreType = {
  id: number;
  name: string;
};

export type MoodsType = {
  id: number;
  name: string;
};

export type ExpectationType = {
  id: number;
  name: string;
};

export type ListImageType = {
  length: number;
  image: string;
  presetName: string;
};

export type ProfileResponseData = {
  uuid: string;
  username: string;
  email: string;
  fullname: string;
  about: string | null;
  banners: ListImageType[];
  imageProfileUrls: ListImageType[];
  phoneNumber: string | null;
  registrationType: RegistrationType;
  favoriteGenres: FavGenreType[];
  moods: MoodsType[];
  expectation: ExpectationType[];
  isValid: boolean;
  following: number | null;
  songAdded: number | null;
  createdAt: string;
  updatedAt: string;
  locationCountry: string;
  gender: string;
  followers: number;
  fans: number;
  bio: string | null;
};

export type ProfileResponseType = {
  code: number;
  data: ProfileResponseData;
  message: string;
  status: number;
};

export type UpdateProfileResponseType = {
  code: number;
  data: {
    id: number;
    uuid: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
  status: number;
};

export type ApplyReferralResponseType = {
  code: number;
  data: null | {
    username: string;
    appliedAt: string;
  };
  message: string;
  status: number;
};
