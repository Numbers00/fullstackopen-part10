import { gql } from '@apollo/client';

import {
  REPOSITORY_NODE_FIELDS, REPOSITORY_EDGE_FIELDS,
  REVIEW_EDGE_FIELDS
} from './fragments';

export const GET_REPOSITORIES = gql`
  query GetRepositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        ...RepositoryEdgeFields
      }
    }
  }
  ${REPOSITORY_EDGE_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryNodeFields
      reviews {
        edges {
          ...ReviewEdgeFields
        }
      }
    }
  }
  ${REPOSITORY_NODE_FIELDS}
  ${REVIEW_EDGE_FIELDS}
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
