import { FlatList, View, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';

import useRepositories from '../../hooks/useRepositories';

import Text from './../Text';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


// pure component, i.e., no side effects, e.g., fetching data through a hook
// exported to be used in tests
export const RepositoryListContainer = ({ repositories, loading }) => {
  const repositoryNodes = repositories?.repositories?.edges?.map(edge => edge.node) || [];

  if (loading) return (<View><Text>Loading repositories...</Text></View>);
  else if (!repositoryNodes) return (<View><Text>No repositories</Text></View>);
  
  return (
    <FlatList
      testID='flatList'
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem testID='RepositoryItem' item={item} />}
    />
  );
};

const RepositoryList = () => {
  const { data: repositories, loading } = useRepositories();

  return <RepositoryListContainer repositories={repositories} loading={loading} />;
};

export default RepositoryList;
