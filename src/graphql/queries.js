/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGameData = /* GraphQL */ `
  query GetGameData($id: ID!) {
    getGameData(id: $id) {
      id
      logo
      screenshots
      video
      title
      releaseDate
      score
      scoreImg
      description
      genre
      developer
      reviews
      publisher
      createdAt
      updatedAt
    }
  }
`;
export const listGameData = /* GraphQL */ `
  query ListGameData(
    $filter: ModelGameDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        logo
        screenshots
        video
        title
        releaseDate
        score
        scoreImg
        description
        genre
        developer
        reviews
        publisher
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      reviewer
      date
      link
      description
      createdAt
      updatedAt
    }
  }
`;
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        reviewer
        date
        link
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
