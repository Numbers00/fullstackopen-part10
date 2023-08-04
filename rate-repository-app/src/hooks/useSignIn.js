import { useApolloClient, useMutation } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const { data: { authenticate: { accessToken } } } = await mutate({ variables: { username, password } });
    
    await authStorage.setAccessToken(accessToken);
    apolloClient.resetStore();
    
    return accessToken;
  };

  return [signIn, result];
};

export default useSignIn;
