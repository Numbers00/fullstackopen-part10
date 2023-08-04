import { gql } from '@apollo/client';

import { REPOSITORY_EDGE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories {
    repositories {
      edges {
        ...RepositoryEdgeFields
      }
    }
  }
  ${REPOSITORY_EDGE_FIELDS}
`;
