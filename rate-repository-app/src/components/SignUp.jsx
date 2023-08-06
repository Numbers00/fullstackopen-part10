import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import { Pressable, StyleSheet, View } from 'react-native';

import FormikTextInput from './FormikTextInput';
import Text from './Text';

import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

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

const SignUpForm = ({ isValid, onSubmit }) => {
  return (
    <View style={styles.form}>
      <View style={styles.textInputContainer}>
        <FormikTextInput style={styles.textInput} name='username' placeholder='Username' />
      </View>
      <View style={styles.textInputContainer}>
        <FormikTextInput style={styles.textInput} name='password' placeholder='Password' secureTextEntry />
      </View>
      <View style={styles.textInputContainer}>
        <FormikTextInput style={styles.textInput} name='passwordConfirmation' placeholder='Password Confirmation' secureTextEntry />
      </View>
      <Pressable testID='signInButton' style={styles.button} onPress={isValid ? onSubmit : () => {}}>
        <Text style={styles.buttonLabel}>Sign Up</Text>
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
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password confirmation does not match password')
    .required('Password confirmation is required')
});

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid }) => <SignUpForm isValid={isValid} onSubmit={handleSubmit} />}
    </Formik>
  );
};


const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();

  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
