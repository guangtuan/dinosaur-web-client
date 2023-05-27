import { WithId } from "../lang/WithId";

export type Series = {
  name: string | undefined;
  cover: string | undefined;
};

export type SeriesDisplay = Series & WithId;
