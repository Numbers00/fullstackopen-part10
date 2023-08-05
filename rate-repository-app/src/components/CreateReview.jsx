import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import { Pressable, StyleSheet, View } from 'react-native';

import FormikTextInput from './FormikTextInput';
import Text from './Text';

import useCreateReview from '../hooks/useCreateReview';

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

const CreateReviewForm = ({ isValid, onSubmit }) => {
  return (
    <View style={styles.form}>
      <View style={styles.textInputContainer}>
        <FormikTextInput style={styles.textInput} name='ownerName' placeholder='Owner Name' />
      </View>
      <View style={styles.textInputContainer}>
        <FormikTextInput style={styles.textInput} name='repositoryName' placeholder='Repository Name' />
      </View>
      <View style={styles.textInputContainer}>
        <FormikTextInput style={styles.textInput} name='rating' placeholder='Rating' />
      </View>
      <View style={styles.textInputContainer}>
        <FormikTextInput style={styles.textInput} name='text' placeholder='Review' multiline />
      </View>
      <Pressable style={styles.button} onPress={isValid ? onSubmit : () => {}}>
        <Text style={styles.buttonLabel}>Create Review</Text>
      </Pressable>
    </View>
  );
};


const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required')
});

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid }) => <CreateReviewForm isValid={isValid} onSubmit={handleSubmit} />}
    </Formik>
  );
};


const CreateReview = () => {
  const [createReview] = useCreateReview();

  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { createReview: { repositoryId } } = await createReview({ ownerName, repositoryName, rating: Number(rating), text });
      navigate('/repositories/' + repositoryId);
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;

