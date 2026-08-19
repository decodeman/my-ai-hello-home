import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();
  const trimmedName = name.trim();
  const isValid = trimmedName.length > 0;

  const handleSubmit = () => {
    router.push({ pathname: '/greeting', params: { name: trimmedName } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Home</Text>
      <Text style={styles.label}>Your name</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your name…"
        value={name}
        onChangeText={setName}
        accessibilityLabel="Your name"
        autoFocus
      />
      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isValid}
        accessibilityRole="button"
        accessibilityLabel="Say Hello"
      >
        <Text style={styles.buttonText}>Say Hello</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 44,
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
