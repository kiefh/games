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
    getReview(id: $id,) {
      id
      reviewer
      review_date
      link
      review_quote
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
    listReviews(limit: 20, filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      reviewer
      review_date
      link
      review_quote
      createdAt
      updatedAt
      }
      nextToken
    }
  }
`;
