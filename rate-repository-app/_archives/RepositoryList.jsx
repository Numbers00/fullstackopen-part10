import { Picker } from '@react-native-picker/picker';
// import { useDebounce } from 'use-debounce';

import { useCallback, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';

import useRepositories from '../../hooks/useRepositories';

import Text from './../Text';
import TextInput from './../TextInput';

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: 'white',
    padding: 4,
    paddingLeft: 8
  },
  separator: {
    height: 10
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


// pure component, i.e., no side effects, e.g., fetching data through a hook
// exported to be used in tests
export const RepositoryListContainer = (props) => {
  const { repositories, loading, searchKeyword, setSearchKeyword, orderBy, setOrderBy } = props;

  const repositoryNodes = repositories?.repositories?.edges?.map(edge => edge.node) || [];

  // this is still a pure component even if it's using a hook
  // no side-effect, external dependencies, and it's functionalities depend purely on props
  const renderHeader = useCallback(() => (
    <>
      <View style={{ padding: 8, paddingBottom: 0 }}>
        <TextInput
          style={styles.textInput}
          value={searchKeyword}
          onChangeText={(value) => setSearchKeyword(value)}
          placeholder='Search'
        />
      </View>
      <Picker
        selectedValue={orderBy}
        onValueChange={itemValue =>
          setOrderBy(itemValue)
        }>
        <Picker.Item label='Latest repositories' value='latest repositories' />
        <Picker.Item label='Highest rated repositories' value='highest rated repositories' />
        <Picker.Item label='Lowest rated repositories' value='lowest rated repositories' />
      </Picker>
    </>
  ), [searchKeyword, orderBy]);

  return (
    <FlatList
      testID='flatList'
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        if (loading) return <View><Text>Loading repositories...</Text></View>;
        else if (!item) return <View><Text>No repositories</Text></View>;

        return <RepositoryItem item={item} />;
      }}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={renderHeader}
    />
  );
};


const RepositoryList = () => {
  const { data: repositories, loading, refetch } = useRepositories();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('latest repositories');
  
  // const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

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
    searchKeyword={searchKeyword}
    setSearchKeyword={setSearchKeyword}
    orderBy={orderBy}
    setOrderBy={setOrderBy}
  />;
};

export default RepositoryList;
