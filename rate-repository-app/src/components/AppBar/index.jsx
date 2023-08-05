import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

import theme from '../../theme';

import useMe from '../../hooks/useMe';

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

  const { data: me, loading } = useMe();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' to='/' />
        {loading || !me.me 
          ? (
            <>
              <AppBarTab text='Sign In' to='/sign-in' />
            </>
          )
          : (
            <>
              <AppBarTab text='Create a review' to='/create-a-review' />
              <AppBarTab text='Sign Out' to='/sign-out' />
            </>
          )
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
