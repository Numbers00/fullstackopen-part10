import { FlatList, View } from 'react-native';

import ReviewItem from './ReviewItem';
import Text from '../Text';

import useMe from '../../hooks/useMe';

const ItemSeparator = () => <View style={{ height: 10 }} />;


const MyReviews = () => {
  const { data, loading, refetch } = useMe(true);
  const me = data?.me;
  const reviewNodes = me?.reviews?.edges?.map(edge => edge.node) || [];

  if (loading) return (<View><Text>Loading your reviews...</Text></View>);
  else if (!reviewNodes.length) return (<View><Text>You haven&apos;t reviewed any repositories</Text></View>);

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
