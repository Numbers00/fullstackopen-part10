import { useQuery } from '@apollo/client';

import { GET_ME } from '../graphql/queries';

const useMe = () => {
  const { data, error, loading, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, error, refetch };
};

export default useMe;
