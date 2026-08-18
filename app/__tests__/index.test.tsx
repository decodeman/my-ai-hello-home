import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

import Home from '../index';

describe('Home screen', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders the name field and a disabled submit button when empty', async () => {
    await render(<Home />);

    expect(screen.getByLabelText('Your name')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Say Hello' })).toBeDisabled();
  });

  it('keeps the submit button disabled for a whitespace-only name', async () => {
    await render(<Home />);

    fireEvent.changeText(screen.getByLabelText('Your name'), '   ');

    expect(screen.getByRole('button', { name: 'Say Hello' })).toBeDisabled();
  });

  it('enables submit for a valid name and navigates with the trimmed name', async () => {
    await render(<Home />);

    fireEvent.changeText(screen.getByLabelText('Your name'), '  Ava  ');
    const button = screen.getByRole('button', { name: 'Say Hello' });
    expect(button).toBeEnabled();

    fireEvent.press(button);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/greeting',
      params: { name: 'Ava' },
    });
  });

  it('meets the minimum touch target size for the submit button', async () => {
    await render(<Home />);

    const button = screen.getByRole('button', { name: 'Say Hello' });
    const flatStyle = StyleSheet.flatten(button.props.style);

    expect(flatStyle.minHeight).toBeGreaterThanOrEqual(44);
  });
});
