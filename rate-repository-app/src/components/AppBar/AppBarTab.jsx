import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from "react-router-native";

import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8
  }
});

const AppBarTab = ({ text, to }) => {
  return (
    <TouchableOpacity>
      <Link to={to}>
        <View style={styles.container}>
          <View />
          {text === 'Repositories'
            ? <MaterialCommunityIcons name='source-repository' size={24} color='white' />
            : <MaterialIcons name="login" size={24} color="white" />
          }
          <Text isWhite fontWeight='bold'>{ text }</Text>
        </View>
      </Link>
    </TouchableOpacity>
  );
};

export default AppBarTab;
