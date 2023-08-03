import { Formik } from 'formik';

import { Pressable, StyleSheet, View } from 'react-native';

import FormikTextInput from './FormikTextInput';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    padding: 8
  },
  buttonLabel: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  form: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 4,
    paddingLeft: 8
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput style={styles.textInput} name='username' placeholder='Username' />
      <FormikTextInput style={styles.textInput} name='password' placeholder='Password' secureTextEntry />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonLabel}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
