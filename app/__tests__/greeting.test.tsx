import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

const mockBack = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: mockBack }),
  useLocalSearchParams: () => ({ name: 'Ava' }),
}));

import Greeting from '../greeting';

describe('Greeting screen', () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it('renders "Hello, {name}!" for the route param', async () => {
    await render(<Greeting />);

    expect(screen.getByText('Hello, Ava!')).toBeOnTheScreen();
  });

  it('navigates back when Back is pressed', async () => {
    await render(<Greeting />);

    fireEvent.press(screen.getByRole('button', { name: 'Back' }));

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('meets the minimum touch target size for the back button', async () => {
    await render(<Greeting />);

    const button = screen.getByRole('button', { name: 'Back' });
    const flatStyle = StyleSheet.flatten(button.props.style);

    expect(flatStyle.minHeight).toBeGreaterThanOrEqual(44);
  });
});
