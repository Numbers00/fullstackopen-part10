import { Formik } from 'formik';
import * as yup from 'yup';

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
    padding: 4,
    paddingLeft: 8
  },
  textInputContainer: {
    marginBottom: 16
  }
});

const SignInForm = ({ isValid, onSubmit }) => {
  return (
    <View style={styles.form}>
      <View style={styles.textInputContainer}>
      <FormikTextInput style={styles.textInput} name='username' placeholder='Username' />
      </View>
      <View style={styles.textInputContainer}>
      <FormikTextInput style={styles.textInput} name='password' placeholder='Password' secureTextEntry />
      </View>
      <Pressable style={styles.button} onPress={isValid ? onSubmit : () => {}}>
        <Text style={styles.buttonLabel}>Sign In</Text>
      </Pressable>
    </View>
  );
};


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid }) => <SignInForm isValid={isValid} onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
