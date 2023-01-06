import React from 'react';
import HandImage from '../assets/image/Hand.image';
import TicketImage from '../assets/image/Ticket.image';
import MusicPlayerImage from '../assets/image/MusicPlayer.image';
import ContentPhoneImage from '../assets/image/ContentPhone.image';

export interface ListContentType {
  image: React.ReactNode;
  text: string;
}

export const listContentGuest: ListContentType[] = [
  {
    text: 'Play Unlimited\nSong',
    image: <MusicPlayerImage />,
  },
  {
    text: 'Get Latest\nEvent Update',
    image: <TicketImage />,
  },
  {
    text: 'Get Exclusive\nContent',
    image: <ContentPhoneImage />,
  },
  {
    text: 'Support Your\nMusician',
    image: <HandImage />,
  },
];
