import { get, post, put } from "../lang/api";

export type Raiting = {
  tmdb: number;
};

type WithId<T> = T & { _id: string };

export type Series = {
  name: string;
  rating: Raiting;
  cover: string;
};

export type Tv = {
  seriesId: string;
  season: number;
  no: number;
};

export type Media = WithId<Series>

const createSeries = async (series: Series): Promise<WithId<Series>> => {
  const resp = (await post({
    body: series,
    url: {
      base: "api/series",
    },
  })) as WithId<Series>;
  return resp;
};

const createTv = async (tv: Tv) => {
  return post({
    body: tv,
    url: {
      base: "api/tv",
    },
  });
};
