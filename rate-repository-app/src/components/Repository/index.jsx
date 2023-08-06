import { useParams } from 'react-router-native';

// expo-web-browser seems better than Linking since
// it opens the link in an in-app browser instead of the system browser
// but Linking is used here as per fullstack open instructions
// import * as WebBrowser from 'expo-web-browser';

import { FlatList, View } from 'react-native';

import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';
import Text from '../Text';

import useRepository from '../../hooks/useRepository';

const ItemSeparator = () => <View style={{ height: 10 }} />;


const Repository = () => {
  const { id } = useParams();

  const { repository, fetchMore, loading } = useRepository({ id, first: 5 });
  const reviewNodes = repository?.reviews?.edges.map(edge => edge.node) || [];

  const onEndReached = () => {
    fetchMore();
  };

  if (loading) return (<View><Text>Loading repository...</Text></View>);
  else if (!repository) return (<View><Text>Repository with id: ${ id } not found</Text></View>);

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository} />
          <ItemSeparator />
        </>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Repository;
