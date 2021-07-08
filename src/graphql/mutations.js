/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGameData = /* GraphQL */ `
  mutation CreateGameData(
    $input: CreateGameDataInput!
    $condition: ModelGameDataConditionInput
  ) {
    createGameData(input: $input, condition: $condition) {
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
export const updateGameData = /* GraphQL */ `
  mutation UpdateGameData(
    $input: UpdateGameDataInput!
    $condition: ModelGameDataConditionInput
  ) {
    updateGameData(input: $input, condition: $condition) {
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
export const deleteGameData = /* GraphQL */ `
  mutation DeleteGameData(
    $input: DeleteGameDataInput!
    $condition: ModelGameDataConditionInput
  ) {
    deleteGameData(input: $input, condition: $condition) {
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
export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
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
export const updateReview = /* GraphQL */ `
  mutation UpdateReview(
    $input: UpdateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    updateReview(input: $input, condition: $condition) {
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
export const deleteReview = /* GraphQL */ `
  mutation DeleteReview(
    $input: DeleteReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    deleteReview(input: $input, condition: $condition) {
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
