import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type GameDataMetaData = {
  readOnlyFields;
}

type ReviewMetaData = {
  readOnlyFields;
}

export declare class GameData {
  readonly id: string;
  readonly logo: string;
  readonly screenshots?: string[];
  readonly video: string;
  readonly title: string;
  readonly releaseDate: string;
  readonly score: number;
  readonly scoreImg: string;
  readonly description: string;
  readonly genre: string;
  readonly developer: string;
  readonly reviews?: number[];
  readonly publisher: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<GameData>);
  static copyOf(source: GameData, mutator: (draft: MutableModel<GameData>) => MutableModel<GameData> | void): GameData;
}

export declare class Review {
  readonly id: string;
  readonly reviewer: string;
  readonly date: string;
  readonly link: string;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Review>);
  static copyOf(source: Review, mutator: (draft: MutableModel<Review>) => MutableModel<Review> | void): Review;
}