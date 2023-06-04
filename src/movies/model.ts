import { WithId } from "../lang/WithId";

export type Movie = {
  name: string | undefined;
  cover: string | undefined;
};

export type MovieDisplay = Movie & WithId;
