export interface SongsProps {
  musicianUUID: string;
  featuring: any;
  musicianName: string;
  description: string;
  album: any;
}
export const DummySongDetail: SongsProps = {
  musicianUUID: '1233434343',
  musicianName: 'Somy',
  album: {
    musician: {
      imageProfile:
        'https://assets.skor.id/crop/0x0:0x0/x/photo/2022/12/02/2408359703.jpeg',
    },
  },
  featuring: [
    {
      isDeletedUser: false,
      name: 'Andini',
      uuid: '133434343',
      fullname: 'andiniii',
      imageProfile:
        'https://hthgaming.com/wp-content/uploads/2018/07/hanabi-thumbnail.jpg',
    },
  ],
  description:
    'Born on the sofa of his childhood home, singer Lukas Forchhammer entered the world in unconventional surroundings. His parents resided within the 84 acres of Christiania: an alternative, tightly knit community so when he was 27 years old he went to',
};
