import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Hello Home' }} />
      <Stack.Screen
        name="greeting"
        options={{ title: 'Greeting', headerBackTitle: 'Home' }}
      />
    </Stack>
  );
}
