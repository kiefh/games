// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { GameData, Review } = initSchema(schema);

export {
  GameData,
  Review
};