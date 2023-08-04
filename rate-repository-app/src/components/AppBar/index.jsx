import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBg,
    flexDirection: 'row'
  }
});

const AppBar = () => {
  // Constants.manifest has been deprecated in favor of Constant.expoconfig
  // console.log(Constants.expoConfig);
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' to='/' />
        <AppBarTab text='Sign In' to='/sign-in' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
