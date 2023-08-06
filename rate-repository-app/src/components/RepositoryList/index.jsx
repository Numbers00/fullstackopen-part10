import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

import React, { useEffect, useState } from 'react';
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


// this is a pure component, i.e., no side effects, e.g., fetching data through a hook
// exported to be used in tests

// useCallback alternative doesn't work
// converted to a class to prevent unnecessary re-renders
export class RepositoryListContainer extends React.Component {
  
  renderHeader = () => {
    const { searchKeyword, setSearchKeyword, orderBy, setOrderBy } = this.props;

    return (
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
    );
  };

  render() {
    const { repositories, loading, onEndReached } = this.props;

    const repositoryNodes = repositories?.edges?.map(edge => edge.node) || [];

    return (
      <FlatList
        testID='flatList'
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, index: i }) => {
          if (loading && i === 0) return <View><Text>Loading repositories...</Text></View>;
          else if (!item && i === 0) return <View><Text>No repositories</Text></View>;
          else if (!item) return null;

          return <RepositoryItem item={item} />;
        }}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}


const RepositoryList = () => {
  const { repositories, loading, fetchMore, refetch } = useRepositories({ first: 8 });

  const [searchKeyword, setSearchKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('latest repositories');
  
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const refetchRepositories = () => {
    switch (orderBy) {
    case 'latest repositories':
      refetch({ first: 8, searchKeyword: debouncedSearchKeyword, orderBy: 'CREATED_AT', orderDirection: 'DESC' });
      break;
    case 'highest rated repositories':
      refetch({ first: 8, searchKeyword: debouncedSearchKeyword, orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
      break;
    case 'lowest rated repositories':
      refetch({ first: 8, searchKeyword: debouncedSearchKeyword, orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
      break;
    default:
      throw new Error(`Unhandled orderBy: ${orderBy}`);
    }
  };

  useEffect(() => {
    refetchRepositories();
  }, [debouncedSearchKeyword, orderBy]);

  const onEndReached = () => {
    fetchMore();
  };

  return <RepositoryListContainer
    repositories={repositories}
    loading={loading}
    searchKeyword={searchKeyword}
    setSearchKeyword={setSearchKeyword}
    onEndReached={onEndReached}
    orderBy={orderBy}
    setOrderBy={setOrderBy}
  />;
};

export default RepositoryList;
