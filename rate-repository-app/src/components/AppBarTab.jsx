import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Pressable, StyleSheet, View } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8
  }
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable onPress={() => console.log('pressed')}>
      <View style={styles.container}>
        <View />
        <MaterialCommunityIcons name='source-repository' size={36} color='white' />
        <Text isWhite fontWeight='bold'>{ text }</Text>
      </View>
    </Pressable>
  );
};

export default AppBarTab;
