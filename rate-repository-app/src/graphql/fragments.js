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
    node {
      ...RepositoryNodeFields
    }
  }
  ${REPOSITORY_NODE_FIELDS}
`;

export const REVIEW_NODE_FIELDS = gql`
  fragment ReviewNodeFields on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;

export const REVIEW_EDGE_FIELDS = gql`
  fragment ReviewEdgeFields on ReviewEdge {
    node {
      ...ReviewNodeFields
    }
  }
  ${REVIEW_NODE_FIELDS}
`;
