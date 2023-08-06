import { useQuery } from '@apollo/client';

import { GET_ME } from '../graphql/queries';

const useMe = (includeReviews) => {
  const { data, error, loading, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: includeReviews ?? false },
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, error, refetch };
};

export default useMe;
