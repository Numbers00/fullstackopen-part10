import { gql } from '@apollo/client';

import { REPOSITORY_NODE_FIELDS, REPOSITORY_EDGE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        ...RepositoryEdgeFields
      }
    }
  }
  ${REPOSITORY_EDGE_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryNodeFields
    }
  }
  ${REPOSITORY_NODE_FIELDS}
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
