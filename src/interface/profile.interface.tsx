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

export type ProfileResponseType = {
  code: number;
  data: {
    uuid: string;
    username: string;
    email: string;
    fullname: string;
    about: string | null;
    banner: string | null;
    imageProfileUrl: string | null;
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
  };
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
