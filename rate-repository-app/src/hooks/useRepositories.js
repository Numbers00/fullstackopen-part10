import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (searchKeyword, orderBy, orderDirection) => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { searchKeyword, orderBy, orderDirection },
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, error, refetch };
};

export default useRepositories;
