import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import Repository from './Repository';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBg,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='/create-a-review' element={<CreateReview />} exact />
        <Route path='/my-reviews' element={<MyReviews />} exact />
        <Route path='/repositories/:id' element={<Repository />} />
        <Route path='/sign-in' element={<SignIn />} exact />
        <Route path='/sign-up' element={<SignUp />} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
