import { TextInput, StyleSheet, TextInputProps } from 'react-native';

const PLACEHOLDER_COLOR = '#4A4A4A';

interface ThemedTextInputProps extends TextInputProps {
  // Add any additional props here
}

export function ThemedTextInput({ style, ...props }: ThemedTextInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={PLACEHOLDER_COLOR}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: 16,
  },
}); 