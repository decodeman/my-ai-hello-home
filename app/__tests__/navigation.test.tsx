import { fireEvent, screen } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';

import Layout from '../_layout';
import Home from '../index';
import Greeting from '../greeting';

describe('Home <-> Greeting navigation', () => {
  it('submits a name, shows the greeting, and retains the name after Back', async () => {
    renderRouter(
      {
        _layout: Layout,
        index: Home,
        greeting: Greeting,
      },
      { initialUrl: '/' }
    );

    fireEvent.changeText(screen.getByLabelText('Your name'), 'Ava');
    fireEvent.press(screen.getByRole('button', { name: 'Say Hello' }));

    expect(await screen.findByText('Hello, Ava!')).toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button', { name: 'Back' }));

    expect(await screen.findByLabelText('Your name')).toHaveDisplayValue('Ava');
  });
});
