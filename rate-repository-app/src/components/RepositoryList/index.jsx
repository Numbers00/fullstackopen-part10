import { Picker } from '@react-native-picker/picker';

import { useEffect, useState } from 'react';
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
export const RepositoryListContainer = ({ repositories, loading, orderBy, setOrderBy }) => {
  const repositoryNodes = repositories?.repositories?.edges?.map(edge => edge.node) || [];

  if (loading) return (<View><Text>Loading repositories...</Text></View>);
  else if (!repositoryNodes) return (<View><Text>No repositories</Text></View>);
  
  return (
    <FlatList
      testID='flatList'
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem testID='RepositoryItem' item={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <Picker
          selectedValue={orderBy}
          onValueChange={itemValue =>
            setOrderBy(itemValue)
          }>
          <Picker.Item label='Latest repositories' value='latest repositories' />
          <Picker.Item label='Highest rated repositories' value='highest rated repositories' />
          <Picker.Item label='Lowest rated repositories' value='lowest rated repositories' />
        </Picker>
      )}
    />
  );
};

const RepositoryList = () => {
  const { data: repositories, loading, refetch } = useRepositories('Latest repositories');

  const [orderBy, setOrderBy] = useState('latest repositories');

  const fetchRepositories = () => {
    switch (orderBy) {
    case 'latest repositories':
      refetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
      break;
    case 'highest rated repositories':
      refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
      break;
    case 'lowest rated repositories':
      refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
      break;
    default:
      throw new Error(`Unhandled orderBy: ${orderBy}`);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [orderBy]);

  return <RepositoryListContainer
    repositories={repositories}
    loading={loading}
    orderBy={orderBy}
    setOrderBy={setOrderBy}
  />;
};

export default RepositoryList;
