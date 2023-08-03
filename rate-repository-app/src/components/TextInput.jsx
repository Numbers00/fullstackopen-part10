import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  hasError: {
    borderColor: theme.colors.danger
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style,
    error && styles.hasError
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
