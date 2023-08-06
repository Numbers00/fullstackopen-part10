import { gql } from '@apollo/client';

import {
  REPOSITORY_NODE_FIELDS, REPOSITORY_CONNECTION_FIELDS,
  REVIEW_CONNECTION_FIELDS
} from './fragments';

export const GET_REPOSITORIES = gql`
  query GetRepositories($first: Int, $after: String, $searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(first: $first, after: $after, searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...RepositoryConnectionFields
    }
  }
  ${REPOSITORY_CONNECTION_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryNodeFields
      reviews(first: $first, after: $after) {
        ...ReviewConnectionFields
      }
    }
  }
  ${REPOSITORY_NODE_FIELDS}
  ${REVIEW_CONNECTION_FIELDS}
`;

export const GET_ME = gql`
  query GetMe($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        ...ReviewConnectionFields
      }
    }
  }
  ${REVIEW_CONNECTION_FIELDS}
`;
