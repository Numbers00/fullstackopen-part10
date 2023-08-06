import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from "react-router-native";

import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '../Text';

import useSignOut from '../../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8
  }
});

const AppBarTab = ({ text, to }) => {
  const signOut = useSignOut();

  const icon = (() => {
    switch (text) {
    case 'Repositories':
      return <MaterialCommunityIcons name='source-repository' size={24} color='white' />;
    case 'Create a review':
      return <MaterialIcons name="rate-review" size={24} color="white" />;
    case 'My reviews':
      return <MaterialIcons name="list" size={24} color="white" />;
    case 'Sign In':
      return <MaterialIcons name="login" size={24} color="white" />;
    case 'Sign Out':
      return <MaterialIcons name="logout" size={24} color="white" />;
    case 'Sign Up':
      return <AntDesign name="adduser" size={24} color="white" />;
    default:
      throw new Error(`Unhandled tab: ${text}`);
    }
  })();

  if (to !== '/sign-out')
    return (
      <TouchableOpacity>
        <Link to={to}>
          <View style={styles.container}>
            <View />
            { icon }
            <Text isWhite fontWeight='bold'>{ text }</Text>
          </View>
        </Link>
      </TouchableOpacity>
    );
  
  return (
    <TouchableOpacity onPress={signOut}>
      <View style={styles.container}>
        <View />
        { icon }
        <Text isWhite fontWeight='bold'>{ text }</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppBarTab;
