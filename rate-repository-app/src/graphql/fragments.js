import { gql } from '@apollo/client';

export const REPOSITORY_NODE_FIELDS = gql`
  fragment RepositoryNodeFields on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
  }
`;

export const REPOSITORY_EDGE_FIELDS = gql`
  fragment RepositoryEdgeFields on RepositoryEdge {
    cursor
    node {
      ...RepositoryNodeFields
    }
  }
  ${REPOSITORY_NODE_FIELDS}
`;

export const REPOSITORY_CONNECTION_FIELDS = gql`
  fragment RepositoryConnectionFields on RepositoryConnection {
    totalCount
    edges {
      ...RepositoryEdgeFields
    }
    pageInfo {
      endCursor
      hasNextPage
      startCursor
    }
  }
  ${REPOSITORY_EDGE_FIELDS}
`;

export const REVIEW_NODE_FIELDS = gql`
  fragment ReviewNodeFields on Review {
    id
    rating
    repositoryId
    text
    createdAt
    user {
      id
      username
    }
  }
`;

export const REVIEW_EDGE_FIELDS = gql`
  fragment ReviewEdgeFields on ReviewEdge {
    cursor
    node {
      ...ReviewNodeFields
    }
  }
  ${REVIEW_NODE_FIELDS}
`;

export const REVIEW_CONNECTION_FIELDS = gql`
  fragment ReviewConnectionFields on ReviewConnection {
    edges {
      ...ReviewEdgeFields
    }
    pageInfo {
      endCursor
      hasNextPage
      startCursor
    }
    totalCount
  }
  ${REVIEW_EDGE_FIELDS}
`;
