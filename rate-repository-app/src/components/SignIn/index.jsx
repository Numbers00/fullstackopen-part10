import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import { Pressable, StyleSheet, View } from 'react-native';

import FormikTextInput from '../FormikTextInput';
import Text from '../Text';

import useSignIn from '../../hooks/useSignIn';

import theme from '../../theme';

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
      <Pressable testID='signInButton' style={styles.button} onPress={isValid ? onSubmit : () => {}}>
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

export const SignInContainer = ({ onSubmit }) => {
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


const SignIn = () => {
  const [signIn] = useSignIn();

  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
