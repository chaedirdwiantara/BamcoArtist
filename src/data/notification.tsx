export interface dataNotification {
  uri?: string;
  name?: string;
}

export interface NotifDataType {
  type: string;
  desc?: string;
  data?: dataNotification[];
}

export const notifData: NotifDataType[] = [
  {
    type: 'follow',
    desc: 'others Started Following you',
    data: [
      {
        name: 'Sakura',
        uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
      },
      {
        name: 'Sarada',
        uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
      },
      {
        name: 'Sasasa',
        uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
      },
      {
        name: 'Hinata',
        uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
      },
      {
        name: 'Indomi',
        uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
      },
    ],
  },
  {
    type: 'like',
    data: [
      {
        name: 'Sakura',
        uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
      },
    ],
    desc: 'replied to your reply',
  },
  {
    type: 'new_post',
    data: [
      {
        name: 'Sakura',
        uri: 'https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
      },
    ],
    desc: 'Have been released New Album, Mercury',
  },
  {
    type: 'donation',
    desc: 'Congratulations! Your 500 Coion donation to Tentang Kita have been successful!',
  },
  {
    type: 'new_update',
    desc: 'A Newer Version of Sunny Side Up Application have been release, click to updated',
  },
];
