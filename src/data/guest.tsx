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
    text: 'Guest.UnlimitedSong',
    image: <MusicPlayerImage />,
  },
  {
    text: 'Guest.GetEvent',
    image: <TicketImage />,
  },
  {
    text: 'Guest.GetExclusive',
    image: <ContentPhoneImage />,
  },
  {
    text: 'Guest.Support',
    image: <HandImage />,
  },
];
