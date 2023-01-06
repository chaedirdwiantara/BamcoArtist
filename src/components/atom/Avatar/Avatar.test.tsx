import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Avatar} from './Avatar';

describe('Avatar Component', () => {
  it('Render Avatar', () => {
    render(
      <Avatar imgUri="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png" />,
    );
    const element = screen.getByTestId('ssu-avatar');
    expect(element).toBeDefined();
  });
});
